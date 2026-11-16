import os
import re

print("=== Finalizing Kech Travel Game Content ===")

with open("index.html", "r", encoding="utf-8") as f:
    c = f.read()

# 1. Hero Title & Subtitle
c = c.replace(
    'class="h1 mobile-margin-bottom-16 intro__headline">Travel</div>',
    'class="h1 mobile-margin-bottom-16 intro__headline">Kech Travel</div>'
)
c = c.replace(
    '<div class="body-xxl">With purpose. Book retreats, active <br/>tours, and boutique stays &nbsp;in one place.</div>',
    '<div class="body-xxl">Your private driver &amp; tour organizer in Morocco. <br/>Custom trips, desert safaris &amp; unforgettable adventures.</div>'
)
c = c.replace(
    '<div class="body-xxl">With purpose. Book retreats, active <br/>tours, and boutique stays \xa0in one place.</div>',
    '<div class="body-xxl">Your private driver &amp; tour organizer in Morocco. <br/>Custom trips, desert safaris &amp; unforgettable adventures.</div>'
)

# 2. Featured Tour Titles & Details
tours_replacements = [
    (
        '7 Day Mystic Mountain Retreat in Romania',
        '3-Day Merzouga Luxury Desert Tour &amp; Camel Trek'
    ),
    (
        'Yoga &amp; Outdoor Retreat <br/>in Tuscany, Italy',
        'High Atlas Mountains, 3 Valleys &amp; Imlil Day Trip'
    ),
    (
        'Photography Retreat &amp; Tour in Magical Agafay Desert Sunset & Quad Adventure',
        'Agafay Desert Sunset Dinner, Quad &amp; Camel Safari'
    ),
    (
        'Agafay Desert Sunset & Quad Adventure Holiday &amp; Desert Moon',
        'Marrakech to Essaouira Atlantic Coast Private Tour'
    ),
    (
        '8 Day Juice Detox, Retreat in Portugal',
        'Hot Air Balloon Sunrise &amp; Traditional Berber Breakfast'
    ),
    (
        '7 Day Solo Travelers Retreat: Fun in Bali',
        '7-Day Grand Morocco Imperial Cities &amp; Sahara Expedition'
    ),
]

for old_title, new_title in tours_replacements:
    c = c.replace(old_title, new_title)

# Update prices
c = c.replace('$1,000', 'from $320')
c = c.replace('$1,200', 'from $75')
c = c.replace('$2,000', 'from $90')
c = c.replace('$1,800', 'from $110')
c = c.replace('$1,500', 'from $180')
c = c.replace('$2,500', 'from $790')

# 3. Practitioners / Drivers in index.html
# Michael Wilson -> Omar Benali
c = c.replace('Michael Wilson', 'Omar Benali')
c = c.replace('Meditation Coach', 'Sahara 4x4 &amp; Desert Expert')
c = c.replace('United Kingdom', 'Merzouga Desert')
c = c.replace(
    'I work with meditation as a practical tool for emotional stability, focus, and self-awareness. My sessions are direct, structured, and free of dogmatism. I teach simple, repeatable techniques that help you recognize mental patterns, pause reactivity, and maintain clarity under pressure.<br/><br/>My approach is accessible, evidence-informed, and tailored to fit real-life demands.',
    'Born in the golden dunes of Merzouga, I have navigated the Sahara for over 10 years. I specialize in off-road 4x4 desert crossings, luxury desert camp hosting, camel trekking, and magical stargazing nights across the Moroccan Sahara.'
)

# Sarah Johnson -> Karim Mansouri
c = c.replace('Sarah Johnson', 'Karim Mansouri')
c = c.replace('Nutrition Specialist', 'High Atlas &amp; Cultural Guide')
c = c.replace('Australia', 'Atlas / Imlil')
c = c.replace(
    'I support retreat participants with nutrition that is simple, nourishing, and adapted to real life. My work focuses on building sustainable habits around whole, satisfying food — without strict rules, guilt, or trends that are hard to maintain.<br/><br/>My approach is evidence-informed, collaborative, and tailored to each person’s lifestyle and goals.',
    'A native of the High Atlas, I guide travelers through breathtaking Berber valleys, Mount Toubkal passes, and authentic village experiences. Certified as an official mountain guide, I share Morocco’s living heritage with pride and care.'
)

# Isabelle Martin -> Mehdi Tazi
c = c.replace('Isabelle Martin', 'Mehdi Tazi')
c = c.replace('Stress-Relief Guide', 'VIP Chauffeur &amp; Custom Trips Planner')
c = c.replace('France', 'Marrakech')
c = c.replace(
    'I work with stress reduction through structured breathing practices, gentle movement, and restorative routines. My sessions help you release physical tension, quiet the nervous system, and restore a sense of calm and control.<br/><br/>My approach is gentle, grounded, and designed for anyone feeling exhausted, overwhelmed, or simply in need of a reset.',
    'I manage our executive private fleet and tailored VIP itineraries across Morocco. From comfortable Mercedes V-Class airport pickups to bespoke multi-city itineraries, I ensure seamless logistics, punctuality, and total peace of mind.'
)

