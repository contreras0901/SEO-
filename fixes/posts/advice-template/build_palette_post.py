"""Color-palette advice post (342), built on the approved advice-post template."""
import json, os, subprocess, tempfile, base64
WP = "https://bellamiaexclusiveevents.com/wp-json/wp/v2"
auth = base64.b64encode(f"{os.environ['WP_USER']}:{os.environ['WP_APP_PASSWORD']}".encode()).decode()
def req(method, path, data=None):
    args = ["curl", "-sS", "-m", "120", "-X", method, WP + path, "-H", "Authorization: Basic " + auth, "-H", "Content-Type: application/json", "-A", "Mozilla/5.0 BellaMiaCloud/1.0"]
    tmp = None
    if data is not None:
        tmp = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False); json.dump(data, tmp); tmp.close(); args += ["--data-binary", "@" + tmp.name]
    out = subprocess.run(args, capture_output=True, text=True)
    if tmp: os.unlink(tmp.name)
    return json.loads(out.stdout)

U = "https://bellamiaexclusiveevents.com/wp-content/uploads/2026/10/"
LV = U + "la-valencia-hotel-wedding-la-jolla-roberta-sid-peris-photography-"
IMG = {
    "hero": (LV + "08-terraza-cocktail-tables.jpg", "Cocktail tables in white and blue linen on the Terraza at La Valencia Hotel, with the pink hotel and the ocean behind"),
    "salon": (LV + "12-salon-dinner-table.jpg", "Long dinner table in the Salon at La Valencia Hotel with crossback chairs, deep teal hobnail goblets and a lemon and eucalyptus garland"),
    "bay": (U + "loews-coronado-bay-wedding-julianne-david-chrissa-magno-02-couple-bay-coronado-bridge.jpg", "Julianne and David hand in hand at the water's edge at Loews Coronado Bay with the Coronado Bridge behind them"),
    "tablescape": (U + "garden-wedding-chateau-de-bouthonvilliers-tablescape-taper-candles.jpg", "Reception tablescape in white, taupe and gold with taper candles at Château de Bouthonvilliers"),
    "westgate": (U + "westgate-hotel-wedding-san-diego-cherine-andy-khoa-photography-05-white-roses-crystal-gold.jpg", "White rose and hydrangea arrangement with crystal and gold accents at The Westgate Hotel"),
    "facade": (LV + "01-pink-facade-tower.jpg", "Pink facade and tower of La Valencia Hotel in La Jolla against a blue sky"),
}
# resolve real file names from the media library so no URL is guessed
for key, mid in [("hero", 284), ("salon", 288), ("bay", 271), ("tablescape", 349), ("westgate", 255), ("facade", 275)]:
    m = req("GET", f"/media/{mid}?_fields=source_url")
    IMG[key] = (m["source_url"], IMG[key][1])

SERIF = "font-family:'HV Florentino Regular','Cormorant Garamond',Georgia,serif;"
SANS = "font-family:Questrial,'Helvetica Neue',Arial,sans-serif;"
INK = "#1f1f1f"; GREY = "#6b6b6b"; ROSE = "#c9a39f"; CREAM = "#f6f2ec"

def pic(key, ratio="4/5"):
    src, alt = IMG[key]
    return f'<figure style="margin:0"><img src="{src}" alt="{alt}" loading="lazy" style="display:block;width:100%;aspect-ratio:{ratio};object-fit:cover"></figure>'
def row(keys, ratio="4/5"):
    return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin:48px 0">' + "".join(f'<div>{pic(k, ratio)}</div>' for k in keys) + '</div>'
def h2(num, text):
    return (f'<div style="margin:64px 0 20px;text-align:center"><p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 10px">No. {num}</p>'
            f'<h2 style="{SERIF}font-weight:400;font-size:30px;line-height:1.2;letter-spacing:0.02em;color:{INK};margin:0">{text}</h2>'
            f'<div style="width:40px;height:1px;background:{ROSE};margin:18px auto 0"></div></div>')
def p(text): return f'<p style="{SERIF}font-size:18px;line-height:1.8;color:{INK};margin:0 0 20px;text-align:center">{text}</p>'
def quote(text):
    return (f'<blockquote style="margin:56px auto;max-width:720px;padding:0 24px;border:0;text-align:center"><p style="{SERIF}font-style:italic;font-size:26px;line-height:1.45;color:{INK};margin:0">{text}</p>'
            f'<div style="width:40px;height:1px;background:{ROSE};margin:22px auto 0"></div></blockquote>')
