"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative w-full h-1 bg-white/20 rounded-full cursor-pointer",
        className
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-white rounded-full"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

export const VideoPlayer = ({
  src,
  poster,
  autoPlay = true,
  fullWidth = true,
}: {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  fullWidth?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(autoPlay ? 0 : 1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.muted = true;
      setIsMuted(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      const newVolume = value / 100;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      videoRef.current.muted = newVolume === 0;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const prog =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isFinite(prog) ? prog : 0);
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current && videoRef.current.duration) {
      const time = (value / 100) * videoRef.current.duration;
      if (isFinite(time)) {
        videoRef.current.currentTime = time;
        setProgress(value);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        const nextVol = volume === 0 ? 1 : volume;
        setVolume(nextVol);
        videoRef.current.volume = nextVol;
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const setSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <motion.div
      className={cn(
        "relative w-full mx-auto overflow-hidden bg-[#0A1A18] group",
        fullWidth ? "rounded-none" : "rounded-2xl shadow-[0_20px_50px_rgba(12,73,66,0.22)]"
      )}
      style={{
        aspectRatio: "16 / 9",
        width: "100%",
        maxWidth: fullWidth ? "100%" : "1160px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          display: "block",
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={isMuted}
        loop
        playsInline
        onClick={togglePlay}
      />

      {/* Big Center Play Button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 m-auto rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-2xl border border-white/30"
          style={{ width: "80px", height: "80px" }}
        >
          <Play className="h-9 w-9 ml-1 fill-white text-white" />
        </button>
      )}

      {/* Floating Unmute quick button if muted and playing */}
      {isPlaying && isMuted && (
        <button
          onClick={toggleMute}
          aria-label="Unmute video"
          className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center gap-2 text-white text-xs font-medium transition-all border border-white/20 z-10 shadow-lg"
        >
          <VolumeX className="h-4 w-4" />
          <span>Click to unmute</span>
        </button>
      )}

      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 mx-auto max-w-2xl left-4 right-4 p-4 mb-6 bg-[#111111b8] backdrop-blur-md rounded-2xl border border-white/10 z-20 shadow-2xl"
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white text-xs font-mono select-none">
                {formatTime(currentTime)}
              </span>
              <CustomSlider
                value={progress}
                onChange={handleSeek}
                className="flex-1"
              />
              <span className="text-white text-xs font-mono select-none">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={togglePlay}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#111111d1] hover:text-white h-9 w-9"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
                <div className="flex items-center gap-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={toggleMute}
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-[#111111d1] hover:text-white h-9 w-9"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : volume > 0.5 ? (
                        <Volume2 className="h-5 w-5" />
                      ) : (
                        <Volume1 className="h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>

                  <div className="w-20 hidden sm:block">
                    <CustomSlider
                      value={isMuted ? 0 : volume * 100}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={speed}
                  >
                    <Button
                      onClick={() => setSpeed(speed)}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-white text-xs px-2 h-7 hover:bg-[#111111d1] hover:text-white",
                        playbackSpeed === speed && "bg-white/20 font-semibold"
                      )}
                    >
                      {speed}x
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayer;
