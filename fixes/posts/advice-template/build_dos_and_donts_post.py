"""Do's & Don'ts advice post (340), built on the approved advice-post template."""
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


IMG = {}
for key, mid, alt in [
  ("hero", 283, "El Jardín wedding ceremony at La Valencia Hotel seen from above, with the Pacific and palms behind"),
  ("stairs", 277, "Bride descending the terracotta stairs at La Valencia Hotel with a cream rose and eucalyptus bouquet"),
  ("westgate", 253, "Bride in a lace gown with a cream bouquet on the blue carpet of The Westgate Hotel lobby"),
  ("ballroom", 287, "Veranda Ballroom at La Valencia Hotel set with cocktail tables under crystal chandeliers"),
  ("aviara", 222, "Reception in the Gardens at Park Hyatt Aviara with round tables, string lights and the band stage under the palms"),
  ("walk", 272, "Julianne and David walking toward the resort at Loews Coronado Bay at golden hour"),
]:
    m = req("GET", f"/media/{mid}?_fields=source_url"); IMG[key] = (m["source_url"], alt)
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

body = f'''
<div style="max-width:960px;margin:0 auto;text-align:left">

<div style="text-align:center;margin:0 0 36px">
  <p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 14px">Planning advice</p>
  <h1 style="{SERIF}font-weight:400;font-size:44px;line-height:1.15;letter-spacing:0.02em;color:{INK};margin:0 0 18px;text-align:center">Wedding Day Do&#8217;s and Don&#8217;ts</h1>
  <p style="{SERIF}font-style:italic;font-size:20px;line-height:1.5;color:{GREY};max-width:640px;margin:0 auto">The things we tell every couple before the day, and the things we quietly fix when nobody does.</p>
</div>

{pic("hero", "3/2")}

<div style="max-width:760px;margin:48px auto 0">
{p("After more than a decade of weddings and events across San Diego, the same handful of decisions decide whether a day feels effortless or feels like work. None of them are about budget. They are about where the time goes, who holds the plan, and what you let go of once the morning starts. Here is the short version of what we tell every couple.")}
</div>

{h2("01", "Before the day")}
{dd([("do", "Build the timeline backwards from the one thing that cannot move. At a hotel or resort that is usually the ceremony start, the sunset, or a music cutoff. Everything else gets placed around it."),
     ("dont", "Schedule the ceremony into the sun. If guests will be looking west in the late afternoon, turn the setup or move the time. Squinting guests show in every photograph."),
     ("do", "Give your vendors one point of contact. Your planner or coordinator should hold the timeline, the floor plan, and every phone number. On the day, nobody should need to text the bride."),
     ("dont", "Leave the rain and wind plan as a conversation. Put it in writing with the venue: which room, by what time the call is made, and who makes it."),
     ("do", "Walk the venue at the time of day of your ceremony. Light and wind change by the hour on the coast. A courtyard that is calm at ten can be breezy at four."),
     ("dont", "Add a late idea the week of. A new rental, a new song, a new seating change: each one touches three other vendors. Give it to your planner and let them tell you what it costs in time.")])}

{row(["stairs", "westgate"])}

{h2("02", "The morning of")}
{dd([("do", "Eat. A real breakfast, and something at noon, before hair and makeup finish. The most common emergency we handle before a ceremony is a lightheaded bride or groomsman who skipped lunch."),
     ("dont", "Run hair and makeup to the minute. Add thirty minutes you plan to waste. If you finish early, you get to sit down."),
     ("do", "Hand your phone to someone. Your planner takes vendor calls. Your maid of honor or best man takes family calls. You take none."),
     ("dont", "Let the wedding party scatter. One room, one time to be dressed, one person who knows where the rings and the vows are."),
     ("do", "Build in a quiet half hour. Reading a letter, sitting with a parent, a few minutes alone with your partner before the first look. It is the last still moment of the day, and the photographs from it are usually the ones couples keep closest.")])}

{quote("It is the kind of moment you cannot plan, but you can plan around it.")}

{h2("03", "Ceremony and cocktail hour")}
{dd([("do", "Keep the ceremony under thirty minutes unless tradition calls for more. Guests are standing in the sun or sitting on hard chairs. Say what matters and get them to a drink."),
     ("dont", "Leave guests with nothing to do while family photos run long. Cap family photos at twenty minutes, give the photographer the shot list in advance, and have someone whose only job is to find Aunt Maria."),
     ("do", "Ask for an unplugged ceremony if you want the aisle clear in your photographs. One line from the officiant is enough."),
     ("dont", "Seat the ceremony with no plan for who sits where. Reserved rows for immediate family, and a person at the end of each row who knows it."),
     ("do", "Pass water and something to eat at cocktail hour before the bar line forms, especially outdoors.")])}

{row(["ballroom", "aviara"])}

{h2("04", "The reception")}
{dd([("do", "Keep toasts short and scheduled. Two or three, during dinner, with a glass already in every hand. Tell the speakers the time limit in person, not in a group text."),
     ("dont", "Stack dinner, cake cutting, first dance, bouquet toss, and open dancing into the same forty minutes. Spread the moments out so the room never has to stop twice."),
     ("do", "Plan the room for the last hour, not the first. Where the lighting goes, where the late-night bite comes out, and where the two of you will be standing when the music stops."),
     ("dont", "Try to greet every table during dinner service. You will not eat. Greet during cocktail hour or after the first dance, when people are already up."),
     ("do", "Let the venue&#8217;s rules shape the night instead of fighting them. A ten o&#8217;clock outdoor music cutoff is not a limit when the timeline is built around it; it is an ending with a shape."),
     ("dont", "Leave the exit to chance. Decide how you are leaving, who has the keys, the bags, and the top tier of the cake, and who stays to close out with the venue.")])}

<div style="margin:48px 0">{pic("walk", "3/2")}</div>

{h2("05", "For guests and hosts of any event")}
{dd([("do", "Answer the invitation by the date on it, with the names of exactly who is coming. Every number on a caterer&#8217;s order comes from that reply."),
     ("dont", "Wear white to a wedding unless you were asked to."),
     ("do", "Arrive fifteen minutes before a ceremony or a seated dinner. Arriving during the processional is the one thing a planner cannot fix."),
     ("dont", "Bring a guest who was not invited, and don&#8217;t post photographs of the couple before they do.")])}

<div style="max-width:760px;margin:56px auto 0;text-align:center">
{p("Every one of these comes from a real day. The couples who have the easiest time are not the ones with the biggest budget; they are the ones who decided early, handed the plan to someone they trust, and let the day happen.")}
</div>

<div style="background:{CREAM};padding:44px 28px;text-align:center;margin:56px 0 0">
  <p style="{SANS}font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:{GREY};margin:0 0 12px">Bella Mia Exclusive Events</p>
  <p style="{SERIF}font-style:italic;font-size:22px;line-height:1.5;color:{INK};margin:0 0 22px;max-width:620px;margin-left:auto;margin-right:auto">Planning a wedding or event in San Diego and want a second set of eyes on the details?</p>
  <p style="margin:0"><a href="/contact" style="{SANS}display:inline-block;background:{ROSE};color:#fff;text-decoration:none;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;padding:16px 30px;margin:6px">Inquire about your date</a>
  <a href="/services" style="{SANS}display:inline-block;border:1px solid {INK};color:{INK};text-decoration:none;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;padding:15px 30px;margin:6px">Our planning services</a></p>
</div>

</div>
'''
POST_ID = 340
r = req("POST", f"/posts/{POST_ID}", {"content": body})
print(r["id"], r["status"], r["link"], "imgs:", r["content"]["rendered"].count("<img"))
