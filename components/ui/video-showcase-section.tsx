"use client";

import * as React from "react";
import VideoPlayer from "./video-player";

export default function VideoShowcaseSection() {
  return (
    <section
      className="video-showcase-section"
      style={{
        backgroundColor: "#0A1A18",
        padding: 0,
        margin: 0,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        display: "block",
        lineHeight: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: 0,
          padding: 0,
          position: "relative",
        }}
      >
        <VideoPlayer
          src="v1.mp4"
          poster="assets/images/6979a5eeee86150be7247f79_illustration-about.jpg"
          autoPlay={true}
          fullWidth={true}
        />
      </div>
    </section>
  );
}
