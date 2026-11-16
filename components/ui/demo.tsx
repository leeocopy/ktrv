"use client";

import * as React from "react";
import { COUNTRY_COORDINATES, FlagGlobe } from "./flag-globe";
import type { FlagGlobeMarker } from "./flag-globe";

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

      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "6px", marginTop: "12px" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#0C4942", margin: 0 }}>
          {`Welcoming travelers from ${markers.length} countries across the globe`}
        </p>
        <p style={{ fontSize: "12px", color: "rgba(12, 73, 66, 0.7)", margin: 0 }}>
          Interactive 3D Globe &bull; Drag to rotate &amp; explore
        </p>
      </div>
    </div>
  );
}
