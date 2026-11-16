import re

print("=== Applying Light Theme: Background #FBF6F0 & Text #0C4942 ===")

# 1. Update shared CSS
with open("assets/css/vita-travel.webflow.shared.2a18ea1ba.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace :root color definitions
old_root_pattern = r':root\s*\{[^}]+\}'
new_root = ''':root {
  --white-100: #0C4942;
  --brand-accent: #fb9826;
  --button-clicked: #fa8805;
  --brand-green: #0C4942;
  --white-40: rgba(12, 73, 66, 0.45);
  --white-10: rgba(12, 73, 66, 0.12);
  --white-50: rgba(12, 73, 66, 0.60);
  --white-60: rgba(12, 73, 66, 0.72);
  --white-20: rgba(12, 73, 66, 0.18);
  --icon-grey-40: #0C4942;
  --bg-sand: #FBF6F0;
  --bg-sand-warm: #F4ECE1;
  --text-emerald: #0C4942;
}'''

css = re.sub(old_root_pattern, new_root, css, count=1)

# Replace dark green backgrounds with light sand #FBF6F0
css = css.replace('#091b20', '#FBF6F0')
css = css.replace('#0a1e24', '#F4ECE1')

with open("assets/css/vita-travel.webflow.shared.2a18ea1ba.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated shared Webflow CSS variables and background colors!")

# 2. Add comprehensive theme overrides in app.min.css / index.html embed
theme_overrides = '''
/* === KECH TRAVEL GAME: LUXURY MOROCCAN THEME (#FBF6F0 & #0C4942) === */

body, .body, html {
  background-color: #FBF6F0 !important;
  color: #0C4942 !important;
}

/* Headings & Text */
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6,
.body-xxl, .body-xl, .body-lg, .body-md, .body-sm,
.button-sm {
  color: #0C4942 !important;
}

.color-white {
  color: #0C4942 !important;
}

.color-white-80, .color-white-60, .color-white-50, .color-white-40 {
  color: rgba(12, 73, 66, 0.72) !important;
}

/* Header */
.header {
  background-color: rgba(251, 246, 240, 0.92) !important;
  border-bottom: 1px solid rgba(12, 73, 66, 0.12) !important;
  backdrop-filter: blur(14px) !important;
}

.header-logo__title, .footer-logo__title {
  color: #0C4942 !important;
}

.header-logo__icon path, .footer-logo__icon path {
  fill: #0C4942 !important;
}

.header-nav__link {
  color: #0C4942 !important;
}

.header-nav__link:hover {
  color: var(--brand-accent) !important;
}

.btn-burger__line {
  background-color: #0C4942 !important;
}

.header__dec {
  background-color: rgba(12, 73, 66, 0.12) !important;
}

.footer__dec, .footer__copy-dec, .combine__dec {
  background-color: rgba(12, 73, 66, 0.12) !important;
}

/* Buttons */
.btn-primary {
  background-color: #0C4942 !important;
  border: 1px solid #0C4942 !important;
  color: #FBF6F0 !important;
  transition: all 0.25s ease !important;
}

.btn-primary .button-sm,
.btn-primary .color-brand-green {
  color: #FBF6F0 !important;
}

.btn-primary .btn-icon svg path {
  fill: #FBF6F0 !important;
}

.btn-primary:hover {
  background-color: #126359 !important;
  border-color: #126359 !important;
  box-shadow: 0 4px 16px rgba(12, 73, 66, 0.25) !important;
}

.btn-secondary {
  background-color: transparent !important;
  border: 1px solid #0C4942 !important;
  color: #0C4942 !important;
}

.btn-secondary .button-sm {
  color: #0C4942 !important;
}

.btn-secondary .btn-icon svg path {
  fill: #0C4942 !important;
}

.btn-secondary:hover {
  background-color: rgba(12, 73, 66, 0.08) !important;
}

/* Hero Section Override (Photo Background requires light text) */
.hero-main-title {
  color: #FBF6F0 !important;
  text-shadow: 0 4px 28px rgba(0, 0, 0, 0.7) !important;
}

.hero-main-subtitle {
  color: rgba(251, 246, 240, 0.95) !important;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.7) !important;
}

.intro.hero-single .btn-primary {
  background-color: #FBF6F0 !important;
  border-color: #FBF6F0 !important;
}

.intro.hero-single .btn-primary .button-sm,
.intro.hero-single .btn-primary .color-brand-green {
  color: #0C4942 !important;
}

.intro.hero-single .btn-primary .btn-icon svg path {
  fill: #0C4942 !important;
}

.intro.hero-single .btn-primary:hover {
  background-color: #FFFFFF !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
}

/* Sections Backgrounds */
.statistic-section, .about-section, .featured-section, .how-works-section, .practitioners-section {
  background-color: #FBF6F0 !important;
}

/* Cards & Dividers */
.how-works-item {
  background-color: #FFFFFF !important;
  border: 1px solid rgba(12, 73, 66, 0.12) !important;
  box-shadow: 0 4px 20px rgba(12, 73, 66, 0.04) !important;
  border-radius: 8px !important;
}

.how-works-item__count {
  color: #0C4942 !important;
  opacity: 0.3 !important;
}

.coaches-person-info {
  background-color: rgba(251, 246, 240, 0.96) !important;
  border: 1px solid rgba(12, 73, 66, 0.15) !important;
}

.coaches-person:nth-child(11), .coaches-person:nth-child(2), .coaches-person:nth-child(5), .coaches-person:nth-child(8) {
  border-left-color: rgba(12, 73, 66, 0.12) !important;
  border-right-color: rgba(12, 73, 66, 0.12) !important;
}

.featured-item {
  border-top: 1px solid rgba(12, 73, 66, 0.12) !important;
}

.featured-item-property__title {
  color: #0C4942 !important;
}

/* Footer */
.footer {
  background-color: #F4ECE1 !important;
  border-top: 1px solid rgba(12, 73, 66, 0.12) !important;
}

.footer-top__link a, .footer-top__contact a {
  color: #0C4942 !important;
}

.footer-bottom__link a {
  color: rgba(12, 73, 66, 0.7) !important;
}

.footer-made-by {
  color: rgba(12, 73, 66, 0.7) !important;
}

/* Destination Map Section Container */
.destination {
  background-color: #071418 !important;
  border-radius: 12px !important;
  margin: 2rem 0 !important;
}

.destination .h2, .destination .body-md, .destination .body-xl {
  color: #FBF6F0 !important;
}

/* Cookie banner */
.cookie {
  background-color: #FBF6F0 !important;
  border-color: rgba(12, 73, 66, 0.15) !important;
  color: #0C4942 !important;
  box-shadow: 0 -4px 30px rgba(12, 73, 66, 0.08) !important;
}

.cookie .body-md-regular, .cookie a {
  color: #0C4942 !important;
}

/* Form Inputs */
.inp-group__input, .inp-group__textarea {
  color: #0C4942 !important;
  border-bottom-color: rgba(12, 73, 66, 0.25) !important;
}

.inp-group__input:focus, .inp-group__textarea:focus {
  border-bottom-color: #0C4942 !important;
}

.inp-group__input.placeholder, .inp-group__textarea.placeholder {
  color: rgba(12, 73, 66, 0.4) !important;
}
'''

# Append to app.min.css
with open("assets/css/app.min.css", "a", encoding="utf-8") as f:
    f.write("\n" + theme_overrides)

print("Appended luxury theme overrides to assets/css/app.min.css!")

# Also add into index.html <style> so it is active immediately with highest specificity
with open("index.html", "r", encoding="utf-8") as f:
    idx = f.read()

style_end = idx.find('</style>')
if style_end != -1:
    idx = idx[:style_end] + "\n" + theme_overrides + "\n" + idx[style_end:]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(idx)
    print("Injected theme overrides directly into index.html embed style!")

print("=== Theme migration completed successfully! ===")

