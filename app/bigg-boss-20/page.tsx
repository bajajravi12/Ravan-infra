import {getEpisodes} from "@/lib/episodes";
import {AnalyticsTracker} from "@/app/AnalyticsTracker";
import TrackedLink from "@/app/TrackedLink";

export const dynamic="force-dynamic";

export default async function BiggBoss(){
  const dbEpisodes = await getEpisodes();
  const episodes = [...dbEpisodes];
  if (!episodes.some((ep) => ep.episodeNo === 29)) {
    episodes.push({
      id: "bb20-ep29",
      episodeNo: 29,
      title: "Bigg Boss 20 — Episode 29",
      date: "2026-10-04",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A"
    });
  }
  episodes.sort((a,b)=>b.episodeNo-a.episodeNo);
  return <section className="shell page">
    <AnalyticsTracker contentType="category" contentId="bigg-boss-20" contentTitle="Bigg Boss 20"/>
    <div className="sectionHead"><div><div className="eyebrow">COLORS TV</div><h1>Bigg Boss 20</h1><p>{episodes.length} episode{episodes.length!==1?"s":""} available</p></div></div>
    <div className="grid">
      {episodes.map(ep=><article className="card" key={ep.id}>
        <div className="thumb"><span>BIGG BOSS 20</span><b>EP {ep.episodeNo}</b></div>
        <div className="cardBody"><div className="date">{ep.date}</div><h2>{ep.title}</h2><TrackedLink className="watchBtn" href={"/watch/"+ep.id} contentType="episode" contentId={ep.id} contentTitle={ep.title}>▶ Watch Episode</TrackedLink></div>
      </article>)}
    </div>
    {!episodes.length && <div className="empty">No episodes added yet.</div>}
  </section>;
}
