"use client";

import {useEffect} from "react";
import {visitorIdForAnalytics} from "./analytics-client";

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
    fetch("/api/analytics",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      keepalive:true,
      body:JSON.stringify({
        visitorId:visitorIdForAnalytics(),
        eventType,
        contentType,
        contentId,
        contentTitle,
        path:window.location.pathname,
        device:window.innerWidth<700?"mobile":window.innerWidth<1100?"tablet":"desktop"
      })
    }).catch(()=>{});
  },[eventType,contentType,contentId,contentTitle]);

  return null;
}
