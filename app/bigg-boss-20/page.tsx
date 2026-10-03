import Link from "next/link";
import {getEpisodes} from "@/lib/episodes";
import {AnalyticsTracker} from "@/app/AnalyticsTracker";

export const dynamic="force-dynamic";

export default async function BiggBoss(){
  const episodes=(await getEpisodes()).sort((a,b)=>b.episodeNo-a.episodeNo);
  return <section className="shell page">
    <AnalyticsTracker contentType="category" contentId="bigg-boss-20" contentTitle="Bigg Boss 20"/>
    <div className="sectionHead"><div><div className="eyebrow">COLORS TV</div><h1>Bigg Boss 20</h1><p>{episodes.length} episode{episodes.length!==1?"s":""} available</p></div></div>
    <div className="grid">
      {episodes.map(ep=><article className="card" key={ep.id}>
        <div className="thumb"><span>BIGG BOSS 20</span><b>EP {ep.episodeNo}</b></div>
        <div className="cardBody"><div className="date">{ep.date}</div><h2>{ep.title}</h2><Link className="watchBtn" href={"/watch/"+ep.id} onClick={()=>{}}>▶ Watch Episode</Link></div>
      </article>)}
    </div>
    {!episodes.length && <div className="empty">No episodes added yet.</div>}
  </section>;
}
