"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: { en: string; fr: string; ar: string; he: string };
  answer: { en: string; fr: string; ar: string; he: string };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "item-1",
    question: {
      en: "How do I book a private tour or custom itinerary in Morocco?",
      fr: "Comment réserver un circuit privé ou un itinéraire sur mesure au Maroc ?",
      ar: "كيف يمكنني حجز جولة خاصة أو برنامج سياحي مخصص في المغرب؟",
      he: "איך ניתן להזמין סיור פרטי או מסלול מותאם אישית במרוקו?"
    },
    answer: {
      en: "Simply send us your travel dates, group size, and preferred destinations via our Contact page or WhatsApp. Within a few hours, our local Marrakech concierge team will craft a 100% tailor-made itinerary and transparent quote.",
      fr: "Envoyez-nous simplement vos dates, le nombre de voyageurs et vos envies via notre page Contact ou WhatsApp. En quelques heures, notre équipe locale à Marrakech vous prépare un itinéraire 100% sur mesure avec un devis clair.",
      ar: "ببساطة أرسل لنا تواريخ سفرك، عدد الأفراد والوجهات التي تفضلها عبر صفحة التواصل أو الواتساب. خلال ساعات قليلة سيقوم فريقنا المحلي في مراكش بإعداد برنامج مصمم 100% على مقاسك مع عرض سعر واضح وشفاف.",
      he: "פשוט שלחו לנו את תאריכי הטיול, מספר הנוסעים והיעדים המועדפים עליכם דרך עמוד צור קשר או בוואטסאפ. תוך שעות ספורות הצוות המקומי שלנו במרקש יבנה עבורכם מסלול אישי והצעת מחיר שקופה."
    }
  },
  {
    id: "item-2",
    question: {
      en: "What vehicles and drivers do you provide?",
      fr: "Quels véhicules et chauffeurs proposez-vous ?",
      ar: "ما نوع المركبات والسائقين المتوفرين لديكم؟",
      he: "אילו רכבים ונהגים אתם מספקים?"
    },
    answer: {
      en: "We operate a modern, air-conditioned VIP fleet including Mercedes V-Class vans, luxury 4x4 SUVs, and spacious tourist minibuses. All journeys are led by licensed, multilingual Moroccan chauffeurs with deep local knowledge.",
      fr: "Nous disposons d'une flotte VIP récente et climatisée : vans Mercedes Classe V, 4x4 de luxe et minibus spacieux. Tous nos trajets sont assurés par des chauffeurs marocains agréés, multilingues et expérimentés.",
      ar: "نوفر أسطولاً حديثاً ومكيفاً من سيارات VIP تشمل مرسيدس V-Class، سيارات دفع رباعي فاخرة 4x4، وحافلات سياحية مريحة. جميع الرحلات يقودها سائقون مغاربة مرخصون يتحدثون عدة لغات ولديهم خبرة واسعة.",
      he: "אנו מפעילים צי רכבי VIP חדיש וממוזג הכולל רכבי מרצדס V-Class, ג'יפי 4x4 יוקרתיים ומיניבוסים מרווחים. כל הנסיעות מלוות בנהגים מרוקאים מוסמכים, אדיבים ודוברי שפות."
    }
  },
  {
    id: "item-3",
    question: {
      en: "Why are prices tailored on request instead of fixed?",
      fr: "Pourquoi les tarifs sont-ils établis sur devis plutôt que fixes ?",
      ar: "لماذا يتم تحديد الأسعار عند التواصل بدلاً من أسعار ثابتة؟",
      he: "מדוע המחירים נקבעים בהתאמה אישית ולא כמחיר קבוע?"
    },
    answer: {
      en: "Every journey is crafted around your group size, season, vehicle choice, and preferred accommodation tier — from boutique riads to ultra-luxury Sahara camps — ensuring you only pay for exactly what you want.",
      fr: "Chaque voyage est adapté à la taille de votre groupe, à la saison, au véhicule choisi et au niveau d'hébergement (riads de charme ou bivouacs grand luxe), afin que vous ne payiez que ce qui correspond vraiment à vos attentes.",
      ar: "كل رحلة تُصمم حسب عدد المسافرين، الموسم، نوع السيارة وفئة الإقامة المختارة (من الرياض التاريخية إلى مخيمات الصحراء الفاخرة)، مما يضمن لك سعراً عادلاً ومناسباً تماماً لاحتياجاتك.",
      he: "כל מסע נתפר לפי גודל הקבוצה, העונה, סוג הרכב ורמת הלינה המועדפת — מריאדים בוטיק ועד מאהלי יוקרה בסהרה — כך שתשלמו בדיוק עבור מה שמתאים לכם."
    }
  },
  {
    id: "item-4",
    question: {
      en: "Do you offer airport transfers and 24/7 support during the trip?",
      fr: "Proposez-vous les transferts aéroport et une assistance 24h/7 pendant le séjour ?",
      ar: "هل توفرون خدمة الاستقبال من المطار والدعم على مدار الساعة؟",
      he: "האם אתם מציעים העברות משדה התעופה ותמיכה 24/7 במהלך הטיול?"
    },
    answer: {
      en: "Yes. We provide VIP meet-and-greet transfers from Marrakech, Casablanca, Fes, Agadir, and Tangier airports, along with dedicated 24/7 WhatsApp concierge support from arrival until departure.",
      fr: "Oui. Nous assurons l'accueil VIP aux aéroports de Marrakech, Casablanca, Fès, Agadir et Tanger, ainsi qu'une conciergerie WhatsApp dédiée 24h/7 de votre arrivée jusqu'à votre vol retour.",
      ar: "نعم، نوفر خدمة الاستقبال الخاص VIP في مطارات مراكش، الدار البيضاء، فاس، أكادير وطنجة، مع دعم ومرافقة كونسيرج عبر الواتساب 24/7 من لحظة وصولكم حتى المغادرة.",
      he: "כן. אנו מספקים איסוף VIP משדות התעופה במרקש, קזבלנקה, פאס, אגאדיר וטנג'יר, בליווי שירות קונסיירג' אישי בוואטסאפ 24/7 מהנחיתה ועד ההמראה."
    }
  },
  {
    id: "item-5",
    question: {
      en: "Can we customize stops, desert activities, and meal preferences?",
      fr: "Pouvons-nous personnaliser les étapes, activités dans le désert et repas ?",
      ar: "هل يمكننا تعديل المحطات، أنشطة الصحراء أو تفضيلات الطعام؟",
      he: "האם אפשר להתאים עצירות בדרך, פעילויות מדבר והעדפות אוכל?"
    },
    answer: {
      en: "Absolutely. Since every tour is 100% private, you set the pace — add quad biking, hot air balloons, private photographers, or specific dietary requests (halal, kosher-friendly, vegetarian) anytime.",
      fr: "Tout à fait. Comme chaque circuit est 100% privé, vous décidez du rythme : ajoutez quad, montgolfière, photographe privé ou préférences alimentaires (végétarien, halal, sans gluten) à tout moment.",
      ar: "بكل تأكيد. لأن جميع جولاتنا خاصة 100%، أنتم من يحدد الإيقاع — يمكنكم إضافة ركوب الكواد، المنطاد، أو تفضيلات غذائية خاصة (نباتي، حلال، أو غيرها) بكل مرونة.",
      he: "בהחלט. מאחר שכל סיור הוא 100% פרטי, אתם קובעים את הקצב — ניתן להוסיף טרקטורונים, כדור פורח, צלם פרטי או התאמות קולינריות בכל שלב."
    }
  }
];