def dd(items):
    cards = ""
    for kind, text in items:
        do = kind == "do"
        cards += (f'<div style="background:{CREAM if do else "#fff"};border:1px solid {"transparent" if do else ROSE};padding:26px 26px 24px;border-radius:2px;text-align:center">'
                  f'<p style="{SANS}font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:{GREY if do else ROSE};margin:0 0 10px">{"Do" if do else "Don&#8217;t"}</p>'
                  f'<p style="{SERIF}font-size:17px;line-height:1.7;color:{INK};margin:0">{text}</p></div>')
    return f'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin:28px 0 8px">{cards}</div>'
def swatches(items):
    """items: list of (label, [hex,...], note)"""
    out = ""
    for label, hexes, note in items:
        dots = "".join(f'<span style="display:inline-block;width:34px;height:34px;border-radius:50%;background:{h};border:1px solid rgba(0,0,0,0.08);margin:0 4px"></span>' for h in hexes)
        out += (f'<div style="text-align:center;padding:26px 18px;background:#fff;border:1px solid #e9e4dc;border-radius:2px">'
                f'<div style="margin:0 0 14px">{dots}</div>'
                f'<p style="{SANS}font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:{INK};margin:0 0 8px">{label}</p>'
                f'<p style="{SERIF}font-style:italic;font-size:16px;line-height:1.6;color:{GREY};margin:0">{note}</p></div>')
    return f'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin:36px 0 8px">{out}</div>'

