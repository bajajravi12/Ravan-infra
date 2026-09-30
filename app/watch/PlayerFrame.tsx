"use client";

import {useRef} from "react";
import HlsPlayer from "./HlsPlayer";

export default function PlayerFrame({src,title}:{src:string;title:string}){
  const isHls = /\.m3u8(?:$|\?)/i.test(src);
  const frameRef = useRef<HTMLDivElement>(null);

  async function fullscreen(){
    const el=frameRef.current;
    if(!el) return;
    if(document.fullscreenElement){
      await document.exitFullscreen();
    }else{
      await el.requestFullscreen();
    }
  }

  return <div className="playerShell">
    <div className="playerToolbar">
      <span>Player</span>
      <button className="fullscreenBtn" type="button" onClick={fullscreen} aria-label="Open player fullscreen">
        ⛶ Fullscreen
      </button>
    </div>

    <div className="playerStage">
      <div className="playerWrap" ref={frameRef}>
        {isHls ? (
          <HlsPlayer src={src} title={title} />
        ) : (
          <iframe
            src={src}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
        <div className="playerFallback">
          Player load na ho to <a href={src} target="_blank" rel="noreferrer">Open Player ↗</a>
        </div>
      </div>
    </div>
  </div>;
}