const UI_COPY = {
  en: {
    title: "FAQs",
    subtitle: "Everything you need to know about Kech Travel Game",
    helpPrefix: "Can’t find what you’re looking for? Reach out to our ",
    helpLink: "Kech Travel Game concierge team",
    helpSuffix: " for assistance."
  },
  fr: {
    title: "Questions Fréquentes",
    subtitle: "Tout ce que vous devez savoir sur Kech Travel Game",
    helpPrefix: "Vous ne trouvez pas votre réponse ? Contactez notre ",
    helpLink: "équipe de conciergerie Kech Travel Game",
    helpSuffix: " pour obtenir de l'aide."
  },
  ar: {
    title: "الأسئلة الشائعة",
    subtitle: "كل ما تحتاج معرفته حول خدمات Kech Travel Game",
    helpPrefix: "لم تجد إجابة لسؤالك؟ تواصل مع ",
    helpLink: "فريق الكونسيرج في Kech Travel Game",
    helpSuffix: " لمساعدتك فوراً."
  },
  he: {
    title: "שאלות נפוצות",
    subtitle: "כל מה שצריך לדעת על הסיורים של Kech Travel Game",
    helpPrefix: "לא מצאתם את מה שחיפשתם? פנו אל ",
    helpLink: "צוות הקונסיירג' של Kech Travel Game",
    helpSuffix: " ונשמח לעזור."
  }
};

