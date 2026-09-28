import {NextResponse} from "next/server";
import {getEpisodes,saveEpisodes} from "@/lib/episodes";

export const runtime="nodejs";

export async function GET(){return NextResponse.json(getEpisodes());}

export async function POST(req:Request){
  if(req.headers.get("x-admin-key")!==(process.env.ADMIN_KEY||"change-me")) return NextResponse.json({error:"Invalid admin key"},{status:401});
  const body=await req.json();
  if(!body.episodeNo||!body.title||!body.date||!body.playerUrl) return NextResponse.json({error:"All fields are required"},{status:400});
  const episodes=getEpisodes();
  const id="bb20-"+Date.now();
  episodes.push({id,episodeNo:Number(body.episodeNo),title:String(body.title),date:String(body.date),playerUrl:String(body.playerUrl)});
  saveEpisodes(episodes);
  return NextResponse.json({ok:true,id});
}