import os
import re
import shutil

print("=== Starting Kech Travel Game Content & Photo Replacement ===")

# 1. Map photos from photo/ to target assets/images/
# We have 28 photos in assets/images/kechtg/ (photo_1.jpg to photo_28.jpg)

photo_map = {
    # Hero backgrounds
    "assets/images/69b131f7e83fd36f79be5b78_bg-part-1.webp": "assets/images/kechtg/photo_24.jpg",
    "assets/images/69b131f75b251dd705fc8bb9_bg-part-2.webp": "assets/images/kechtg/photo_25.jpg",
    "assets/images/69b13422ebe5cda64625a488_mobile-bg-part-1.webp": "assets/images/kechtg/photo_26.jpg",
    "assets/images/69b134223848489eddf4f3cf_mobile-bg-part-2.webp": "assets/images/kechtg/photo_27.jpg",
    
    # Intro & About illustrations
    "assets/images/6971ad259164859152a18667_intro-illustration.webp": "assets/images/kechtg/photo_2.jpg",
    "assets/images/6979a5eeee86150be7247f79_illustration-about.jpg": "assets/images/kechtg/photo_4.jpg",
    "assets/images/697b1f5e0aeba6bb251058df_illustration.webp": "assets/images/kechtg/photo_6.jpg",
    "assets/images/6996a3af2af2d3822b2931c4_intro-1.webp": "assets/images/kechtg/photo_10.jpg",
    "assets/images/6996a3af0586c4a4a9017f22_intro-2.webp": "assets/images/kechtg/photo_11.jpg",
    "assets/images/698b622b74261b36810ef710_combine-mobile.webp": "assets/images/kechtg/photo_12.jpg",
    
    # Featured Tours / Activities
    "assets/images/697b0f75d450e622eb69bbb9_1.webp": "assets/images/kechtg/photo_1.jpg",
    "assets/images/697b0f759c0200e2421e8d01_2.webp": "assets/images/kechtg/photo_2.jpg",
    "assets/images/697b0f75e8fb56ed1c7f7c90_3.webp": "assets/images/kechtg/photo_9.jpg",
    "assets/images/697b0f75cd93fd313dfcc0bd_4.webp": "assets/images/kechtg/photo_14.jpg",
    "assets/images/697b162748ae928115f5f8ee_5.webp": "assets/images/kechtg/photo_13.jpg",
    "assets/images/697b16276a09f35cfb31e223_6.webp": "assets/images/kechtg/photo_15.jpg",
    
    # Statistics cards
    "assets/images/6971da641fb15bbf6432e993_statistic-1.webp": "assets/images/kechtg/photo_16.jpg",
    "assets/images/6971da644ade29a121769faf_statistic-2.webp": "assets/images/kechtg/photo_17.jpg",
    "assets/images/6971da64c60674c148d40058_statistic-3.webp": "assets/images/kechtg/photo_22.jpg",
    
    # Destinations
    "assets/images/698b68bbc6de4b51a55a64b3_destination-1.webp": "assets/images/kechtg/photo_18.jpg",
    "assets/images/698b68bb48fceacc9f67c522_destination-2.webp": "assets/images/kechtg/photo_19.jpg",
    "assets/images/698b68bb7277bdbc67c88cd3_destination-3.webp": "assets/images/kechtg/photo_20.jpg",
    
    # Coaches / Drivers
    "assets/images/69897f6cc589808c226f0cd7_ea8e8b2e1274331d29db4f187ea3aebb_1.webp": "assets/images/kechtg/photo_3.jpg",
    "assets/images/69897f6ccb670b10285a47bf_12.webp": "assets/images/kechtg/photo_5.jpg",
    "assets/images/69897f6c6400b1ebc3956333_43c66f9116f860d81fe61e822e465e88_10.webp": "assets/images/kechtg/photo_7.jpg",
    "assets/images/69897f6cb4387b1312d7ae14_9.webp": "assets/images/kechtg/photo_8.jpg",
    "assets/images/69897f6c292a68644a3e07b6_11.webp": "assets/images/kechtg/photo_3.jpg",
    "assets/images/69897f6c71bd8132d7c6bad8_6.webp": "assets/images/kechtg/photo_5.jpg",
    "assets/images/69897f6c01ae0a19d848cade_2.webp": "assets/images/kechtg/photo_7.jpg",
    
    # Bottom CTA illustration
    "assets/images/697b6310adee6f369b84c520_illustration.webp": "assets/images/kechtg/photo_21.jpg",
    
    # Contact illustrations
    "assets/images/6989df5258a6f0a8174626f3_illustration-contact.webp": "assets/images/kechtg/photo_23.jpg",
    "assets/images/6989df5258a6f0a8174626f3_illustration-contact-p-1080.webp": "assets/images/kechtg/photo_23.jpg",
    
    # Detail tour pages photos
    "assets/images/699436e8b134285ccf31006f_photo-4.webp": "assets/images/kechtg/photo_1.jpg",
    "assets/images/699447aeaf32c7e6532989d4_photo-3.webp": "assets/images/kechtg/photo_2.jpg",
    "assets/images/699442b2e8d78ec1c0df5f43_photo-4.webp": "assets/images/kechtg/photo_4.jpg",
    "assets/images/6994371ae0e38372b16ef81e_photo-3.webp": "assets/images/kechtg/photo_6.jpg",
    "assets/images/699449cafb965aed19d0c7e2_photo-illustration.webp": "assets/images/kechtg/photo_9.jpg",
    "assets/images/69943cd9e0ecbc47b7089b73_location-photo.webp": "assets/images/kechtg/photo_10.jpg",
    "assets/images/6984649a2cdc9e7b22151a56_photo-3.webp": "assets/images/kechtg/photo_11.jpg",
    "assets/images/69943c62f15818128e1b0000_photo-1.webp": "assets/images/kechtg/photo_12.jpg",
    "assets/images/69943aa4682d716bb4a8cb2d_photo-4.webp": "assets/images/kechtg/photo_13.jpg",
    "assets/images/69943aa4e26de03cae79e3a0_photo-1.webp": "assets/images/kechtg/photo_14.jpg",
    "assets/images/69846497c3f7018382cdd4e3_photo-4.webp": "assets/images/kechtg/photo_15.jpg",
    "assets/images/699436e898c2c3dd1296ea90_photo-3.webp": "assets/images/kechtg/photo_16.jpg",
    "assets/images/6984649a04527b1da4f30aae_photo-1.webp": "assets/images/kechtg/photo_17.jpg",
    "assets/images/6984649a9f7c632b018c4b42_photo-2.webp": "assets/images/kechtg/photo_18.jpg",
    "assets/images/699436e8c3f9ccacdbdad6b1_photo-2.webp": "assets/images/kechtg/photo_19.jpg",
    "assets/images/699436f229c7ba595327805a_photo-location.webp": "assets/images/kechtg/photo_20.jpg",
    "assets/images/699436fd255b61b332b560e2_photo-1.webp": "assets/images/kechtg/photo_21.jpg",
    "assets/images/6994464a1ab40e0f847f7d79_location-illustration.webp": "assets/images/kechtg/photo_22.jpg",
    "assets/images/699433500152bb2d69d5dd6d_photo-1.webp": "assets/images/kechtg/photo_24.jpg",
    "assets/images/699442b23b81634713d3e104_photo-1.webp": "assets/images/kechtg/photo_25.jpg",
    "assets/images/699442b2b1d261acd336e8b6_photo-3.webp": "assets/images/kechtg/photo_26.jpg",
    "assets/images/699442b2f01bbbc1c37eb2b0_photo-2.webp": "assets/images/kechtg/photo_27.jpg",
    "assets/images/699447aef876e1106201be49_photo-1.webp": "assets/images/kechtg/photo_28.jpg",
    "assets/images/699447ae8272781aeebffe42_photo-2.webp": "assets/images/kechtg/photo_1.jpg",
    "assets/images/699447ae3d9de807ab9fadc1_photo-4.webp": "assets/images/kechtg/photo_2.jpg",
    "assets/images/69944906fa9a450d3f2d35b7_photo-1.webp": "assets/images/kechtg/photo_4.jpg",
    "assets/images/699449067b414f13024be21b_photo-2.webp": "assets/images/kechtg/photo_6.jpg",
    "assets/images/69944907a2ca139a503975db_photo-3.webp": "assets/images/kechtg/photo_9.jpg",
    "assets/images/6994493570cbc2593c495f14_photo-4_205.webp": "assets/images/kechtg/photo_14.jpg",
}

