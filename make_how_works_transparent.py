import re

print("=== Making How It Works Section Transparent & Minimal ===")

clean_how_works = '''
/* === HOW KECH TRAVEL GAME WORKS: TRANSPARENT & MINIMAL === */
.how-works-item {
  background-color: transparent !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-height: auto !important;
  transform: none !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  gap: 2rem !important;
}

.how-works-item:hover {
  transform: none !important;
  box-shadow: none !important;
  border: none !important;
}

.how-works-item__head {
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  width: 100% !important;
  margin-bottom: 0 !important;
}

.how-works-item__icon {
  width: 3.25rem !important;
  height: 3.25rem !important;
  padding: 0 !important;
  background-color: transparent !important;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  display: block !important;
  transition: transform 0.25s ease !important;
}

.how-works-item:hover .how-works-item__icon {
  background-color: transparent !important;
  background: transparent !important;
  border: none !important;
  transform: translateY(-3px) !important;
}

.how-works-item__count {
  display: none !important;
}

.how-works-item__body {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
}

.how-works-item__body .body-md {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #0C4942 !important;
  line-height: 1.3 !important;
}

.how-works-item__body .body-md.color-white-50 {
  font-size: 0.95rem !important;
  font-weight: 400 !important;
  color: rgba(12, 73, 66, 0.75) !important;
  line-height: 1.45 !important;
}
'''

# 1. Update assets/css/app.min.css
with open("assets/css/app.min.css", "a", encoding="utf-8") as f:
    f.write("\n" + clean_how_works)

# 2. Update index.html embed style
with open("index.html", "r", encoding="utf-8") as f:
    idx = f.read()

style_end = idx.find('</style>')
if style_end != -1:
    idx = idx[:style_end] + "\n" + clean_how_works + "\n" + idx[style_end:]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(idx)

# 3. Synchronize across all other html files
import glob
for fn in glob.glob("*.html"):
    if fn != "index.html":
        with open(fn, "r", encoding="utf-8") as f:
            content = f.read()
        s_end = content.find('</style>')
        if s_end != -1 and 'HOW KECH TRAVEL GAME WORKS: TRANSPARENT' not in content:
            content = content[:s_end] + "\n" + clean_how_works + "\n" + content[s_end:]
            with open(fn, "w", encoding="utf-8") as f:
                f.write(content)

print("Applied transparent minimalist styling across all pages!")

