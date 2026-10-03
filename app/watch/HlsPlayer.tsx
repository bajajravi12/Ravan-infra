"use client";

import { useEffect, useRef } from "react";
import { visitorIdForAnalytics } from "@/app/analytics-client";

declare global {
  interface Window {
    Hls?: any;
  }
}

export default function HlsPlayer({
  src,
  title,
  episodeId,
}: {
  src: string;
  title: string;
  episodeId?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackedPlay = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: any = null;
    let cancelled = false;

    const trackPlay = () => {
      if (trackedPlay.current) return;
      trackedPlay.current = true;

      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          visitorId: visitorIdForAnalytics(),
          eventType: "video_play",
          contentType: "episode",
          contentId: episodeId,
          contentTitle: title,
          path: window.location.pathname,
          device:
            window.innerWidth < 700
              ? "mobile"
              : window.innerWidth < 1100
                ? "tablet"
                : "desktop",
        }),
      }).catch(() => {});
    };

    video.addEventListener("play", trackPlay);

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
      script.src =
        "https://cdn.jsdelivr.net/npm/hls.js@1.6.15/dist/hls.min.js";
      script.async = true;
      script.onload = start;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      video.removeEventListener("play", trackPlay);
      if (hls) hls.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, title, episodeId]);

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
        height: "auto",
        display: "block",
        aspectRatio: "16 / 9",
        objectFit: "contain",
        background: "#000",
      }}
    />
  );
}
