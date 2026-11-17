"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

export const testimonials = [
  {
    tempId: 0,
    testimonial: "The most magical private desert expedition from Marrakech to Merzouga. Our private chauffeur Mohamed made our entire journey unforgettable!",
    by: "Sarah & Mark, London, UK",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 1,
    testimonial: "Traveling across the High Atlas with Kech Travel Game felt like an editorial magazine adventure. Five-star private comfort and 24/7 dedicated local support.",
    by: "Claire D., Paris, France",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 2,
    testimonial: "Unbelievable experience in Agafay desert under the starry sky. Our luxury chauffeur made everything effortless, safe, and deeply authentic.",
    by: "David & Elena, New York, USA",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 3,
    testimonial: "If I could give 10 stars, I would. From airport VIP reception to our private Sahara luxury camp, every detail was hand-crafted to perfection.",
    by: "Liam & Sophie, Sydney, Australia",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 4,
    testimonial: "The tailor-made itinerary was flawless. We discovered hidden gems in Fes and the Blue Pearl of Chefchaouen that standard tours never reach.",
    by: "Marco & Giulia, Milan, Italy",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 5,
    testimonial: "Bespoke Moroccan travel at its absolute finest. Honest local expertise, pristine private vehicles, and true heartfelt hospitality.",
    by: "Charlotte H., Toronto, Canada",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 6,
    testimonial: "Traveling with Kech Travel Game was the highlight of our year. Comfortable air-conditioned luxury van, incredible viewpoints, and royal treatment.",
    by: "Alexander K., Berlin, Germany",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 7,
    testimonial: "A seamless blend of luxury comfort and rich Moroccan culture. The best holiday we have ever experienced as a family with our kids.",
    by: "Rachel & Tom, Zurich, Switzerland",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 8,
    testimonial: "Every single transfer, desert safari, and cultural tour was executed with utmost precision. Top-tier private drivers in Morocco.",
    by: "Hassan & Amira, Dubai, UAE",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 9,
    testimonial: "An extraordinary journey through Morocco. The flexibility, warmth, and attention to detail from the Kech Travel Game team exceeded all expectations.",
    by: "Emma & Oliver, Stockholm, Sweden",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  }
];