# Destination cards in index.html
c = c.replace('Destination 1', 'Marrakech &amp; Medina')
c = c.replace('Destination 2', 'Sahara Desert Merzouga')
c = c.replace('Destination 3', 'High Atlas Mountains')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(c)

print("index.html finalized with 100% precision!")

# 4. Update coaches.html with same driver profiles
with open("coaches.html", "r", encoding="utf-8") as f:
    coa = f.read()

coa = coa.replace('Michael Wilson', 'Omar Benali')
coa = coa.replace('Meditation Coach', 'Sahara 4x4 &amp; Desert Expert')
coa = coa.replace('Sarah Johnson', 'Karim Mansouri')
coa = coa.replace('Nutrition Specialist', 'High Atlas &amp; Cultural Guide')
coa = coa.replace('Isabelle Martin', 'Mehdi Tazi')
coa = coa.replace('Stress-Relief Guide', 'VIP Chauffeur &amp; Custom Trips Planner')

with open("coaches.html", "w", encoding="utf-8") as f:
    f.write(coa)

print("coaches.html finalized!")

# 5. Update retreat.html with same tour names
with open("retreat.html", "r", encoding="utf-8") as f:
    ret = f.read()

for old_title, new_title in tours_replacements:
    ret = ret.replace(old_title, new_title)

ret = ret.replace('$1,000', 'from $320')
ret = ret.replace('$1,200', 'from $75')
ret = ret.replace('$2,000', 'from $90')
ret = ret.replace('$1,800', 'from $110')
ret = ret.replace('$1,500', 'from $180')
ret = ret.replace('$2,500', 'from $790')

with open("retreat.html", "w", encoding="utf-8") as f:
    f.write(ret)

print("retreat.html finalized!")

# 6. Update individual tour detail pages with Moroccan tour names
tour_detail_map = {
    "7-day-mystic-mountain-retreat-in-romania.html": ("3-Day Merzouga Luxury Desert Tour & Camel Trek", "Experience the magic of the Moroccan Sahara. Travel through the High Atlas, visit Ait Ben Haddou Kasbah, and spend an unforgettable night in a luxury desert camp in Merzouga with camel trekking and stargazing."),
    "7-day-solo-travelers-retreat-fun-in-bali.html": ("7-Day Grand Morocco Imperial Cities & Sahara Expedition", "A complete private journey through Morocco. Explore Casablanca, Chefchaouen, the ancient Medina of Fes, the dunes of Merzouga, and the vibrant souks of Marrakech with your dedicated private driver."),
    "8-day-juice-detox-retreat-in-portugal.html": ("Hot Air Balloon Sunrise & Traditional Berber Breakfast", "Float above Marrakech and the Atlas Mountains at sunrise in a hot air balloon, followed by a royal Berber breakfast in a traditional tent and desert tea ceremony."),
    "morocco-holiday-desert-moon.html": ("Marrakech to Essaouira Atlantic Coast Private Day Tour", "Escape to the breezy Atlantic coast of Essaouira. Explore the 18th-century sea ramparts, fresh fish market, art galleries, and historic medina at your own pace."),
    "photography-retreat-tour-in-magical-morocco.html": ("Agafay Desert Sunset Dinner, Quad & Camel Safari", "Just 45 minutes from Marrakech, discover the rocky expanse of Agafay. Enjoy an adrenaline-filled quad biking safari, a sunset camel ride, and a candlelit dinner under the stars."),
}

for page, (title, desc) in tour_detail_map.items():
    if os.path.exists(page):
        with open(page, "r", encoding="utf-8") as f:
            content = f.read()
        content = re.sub(r'<title>.*?</title>', f'<title>{title} - Kech Travel Game</title>', content)
        # replace common placeholder strings
        content = content.replace("7 Day Mystic Mountain Retreat in Romania", title)
        content = content.replace("7 Day Solo Travelers Retreat: Fun in Bali", title)
        content = content.replace("8 Day Juice Detox, Retreat in Portugal", title)
        content = content.replace("Agafay Desert Sunset & Quad Adventure Holiday & Desert Moon", title)
        content = content.replace("Photography Retreat & Tour in Magical Agafay Desert Sunset & Quad Adventure", title)
        with open(page, "w", encoding="utf-8") as f:
            f.write(content)

print("Tour detail pages finalized!")
print("=== ALL DONE! ===")
