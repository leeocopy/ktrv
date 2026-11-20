import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RadialScrollGallery } from "./portfolio-and-image-gallery";

interface ReelItem {
  id: number;
  title: string;
  cat: string;
  video: string;
  poster: string;
}

const reelsData: ReelItem[] = [
  {
    id: 1,
    title: "Sahara Camel Caravan",
    cat: "Merzouga",
    video: "videos/reel-1.mp4",
    poster: "photo/tour-camels-merzouga.jpg"
  },
  {
    id: 2,
    title: "Authentic Berber Moments",
    cat: "Culture",
    video: "videos/reel-2.mp4",
    poster: "photo/tour-traditional-gate.jpg"
  },
  {
    id: 3,
    title: "Agafay Sunset & Safari",
    cat: "Adventure",
    video: "videos/reel-3.mp4",
    poster: "photo/zakariae-daoui-I2YeucCFOmw-unsplash.jpg"
  },
  {
    id: 4,
    title: "VIP Mercedes Private Tour",
    cat: "Private Tour",
    video: "videos/reel-4.mp4",
    poster: "photo/tour-minibus-group.jpg"
  },
  {
    id: 5,
    title: "Live Moroccan Expedition",
    cat: "VIP Chauffeur",
    video: "videos/reel-5.mp4",
    poster: "photo/tour-airport-welcome.jpg"
  },
  {
    id: 6,
    title: "Essaouira & Coastal Retreat",
    cat: "Essaouira",
    video: "videos/reel-6.mp4",
    poster: "photo/tour-argan-goats-essaouira.jpg"
  },
  {
    id: 7,
    title: "Atlas Mountains & Ourika",
    cat: "Atlas",
    video: "videos/reel-7.mp4",
    poster: "photo/andri-klopfenstein-zGEkvID6vz8-unsplash.jpg"
  },
  {
    id: 8,
    title: "Kasbah Terrace Feast",
    cat: "Gastronomy",
    video: "videos/reel-8.mp4",
    poster: "photo/tour-terrace-lunch.jpg"
  },
  {
    id: 9,
    title: "Golden Dunes Sunrise",
    cat: "Sahara",
    video: "videos/reel-9.mp4",
    poster: "photo/sergey-pesterev-9-5-WYEBDz0-unsplash.jpg"
  },
  {
    id: 10,
    title: "Marrakech Medina Magic",
    cat: "Marrakech",
    video: "videos/reel-10.mp4",
    poster: "photo/calin-stan-7a_PHX91su8-unsplash.jpg"
  },
  {
    id: 11,
    title: "Dades & Todra Gorges",
    cat: "Canyons",
    video: "videos/reel-11.mp4",
    poster: "photo/abdou-faiz-06hnE4eKNAU-unsplash.jpg"
  },
  {
    id: 12,
    title: "Desert Camp Under the Stars",
    cat: "Luxury Camp",
    video: "videos/reel-12.mp4",
    poster: "photo/mehdi-el-marouazi-xhzPAomSpwg-unsplash.jpg"
  },
  {
    id: 13,
    title: "Imperial Cities Heritage",
    cat: "Fes & Meknes",
    video: "videos/reel-13.mp4",
    poster: "photo/sour-moha-5t2SP3vQz28-unsplash.jpg"
  },
  {
    id: 14,
    title: "High Atlas Scenic Road",
    cat: "Road Trip",
    video: "videos/reel-14.mp4",
    poster: "photo/tour-airport-arrival.jpg"
  },
  {
    id: 15,
    title: "Chefchaouen Blue Alleys",
    cat: "Blue Pearl",
    video: "videos/reel-15.mp4",
    poster: "photo/tour-traditional-gate.jpg"
  },
  {
    id: 16,
    title: "Nomad Hospitality & Tea",
    cat: "Tradition",
    video: "videos/reel-16.mp4",
    poster: "photo/tour-terrace-lunch.jpg"
  },
  {
    id: 17,
    title: "Bespoke Morocco Memories",
    cat: "Tailor-Made",
    video: "videos/reel-17.mp4",
    poster: "photo/tour-camels-merzouga.jpg"
  }
];

