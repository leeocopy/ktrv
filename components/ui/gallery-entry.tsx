import * as React from "react";
import { createRoot } from "react-dom/client";
import InfiniteGallery, { ImageItem } from "./3d-gallery-photography";

const moroccoImages: ImageItem[] = [
  {
    src: "photo/tour-camels-merzouga.jpg",
    alt: "Sahara Desert Camel Trek & Berber Caravan"
  },
  {
    src: "photo/abdou-faiz-6xZuPeInEiQ-unsplash.jpg",
    alt: "Ben Youssef Medersa Marrakech Architecture"
  },
  {
    src: "photo/tour-minibus-group.jpg",
    alt: "VIP Mercedes Private Chauffeur Tour"
  },
  {
    src: "photo/sour-moha-uTLxhEA2qDk-unsplash.jpg",
    alt: "Merzouga Golden Sand Dunes"
  },
  {
    src: "photo/tour-airport-welcome.jpg",
    alt: "Marrakech Airport VIP Welcome & Private Transfer"
  },
  {
    src: "photo/calin-stan-7a_PHX91su8-unsplash.jpg",
    alt: "Chefchaouen The Blue Pearl Medina"
  },
  {
    src: "photo/tour-terrace-lunch.jpg",
    alt: "Authentic Berber Dining On Scenic Terrace"
  },
  {
    src: "photo/andri-klopfenstein-zGEkvID6vz8-unsplash.jpg",
    alt: "High Atlas Mountains & Berber Valleys"
  },
  {
    src: "photo/tour-argan-goats-essaouira.jpg",
    alt: "Famous Tree-Climbing Goats of Essaouira"
  },
  {
    src: "photo/carlos-leret-NaY693XXXpY-unsplash (1).jpg",
    alt: "Ait Ben Haddou Historic UNESCO Kasbah"
  },
  {
    src: "photo/tour-traditional-gate.jpg",
    alt: "Cultural Immersion & Authentic Moroccan Hospitality"
  },
  {
    src: "photo/zakariae-daoui-I2YeucCFOmw-unsplash.jpg",
    alt: "Agafay Desert Sunset Safari"
  },
  {
    src: "photo/tour-airport-arrival.jpg",
    alt: "Happy Travelers & Seamless Private Tour Transfers"
  },
  {
    src: "photo/mehdi-el-marouazi-xhzPAomSpwg-unsplash.jpg",
    alt: "Essaouira Atlantic Ocean Fortifications"
  }
];

export function GallerySectionApp() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
      {/* 3D Canvas */}
      <InfiniteGallery
        images={moroccoImages}
        speed={1.2}
        zSpacing={3.2}
        visibleCount={14}
        falloff={{ near: 0.6, far: 14 }}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Center Overlay Text (Text Lwst) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          zIndex: 10
        }}
      >
        <h2
          className="gallery-heading-title"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(34px, 5.5vw, 68px)",
            fontWeight: 700,
            color: "#0C4942 !important" as any,
            lineHeight: 1.12,
            margin: "0 0 16px 0",
            maxWidth: "920px",
            letterSpacing: "-0.025em",
            textShadow: "0 2px 16px rgba(251, 246, 240, 0.9), 0 1px 3px rgba(255, 255, 255, 0.9)"
          }}
        >
          Through The Moroccan Lens
        </h2>

        <p
          className="gallery-heading-desc"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.6vw, 19px)",
            color: "#0C4942 !important" as any,
            opacity: 0.88,
            maxWidth: "650px",
            margin: 0,
            lineHeight: 1.55,
            textShadow: "0 2px 12px rgba(251, 246, 240, 0.9)"
          }}
        >
          Scroll or drag to navigate through authentic Moroccan landscapes, private expeditions & timeless moments.
        </p>
      </div>
    </div>
  );
}

function init() {
  const container = document.getElementById("gallery-3d-root");
  if (!container) return;
  try {
    const root = createRoot(container);
    root.render(React.createElement(GallerySectionApp));
  } catch (err) {
    console.error("3D Gallery mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