export function BlurredStagger({
  text,
  isRtl
}: {
  text: string;
  isRtl: boolean;
}) {
  const words = text.split(" ");
  let charCounter = 0;

  return (
    <p
      className="faq-reveal-p"
      style={{
        fontSize: "1rem",
        lineHeight: 1.7,
        margin: 0,
        color: "rgba(12, 73, 66, 0.84)",
        whiteSpace: "normal",
        letterSpacing: "normal"
      }}
    >
      {words.map((word, wIdx) => {
        if (isRtl) {
          return (
            <span
              key={wIdx}
              className="faq-blur-token"
              style={{
                display: "inline-block",
                animationDelay: `${Math.min(wIdx * 28, 480)}ms`
              }}
            >
              {word}
              {wIdx < words.length - 1 ? "\u00A0" : ""}
            </span>
          );
        }
        return (
          <span key={wIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((ch, cIdx) => {
              const delay = Math.min(charCounter++ * 9, 480);
              return (
                <span
                  key={cIdx}
                  className="faq-blur-token"
                  style={{ display: "inline-block", animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
            {wIdx < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </p>
  );
}

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>("item-1");
  const [currentLang, setCurrentLang] = useState<string>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentLang(localStorage.getItem("kechtg_lang") || "en");
    const onLang = (e: Event) => {
      const code = (e as CustomEvent).detail || localStorage.getItem("kechtg_lang") || "en";
      setCurrentLang(code);
    };
    window.addEventListener("kechtg:lang", onLang);
    return () => window.removeEventListener("kechtg:lang", onLang);
  }, []);

  const lang = (["en", "fr", "ar", "he"].includes(currentLang) ? currentLang : "en") as "en" | "fr" | "ar" | "he";
  const isRtl = lang === "ar" || lang === "he";
  const copy = UI_COPY[lang];

  return (
    <section
      className="faqs-section padding-global notranslate"
      translate="no"
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        backgroundColor: "#FBF6F0",
        color: "#0C4942",
        paddingTop: "72px",
        paddingBottom: "92px",
        borderTop: "1px solid rgba(12, 73, 66, 0.08)",
        fontFamily: lang === "ar" ? "'Cairo', sans-serif" : lang === "he" ? "'Heebo', sans-serif" : "inherit"
      }}
    >
      <style>{`
        @keyframes faqBlurReveal {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(3px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
        .faq-blur-token {
          opacity: 0;
          animation: faqBlurReveal 0.32s ease forwards;
        }
        .faqs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 1080px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .faqs-grid {
            grid-template-columns: 2fr 3fr;
            gap: 48px;
          }
        }
        .faq-trigger-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          background: transparent;
          border: none;
          color: #0C4942;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          text-align: inherit;
          font-family: inherit;
          letter-spacing: normal;
        }
        .faq-trigger-btn:hover {
          opacity: 0.85;
        }
        .faq-help-desktop { display: none; }
        .faq-help-mobile { display: block; margin-top: 16px; }
        @media (min-width: 768px) {
          .faq-help-desktop { display: block; margin-top: 24px; }
          .faq-help-mobile { display: none; }
        }
      `}</style>

      <div className="container">
        <div className="faqs-grid">
          <div>
            <h2
              className="h2 mobile-font-size-36"
              style={{
                color: "#0C4942",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "normal"
              }}
            >
              {copy.title}
            </h2>
            <p
              style={{
                color: "rgba(12, 73, 66, 0.78)",
                marginTop: "14px",
                fontSize: "1.1rem",
                lineHeight: 1.5,
                letterSpacing: "normal"
              }}
            >
              {copy.subtitle}
            </p>
            <p
              className="faq-help-desktop"
              style={{
                color: "rgba(12, 73, 66, 0.72)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                letterSpacing: "normal"
              }}
            >
              {copy.helpPrefix}
              <a
                href="contacts.html"
                style={{
                  color: "#0C4942",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px"
                }}
              >
                {copy.helpLink}
              </a>
              {copy.helpSuffix}
            </p>
          </div>

          <div>
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    borderBottom: "1px solid rgba(12, 73, 66, 0.16)"
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="faq-trigger-btn"
                  >
                    <span>{item.question[lang]}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        flexShrink: 0,
                        transition: "transform 0.25s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ paddingBottom: "20px" }}>
                      <BlurredStagger key={`${item.id}-${lang}`} text={item.answer[lang]} isRtl={isRtl} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p
            className="faq-help-mobile"
            style={{
              color: "rgba(12, 73, 66, 0.72)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              letterSpacing: "normal"
            }}
          >
            {copy.helpPrefix}
            <a
              href="contacts.html"
              style={{
                color: "#0C4942",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px"
              }}
            >
              {copy.helpLink}
            </a>
            {copy.helpSuffix}
          </p>
        </div>
      </div>
    </section>
  );
}