const REELS_I18N: Record<number, { title: Record<string, string>; cat: Record<string, string> }> = {
  1: {
    title: { fr: "Caravane au Sahara", ar: "قافلة جمال الصحراء", he: "שיירת גמלים בסהרה" },
    cat: { fr: "Merzouga", ar: "مرزوكة", he: "מרזוגה" }
  },
  2: {
    title: { fr: "Instants Berbères Authentiques", ar: "لحظات بربرية أصيلة", he: "רגעים ברבריים אותנטיים" },
    cat: { fr: "Culture", ar: "تراث وثقافة", he: "תרבות" }
  },
  3: {
    title: { fr: "Coucher de Soleil à Agafay", ar: "غروب الشمس وسفاري أكافاي", he: "שקיעה וספארי באגאפאי" },
    cat: { fr: "Aventure", ar: "مغامرة", he: "הרפתקה" }
  },
  4: {
    title: { fr: "Circuit Privé Mercedes VIP", ar: "جولة VIP بمركبات مرسيدس", he: "סיור VIP ברכבי מרצדס" },
    cat: { fr: "Circuit Privé", ar: "جولة خاصة", he: "סיור פרטי" }
  },
  5: {
    title: { fr: "Expédition Marocaine en Direct", ar: "استكشاف المغرب مباشرة", he: "משלחת חיה ברחבי מרוקו" },
    cat: { fr: "Chauffeur VIP", ar: "سائق خاص", he: "נהג VIP" }
  },
  6: {
    title: { fr: "Essaouira & Côte Atlantique", ar: "الصويرة والساحل الأطلسي", he: "אסוואירה וחוף האוקיינוס" },
    cat: { fr: "Essaouira", ar: "الصويرة", he: "אסוואירה" }
  },
  7: {
    title: { fr: "Haut Atlas & Vallée de l'Ourika", ar: "جبال الأطلس ووادي أوريكا", he: "הרי האטלס ועמק אוריקה" },
    cat: { fr: "Atlas", ar: "الأطلس", he: "האטלס" }
  },
  8: {
    title: { fr: "Délices sur Terrasse de Kasbah", ar: "مأدبة مغربية على شرفة القصبة", he: "סעודת מלכים במרפסת הקסבה" },
    cat: { fr: "Gastronomie", ar: "ضيافة ومأكولات", he: "קולינריה" }
  },
  9: {
    title: { fr: "Lever de Soleil sur les Dunes", ar: "شروق الشمس فوق الكثبان الذهبية", he: "זריחה מעל דיונות הזהב" },
    cat: { fr: "Sahara", ar: "الصحراء", he: "סהרה" }
  },
  10: {
    title: { fr: "Magie de la Médina de Marrakech", ar: "سحر المدينة العتيقة بمراكش", he: "קסם המדינה של מרקש" },
    cat: { fr: "Marrakech", ar: "مراكش", he: "מרקש" }
  },
  11: {
    title: { fr: "Gorges du Dadès & Todra", ar: "مضايق دادس وتودغا الساحرة", he: "קניוני דאדס וטודרה" },
    cat: { fr: "Canyons", ar: "مضايق", he: "קניונים" }
  },
  12: {
    title: { fr: "Bivouac de Luxe sous les Étoiles", ar: "مخيم صحراوي فاخر تحت النجوم", he: "מאהל יוקרה תחת הכוכבים" },
    cat: { fr: "Bivouac Luxe", ar: "مخيم فاخر", he: "מאהל יוקרה" }
  },
  13: {
    title: { fr: "Trésors des Villes Impériales", ar: "تراث المدن الإمبراطورية", he: "מורשת ערי המלוכה" },
    cat: { fr: "Fès & Meknès", ar: "فاس ومكناس", he: "פאס ומקנס" }
  },
  14: {
    title: { fr: "Routes Panoramiques du Haut Atlas", ar: "طرق جبال الأطلس البانورامية", he: "כבישי הנוף של האטלס" },
    cat: { fr: "Road Trip", ar: "رحلة طريق", he: "רוד טריפ" }
  },
  15: {
    title: { fr: "Ruelles Bleues de Chefchaouen", ar: "أزقة شفشاون الزرقاء الساحرة", he: "הסמטאות הכחולות של שפשאוון" },
    cat: { fr: "Perle Bleue", ar: "الجوهرة الزرقاء", he: "הפנינה הכחולה" }
  },
  16: {
    title: { fr: "Hospitalité Nomade & Thé à la Menthe", ar: "ضيافة الصحراء والشاي المغربي", he: "אירוח נוודי ותה נענע" },
    cat: { fr: "Tradition", ar: "أصالة", he: "מסורת" }
  },
  17: {
    title: { fr: "Souvenirs Sur Mesure au Maroc", ar: "ذكريات مغربية مصممة حسب الطلب", he: "זיכרונות מרוקו בהתאמה אישית" },
    cat: { fr: "Sur Mesure", ar: "حسب الطلب", he: "בהתאמה אישית" }
  }
};

