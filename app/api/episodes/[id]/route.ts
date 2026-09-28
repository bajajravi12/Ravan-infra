import {NextResponse} from "next/server";
import {getEpisodes,saveEpisodes} from "@/lib/episodes";

export const runtime="nodejs";

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
  if(req.headers.get("x-admin-key")!==(process.env.ADMIN_KEY||"change-me")) return NextResponse.json({error:"Invalid admin key"},{status:401});
  const {id}=await params; const episodes=getEpisodes(); const next=episodes.filter(x=>x.id!==id);
  if(next.length===episodes.length) return NextResponse.json({error:"Episode not found"},{status:404});
  saveEpisodes(next); return NextResponse.json({ok:true});
}