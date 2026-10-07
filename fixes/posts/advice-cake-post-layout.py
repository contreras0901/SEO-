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
IMG = {
    "grey": (U + "garden-wedding-chateau-de-bouthonvilliers-french-grey-wedding-cake.jpg", "French grey three-tier wedding cake with baroque piping at Château de Bouthonvilliers"),
    "cream": (U + "la-valencia-hotel-wedding-la-jolla-roberta-sid-peris-photography-14-three-tier-cake.jpg", "Three-tier cream wedding cake with rope, quilt and pleat texture and cream roses at La Valencia Hotel"),
    "table": (U + "la-valencia-hotel-wedding-la-jolla-roberta-sid-peris-photography-13-cake-table-blue-wall.jpg", "Cake table with white lanterns against the blue floral wall in the Veranda Ballroom at La Valencia Hotel"),
    "candelabra": (U + "westgate-hotel-wedding-san-diego-cherine-andy-khoa-photography-09-table-centerpiece.jpg", "Reception table centerpiece of white roses with a gold candelabra and crystal glassware at The Westgate Hotel"),
    "garden": (U + "garden-wedding-chateau-de-bouthonvilliers-white-cake-on-garden-table.jpg", "White two-tier wedding cake with lace piping on a garden table beside white roses at Château de Bouthonvilliers"),
    "tablescape": (U + "garden-wedding-chateau-de-bouthonvilliers-tablescape-taper-candles.jpg", "Reception tablescape with white florals, taper candles, gold chargers and grey linen at Château de Bouthonvilliers"),
}

SERIF = "font-family:'HV Florentino Regular','Cormorant Garamond',Georgia,serif;"
SANS = "font-family:Questrial,'Helvetica Neue',Arial,sans-serif;"
INK = "#1f1f1f"; GREY = "#6b6b6b"; ROSE = "#c9a39f"; CREAM = "#f6f2ec"

def pic(key, ratio="4/5", radius="0"):
    src, alt = IMG[key]
    return f'<figure style="margin:0"><img src="{src}" alt="{alt}" loading="lazy" style="display:block;width:100%;aspect-ratio:{ratio};object-fit:cover;border-radius:{radius}"></figure>'

def row(keys, ratio="4/5", gap=24):
    cells = "".join(f'<div>{pic(k, ratio)}</div>' for k in keys)
    return f'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:{gap}px;margin:48px 0">{cells}</div>'

def h2(num, text):
    return (f'<div style="margin:64px 0 20px;text-align:center">'
            f'<p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 10px">No. {num}</p>'
            f'<h2 style="{SERIF}font-weight:400;font-size:30px;line-height:1.2;letter-spacing:0.02em;color:{INK};margin:0">{text}</h2>'
            f'<div style="width:40px;height:1px;background:{ROSE};margin:18px auto 0"></div></div>')

def p(text):
    return f'<p style="{SERIF}font-size:18px;line-height:1.8;color:{INK};margin:0 0 20px">{text}</p>'

def quote(text):
    return (f'<blockquote style="margin:56px auto;max-width:720px;padding:0 24px;border:0;text-align:center">'
            f'<p style="{SERIF}font-style:italic;font-size:26px;line-height:1.45;color:{INK};margin:0">{text}</p>'
            f'<div style="width:40px;height:1px;background:{ROSE};margin:22px auto 0"></div></blockquote>')

def dd(items):
    cards = ""
    for kind, text in items:
        do = kind == "do"
        bg = CREAM if do else "#ffffff"; border = f"1px solid {ROSE}" if not do else "1px solid transparent"
        label = "Do" if do else "Don't"
        cards += (f'<div style="background:{bg};border:{border};padding:26px 26px 24px;border-radius:2px">'
                  f'<p style="{SANS}font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:{ROSE if not do else GREY};margin:0 0 10px">{label}</p>'
                  f'<p style="{SERIF}font-size:17px;line-height:1.7;color:{INK};margin:0">{text}</p></div>')
    return f'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin:28px 0 8px">{cards}</div>'

