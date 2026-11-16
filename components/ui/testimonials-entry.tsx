import * as React from "react";
import { createRoot } from "react-dom/client";
import StaggerTestimonials from "./stagger-testimonials";

function init() {
  const container = document.getElementById("testimonials-root");
  if (!container) return;
  try {
    const root = createRoot(container);
    root.render(React.createElement(StaggerTestimonials));
  } catch (err) {
    console.error("Testimonials mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