body = f'''
<div style="max-width:960px;margin:0 auto;text-align:left">

<div style="text-align:center;margin:0 0 36px">
  <p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 14px">Planning advice</p>
  <h1 style="{SERIF}font-weight:400;font-size:44px;line-height:1.15;letter-spacing:0.02em;color:{INK};margin:0 0 18px">How to Choose a Wedding Color Palette</h1>
  <p style="{SERIF}font-style:italic;font-size:20px;line-height:1.5;color:{GREY};max-width:640px;margin:0 auto">The right palette is decided by the room you booked, not by a mood board. Here is how we build one.</p>
</div>

{pic("hero", "3/2")}

<div style="max-width:760px;margin:48px auto 0">
{p("Every wedding we design starts with the same question: what does the venue already look like? A pink Spanish hotel over the ocean, a gilded downtown ballroom, a garden under palms, a lawn at a private estate. Each one has colors built in. A palette that joins that conversation looks like it grew there. A palette that interrupts it looks placed, no matter how beautiful the flowers.")}
</div>

{h2("01", "Write down what the venue gives you")}
<div style="max-width:760px;margin:0 auto">
{p("Walk the ceremony site and the reception room and note the colors you cannot change: the stucco, the carpet, the chandeliers, the floor, the wallpaper, the view. At La Valencia that list was pink stucco, a black-and-white checkered floor, crystal, and a wall of blue watercolor florals, with the Pacific a block away. The palette, greenery, blues, and cream, came straight from that list.")}
</div>
{dd([("do", "Photograph the room in the light of your reception hour. Late-afternoon sun on a terrace is a different color from noon."),
     ("dont", "Trust the venue&#8217;s website photographs. They are often shot with another couple&#8217;s design in place.")])}

{row(["salon", "bay"])}

{h2("02", "Three colors and a neutral")}
<div style="max-width:760px;margin:0 auto">
{p("A palette that photographs well has a lead color, a supporting color, an accent, and a neutral that carries the linens, the paper, and the gowns.")}
</div>
{swatches([
  ("Lead", ["#b9a2d0", "#e8b4c0", "#2f6f7a", "#c96f4a"], "The one you would name if someone asked. Lavender, blush, deep teal, terracotta."),
  ("Supporting", ["#9db4c9", "#a9b89a"], "A quieter neighbor of the lead. Dusty blue beside lavender; sage beside blush."),
  ("Accent", ["#c8307a"], "One bright note, used sparingly, so the evening never fades into the same four colors."),
  ("Neutral", ["#f4efe6", "#e9dfcf", "#c9b79c"], "Ivory, cream, taupe or champagne. Pure white is a choice, not a default."),
])}
<div style="max-width:760px;margin:28px auto 0">
{p("At Loews Coronado Bay a lavender and blue ceremony moved to fuchsia orchids on the reception tables for exactly that reason: after a ceremony in cool colors, one hot note at the table is what keeps the evening alive.")}
</div>
{dd([("dont", "Go past three colors plus a neutral. Five-color palettes read as busy in photographs and are almost impossible to source in flowers across a season."),
     ("dont", "Default to pure white. It photographs cool and shows every mark; ask for ivory next to warm linens.")])}

{quote("The building is pink, the sea is blue, and the florals either join that conversation or interrupt it. We joined it.")}

{h2("03", "Check it against the season and the flowers")}
<div style="max-width:760px;margin:0 auto">
{p("San Diego is generous with flowers year round, but not every color is available every month at a price that makes sense. Peonies are a May and June flower. Dahlias peak late summer into fall. Blue in nature is mostly delphinium, hydrangea, and thistle. If your lead color is a flower color, ask your florist which blooms carry it in your month before you fall in love with it.")}
</div>
{dd([("do", "Let greenery do the work of making arrangements look like they belong. Olive, eucalyptus, ruscus, and smilax carry a garden palette on their own."),
     ("dont", "Dye flowers to hit a swatch. Dyed stems look wrong next to natural ones and bleed on linens in heat.")])}

{row(["tablescape", "westgate"])}

{h2("04", "Decide where each color lives")}
<div style="max-width:760px;margin:0 auto">
{p("A palette is not a percentage. Assign each color a job: the lead color in bouquets and centerpieces, the supporting color in the bridesmaids&#8217; dresses and ribbon, the accent in the glassware, the menu cards, or one bloom per table, the neutral in the linens and the paper. When every color has a place, the room reads as one idea from the ceremony to the last table.")}
</div>
{dd([("do", "Tie the men&#8217;s attire in with one piece: a tie, a boutonniere, a pocket square in the supporting color."),
     ("dont", "Match the groomsmen to the bridesmaids exactly. It flattens the photographs.")])}

{h2("05", "Palettes that age well, and ones that don&#8217;t")}
<div style="max-width:760px;margin:0 auto">
{p("Palettes drawn from the venue and from nature age well: cream and greenery, lavender and dusty blue, terracotta and olive, navy and ivory, blush and taupe. Palettes drawn from a trend age fast: anything neon, anything metallic as a main color, ombré gradients, and all-black-everything in daylight.")}
{p("The test we use: would this palette make sense in this room if no wedding were happening? If yes, it will still make sense in the album in twenty years.")}
</div>

<div style="margin:48px 0">{pic("facade", "3/2")}</div>

{h2("06", "Palettes we have built, and why")}
{swatches([
  ("Greenery, blues &amp; cream", ["#7d8f6a", "#2f6f7a", "#f4efe6"], "A Spanish-Mediterranean hotel by the sea. The florals joined the building instead of interrupting it."),
  ("Lavender &amp; dusty blue", ["#b9a2d0", "#9db4c9", "#c8307a"], "A modern coastal wedding on the bay, with one fuchsia note at the tables to keep the evening alive."),
  ("White, taupe &amp; gold", ["#ffffff", "#c9b79c", "#c8a95a"], "A private estate. The hardest palette to do well, and the one that lets a garden be the design."),
  ("White &amp; green, Cool Water roses", ["#ffffff", "#7d8f6a", "#c3b1d6"], "A black-tie ballroom. A single lavender note kept gold and crystal from reading heavy."),
])}

<div style="max-width:760px;margin:56px auto 0;text-align:center">
{p("If you are stuck, bring us the venue and one photograph you love. We will tell you which of its colors the room will accept, and which one should become the accent.")}
</div>

<div style="background:{CREAM};padding:44px 28px;text-align:center;margin:56px 0 0">
  <p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 12px">Bella Mia Exclusive Events</p>
  <p style="{SERIF}font-style:italic;font-size:22px;line-height:1.5;color:{INK};margin:0 0 22px;max-width:620px;margin-left:auto;margin-right:auto">Planning a wedding or event in San Diego and want a second set of eyes on the details?</p>
  <p style="margin:0"><a href="/contact" style="{SANS}display:inline-block;background:{ROSE};color:#fff;text-decoration:none;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;padding:16px 30px;margin:6px">Inquire about your date</a>
  <a href="/services" style="{SANS}display:inline-block;border:1px solid {INK};color:{INK};text-decoration:none;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;padding:15px 30px;margin:6px">Our planning services</a></p>
</div>

</div>
'''
POST_ID = 342
r = req("POST", f"/posts/{POST_ID}", {"content": body})
print(r["id"], r["status"], r["link"], "imgs:", r["content"]["rendered"].count("<img"), "featured", r["featured_media"])
