import * as React from "react";
import VideoPlayer from "./video-player";

export const VideoPlayerDemo = ({ src = "v1.mp4" }: { src?: string }) => {
  return (
    <VideoPlayer
      src={src || "v1.mp4"}
      poster="assets/images/6979a5eeee86150be7247f79_illustration-about.jpg"
    />
  );
};

export default VideoPlayerDemo;
