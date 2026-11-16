import re

print("=== Customizing Destination Section: Morocco Only ===")

with open("index.html", "r", encoding="utf-8") as f:
    c = f.read()

# 1. Update tag: Country -> Morocco
c = c.replace(
    '<div class="body-md">Country</div>',
    '<div class="body-md">Morocco</div>'
)

# 2. Update headline & description
c = c.replace(
    '<div data-animation="destination-h2" class="h2 mobile-font-size-36">Explore by Destination </div>',
    '<div data-animation="destination-h2" class="h2 mobile-font-size-36">Explore Morocco Destinations</div>'
)

old_desc_pattern = r'<div data-animation="destination-description" class="body-xl mobile-lg mobile-no-br">.*?</div>'
new_desc = '''<div data-animation="destination-description" class="body-xl mobile-lg mobile-no-br">Discover your next authentic Moroccan journey!<br/>From the vibrant Medina of Marrakech and Agafay Desert,<br/>to the High Atlas Mountains, Essaouira coast, and the golden dunes of Merzouga Sahara.</div>'''

c = re.sub(old_desc_pattern, new_desc, c, flags=re.DOTALL)

# 3. Update mobile destination items
c = c.replace('<div class="body-lg">Europe</div>', '<div class="body-lg">Marrakech &amp; Agafay Desert</div>')
c = c.replace('<div class="body-sm color-white-50">/ 289+ Retreats</div>', '<div class="body-sm color-white-50">/ Cultural Tours &amp; Quad Safari</div>')

c = c.replace('<div class="body-lg">Asia</div>', '<div class="body-lg">Sahara Desert Merzouga</div>')
c = c.replace('<div class="body-sm color-white-50">/ 90+ Retreats</div>', '<div class="body-sm color-white-50">/ 4x4 Expeditions &amp; Luxury Camp</div>')

c = c.replace('<div class="body-lg">America</div>', '<div class="body-lg">High Atlas &amp; Essaouira</div>')
c = c.replace('<div class="body-sm color-white-50">/ 180+ Retreats</div>', '<div class="body-sm color-white-50">/ Scenic Day Trips &amp; Atlantic Coast</div>')

# 4. Replace destination__dots SVG with Morocco-only pins & glowing pulses
old_svg_start = c.find('<svg class="destination__dots"')
old_svg_end = c.find('</svg>', old_svg_start) + len('</svg>')

morocco_svg = '''<svg class="destination__dots" width="1312" height="287" viewBox="0 0 1312 287" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="morocco_glow_lg" x="490" y="145" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur"/>
    </filter>
    <filter id="morocco_glow_sm" x="500" y="155" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur"/>
    </filter>
    <radialGradient id="grad_morocco_center" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(538 190) rotate(90) scale(40)">
      <stop stop-color="#FBA13A" stop-opacity="0.9"/>
      <stop offset="0.5" stop-color="#FBA13A" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#071418" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="grad_merzouga" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(554 202) rotate(90) scale(32)">
      <stop stop-color="#FBA13A" stop-opacity="0.85"/>
      <stop offset="0.6" stop-color="#FBA13A" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#071418" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Large Ambient Glow over Morocco -->
  <g opacity="0.4" filter="url(#morocco_glow_lg)">
    <circle cx="542" cy="192" r="32" fill="url(#grad_morocco_center)"/>
  </g>

  <!-- 1. Marrakech & Agafay Point -->
  <g opacity="0.3" filter="url(#morocco_glow_sm)">
    <circle cx="538" cy="190" r="24" fill="url(#grad_morocco_center)"/>
  </g>
  <circle cx="538" cy="190" r="5" fill="#FBA13A"/>
  <circle cx="538" cy="190" r="9" stroke="#FBA13A" stroke-width="1.5" opacity="0.6"/>

  <!-- 2. Merzouga Sahara Dunes Point -->
  <g opacity="0.3" filter="url(#morocco_glow_sm)">
    <circle cx="554" cy="202" r="22" fill="url(#grad_merzouga)"/>
  </g>
  <circle cx="554" cy="202" r="4.5" fill="#FBA13A"/>
  <circle cx="554" cy="202" r="8" stroke="#FBA13A" stroke-width="1.2" opacity="0.6"/>

  <!-- 3. High Atlas Mountains Point -->
  <circle cx="543" cy="196" r="3.5" fill="#FBA13A"/>
  <circle cx="543" cy="196" r="6.5" stroke="#FBA13A" stroke-width="1" opacity="0.5"/>

  <!-- 4. Essaouira Coast Point -->
  <circle cx="528" cy="191" r="3.5" fill="#FBA13A"/>
  <circle cx="528" cy="191" r="6" stroke="#FBA13A" stroke-width="1" opacity="0.5"/>

  <!-- 5. Fes / Cultural North Point -->
  <circle cx="546" cy="180" r="3.5" fill="#FBA13A"/>
  <circle cx="546" cy="180" r="6" stroke="#FBA13A" stroke-width="1" opacity="0.5"/>

  <!-- Destination Labels in Morocco -->
  <g font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="10" fill="#ffffff" opacity="0.95">
    <!-- Marrakech Pin Label -->
    <text x="475" y="185" text-anchor="end" fill="#FBA13A" font-weight="700" font-size="11">Marrakech &amp; Agafay</text>
    <line x1="479" y1="182" x2="532" y2="189" stroke="#FBA13A" stroke-width="0.8" opacity="0.6" stroke-dasharray="2 2"/>

    <!-- Sahara Merzouga Pin Label -->
    <text x="566" y="218" text-anchor="start" fill="#FBA13A" font-weight="700" font-size="11">Sahara Merzouga</text>
    <line x1="558" y1="205" x2="564" y2="214" stroke="#FBA13A" stroke-width="0.8" opacity="0.6" stroke-dasharray="2 2"/>
  </g>
</svg>'''

c = c[:old_svg_start] + morocco_svg + c[old_svg_end:]

with open("index.html", "w", encoding="utf-8") as f:
    f.write(c)

print("Updated index.html: Country -> Morocco only with Moroccan pins and labels!")

