"use client";

import * as React from "react";
import { COUNTRY_COORDINATES, FlagGlobe } from "./flag-globe";
import type { FlagGlobeMarker } from "./flag-globe";
import VideoPlayer from "./video-player";

const settings = {
  size: 500,
  allCountries: true,
  altitude: 0.18,
  autoRotate: true,
  rotationSpeed: 0.16,
  stars: true,
};

const ALL_COUNTRIES: FlagGlobeMarker[] = Object.keys(COUNTRY_COORDINATES).map((code) => ({ code }));

const CCGATHER_COUNTRIES: FlagGlobeMarker[] = [
  "KR", "US", "TH", "IN", "AU", "CZ", "JP", "IT", "GB", "CA", "FR",
  "IL", "TW", "AE", "MY", "BR", "BD", "DE", "UA", "IS", "NO", "LA",
  "KH", "AZ", "CO", "CN", "NP", "UZ", "UY", "DK", "TR", "MA"
].map((code) => ({ code }));

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const markers = s.allCountries ? ALL_COUNTRIES : CCGATHER_COUNTRIES;
  const [lang, setLang] = React.useState<string>("en");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setLang(localStorage.getItem("kechtg_lang") || "en");
    const onLang = (e: Event) => {
      setLang((e as CustomEvent).detail || localStorage.getItem("kechtg_lang") || "en");
    };
    window.addEventListener("kechtg:lang", onLang);
    return () => window.removeEventListener("kechtg:lang", onLang);
  }, []);

  const line1 =
    lang === "fr" ? `Nous accueillons des voyageurs de ${markers.length} pays à travers le monde` :
    lang === "ar" ? `نرحب بالمسافرين من ${markers.length} دولة حول العالم` :
    lang === "he" ? `מקבלים בברכה מטיילים מ-${markers.length} מדינות ברחבי העולם` :
    `Welcoming travelers from ${markers.length} countries across the globe`;

  const line2 =
    lang === "fr" ? "Globe 3D interactif • Faites glisser pour explorer" :
    lang === "ar" ? "كرة أرضية ثلاثية الأبعاد تفاعلية • اسحب للاستكشاف" :
    lang === "he" ? "גלובוס תלת-ממדי אינטראקטיבי • גררו לסיבוב וחקירה" :
    "Interactive 3D Globe • Drag to rotate & explore";

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        overflow: "hidden",
        padding: "1rem",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "500px",
          maxWidth: "90vw",
          maxHeight: "90vw",
          aspectRatio: "1 / 1",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlagGlobe
          markers={markers}
          size={500}
          style={{ width: "100%", height: "100%", aspectRatio: "1 / 1" }}
          altitude={s.altitude}
          autoRotate={s.autoRotate}
          rotationSpeed={s.rotationSpeed}
          stars={s.stars}
          baseColor="#083732"
          glowColor="#185c53"
        />
      </div>
    </div>
  );
}

export const VideoPlayerDemo = ({ src = "v1.mp4" }: { src?: string }) => {
  return (
    <VideoPlayer
      src={src || "v1.mp4"}
      poster="assets/images/6979a5eeee86150be7247f79_illustration-about.jpg"
    />
  );
};

