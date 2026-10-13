import {getEpisodes} from "@/lib/episodes";
import {AnalyticsTracker} from "@/app/AnalyticsTracker";
import TrackedLink from "@/app/TrackedLink";

export const dynamic="force-dynamic";

export default async function BiggBoss(){
  const dbEpisodes = await getEpisodes();
  const episodes = [...dbEpisodes];
  if (!episodes.some((ep) => ep.episodeNo === 37)) {
    episodes.push({ id: "bb20-ep37", episodeNo: 37, title: "Bigg Boss 20 — Episode 37", date: "2026-10-12", playerUrl: "https://articleweb.xyz/vid/video.php?id=S1VjlmzzPehp1" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 36)) {
    episodes.push({
      id: "bb20-ep36",
      episodeNo: 36,
      title: "Bigg Boss 20 — Episode 36",
      date: "2026-10-11",
      playerUrl: "https://biggboss20.live/video-player/y6oev8-gwLQ2mNvkSJUY5nyK8ZN5W_HNgv_MYLKFjjtk5bZ5U_F3sywK_e4RKjaO_4raW6D32yOkhgWox1vZu0cvG2252j5kOLnqadu0B0B7ksicX2mkWU2bms5YUpKxES6Q79YZh1L6KhgcA8EA65LdHMPZT4yjkYp1HaUsH_QIJJ88LVU"
    });
  }
  if (!episodes.some((ep) => ep.episodeNo === 35)) {
    episodes.push({ id: "bb20-ep35", episodeNo: 35, title: "Bigg Boss 20 — Episode 35", date: "2026-10-10", playerUrl: "https://biggboss20.live/video-player/N6MGtnn213YXuiyMEAfUbX_MzsP6TbM5ffwcE-zJaKB-3taP5G_JopdWMVK7By9evGQUPCFOSLiOJ_3lvcCDe0E3OlcCgba8a8qmfZv7jQgAaaUay1mT3bxDfQNHLVEi2WTMUTCncpsuq_YZ_zDA1UI112TohtRuuZ8kNFcLOkkoK2JatOI" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 34)) {
    episodes.push({
      id: "bb20-ep34",
      episodeNo: 34,
      title: "Bigg Boss 20 — Episode 34",
      date: "2026-10-09",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=OqcxbMRgquqg3w"
    });
  }
  if (!episodes.some((ep) => ep.episodeNo === 33)) {
    episodes.push({
      id: "bb20-ep33",
      episodeNo: 33,
      title: "Bigg Boss 20 — Episode 33",
      date: "2026-10-08",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww"
    });
  }
  if (!episodes.some((ep) => ep.episodeNo === 32)) {
    episodes.push({
      id: "bb20-ep32",
      episodeNo: 32,
      title: "Bigg Boss 20 — Episode 32",
      date: "2026-10-07",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg"
    });
  }
  if (!episodes.some((ep) => ep.episodeNo === 31)) {
    episodes.push({
      id: "bb20-ep31",
      episodeNo: 31,
      title: "Bigg Boss 20 — Episode 31",
      date: "2026-10-06",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w"
    });
  }
  if (!episodes.some((ep) => ep.episodeNo === 30)) {
    episodes.push({
      id: "bb20-ep30",
      episodeNo: 30,
      title: "Bigg Boss 20 — Episode 30",
      date: "2026-10-05",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA"
    });
  }
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
