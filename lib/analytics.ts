import {neon} from "@neondatabase/serverless";

export type AnalyticsEvent={
  visitorId:string;
  eventType:"page_view"|"content_click"|"video_play";
  contentType?:string;
  contentId?:string;
  contentTitle?:string;
  path?:string;
  device?:string;
};

function db(){
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

export async function trackEvent(event:AnalyticsEvent){
  const sql=db();
  if(!sql) return;

  await sql`CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    content_type TEXT,
    content_id TEXT,
    content_title TEXT,
    path TEXT,
    device TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  await sql`INSERT INTO analytics_events
    (visitor_id,event_type,content_type,content_id,content_title,path,device)
    VALUES
    (${event.visitorId},${event.eventType},${event.contentType||null},
     ${event.contentId||null},${event.contentTitle||null},
     ${event.path||null},${event.device||null})`;
}

export async function getAnalytics(){
  const sql=db();
  if(!sql) return null;

  await sql`CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    content_type TEXT,
    content_id TEXT,
    content_title TEXT,
    path TEXT,
    device TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  const [totals, today, unique, topContent, daily, devices] = await Promise.all([
    sql`SELECT COUNT(*)::int AS page_views FROM analytics_events WHERE event_type='page_view'`,
    sql`SELECT COUNT(DISTINCT visitor_id)::int AS visitors
        FROM analytics_events
        WHERE created_at >= CURRENT_DATE`,
    sql`SELECT COUNT(DISTINCT visitor_id)::int AS unique_visitors
        FROM analytics_events`,
    sql`SELECT
          COALESCE(content_id,'') AS content_id,
          COALESCE(MAX(content_title), 'Unknown') AS content_title,
          COUNT(*)::int AS clicks
        FROM analytics_events
        WHERE event_type IN ('content_click','video_play')
          AND content_id IS NOT NULL
        GROUP BY content_id
        ORDER BY clicks DESC
        LIMIT 15`,
    sql`SELECT
          TO_CHAR(DATE(created_at),'YYYY-MM-DD') AS day,
          COUNT(DISTINCT visitor_id)::int AS visitors,
          COUNT(*) FILTER (WHERE event_type='page_view')::int AS page_views,
          COUNT(*) FILTER (WHERE event_type IN ('content_click','video_play'))::int AS content_clicks
        FROM analytics_events
        WHERE created_at >= CURRENT_DATE - INTERVAL '29 days'
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)`,
    sql`SELECT COALESCE(device,'unknown') AS device, COUNT(DISTINCT visitor_id)::int AS visitors
        FROM analytics_events
        GROUP BY device
        ORDER BY visitors DESC`
  ]);

  return {
    pageViews:Number(totals[0]?.page_views||0),
    todayVisitors:Number(today[0]?.visitors||0),
    uniqueVisitors:Number(unique[0]?.unique_visitors||0),
    topContent:topContent.map((r:any)=>({
      contentId:String(r.content_id),
      contentTitle:String(r.content_title),
      clicks:Number(r.clicks)
    })),
    daily:daily.map((r:any)=>({
      day:String(r.day),
      visitors:Number(r.visitors),
      pageViews:Number(r.page_views),
      contentClicks:Number(r.content_clicks)
    })),
    devices:devices.map((r:any)=>({
      device:String(r.device),
      visitors:Number(r.visitors)
    }))
  };
}
