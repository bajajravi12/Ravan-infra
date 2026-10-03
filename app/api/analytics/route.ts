import {NextResponse} from "next/server";
import {trackEvent,getAnalytics,AnalyticsEvent} from "@/lib/analytics";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function authorized(req:Request){
  const expected=process.env.ADMIN_KEY || "change-me";
  return req.headers.get("x-admin-key")===expected;
}

export async function POST(req:Request){
  try{
    const body=await req.json() as Partial<AnalyticsEvent>;
    if(!body.visitorId || !body.eventType){
      return NextResponse.json({error:"Invalid analytics event"},{status:400});
    }

    await trackEvent({
      visitorId:String(body.visitorId).slice(0,100),
      eventType:body.eventType==="video_play"?"video_play":body.eventType==="content_click"?"content_click":"page_view",
      contentType:body.contentType?.slice(0,50),
      contentId:body.contentId?.slice(0,100),
      contentTitle:body.contentTitle?.slice(0,200),
      path:body.path?.slice(0,300),
      device:body.device?.slice(0,30)
    });

    return NextResponse.json({ok:true});
  }catch(error){
    console.error("Analytics event error:",error);
    return NextResponse.json({ok:false},{status:500});
  }
}

export async function GET(req:Request){
  if(!authorized(req)) return NextResponse.json({error:"Unauthorized"},{status:401});

  try{
    const data=await getAnalytics();
    return NextResponse.json(data||{
      pageViews:0,todayVisitors:0,uniqueVisitors:0,topContent:[],daily:[],devices:[]
    },{
      headers:{"Cache-Control":"no-store"}
    });
  }catch(error){
    console.error("Analytics report error:",error);
    return NextResponse.json({error:"Analytics unavailable"},{status:500});
  }
}
