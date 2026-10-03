"use client";

import {useEffect} from "react";

function visitorId(){
  const key="aarvi_visitor_id";
  let id=localStorage.getItem(key);
  if(!id){
    id=crypto.randomUUID();
    localStorage.setItem(key,id);
  }
  return id;
}

function device(){
  return window.innerWidth<700 ? "mobile" : window.innerWidth<1100 ? "tablet" : "desktop";
}

export function AnalyticsTracker({
  eventType="page_view",
  contentType,
  contentId,
  contentTitle
}:{
  eventType?:"page_view"|"content_click"|"video_play";
  contentType?:string;
  contentId?:string;
  contentTitle?:string;
}){
  useEffect(()=>{
    const send=()=>{
      fetch("/api/analytics",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        keepalive:true,
        body:JSON.stringify({
          visitorId:visitorId(),
          eventType,
          contentType,
          contentId,
          contentTitle,
          path:window.location.pathname,
          device:device()
        })
      }).catch(()=>{});
    };
    send();
  },[eventType,contentType,contentId,contentTitle]);

  return null;
}