print(f"Replacing {len(photo_map)} image assets directly with authentic Moroccan photos...")
for target_rel, source_rel in photo_map.items():
    if os.path.exists(source_rel):
        os.makedirs(os.path.dirname(target_rel), exist_ok=True)
        shutil.copyfile(source_rel, target_rel)
print("Asset images successfully mapped and replaced!")

# 2. Update Content across all HTML pages
# We will do global replacements for brand, titles, contacts, and specific page rewrites.

import glob

html_files = glob.glob("*.html")

for hf in html_files:
    with open(hf, "r", encoding="utf-8") as f:
        content = f.read()

    # Brand replacements
    content = content.replace("Vita Travels", "Kech Travel Game")
    content = content.replace("Vita Travel", "Kech Travel Game")
    content = content.replace("VITA Travels", "Kech Travel Game")
    content = content.replace("VITA Travel", "Kech Travel Game")
    content = content.replace("vita-travels@gmail.com", "contact@kechtravelgame.com")
    content = content.replace("+1012345678", "+212600000000")
    content = content.replace("+1 012 345 678", "+212 600 000 000")
    content = content.replace("Phenomenon Studio", "Kech Travel Game")
    content = content.replace("https://phenomenonstudio.com/", "#")

    # Navigation items
    content = content.replace('>Retreats<', '>Tours & Trips<')
    content = content.replace('>Explore Retreats<', '>Book Your Trip<')
    content = content.replace('>Coaches<', '>Private Drivers<')
    content = content.replace('>Contacts<', '>Contact Us<')
    
    with open(hf, "w", encoding="utf-8") as f:
        f.write(content)

