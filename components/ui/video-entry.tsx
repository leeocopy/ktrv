import * as React from "react";
import { createRoot } from "react-dom/client";
import VideoShowcaseSection from "./video-showcase-section";

function init() {
  const container = document.getElementById("video-player-root");
  if (!container) return;
  try {
    const root = createRoot(container);
    root.render(React.createElement(VideoShowcaseSection));
  } catch (err) {
    console.error("Video section mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
