import Link from "next/link";
import {notFound} from "next/navigation";
import {getEpisodes} from "@/lib/episodes";

export default async function Watch({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const episodes=getEpisodes().sort((a,b)=>b.episodeNo-a.episodeNo);
  const ep=episodes.find(x=>x.id===id);
  if(!ep) notFound();
  const index=episodes.findIndex(x=>x.id===id);
  const next=episodes[index-1];
  const prev=episodes[index+1];
  return <section className="shell watchPage">
    <Link className="back" href="/bigg-boss-20">← All Episodes</Link>
    <div className="playerWrap">
      <iframe src={ep.playerUrl} title={ep.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      <div className="playerFallback">Player load na ho to <a href={ep.playerUrl} target="_blank" rel="noreferrer">Open Player ↗</a></div>
    </div>
    <div className="watchInfo"><div><div className="eyebrow">EPISODE {ep.episodeNo}</div><h1>{ep.title}</h1><p>{ep.date}</p></div><div className="episodeNav">{prev&&<Link href={"/watch/"+prev.id}>← Previous</Link>}{next&&<Link href={"/watch/"+next.id}>Next →</Link>}</div></div>
  </section>;
}