print("Global brand and navigation updated.")

# 3. Specific Homepage (index.html) Rich Content Update
with open("index.html", "r", encoding="utf-8") as f:
    idx = f.read()

# Update page title
idx = re.sub(r'<title>.*?</title>', '<title>Kech Travel Game - Morocco Private Driver & Tailor-Made Tours</title>', idx)

# Hero section replacements
idx = idx.replace(
    'data-anim="fade-up-big" class="h1 mobile-margin-bottom-8">Travel',
    'data-anim="fade-up-big" class="h1 mobile-margin-bottom-8">Morocco'
)
idx = idx.replace(
    'Curated retreats and expert coaches for true transformation.',
    'Private Driver, Custom Tours & Authentic Moroccan Adventures.'
)

# Statistics section
idx = idx.replace(
    'data-anim="statistic-head-title" class="head__title">Retreats',
    'data-anim="statistic-head-title" class="head__title">Services'
)
idx = idx.replace(
    'We&#x27;ve vetted retreats in more than 100 countries See for yourself',
    'VIP Private Chauffeur, Bespoke Itineraries & Desert Expeditions'
)
idx = idx.replace(
    '100+ countries with retreats',
    '10+ Years Guiding Experience'
)
idx = idx.replace(
    '1 472+ happy guests',
    '2,500+ Happy Travelers'
)
idx = idx.replace(
    '99% positive reviews',
    '100% Tailored Private Trips'
)
idx = idx.replace(
    'Verified and reviewed places for safe journeys.',
    'Comfortable modern Mercedes fleet with expert local drivers.'
)
idx = idx.replace(
    'We find retreats that align with your lifestyle.',
    'Customized itineraries from Marrakech to the Sahara Desert.'
)
idx = idx.replace(
    'Join our community of mindful travelers worldwide.',
    'Unforgettable experiences with 24/7 dedicated local support.'
)

