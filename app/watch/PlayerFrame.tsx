"use client";

import { useEffect, useRef, useState } from "react";
import HlsPlayer from "./HlsPlayer";

export default function PlayerFrame({
  src,
  title,
  episodeId,
}: {
  src: string;
  title: string;
  episodeId: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [playUrl, setPlayUrl] = useState<string | null>(
    /\.m3u8(?:$|\?)/i.test(src) ? src : null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (/\.m3u8(?:$|\?)/i.test(src)) {
      setPlayUrl(src);
      return;
    }

    let cancelled = false;
    setPlayUrl(null);
    setError("");

    fetch(`/api/episodes/${encodeURIComponent(episodeId)}/stream`, {
      cache: "no-store",
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to resolve stream");
        return data;
      })
      .then((data) => {
        if (!cancelled) setPlayUrl(data.hlsUrl);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to resolve stream");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src, episodeId]);

  async function fullscreen() {
    const el = frameRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await el.requestFullscreen();
    }
  }

  return (
    <div className="playerShell">
      <div className="playerToolbar">
        <span>Player</span>
        <button
          className="fullscreenBtn"
          type="button"
          onClick={fullscreen}
          aria-label="Open player fullscreen"
        >
          ⛶ Fullscreen
        </button>
      </div>

      <div className="playerStage">
        <div className="playerWrap" ref={frameRef}>
          {playUrl ? (
            <HlsPlayer src={playUrl} title={title} episodeId={episodeId} />
          ) : (
            <div className="playerLoading">
              {error || "Loading video…"}
            </div>
          )}

          <div className="playerFallback">
            Source open na ho to{" "}
            <a href={src} target="_blank" rel="noreferrer">
              Open Source ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
