import {NextResponse} from "next/server";
import {getEpisodes,saveEpisodes} from "@/lib/episodes";

export const runtime="nodejs";

function auth(req:Request){return req.headers.get("x-admin-key")===(process.env.ADMIN_KEY||"change-me")}

export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){
  if(!auth(req)) return NextResponse.json({error:"Invalid admin key"},{status:401});
  const {id}=await params; const body=await req.json(); const episodes=getEpisodes(); const index=episodes.findIndex(x=>x.id===id);
  if(index<0) return NextResponse.json({error:"Episode not found"},{status:404});
  if(!body.episodeNo||!body.title||!body.date||!body.playerUrl) return NextResponse.json({error:"All fields are required"},{status:400});
  episodes[index]={id,episodeNo:Number(body.episodeNo),title:String(body.title),date:String(body.date),playerUrl:String(body.playerUrl)};
  saveEpisodes(episodes); return NextResponse.json({ok:true});
}

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
  if(!auth(req)) return NextResponse.json({error:"Invalid admin key"},{status:401});
  const {id}=await params; const episodes=getEpisodes(); const next=episodes.filter(x=>x.id!==id);
  if(next.length===episodes.length) return NextResponse.json({error:"Episode not found"},{status:404});
  saveEpisodes(next); return NextResponse.json({ok:true});
}