# About section
idx = idx.replace(
    'Not just trips experiences that nurture body and soul',
    'Not just trips — unforgettable journeys crafted around you'
)
idx = idx.replace(
    'We curate life-changing retreats and connect you with top-tier coaches, providing intentional spaces to reset, reflect, and thrive. Every detail is handled so you can focus on yourself.',
    'Based in Marrakech, Kech Travel Game provides premier private chauffeur services, tailor-made Morocco itineraries, and thrilling desert adventures. From executive airport pickups to 3-day Sahara expeditions in Merzouga, quad biking in Agafay, and trekking the High Atlas, we bring Morocco to life with comfort and authenticity.'
)

# Featured Section Header
idx = idx.replace(
    'data-animation="featured-head" class="h2 mobile-font-32">Featured Retreats',
    'data-animation="featured-head" class="h2 mobile-font-32">Featured Tours & Activities'
)

# Card 1: Merzouga Sahara
idx = idx.replace('Gura Humorului, Romania', 'Merzouga Sahara Desert Luxury Tour')
idx = idx.replace('Feb 15 - 21, 2026 (7 days, 6 nights)', '3 Days / 2 Nights (Private 4x4 & Camp)')
idx = idx.replace('12 guests', 'Private Group (1-6+)')
idx = idx.replace('Trusted by 190+ clients worldwide', 'Rated 5.0 ★ by 650+ Travelers')

# Card 2: High Atlas Mountains
idx = idx.replace('Province of Grosseto, Tuscany, Italy', 'High Atlas Mountains & 3 Valleys')
idx = idx.replace('Jan 15 - 21, 2026 (7 days, 6 nights)', 'Full Day Trip (8 Hours) with Lunch')
idx = idx.replace('6 guests', 'Private Chauffeur & Guide')
idx = idx.replace('Trusted by 125+ clients worldwide', 'Rated 5.0 ★ by 420+ Travelers')

# Card 3: Agafay Desert
idx = idx.replace('Morocco', 'Agafay Desert Sunset & Quad Adventure')
idx = idx.replace('March 06 - 20, 2026 (15 days, 14 nights)', 'Half Day & Dinner (45 min from Marrakech)')
idx = idx.replace('18 guests', 'Quad, Buggy & Camel Ride')
idx = idx.replace('Trusted by 312+ clients worldwide', 'Rated 5.0 ★ by 780+ Travelers')

# Card 4: Essaouira
idx = idx.replace('Marrakesh, Marrakesh-Safi, Morocco', 'Marrakech to Essaouira Coastal Tour')
idx = idx.replace('April 12 - 20, 2026 (8 days, 7 nights)', 'Full Day Trip (Historic Port & Beach)')
idx = idx.replace('Trusted by 412+ clients worldwide', 'Rated 5.0 ★ by 510+ Travelers')

# Card 5: Hot Air Balloon
idx = idx.replace('Oia, South Aegean, Greece', 'Hot Air Balloon Sunrise & Berber Breakfast')
idx = idx.replace('May 01 - 07, 2026 (7 days, 6 nights)', 'Early Morning (Palmeraie & Atlas Views)')
idx = idx.replace('Trusted by 90+ clients worldwide', 'Rated 5.0 ★ by 340+ Travelers')

# Card 6: 7-Day Imperial Cities
idx = idx.replace('Placencia, Stann Creek, Belize', '7-Day Grand Morocco & Desert Odyssey')
idx = idx.replace('June 10 - 16, 2026 (7 days, 6 nights)', '7 Days / 6 Nights (Casablanca to Marrakech)')
idx = idx.replace('Trusted by 150+ clients worldwide', 'Rated 5.0 ★ by 290+ Travelers')

