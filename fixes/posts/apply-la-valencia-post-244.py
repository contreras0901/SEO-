#!/usr/bin/env python3
"""Apply the 2026-10-03 live-post fix to WordPress post 244 (Roberta & Sid, La Valencia).

What it changes in the post content (see roberta-and-sid-la-valencia-la-jolla.md, "LIVE-POST FIX"):
  1. Removes the Preformatted block at the top of the post that shows the title-card HTML as code
     (the 2026-10-03 paste landed in a Preformatted block instead of a Custom HTML block).
  2. Replaces the old centered card (names / venue / vendor lines / "Scroll for full gallery")
     with the "Joyce & Elliot"-style title card from la-valencia-title-card.html, CSS included.
  3. Adds id="gallery" to the first photo row so the card's "View the Gallery" button has a target.
  The Vendor Team block at the end of the post is already live and is left alone.

Usage:
  python3 apply-la-valencia-post-244.py --dry-run      # public GET, writes preview to --out, no login
  python3 apply-la-valencia-post-244.py                # needs WP_USER + WP_APP_PASSWORD (a WordPress
                                                       #   Application Password, 24 characters), PUTs the post
Options: --site https://bellamiaexclusiveevents.com  --post 244  --out /path/preview.html
"""
import argparse, base64, json, os, re, sys, urllib.request

TITLE_CARD = '''<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
.bm-title-card{text-align:center;padding:48px 16px 56px;font-family:"Cormorant Garamond",Georgia,serif}
.bm-title-card .bm-names{font-size:clamp(30px,4.2vw,40px);font-weight:400;line-height:1.15;letter-spacing:.02em;margin:0 0 26px}
.bm-title-card .bm-kicker{font-size:clamp(14px,1.6vw,17px);letter-spacing:.3em;text-transform:uppercase;font-weight:400;margin:0 0 22px}
.bm-title-card .bm-venue{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#6b6b6b;margin:0 0 34px}
.bm-title-card .bm-btn{display:inline-block;background:#c9a3a0;color:#fff;font-style:italic;font-size:12px;letter-spacing:.3em;text-transform:uppercase;text-decoration:none;padding:17px 90px;max-width:100%;box-sizing:border-box}
.bm-title-card .bm-btn:hover{background:#b88e8b}
@media (max-width:480px){.bm-title-card .bm-btn{padding:16px 36px}}
</style>
<div class="bm-title-card">
  <h2 class="bm-names">Roberta &amp; Sid</h2>
  <p class="bm-kicker">Wedding Gallery</p>
  <p class="bm-venue">La Valencia Hotel</p>
  <a class="bm-btn" href="#gallery">View the Gallery</a>
</div>'''

PRE_BLOCK = re.compile(
    r'(?:<!-- wp:preformatted[^>]*-->\s*)?<pre class="wp-block-preformatted">(?:(?!</pre>).)*bm-title-card(?:(?!</pre>).)*</pre>\s*(?:<!-- /wp:preformatted -->\s*)?',
    re.S)
OLD_CARD = re.compile(
    r'<div style="text-align:center;padding-top:24px">(?:(?!</div>).)*?Scroll for full gallery</p></div>',
    re.S | re.I)
FIRST_ROW = '<div style="position:relative;aspect-ratio:16/9;'


def transform(content):
    report = {}
    new, n = PRE_BLOCK.subn('', content, count=1)
    report['preformatted_block_removed'] = n
    new, n = OLD_CARD.subn(lambda m: TITLE_CARD, new, count=1)
    report['old_card_replaced'] = n
    if 'id="gallery"' not in new and FIRST_ROW in new:
        new = new.replace(FIRST_ROW, '<div id="gallery" style="position:relative;aspect-ratio:16/9;', 1)
        report['gallery_anchor_added'] = 1
    else:
        report['gallery_anchor_added'] = 0
    return new, report


def request(url, auth=None, data=None):
    req = urllib.request.Request(url, data=data, method='POST' if data else 'GET')
    req.add_header('Accept', 'application/json')
    req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) bella-mia-post-fix/1.0')  # the default urllib agent gets a 403 from Cloudflare
    if data is not None:
        req.add_header('Content-Type', 'application/json')
    if auth:
        req.add_header('Authorization', 'Basic ' + base64.b64encode(auth.encode()).decode())
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', default='https://bellamiaexclusiveevents.com')
    ap.add_argument('--post', type=int, default=244)
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--out', default='la-valencia-post-244-preview.html')
    a = ap.parse_args()
    api = f'{a.site}/wp-json/wp/v2/posts/{a.post}'

    if a.dry_run:
        post = request(api)
        content = post['content']['rendered']
        new, report = transform(content)
        print(json.dumps(report))
        open(a.out, 'w').write(new)
        print('preview written to', a.out)
        return 0 if all(report.values()) else 2

    user, pw = os.environ.get('WP_USER'), os.environ.get('WP_APP_PASSWORD')
    if not user or not pw:
        sys.exit('WP_USER and WP_APP_PASSWORD must be set')
    auth = f'{user}:{pw}'
    me = request(f'{a.site}/wp-json/wp/v2/users/me?context=edit', auth)
    print('logged in as', me.get('slug'), 'roles', me.get('roles'))
    post = request(f'{api}?context=edit', auth)
    raw = post['content']['raw']
    new, report = transform(raw)
    print(json.dumps(report))
    if not all(report.values()):
        sys.exit('content did not match the expected before-state; nothing written')
    if new == raw:
        print('no change needed'); return 0
    res = request(api, auth, json.dumps({'content': new}).encode())
    print('updated', res['id'], 'modified', res['modified'], res['link'])
    check = request(api)['content']['rendered']
    print('verify: preformatted gone', 'wp-block-preformatted' not in check,
          '| card present', 'bm-title-card' in check, '| anchor', 'id="gallery"' in check,
          '| scroll line gone', 'scroll for full gallery' not in check.lower())
    return 0


if __name__ == '__main__':
    sys.exit(main())
