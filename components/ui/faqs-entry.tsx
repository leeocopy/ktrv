import * as React from "react";
import { createRoot } from "react-dom/client";
import FAQs from "./text-reveal-faqs";

function init() {
  const container = document.getElementById("faqs-root");
  if (!container) return;
  try {
    const root = createRoot(container);
    root.render(React.createElement(FAQs));
  } catch (err) {
    console.error("FAQs mount error:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