body = f'''
<div style="max-width:960px;margin:0 auto;text-align:left">

<div style="text-align:center;margin:0 0 36px">
  <p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 14px">Planning advice</p>
  <h1 style="{SERIF}font-weight:400;font-size:44px;line-height:1.15;letter-spacing:0.02em;color:{INK};margin:0 0 18px">How to Choose Your Wedding Cake</h1>
  <p style="{SERIF}font-style:italic;font-size:20px;line-height:1.5;color:{GREY};max-width:640px;margin:0 auto">The cake is the one design object every guest walks up to and photographs. Here is how to get it right.</p>
</div>

{pic("grey", "3/2")}

<div style="max-width:760px;margin:48px auto 0">
{p("We plan and design weddings across San Diego, and the cake conversation comes up in almost every design meeting. Couples usually arrive with a photograph they love and a flavor they remember. Both matter. But the decisions that make a cake work on the day are about size, structure, placement, and weather, and those are the ones nobody talks about until it is too late.")}
</div>

{h2("01", "Start with the number, not the picture")}
<div style="max-width:760px;margin:0 auto">
{p("A cake is sized by servings, and servings are counted in slices about one inch by two inches. As a rule of thumb, three tiers serve roughly a hundred guests, four tiers roughly a hundred and fifty. If you want a tall cake for a smaller wedding, ask your baker about a decorative tier or a taller base tier instead of paying for cake nobody eats.")}
{p("If dessert is also a sweets table, a cheese course, or late-night bites, you can order cake for sixty to seventy percent of the guest count. Tell your planner so the catering order matches.")}
</div>

{row(["cream", "garden"])}

{h2("02", "Flavors that survive a San Diego afternoon")}
<div style="max-width:760px;margin:0 auto">
{p("An outdoor reception in Coronado, La Jolla, or Carlsbad can be warm until sunset even in October. The flavor you loved at the tasting has to hold its shape on a terrace at four in the afternoon.")}
</div>
{dd([("do", "Choose buttercream or fondant over whipped cream or cream cheese for any cake that will sit out."),
     ("dont", "Put a soft filling, fresh fruit, custard or mousse, in a bottom tier that holds up three tiers above it. Your baker will dowel it, but a heavy cake in heat still wants a firm base."),
     ("do", "Ask for a tasting of the actual flavors in the actual combination you plan to order. A lemon cake with raspberry filling tastes different from a lemon cake with vanilla buttercream."),
     ("dont", "Assume one flavor per cake. Most bakers will do a different flavor per tier at no extra cost. Pick a crowd flavor for the biggest tier.")])}

{quote("The best cakes we have placed were designed after the palette and the tablescape, not before.")}

{h2("03", "Design: let the cake belong to the room")}
<div style="max-width:760px;margin:0 auto">
{p("A three-tier cream cake with rope, quilt, and pleat texture, finished with a cascade of cream roses, sat on a gold crystal stand in front of a blue watercolor wall at La Valencia, and it was the most photographed object in the room because it was the whole palette in one piece.")}
</div>
{dd([("do", "Repeat one element from the tables on the cake: the same rose, the same ribbon color, the same metal as the chargers."),
     ("dont", "Overload a small cake. Texture reads better than extra sugar flowers on a two-tier cake."),
     ("do", "Use real flowers only if your florist and baker agree on them. Some blooms are not safe on food; your florist knows which, and will wire or wrap the stems."),
     ("dont", "Choose a pure white cake for a cream, taupe, or champagne palette. Ask for ivory. Bright white photographs blue next to warm linens.")])}

{row(["tablescape", "candelabra"])}

{h2("04", "The cake table is part of the design")}
<div style="max-width:760px;margin:0 auto">
{p("Give the cake its own table with a backdrop, a cloth that goes to the floor, and light. A pair of lanterns or a cluster of votives at the base do more than a spotlight. Keep the table away from the dance floor, the bar line, and any door that opens to the outside.")}
{p("Place the cake after the room is set and the air conditioning or shade has settled, usually during cocktail hour, and plan the cutting within two hours of placement if the reception is outdoors.")}
</div>

<div style="margin:48px 0">{pic("table", "3/2")}</div>

{h2("05", "Logistics couples forget")}
{dd([("do", "Confirm who cuts and plates the cake. At most hotels it is the catering staff, and some charge a cutting fee per slice. Ask before you sign."),
     ("do", "Decide whether you are saving the top tier. If yes, tell the venue, bring a box, and assign someone to take it home."),
     ("do", "Schedule the cutting early in the reception, after the first dance, so guests who leave early see it and so the cake can be served with coffee during dancing."),
     ("dont", "Order a cake without a delivery time and a named person on site to receive it. The baker should know the room, the table, and your planner's number."),
     ("dont", "Forget the cake knife and server. Rentals rarely include them; the venue sometimes does. Ask.")])}

<div style="max-width:760px;margin:56px auto 0;text-align:center">
{p("A good cake is a design decision, a catering decision, and a timeline decision at once. When all three are made together, it looks like it was always meant to be in that room.")}
</div>

<div style="background:{CREAM};padding:44px 28px;text-align:center;margin:56px 0 0">
  <p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 12px">Bella Mia Exclusive Events</p>
  <p style="{SERIF}font-style:italic;font-size:22px;line-height:1.5;color:{INK};margin:0 0 22px;max-width:620px;margin-left:auto;margin-right:auto">Planning a wedding or event in San Diego and want a second set of eyes on the details?</p>
  <p style="margin:0"><a href="/contact" style="{SANS}display:inline-block;background:{ROSE};color:#fff;text-decoration:none;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;padding:16px 30px;margin:6px">Inquire about your date</a>
  <a href="/services" style="{SANS}display:inline-block;border:1px solid {INK};color:{INK};text-decoration:none;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;padding:15px 30px;margin:6px">Our planning services</a></p>
</div>

</div>
'''
r = req("POST", "/posts/341", {"content": body})
print(r["id"], r["status"], r["link"], "imgs:", r["content"]["rendered"].count("<img"))