function ReelCard({
  reel,
  isActive,
  onOpenModal,
  currentLang
}: {
  reel: ReelItem;
  isActive: boolean;
  onOpenModal: (r: ReelItem) => void;
  currentLang: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tr = REELS_I18N[reel.id];
  const catText = (currentLang !== "en" && tr?.cat[currentLang]) || reel.cat;
  const titleText = (currentLang !== "en" && tr?.title[currentLang]) || reel.title;
  const isRtl = currentLang === "ar" || currentLang === "he";

  // Play video only when visible in/near viewport to keep page fast & lightweight
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;

    if (typeof IntersectionObserver === "undefined") {
      v.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (v.preload === "none") v.preload = "metadata";
          const p = v.play();
          if (p !== undefined) p.catch(() => {});
        } else {
          if (!v.paused) v.pause();
        }
      },
      { rootMargin: "250px 0px" }
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onOpenModal(reel);
      }}
      style={{
        position: "relative",
        width: "clamp(240px, 20vw, 300px)",
        height: "clamp(370px, 32vw, 470px)",
        borderRadius: "24px",
        overflow: "hidden",
        backgroundColor: "#0C4942",
        border: isActive ? "2px solid #E09E52" : "1px solid rgba(12, 73, 66, 0.25)",
        boxShadow: isActive
          ? "0 25px 50px rgba(12, 73, 66, 0.35), 0 0 25px rgba(224, 158, 82, 0.45)"
          : "0 12px 35px rgba(0, 0, 0, 0.16)",
        cursor: "pointer",
        transition: "border 0.3s ease, box-shadow 0.3s ease",
        userSelect: "none"
      }}
    >
      {/* Background Video: Always Playing Automatically & Looping */}
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: isActive ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          filter: isActive ? "brightness(1.05)" : "brightness(0.95)"
        }}
      />

      {/* Dark Vignette Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(12, 73, 66, 0.2) 40%, rgba(0, 0, 0, 0.35) 100%)",
          pointerEvents: "none"
        }}
      />

      {/* Card Content Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pointerEvents: "none",
          zIndex: 2
        }}
      >
        {/* Top Header: Category & Play Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: isRtl ? "normal" : "0.12em",
              padding: "5px 12px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#0C4942",
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              fontFamily: currentLang === "ar" ? "'Cairo', sans-serif" : currentLang === "he" ? "'Heebo', sans-serif" : "inherit"
            }}
          >
            {catText}
          </span>

          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: isActive ? "#E09E52" : "rgba(255, 255, 255, 0.35)",
              color: isActive ? "#0C4942" : "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>

        {/* Bottom Title & Gold Accent */}
        <div dir={isRtl ? "rtl" : "ltr"} style={{ textAlign: isRtl ? "right" : "left" }}>
          <div
            className="reel-card-title"
            style={{
              margin: "0 0 8px 0",
              fontSize: "17px",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)",
              letterSpacing: "normal",
              fontFamily: currentLang === "ar" ? "'Cairo', sans-serif" : currentLang === "he" ? "'Heebo', sans-serif" : "Inter, sans-serif"
            }}
          >
            {titleText}
          </div>
          <div
            style={{
              height: "3px",
              borderRadius: "2px",
              backgroundColor: "#E09E52",
              width: isActive ? "100%" : "36px",
              opacity: isActive ? 1 : 0.7,
              transition: "all 0.4s ease"
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Mobile-optimized swipeable reels carousel
function MobileReelsSlider({
  reels,
  onOpenModal,
  currentLang
}: {
  reels: ReelItem[];
  onOpenModal: (r: ReelItem) => void;
  currentLang: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isRtl = currentLang === "ar" || currentLang === "he";

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = 266; // 250px + 16px gap
    const index = Math.round(el.scrollLeft / itemWidth);
    setActiveIndex(Math.max(0, Math.min(reels.length - 1, index)));
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = 266;
    el.scrollTo({ left: idx * itemWidth, behavior: "smooth" });
  };

  return (
    <div className="mobile-reels-slider-wrap" style={{ width: "100%", padding: "10px 0 24px" }}>
      <style>{`
        .mobile-reels-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 20px 20px;
          scrollbar-width: none;
        }
        .mobile-reels-track::-webkit-scrollbar {
          display: none;
        }
        .mobile-reel-slide {
          flex: 0 0 250px;
          height: 395px;
          scroll-snap-align: center;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background-color: #0C4942;
          box-shadow: 0 12px 30px rgba(12, 73, 66, 0.25);
          cursor: pointer;
          user-select: none;
          transition: transform 0.25s ease;
        }
        .mobile-reel-slide:active {
          transform: scale(0.97);
        }
      `}</style>

      {/* Swipe Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 22px 14px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#0C4942",
            opacity: 0.75,
            letterSpacing: isRtl ? "normal" : "0.08em",
            textTransform: "uppercase",
            fontFamily: isRtl ? "'Cairo', sans-serif" : "inherit"
          }}
        >
          {isRtl ? "اسحب لمشاهدة المقاطع" : currentLang === "fr" ? "Glissez pour explorer" : "Swipe to explore reels"}
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#0C4942",
            opacity: 0.65,
            fontFamily: "monospace"
          }}
        >
          {activeIndex + 1} / {reels.length}
        </span>
      </div>

      {/* Horizontal Swipe Track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mobile-reels-track"
        dir="ltr"
      >
        {reels.map((reel, idx) => {
          const tr = REELS_I18N[reel.id];
          const catText = (currentLang !== "en" && tr?.cat[currentLang]) || reel.cat;
          const titleText = (currentLang !== "en" && tr?.title[currentLang]) || reel.title;

          return (
            <div
              key={reel.id}
              className="mobile-reel-slide"
              onClick={() => onOpenModal(reel)}
            >
              {/* Upright Background Video */}
              <video
                src={reel.video}
                poster={reel.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />

              {/* Gradient Vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(12, 73, 66, 0.15) 50%, rgba(0, 0, 0, 0.35) 100%)",
                  pointerEvents: "none"
                }}
              />

              {/* Overlay Content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  pointerEvents: "none",
                  zIndex: 2
                }}
              >
                {/* Category & Play Button */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: isRtl ? "normal" : "0.1em",
                      padding: "4px 11px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      color: "#0C4942",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                      fontFamily: currentLang === "ar" ? "'Cairo', sans-serif" : currentLang === "he" ? "'Heebo', sans-serif" : "inherit"
                    }}
                  >
                    {catText}
                  </span>

                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.35)",
                      backdropFilter: "blur(4px)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)"
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Title */}
                <div dir={isRtl ? "rtl" : "ltr"} style={{ textAlign: isRtl ? "right" : "left" }}>
                  <div
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: "#ffffff",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)",
                      fontFamily: currentLang === "ar" ? "'Cairo', sans-serif" : currentLang === "he" ? "'Heebo', sans-serif" : "inherit"
                    }}
                  >
                    {titleText}
                  </div>
                  <div
                    style={{
                      height: "3px",
                      borderRadius: "2px",
                      backgroundColor: "#E09E52",
                      width: activeIndex === idx ? "100%" : "36px",
                      opacity: activeIndex === idx ? 1 : 0.7,
                      transition: "all 0.35s ease"
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          marginTop: "12px"
        }}
      >
        {reels.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to reel ${idx + 1}`}
            style={{
              width: activeIndex === idx ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: activeIndex === idx ? "#0C4942" : "rgba(12, 73, 66, 0.22)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ReelsSectionApp() {
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
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

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#FBF6F0",
        paddingTop: "10px",
        paddingBottom: "10px",
        overflowX: "clip"
      }}
    >
      <style>{`
        /* Desktop: Show Radial Wheel, Hide Mobile Slider */
        .reels-desktop-wrapper {
          display: block;
        }
        .reels-mobile-wrapper {
          display: none;
        }

        /* Mobile (< 768px): Hide Radial Wheel, Show Smooth Horizontal Slider */
        @media screen and (max-width: 767px) {
          .reels-desktop-wrapper {
            display: none !important;
          }
          .reels-mobile-wrapper {
            display: block !important;
          }
        }
      `}</style>

      {/* Desktop Radial Wheel: Pinned until full 360° scroll rotation completes */}
      <div className="reels-desktop-wrapper">
        <RadialScrollGallery
          baseRadius={920}
          mobileRadius={240}
          visiblePercentage={24}
          scrollDuration={4500}
          startTrigger="center center"
          className="reels-radial-gallery"
          style={{ minHeight: "680px" }}
        >
          {(hoveredIndex) =>
            reelsData.map((reel, index) => (
              <ReelCard
                key={reel.id + '-' + index}
                reel={reel}
                isActive={hoveredIndex === index}
                onOpenModal={(r) => setSelectedReel(r)}
                currentLang={currentLang}
              />
            ))
          }
        </RadialScrollGallery>
      </div>

      {/* Mobile Swipeable Feed: Clean Upright Reels */}
      <div className="reels-mobile-wrapper">
        <MobileReelsSlider
          reels={reelsData}
          onOpenModal={(r) => setSelectedReel(r)}
          currentLang={currentLang}
        />
      </div>

      {/* Modal Video Player with Sound on Click */}
      {selectedReel && (
        <div
          onClick={() => setSelectedReel(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "420px",
              height: "82vh",
              maxHeight: "750px",
              borderRadius: "24px",
              overflow: "hidden",
              backgroundColor: "#000",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReel(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              ✕
            </button>

            {/* Video with Controls & Audio */}
            <video
              src={selectedReel.video}
              autoPlay
              controls
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "#000"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function init() {
  const container = document.getElementById("reels-radial-root");
  if (!container) return;
  try {
    const root = createRoot(container);
    root.render(React.createElement(ReelsSectionApp));
  } catch (err) {
    console.error("Reels Radial mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
