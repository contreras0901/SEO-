"""Rebuild the Real Weddings card in the Posts canvas (block Oogq7OHww) of a Showit blog template page JSON.
Spec: fixes/pages/real-weddings-card-spec.md section 1 (exciting-mccarthy version, 2026-10-06)."""
import json, sys, copy
src, dst = sys.argv[1], sys.argv[2]
page = json.load(open(src))
NEAR_BLACK, GREY, ROSE, ROSE_HOVER, WHITE = '#1f1f1f', '#6b6b6b', '#c9a3a0', '#b88e8b', '#ffffff'
SERIF, SERIF_ITALIC, SANS = 'HV Florentino Regular', 'HV Florentino Italic', 'Questrial Normal'
NAMES_FONT = 'Wulkan Display Light'   # Founder 2026-10-06: smaller, more elegant modern font for the couple line
TEXT_SYNC = ["o","border.rad","shadow.style","trIn.type","style","lC","lH","tA","font","over","c","lS",
             "styles.link.c","styles.link.tD","styles.link.hC","styles.link.hTd"]
LINK_STYLES = {"c": NEAR_BLACK, "tD": "none", "hC": NEAR_BLACK, "hTd": "none"}
BUTTON_SYNC = ["o","border.rad","shadow.style","trIn.type","style","fillType","bC","bW","bS",
               "text.c","text.font","text.lH","text.lC","text.lS","text.tA","hover.type","hover.c","hover.dur"]

def text(tag, content, sample, d, m, wp=None, link=None):
    el = {
        "type": "text", "visible": "a", "tag": tag, "style": "heading",
        "content": {"text": content, "sample": sample[:30]},
        "desktop": {"a": 0, "styles": {"link": {"c": d["c"], "tD": "none", "hC": d["c"], "hTd": "none"}}, "style": "heading", **d},
        "mobile": {"a": 0, "styles": {"link": {}}, **m},
        "sync": list(TEXT_SYNC),
    }
    if wp: el["wp"] = {"field": wp}
    if link: el["link"] = link
    return el

def button(d, m):
    return {
        "type": "button", "visible": "a", "content": {}, "anchor": "center", "style": "primary",
        "label": "View the Gallery",
        "link": {"type": "wp_post", "target": None},
        "desktop": {"a": 0, "fillType": "color", "bgcolor": ROSE, "bC": ROSE, "bW": 0, "bS": "solid",
                    "border": {"rad": "0"}, "o": 100,
                    "text": {"font": SERIF_ITALIC, "size": 13, "c": WHITE, "lS": 0.3, "lC": "uppercase", "tA": "center", "lH": 1, "mB": 0},
                    "hover": {"type": "custom", "c": ROSE_HOVER, "bgcolor": ROSE_HOVER, "dur": 0.3, "text": {}},
                    **d},
        "mobile": {"a": 0, "text": {"size": 12}, **m},
        "sync": list(BUTTON_SYNC),
    }

def card(photo):
    dx, dy, dw, dh = (photo["desktop"][k] for k in "xywh")
    mx, my, mw, mh = (photo["mobile"][k] for k in "xywh")
    t_d = dy + dh + 36      # 36 px top padding (desktop)
    t_m = my + mh + 24      # 24 px (mobile)
    els = [photo]
    # Line 1: couple <- post excerpt. Serif, title case, 40/30 px, near-black, 0.01 em, centered. H3.
    els.append(text("h3", "Roberta &amp; Sid<br>", "Roberta & Sid",
        {"x": dx, "y": t_d, "w": dw, "h": 36, "size": 30, "font": NAMES_FONT, "c": NEAR_BLACK, "lS": 0.04, "lC": "none", "tA": "center", "lH": 1.2},
        {"x": mx, "y": t_m, "w": mw, "h": 29, "size": 24}, wp="post_excerpt", link={"type": "wp_post", "target": None}))
    # Line 2: WEDDING GALLERY, static. Serif, 16 px, 0.3 em, caps, near-black.
    els.append(text("p", "Wedding Gallery<br>", "Wedding Gallery",
        {"x": dx, "y": t_d + 44, "w": dw, "h": 24, "size": 16, "font": SERIF, "c": NEAR_BLACK, "lS": 0.3, "lC": "uppercase", "tA": "center", "lH": 1.5},
        {"x": mx, "y": t_m + 35, "w": mw, "h": 20, "size": 13}, link={"type": "wp_post", "target": None}))
    # Line 3: venue <- post title, rendered uppercase. 13 px, 0.25 em, grey.
    els.append(text("p", "La Valencia Hotel<br>", "La Valencia Hotel",
        {"x": dx, "y": t_d + 74, "w": dw, "h": 24, "size": 13, "font": SANS, "c": GREY, "lS": 0.25, "lC": "uppercase", "tA": "center", "lH": 1.8},
        {"x": mx, "y": t_m + 59, "w": mw, "h": 20, "size": 11}, wp="post_title", link={"type": "wp_post", "target": None}))
    # Button: full width, 24 px below the venue line, 24 px vertical padding, rose, white italic caps.
    els.append(button(
        {"x": dx, "y": t_d + 122, "w": dw, "h": 61, "padding": "24px 12px 24px 12px"},
        {"x": mx, "y": t_m + 97, "w": mw, "h": 48, "padding": "18px 10px 18px 10px"}))
    return els

changed = 0
for bid, block in page["blockData"].items():
    if (block.get("wp") or {}).get("type") != "post": continue
    for st in block["states"]:
        photo = next(e for e in st["elements"] if e["type"] == "graphic" and (e.get("wp") or {}).get("type") == "featured_image")
        old = [(e["type"], (e.get("wp") or {}).get("field")) for e in st["elements"]]
        assert old == [("graphic", None), ("text", "post_category"), ("line", None), ("text", "post_title")], old
        photo = copy.deepcopy(photo)
        st["elements"] = card(photo)
        changed += 1
        bottom_d = max(e["desktop"]["y"] + e["desktop"]["h"] for e in st["elements"])
        bottom_m = max(e["mobile"]["y"] + e["mobile"]["h"] for e in st["elements"])
        print(f"{page['name']} {bid} {st['slug']}: desktop bottom {bottom_d} (block h {block['desktop']['h']}), mobile bottom {bottom_m} (block h {block['mobile']['h']})")
assert changed == 3, changed
json.dump(page, open(dst, "w"), separators=(",", ":"), ensure_ascii=False)
print("wrote", dst, len(open(dst).read()), "bytes")
