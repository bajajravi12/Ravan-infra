"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Hls?: any;
  }
}

export default function HlsPlayer({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: any = null;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;

      if (window.Hls && window.Hls.isSupported()) {
        hls = new window.Hls({
          enableWorker: true,
          lowLatencyMode: false,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    };

    if (window.Hls) {
      start();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@1.6.15/dist/hls.min.js";
      script.async = true;
      script.onload = start;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (hls) hls.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      title={title}
      controls
      playsInline
      preload="metadata"
      className="hlsVideo"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "contain",
        background: "#000",
      }}
    />
  );
}