# How it works section
idx = idx.replace('How Vita Works', 'How Kech Travel Game Works')
idx = idx.replace('Browse certified experts with verified <br/>credentials and guest testimonials.', 'Bespoke travel made simple, seamless, and luxurious from start to finish.')

idx = idx.replace('Tell us your </span>goals', 'Share your </span>wishes')
idx = idx.replace('Trusted by travelers looking for <br/>more than ordinary vacations.', 'Tell us your dates, group size, <br/>and dream destinations in Morocco.')

idx = idx.replace('Get curated</span> matches', 'Receive your</span> custom plan')
idx = idx.replace('We recommend retreats and <br/>stays that fit.', 'We craft a 100% tailor-made <br/>itinerary with transparent pricing.')

idx = idx.replace('Customize your</span> package', 'Travel with</span> private driver')
idx = idx.replace('Add transfers, spa, and <br/>extras in one checkout.', 'Enjoy modern luxury vehicles <br/>and professional local chauffeurs.')

idx = idx.replace('Travel &amp; track</span> progress', 'Enjoy authentic</span> Morocco')
idx = idx.replace('Use VITA Journal to reflect <br/>and rebook.', 'From hidden gems to VIP spots, <br/>we take care of everything.')

# Drivers / Practitioners Section
idx = idx.replace('Browse by practitioner', 'Meet Our Expert Drivers & Guides')
idx = idx.replace('Browse certified experts with verified credentials and guest testimonials.', 'Licensed professional drivers and knowledgeable local guides dedicated to your comfort.')

# Driver 1: Yassine
idx = idx.replace('Lauren Thompson', 'Yassine El Amrani')
idx = idx.replace('Yoga Couch', 'Senior Tour Organizer & Driver')
idx = idx.replace(
    'I work with yoga as a practical tool for improving mobility, balance, and body awareness. My sessions focus on breath, alignment, and calm strength, without pressure or competition. I support people who want to build a steady practice that fits real life and long-term wellbeing. <br/><br/>My approach is grounded, structured, and accessible for different experience levels.',
    'With over 12 years traversing every corner of Morocco, I specialize in bespoke private tours and Sahara desert expeditions. Fluent in English, French, and Spanish, I ensure your journey is safe, comfortable, and rich with authentic Moroccan culture.'
)
idx = idx.replace('USA', 'Marrakech')

# Driver 2: Omar
idx = idx.replace('Marcus Vance', 'Omar Benali')
idx = idx.replace('Body Coach', 'Sahara 4x4 & Desert Specialist')
idx = idx.replace('United Kingdom', 'Merzouga')
idx = idx.replace(
    'I teach functional movement and strength training designed to build a capable, resilient body for real-life demands. My coaching emphasizes proper biomechanics, gradual progression, and sustainable habits rather than quick fixes or extreme routines. <br/><br/>I work with people of all fitness levels who want to move with confidence, reduce injury risk, and maintain physical capability for the long haul.',
    'Born in the golden dunes of Merzouga, I have navigated the Sahara for more than a decade. I lead our off-road 4x4 desert crossings, luxury camp setups, and stargazing journeys with passion and warmth.'
)

# Driver 3: Karim
idx = idx.replace('Elena Rostova', 'Karim Mansouri')
idx = idx.replace('Breathwork Coach', 'High Atlas & Cultural Guide')
idx = idx.replace('Germany', 'Atlas / Imlil')
idx = idx.replace(
    'I facilitate conscious breathwork practices that help individuals regulate the nervous system, release stress, and access deeper emotional clarity. Through structured breathing patterns, I create a grounded and secure space for people to reconnect with themselves.<br/><br/>My sessions are accessible, evidence-informed, and tailored to support mental, emotional, and physical well-being.',
    'A native of the High Atlas Mountains, I guide travelers through breathtaking Berber valleys, Mount Toubkal trails, and traditional village experiences with deep respect for local heritage.'
)