const TESTIMONIAL_I18N: Record<string, { fr: string; ar: string; he: string }> = {
  "Sarah & Mark, London, UK": {
    fr: "L'expédition privée la plus magique de Marrakech à Merzouga. Notre chauffeur Mohamed a rendu notre séjour absolument inoubliable !",
    ar: "أروع رحلة صحراوية خاصة من مراكش إلى مرزوكة. سائقنا الخاص محمد جعل رحلتنا بأكملها تجربة لا تُنسى!",
    he: "משלחת המדבר הפרטית הקסומה ביותר ממרקש למרזוגה. הנהג הפרטי שלנו מוחמד הפך את המסע כולו לבלתי נשכח!"
  },
  "Claire D., Paris, France": {
    fr: "Traverser le Haut Atlas avec Kech Travel Game était digne d'un grand reportage. Confort 5 étoiles et conciergerie locale dévouée 24h/7.",
    ar: "السفر عبر جبال الأطلس الكبير مع Kech Travel Game كان مغامرة أشبه بمجلات السفر العالمية. راحة وفخامة 5 نجوم ودعم محلي مستمر 24/7.",
    he: "המסע ברחבי הרי האטלס הגבוה עם Kech Travel Game הרגיש כמו הרפתקה מתוך מגזין יוקרה. נוחות 5 כוכבים ושירות אישי 24/7."
  },
  "David & Elena, New York, USA": {
    fr: "Expérience incroyable dans le désert d'Agafay sous un ciel étoilé. Notre chauffeur a rendu chaque étape fluide, sûre et profondément authentique.",
    ar: "تجربة لا تُصدق في صحراء أكافاي تحت النجوم الساطعة. سائقنا الفاخر جعل كل شيء سلساً، آمناً وفي غاية الأصالة.",
    he: "חוויה יוצאת דופן במדבר אגאפאי תחת שמי כוכבים. הנהג הפרטי הפך את כל הטיול לפשוט, בטוח ואותנטי להפליא."
  },
  "Liam & Sophie, Sydney, Australia": {
    fr: "Si je pouvais mettre 10 étoiles, je le ferais. De l'accueil VIP à l'aéroport jusqu'au bivouac de luxe au Sahara, tout était parfait.",
    ar: "لو كان بإمكاني تقييمهم بـ 10 نجوم لفعلت. من الاستقبال الملكي في المطار إلى مخيم الصحراء الفاخر، كل التفاصيل كانت متقنة بعناية.",
    he: "אם הייתי יכול להעניק 10 כוכבים, הייתי עושה זאת. מקבלת הפנים החמה בשדה התעופה ועד למאהל היוקרה בסהרה, הכל היה מושלם."
  },
  "Marco & Giulia, Milan, Italy": {
    fr: "L'itinéraire sur mesure était parfait. Nous avons découvert des joyaux secrets à Fès et dans la Perle Bleue de Chefchaouen.",
    ar: "البرنامج المصمم حسب الطلب كان مثالياً. اكتشفنا جواهر خفية في فاس وشفشاون الجوهرة الزرقاء لا تصلها الجولات العادية.",
    he: "המסלול המותאם אישית היה מושלם. גילינו פנינים נסתרות בפאס ובפנינה הכחולה של שפשאוון שסיורים רגילים לא מגיעים אליהן."
  },
  "Charlotte H., Toronto, Canada": {
    fr: "Le voyage sur mesure au Maroc à son plus haut niveau. Expertise locale sincère, véhicules privés irréprochables et hospitalité chaleureuse.",
    ar: "السفر الفاخر المصمم خصيصاً في المغرب بأبهى صوره. خبرة محلية صادقة، مركبات خاصة فائقة النظافة، وضيافة مغربية أصيلة.",
    he: "טיול בהתאמה אישית במרוקו ברמה הגבוהה ביותר. מומחיות מקומית אמיתית, רכבים פרטיים מצוחצחים ואירוח מכל הלב."
  },
  "Alexander K., Berlin, Germany": {
    fr: "Voyager avec Kech Travel Game a été le temps fort de notre année. Van de luxe climatisé, panoramas grandioses et accueil royal.",
    ar: "كان السفر مع Kech Travel Game أجمل محطة في عامنا. سيارة فاخرة ومكيفة، إطلالات ساحرة، ومعاملة ملكية بكل المقاييس.",
    he: "הטיול עם Kech Travel Game היה שיא השנה שלנו. רכב פאר ממוזג ונוח, תצפיות עוצרות נשימה ויחס מלכותי."
  },
  "Rachel & Tom, Zurich, Switzerland": {
    fr: "Un équilibre parfait entre confort haut de gamme et richesse culturelle marocaine. Les plus belles vacances vécues en famille.",
    ar: "مزيج رائع بين الفخامة العصرية وثراء الثقافة المغربية. أفضل عطلة عائلية قضيناها على الإطلاق مع أطفالنا.",
    he: "שילוב מושלם בין נוחות יוקרתית לתרבות המרוקאית העשירה. החופשה הטובה ביותר שחווינו אי פעם כמשפחה עם הילדים."
  },
  "Hassan & Amira, Dubai, UAE": {
    fr: "Chaque transfert, safari dans le désert et visite culturelle a été exécuté avec une précision absolue. Les meilleurs chauffeurs privés du Maroc.",
    ar: "كل تنقل، سفاري صحراوي وجولة ثقافية تم تنفيذه بأعلى درجات الدقة والاحترافية. أفضل سائقين خاصين في المغرب بلا منازع.",
    he: "כל העברה, ספארי במדבר וסיור תרבותי בוצעו בדיוק מרבי. הנהגים הפרטיים הטובים ביותר במרוקו ללא תחרות."
  },
  "Emma & Oliver, Stockholm, Sweden": {
    fr: "Un périple extraordinaire à travers le Maroc. La flexibilité, la bienveillance et le sens du détail de l'équipe ont dépassé nos attentes.",
    ar: "رحلة استثنائية تفوق الوصف في المغرب. المرونة، حفاوة المعاملة والاهتمام الدقيق بكل التفاصيل من فريق Kech Travel Game فاق كل توقعاتنا.",
    he: "מסע יוצא דופן ברחבי מרוקו. הגמישות, החום האנושי ותשומת הלב לפרטים הקטנים מצד צוות Kech Travel Game עלו על כל הציפיות."
  }
};

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
  currentLang: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  currentLang
}) => {
  const isCenter = position === 0;
  const isRtl = currentLang === "ar" || currentLang === "he";
  const tr = TESTIMONIAL_I18N[testimonial.by];
  const quoteText = (currentLang !== "en" && tr && tr[currentLang as "fr" | "ar" | "he"]) || testimonial.testimonial;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "stagger-card select-none",
        isCenter ? "stagger-card--center" : "stagger-card--side"
      )}
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        cursor: "pointer",
        padding: cardSize > 300 ? "32px" : "24px",
        boxSizing: "border-box",
        borderWidth: "2px",
        borderStyle: "solid",
        transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease",
        userSelect: "none",
        zIndex: isCenter ? 25 : Math.max(0, 15 - Math.abs(position)),
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.45) * position}px)
          translateY(${isCenter ? -55 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 18px 40px rgba(12, 73, 66, 0.38), 0px 4px 0px 2px rgba(12, 73, 66, 0.2)"
          : "0px 6px 20px rgba(0, 0, 0, 0.06)"
      }}
    >
      <span
        style={{
          position: "absolute",
          display: "block",
          transformOrigin: "top right",
          transform: "rotate(45deg)",
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          backgroundColor: isCenter ? "rgba(251, 246, 240, 0.4)" : "rgba(12, 73, 66, 0.18)"
        }}
      />
      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "18px"
        }}
      >
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by.split(",")[0]}
          style={{
            width: cardSize > 300 ? "54px" : "44px",
            height: cardSize > 300 ? "54px" : "44px",
            borderRadius: "50%",
            objectFit: "cover",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: isCenter ? "#FBF6F0" : "#0C4942",
            flexShrink: 0
          }}
        />
        <div
          style={{
            color: "#F59E0B",
            fontSize: "15px",
            letterSpacing: "2px",
            display: "flex"
          }}
        >
          {"★★★★★"}
        </div>
      </div>

      <div
        className="stagger-quote"
        style={{
          fontSize: cardSize > 300 ? "17px" : "14px",
          fontWeight: 600,
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          letterSpacing: "normal",
          fontFamily: currentLang === "ar" ? "'Cairo', sans-serif" : currentLang === "he" ? "'Heebo', sans-serif" : "inherit"
        }}
      >
        "{quoteText}"
      </div>

      <div
        className="stagger-author"
        style={{
          position: "absolute",
          bottom: cardSize > 300 ? "24px" : "18px",
          left: cardSize > 300 ? "32px" : "24px",
          right: cardSize > 300 ? "32px" : "24px",
          fontSize: cardSize > 300 ? "14px" : "12px",
          fontStyle: "italic",
          fontWeight: 500
        }}
      >
        — {testimonial.by}
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(375);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [isPaused, setIsPaused] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>("en");
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleMove = useCallback((steps: number) => {
    setTestimonialsList((prevList) => {
      const newList = [...prevList];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prevList;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prevList;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  // Auto-play (advance automatically every 4.5s smoothly)
  useEffect(() => {
    if (isPaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleMove(1);
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, handleMove]);

  // Handle manual interaction reset
  const handleManualMove = (steps: number) => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    handleMove(steps);
    // Restart interval if not paused
    if (!isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        handleMove(1);
      }, 4500);
    }
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 375 : 295);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="stagger-testimonials-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        overflow: "hidden"
      }}
    >
      <style>{`
        .stagger-card--center {
          background-color: #0C4942 !important;
          color: #FBF6F0 !important;
          border-color: #0C4942 !important;
        }
        .stagger-card--center .stagger-quote {
          color: #FBF6F0 !important;
        }
        .stagger-card--center .stagger-author {
          color: rgba(251, 246, 240, 0.9) !important;
        }
        .stagger-card--side {
          background-color: #FFFFFF !important;
          color: #0C4942 !important;
          border-color: rgba(12, 73, 66, 0.18) !important;
        }
        .stagger-card--side .stagger-quote {
          color: #0C4942 !important;
        }
        .stagger-card--side .stagger-author {
          color: rgba(12, 73, 66, 0.72) !important;
        }
        .stagger-card--side:hover {
          border-color: rgba(12, 73, 66, 0.5) !important;
        }
        .stagger-nav-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 2px solid #0C4942;
          color: #0C4942;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(12, 73, 66, 0.15);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .stagger-nav-btn:hover {
          background-color: #0C4942;
          color: #FFFFFF;
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(12, 73, 66, 0.25);
        }
        .stagger-nav-btn:active {
          transform: scale(0.96);
        }
      `}</style>

      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleManualMove}
            position={position}
            cardSize={cardSize}
            currentLang={currentLang}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "16px",
          zIndex: 35
        }}
      >
        <button
          onClick={() => handleManualMove(-1)}
          className="stagger-nav-btn"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleManualMove(1)}
          className="stagger-nav-btn"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default StaggerTestimonials;
