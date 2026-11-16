import * as React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./demo";

function init() {
  const container = document.getElementById("flag-globe-root");
  if (!container) return;
  try {
    const root = createRoot(container);
    root.render(React.createElement(Demo));
  } catch (err) {
    console.error("Flag Globe mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
