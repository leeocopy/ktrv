import * as React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import RidgelineDitherFooter from "./ridgeline-dither-footer";

const FOOTER_COPY = {
  en: {
    tagline: "Private drivers, Sahara desert expeditions & tailor-made luxury journeys across the Kingdom of Morocco.",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Tours & Trips", href: "index.html#retreats" },
          { label: "Best Trips", href: "best-trips.html", badge: "Top" },
          { label: "Contact Us", href: "contacts.html" }
        ]
      },
      {
        title: "Contact",
        links: [
          { label: "+212 626-252231", href: "tel:+212626252231" },
          { label: "WhatsApp", href: "https://wa.me/212626252231" },
          { label: "monadilmohamed60@gmail.com", href: "mailto:monadilmohamed60@gmail.com" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "privacy-policy.html" },
          { label: "Terms & Conditions", href: "terms-and-conditions.html" }
        ]
      }
    ],
    copyright: "© 2026 Kech Travel Game. All rights reserved."
  },
  fr: {
    tagline: "Chauffeurs privés VIP, expéditions dans le désert du Sahara et circuits sur mesure à travers le Royaume du Maroc.",
    columns: [
      {
        title: "Explorer",
        links: [
          { label: "Circuits & Voyages", href: "index.html#retreats" },
          { label: "Meilleurs Voyages", href: "best-trips.html", badge: "Top" },
          { label: "Contactez-nous", href: "contacts.html" }
        ]
      },
      {
        title: "Contact",
        links: [
          { label: "+212 626-252231", href: "tel:+212626252231" },
          { label: "WhatsApp", href: "https://wa.me/212626252231" },
          { label: "monadilmohamed60@gmail.com", href: "mailto:monadilmohamed60@gmail.com" }
        ]
      },
      {
        title: "Légal",
        links: [
          { label: "Politique de Confidentialité", href: "privacy-policy.html" },
          { label: "Conditions Générales", href: "terms-and-conditions.html" }
        ]
      }
    ],
    copyright: "© 2026 Kech Travel Game. Tous droits réservés."
  },
  ar: {
    tagline: "سائقون خاصون، رحلات استكشافية في الصحراء وجولات سياحية فاخرة مصممة على المقاس في المملكة المغربية.",
    columns: [
      {
        title: "استكشف",
        links: [
          { label: "الجولات والرحلات", href: "index.html#retreats" },
          { label: "أفضل الرحلات", href: "best-trips.html", badge: "مختارة" },
          { label: "تواصل معنا", href: "contacts.html" }
        ]
      },
      {
        title: "التواصل",
        links: [
          { label: "+212 626-252231", href: "tel:+212626252231" },
          { label: "واتساب", href: "https://wa.me/212626252231" },
          { label: "monadilmohamed60@gmail.com", href: "mailto:monadilmohamed60@gmail.com" }
        ]
      },
      {
        title: "قانوني",
        links: [
          { label: "سياسة الخصوصية", href: "privacy-policy.html" },
          { label: "الشروط والأحكام", href: "terms-and-conditions.html" }
        ]
      }
    ],
    copyright: "© 2026 Kech Travel Game. جميع الحقوق محفوظة."
  },
  he: {
    tagline: "נהגים פרטיים, מסעות ספארי במדבר וסיורים יוקרתיים בהתאמה אישית ברחבי ממלכת מרוקו.",
    columns: [
      {
        title: "גלו עוד",
        links: [
          { label: "סיורים וטיולים", href: "index.html#retreats" },
          { label: "הטיולים המומלצים", href: "best-trips.html", badge: "מובחר" },
          { label: "צור קשר", href: "contacts.html" }
        ]
      },
      {
        title: "יצירת קשר",
        links: [
          { label: "+212 626-252231", href: "tel:+212626252231" },
          { label: "וואטסאפ", href: "https://wa.me/212626252231" },
          { label: "monadilmohamed60@gmail.com", href: "mailto:monadilmohamed60@gmail.com" }
        ]
      },
      {
        title: "משפטי",
        links: [
          { label: "מדיניות פרטיות", href: "privacy-policy.html" },
          { label: "תנאי שימוש", href: "terms-and-conditions.html" }
        ]
      }
    ],
    copyright: "© 2026 Kech Travel Game. כל הזכויות שמורות."
  }
};

function FooterApp() {
  const [currentLang, setCurrentLang] = useState<string>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentLang(localStorage.getItem("kechtg_lang") || "en");
    const onLang = (e: Event) => {
      setCurrentLang((e as CustomEvent).detail || localStorage.getItem("kechtg_lang") || "en");
    };
    window.addEventListener("kechtg:lang", onLang);
    return () => window.removeEventListener("kechtg:lang", onLang);
  }, []);

  const lang = (["en", "fr", "ar", "he"].includes(currentLang) ? currentLang : "en") as "en" | "fr" | "ar" | "he";
  const isRtl = lang === "ar" || lang === "he";
  const copy = FOOTER_COPY[lang];

  return (
    <RidgelineDitherFooter
      className="notranslate"
      dir={isRtl ? "rtl" : "ltr"}
      preset="evergreen"
      palette={{
        paper: "#FBF6F0",
        ink: "#0C4942",
        muted: "#4F6F69",
        line: "#DCE5E0",
        heart: "#E09E52",
        tones: ["#FBF6F0", "#DFECE6", "#A7CFC2", "#62A18D", "#256C5C", "#0C4942", "#062925"]
      }}
      seed={19}
      ridges={6}
      name="Kech Travel Game"
      logo={null}
      brandHref="index.html"
      tagline={copy.tagline}
      columns={copy.columns}
      socials={[
        { icon: "instagram", href: "https://www.instagram.com/mohamedmonadil", label: "Instagram" }
      ]}
      copyright={copy.copyright}
      credit={{ label: "Kech Travel Game", href: "contacts.html" }}
      fontFamily={lang === "ar" ? "'Cairo', sans-serif" : lang === "he" ? "'Heebo', sans-serif" : "inherit"}
      maxWidth="100%"
      height="620px"
      sceneMinHeight="260px"
    />
  );
}

function init() {
  const rootEl = document.getElementById("ridgeline-footer-root");
  if (!rootEl) return;
  try {
    const root = createRoot(rootEl);
    root.render(React.createElement(FooterApp));
  } catch (err) {
    console.error("Footer mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
