import * as React from "react";
import { createRoot } from "react-dom/client";
import { ContainerScroll, ContainerInset } from "./hero-video";

export function HeroVideoComponent() {
  return (
    <div className="hv-wrapper" style={{ backgroundColor: "#FBF6F0", width: "100%", overflow: "hidden" }}>
      <style>{`
        .hv-wrapper {
          position: relative;
          width: 100%;
          background: #FBF6F0;
        }
        .hv-scroll-section {
          position: relative;
          min-height: 120vh;
          width: 100%;
          padding-top: 30px;
          padding-bottom: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
        }
        .hv-inset {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
          transform-origin: top center;
        }
        .hv-video-card {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(12, 73, 66, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.15);
          background: #000;
        }
        .hv-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 28px;
        }
        @media (max-width: 768px) {
          .hv-scroll-section {
            min-height: 85vh;
            padding-top: 20px;
            padding-bottom: 25%;
          }
          .hv-inset {
            padding: 0 12px;
          }
          .hv-video-card, .hv-video {
            border-radius: 18px;
          }
        }
      `}</style>
      <ContainerScroll className="hv-scroll-section">
        <ContainerInset
          className="hv-inset"
          translateYRange={["0%", "20%"]}
          insetYRange={[25, 0]}
          insetXRange={[32, 0]}
          roundednessRange={[100, 28]}
        >
          <div className="hv-video-card">
            <video
              src="ea.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="hv-video"
            />
          </div>
        </ContainerInset>
      </ContainerScroll>
    </div>
  );
}

function init() {
  const container = document.getElementById("hero-video-root");
  if (!container) return;
  try {
    const root = createRoot(container);
    root.render(React.createElement(HeroVideoComponent));
  } catch (err) {
    console.error("Hero video mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
