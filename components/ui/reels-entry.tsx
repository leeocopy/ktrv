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
    video: "videos/reel-4.mp4",
    poster: "photo/tour-argan-goats-essaouira.jpg"
  },
  {
    id: 7,
    title: "Atlas Mountains & Ourika",
    cat: "Atlas",
    video: "videos/reel-5.mp4",
    poster: "photo/andri-klopfenstein-zGEkvID6vz8-unsplash.jpg"
  },
  {
    id: 8,
    title: "Kasbah Terrace Feast",
    cat: "Gastronomy",
    video: "videos/reel-3.mp4",
    poster: "photo/tour-terrace-lunch.jpg"
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

  // Auto-play videos automatically
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
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
        preload="auto"
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
        paddingTop: "20px",
        paddingBottom: "30px",
        overflow: "hidden"
      }}
    >
      {/* Radial Scroll Gallery with Bigger Cards */}
      <RadialScrollGallery
        baseRadius={530}
        mobileRadius={240}
        visiblePercentage={56}
        scrollDuration={2200}
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
