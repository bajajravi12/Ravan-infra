"use client";

import {useState} from "react";

export default function PlayerFrame({src,title}:{src:string;title:string}){
  const [size,setSize]=useState<"compact"|"normal"|"large">("normal");
  return <div className={"playerShell player-"+size}>
    <div className="playerToolbar">
      <span>Player Size</span>
      <div className="playerSizes">
        <button onClick={()=>setSize("compact")} className={size==="compact"?"active":""}>Small</button>
        <button onClick={()=>setSize("normal")} className={size==="normal"?"active":""}>Normal</button>
        <button onClick={()=>setSize("large")} className={size==="large"?"active":""}>Large</button>
      </div>
    </div>
    <div className="playerWrap">
      <iframe src={src} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      <div className="playerFallback">Player load na ho to <a href={src} target="_blank" rel="noreferrer">Open Player ↗</a></div>
    </div>
  </div>;
}