# Driver 4: Mehdi
idx = idx.replace('David Kim', 'Mehdi Tazi')
idx = idx.replace('Mindfulness Coach', 'VIP Logistics & Custom Trips')
idx = idx.replace('Canada', 'Casablanca / Marrakech')
idx = idx.replace(
    'I help busy professionals integrate mindfulness into their everyday routines to reduce burnout and improve focus. My sessions focus on practical tools, quiet reflection, and mindful movement that can be applied in high-stress work and personal environments.<br/><br/>My approach is secular, practical, and grounded in modern behavioral psychology.',
    'I oversee our fleet logistics, VIP airport protocols, and customized luxury itineraries. From private Mercedes V-Class transfers to luxury riad bookings, I ensure every detail runs like clockwork.'
)

# Bottom CTA banner
idx = idx.replace('Ready for a reset?', 'Ready for your Moroccan Adventure?')
idx = idx.replace(
    'Find a retreat that aligns with what you need right now.',
    'Contact Kech Travel Game today for your personalized quote & custom itinerary.'
)
idx = idx.replace('Explore Retreats', 'Plan My Trip')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(idx)

print("Homepage index.html successfully tailored to Kech Travel Game!")

# 4. Update contacts.html
with open("contacts.html", "r", encoding="utf-8") as f:
    cnt = f.read()

cnt = re.sub(r'<title>.*?</title>', '<title>Contact Us - Kech Travel Game Morocco</title>', cnt)
cnt = cnt.replace('Get in touch', 'Plan Your Moroccan Journey')
cnt = cnt.replace(
    'Have a question about retreats or need help finding the right match? We’re here to assist.',
    'Looking for a private driver, customized tour, or desert activity? Send us a message and our team will get back to you within 2 hours.'
)
with open("contacts.html", "w", encoding="utf-8") as f:
    f.write(cnt)

print("contacts.html updated!")

# 5. Update coaches.html (Private Drivers & Guides)
with open("coaches.html", "r", encoding="utf-8") as f:
    coa = f.read()

coa = re.sub(r'<title>.*?</title>', '<title>Our Private Drivers & Guides - Kech Travel Game</title>', coa)
coa = coa.replace('Certified Coaches', 'Our Private Drivers & Guides')
coa = coa.replace('Explore our vetted coaches and find the guidance you need.', 'Professional, licensed, and multilingual chauffeurs and local guides committed to VIP service.')
coa = coa.replace('Lauren Thompson', 'Yassine El Amrani')
coa = coa.replace('Marcus Vance', 'Omar Benali')
coa = coa.replace('Elena Rostova', 'Karim Mansouri')
coa = coa.replace('David Kim', 'Mehdi Tazi')
coa = coa.replace('Yoga Couch', 'Senior Tour Organizer & Driver')
coa = coa.replace('Body Coach', 'Sahara 4x4 & Desert Specialist')
coa = coa.replace('Breathwork Coach', 'High Atlas & Cultural Guide')
coa = coa.replace('Mindfulness Coach', 'VIP Logistics & Custom Trips')

with open("coaches.html", "w", encoding="utf-8") as f:
    f.write(coa)

print("coaches.html updated!")

# 6. Update retreat.html (Tours & Trips)
with open("retreat.html", "r", encoding="utf-8") as f:
    ret = f.read()

ret = re.sub(r'<title>.*?</title>', '<title>Tours & Desert Experiences - Kech Travel Game</title>', ret)
ret = ret.replace('Explore Retreats', 'Explore Tours & Activities')
ret = ret.replace('Discover life-changing retreats curated for your journey.', 'Private chauffeur excursions, Sahara glamping, and customized trips across Morocco.')
with open("retreat.html", "w", encoding="utf-8") as f:
    f.write(ret)

print("retreat.html updated!")

print("=== Kech Travel Game customization finished successfully! ===")

