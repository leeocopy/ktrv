import re

print("=== Fixing How Kech Travel Game Works Section ===")

css_how_works = '''
/* === HOW KECH TRAVEL GAME WORKS - LUXURY CARDS === */
.how-works-section {
  background-color: #FBF6F0 !important;
}

.how-works {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 1.5rem !important;
}

@media (max-width: 991px) {
  .how-works {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 479px) {
  .how-works {
    grid-template-columns: 1fr !important;
  }
}

.how-works-item {
  background-color: #FFFFFF !important;
  border: 1.5px solid rgba(12, 73, 66, 0.14) !important;
  box-shadow: 0 6px 24px rgba(12, 73, 66, 0.05) !important;
  border-radius: 16px !important;
  padding: 2.25rem 1.75rem !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  min-height: 260px !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.how-works-item:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 12px 32px rgba(12, 73, 66, 0.1) !important;
  border-color: rgba(12, 73, 66, 0.28) !important;
}

.how-works-item__head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
  margin-bottom: 2.5rem !important;
}

.how-works-item__icon {
  width: 3.25rem !important;
  height: 3.25rem !important;
  padding: 0.65rem !important;
  background-color: rgba(12, 73, 66, 0.07) !important;
  border-radius: 12px !important;
  border: 1px solid rgba(12, 73, 66, 0.12) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.3s ease !important;
}

.how-works-item:hover .how-works-item__icon {
  background-color: rgba(12, 73, 66, 0.12) !important;
  border-color: rgba(12, 73, 66, 0.25) !important;
}

.how-works-item__count {
  font-size: 1rem !important;
  font-weight: 700 !important;
  color: #FB9826 !important;
  background-color: rgba(251, 152, 38, 0.12) !important;
  border: 1px solid rgba(251, 152, 38, 0.28) !important;
  padding: 0.25rem 0.65rem !important;
  border-radius: 20px !important;
  line-height: 1 !important;
  opacity: 1 !important;
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

# 1. Update app.min.css
with open("assets/css/app.min.css", "a", encoding="utf-8") as f:
    f.write("\n" + css_how_works)

# 2. Update index.html embedded style
with open("index.html", "r", encoding="utf-8") as f:
    idx = f.read()

style_end = idx.find('</style>')
if style_end != -1:
    idx = idx[:style_end] + "\n" + css_how_works + "\n" + idx[style_end:]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(idx)

print("How It Works luxury cards styling injected successfully!")

