"use client";

import Link from "next/link";
import {visitorIdForAnalytics} from "./analytics-client";

export default function TrackedLink({
  href,children,className,contentType,contentId,contentTitle
}:{
  href:string;
  children:React.ReactNode;
  className?:string;
  contentType:string;
  contentId:string;
  contentTitle:string;
}){
  function click(){
    fetch("/api/analytics",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      keepalive:true,
      body:JSON.stringify({
        visitorId:visitorIdForAnalytics(),
        eventType:"content_click",
        contentType,
        contentId,
        contentTitle,
        path:window.location.pathname,
        device:window.innerWidth<700?"mobile":window.innerWidth<1100?"tablet":"desktop"
      })
    }).catch(()=>{});
  }
  return <Link href={href} className={className} onClick={click}>{children}</Link>;
}
