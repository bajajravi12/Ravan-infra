import {NextResponse} from "next/server";
import {getEpisodes,saveEpisodes} from "@/lib/episodes";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function auth(req:Request){return req.headers.get("x-admin-key")===(process.env.ADMIN_KEY||"change-me")}

export async function GET(req:Request){
  if(!auth(req)) return NextResponse.json({error:"Invalid admin key"},{status:401});
  return NextResponse.json(await getEpisodes());
}

export async function POST(req:Request){
  if(!auth(req)) return NextResponse.json({error:"Invalid admin key"},{status:401});
  const body=await req.json();
  if(!body.episodeNo||!body.title||!body.date||!body.playerUrl) return NextResponse.json({error:"All fields are required"},{status:400});
  const episodes=await getEpisodes();
  const id="bb20-"+Date.now();
  episodes.push({id,episodeNo:Number(body.episodeNo),title:String(body.title),date:String(body.date),playerUrl:String(body.playerUrl)});
  await saveEpisodes(episodes);
  return NextResponse.json({ok:true,id});
}