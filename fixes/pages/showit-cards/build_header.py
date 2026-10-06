"""Blog template header (Featured Post canvas dIDRqBFiN): new blog name, category links as a centered caps row.
Founder 2026-10-06: name 'Weddings & Inspiration'; links centered under the title, small letterspaced grey caps with thin dividers."""
import json, sys
src, dst = sys.argv[1], sys.argv[2]
page = json.load(open(src))
b = page['blockData']['dIDRqBFiN']
els = b['elements']
assert els[11]['content']['text'] == 'San Diego Wedding Blog' and els[2]['content']['text'].startswith('Weddings')
GREY, RULE = '#6e6b65', '#a39e94'
# Title (H1): centered across the canvas
t = els[11]
t['content'] = {"text": "Weddings &amp; Inspiration", "sample": "Weddings & Inspiration"}
t['desktop'].update({"x": 100, "y": 52, "w": 1000, "h": 50, "size": 34, "tA": "center", "lS": 0.08, "lH": 1.2})
t['mobile'].update({"x": 20, "y": 40, "w": 280, "h": 30, "size": 20, "tA": "center", "lS": 0.08, "lH": 1.2})
# Category links: centered row of small caps
for i, x, mx in ((2, 360, 20), (3, 520, 113), (4, 680, 206)):
    e = els[i]
    e['desktop'].update({"x": x, "y": 118, "w": 160, "h": 22, "size": 12, "font": "Questrial Normal", "lS": 0.3, "lC": "uppercase",
                         "tA": "center", "c": GREY, "lH": 1.8, "styles": {"link": {"c": GREY, "tD": "none", "hC": "#242424", "hTd": "none"}}})
    e['mobile'].update({"x": mx, "y": 92, "w": 94, "h": 18, "size": 10})
    e['tag'] = 'p'
# Everything else in the canvas moves down 20 px on desktop
for i, e in enumerate(els):
    if i not in (2, 3, 4, 11):
        e['desktop']['y'] += 20
b['desktop']['h'] += 20
# Two thin dividers between the links
for dx, mx in ((519, 112), (679, 205)):
    els.append({"type": "simple", "visible": "a", "content": {},
                "desktop": {"x": dx, "y": 123, "w": 1, "h": 12, "a": 0, "bgcolor": RULE, "fillType": "color"},
                "mobile": {"x": mx, "y": 96, "w": 1, "h": 10, "a": 0, "bgcolor": RULE, "fillType": "color"},
                "sync": ["fillType", "o", "border.rad", "shadow.style", "trIn.type", "bS"]})
json.dump(page, open(dst, 'w'), separators=(',', ':'), ensure_ascii=False)
print('elements now', len(els), 'canvas h', b['desktop']['h'], 'title', t['desktop'], '\nwrote', dst)
