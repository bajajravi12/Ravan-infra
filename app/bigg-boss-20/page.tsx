import {getEpisodes} from "@/lib/episodes";
import {AnalyticsTracker} from "@/app/AnalyticsTracker";
import TrackedLink from "@/app/TrackedLink";

export const dynamic="force-dynamic";

export default async function BiggBoss(){
  const dbEpisodes = await getEpisodes();
  const episodes = [...dbEpisodes];
  if (!episodes.some((ep) => ep.episodeNo === 46)) {
    episodes.push({"id":"bb20-ep46","episodeNo":46,"title":"Bigg Boss 20 — Episode 46","date":"2026-10-21","playerUrl":"https://biggboss20.live/video-player/Jaz2X452Bl12H1sPkqqC-YrukgnpSgcVUIhBcFGkN2iYnxs8MdR65stIozx0MY9E59acYtFAS5RwzCA6n8E5xg6U5xJsWjQI_GxzyTkXrbHJwkp1Snhcrg7XHe3a_X5coi2ZGOW8cS04n40tdVynsvwxCWfOtQGTd7Myp668tGVXdSiA1u0"});
  }
  if (!episodes.some((ep) => ep.episodeNo === 45)) {
    episodes.push({"id":"bb20-ep45","episodeNo":45,"title":"Bigg Boss 20 — Episode 45","date":"2026-10-20","playerUrl":"https://biggboss20.live/video-player/iQwxviPtmlc9HKiNGgtXRrWJl-cwGz0t7KxxW6ZGWgMeIF2_Myhye8RjSTB5Qw2CP9i1I8paGWNRjMhxG4kXe0fu_NzfoO3eg0uK6dd-iNJiUCCF2gWya6_Jt6Z1ufeyUXG4DbChELr4xUmLhvB0w8BwIm2jbxFhlyVaaMavxSVEboafYfk"});
  }
  if (!episodes.some((ep) => ep.episodeNo === 44)) {
    episodes.push({"id":"bb20-ep44","episodeNo":44,"title":"Bigg Boss 20 — Episode 44","date":"2026-10-19","playerUrl":"https://biggboss20.live/video-player/Cx7JwXqUBUBgfGscOQd6gTIvhp8oN7EYBtxEk-BcZNBSWR_AK2-utvm8hhjbjQ2JmmouY7DW5Qsk3TbBGdHulUhu1LGCX5b2QmegEWOnXcRvvqmSAy80CDgBqUODvWXLUKuquUevhLNMKFkoKQ9-zEPF_f9MH2CiJGbux-epJVFBlERMA4A"});
  }
  if (!episodes.some((ep) => ep.episodeNo === 43)) {
    episodes.push({ id: "bb20-ep43", episodeNo: 43, title: "Bigg Boss 20 — Episode 43", date: "2026-10-18", playerUrl: "https://biggboss20.live/video-player/VVuVMlhlOAEmCH9lt8Hsi023bUY3BFJTyXvFAJDfboSRHbvglpGSxMoqIcLV1ptPLKijdghab_WRLvCWwnFq_oGahLD_vtalKoV3HwmojnAcPJgEdHkRJeD4iUDeW7EUxIiASIn7agFU1mZmGi9Lr94gx9ensyKYckcgggEJyOby1oht7jQ" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 42)) {
    episodes.push({ id: "bb20-ep42", episodeNo: 42, title: "Bigg Boss 20 — Episode 42", date: "2026-10-17", playerUrl: "https://biggboss20.live/video-player/bt0unOGnL_hdoroP6gyHb3gGJAOQXUsuTRPy2_qBNMxEiaOjET7-9FWKA8rq-jFWhbGN_M5jpT49VKJ2J7BLsSt38_lBp8nUQTRLjc1z2HdWEtJrvtzKAVdEktSPfmsrSfvfvebvQsLGPr0bMDsQKL1CLbb2gbLrc2ebdM9ivGuFe_J6zSQ" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 41)) {
    episodes.push({ id: "bb20-ep41", episodeNo: 41, title: "Bigg Boss 20 — Episode 41", date: "2026-10-16", playerUrl: "https://biggboss20.live/video-player/35tIxjZ9n-_U5vgz6yxU9s02j_tGVpwPTI6B4ccXqIV4nFkplPHiR-OGL8hLqZTHN36RbKcgtoJ5wySdN-g8qwrX0Av6QG51KTyaeG5dsJZt9xqJUMrWvy6bXmFq_iHo-ugVdl4UU8iyV4cAlAi1bnpYQmcvNbOnCSRxjU1aNJDX1S5zJX8" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 40)) {
    episodes.push({ id: "bb20-ep40", episodeNo: 40, title: "Bigg Boss 20 — Episode 40", date: "2026-10-15", playerUrl: "https://biggboss20.live/video-player/UFCu16Lgpj8h4xP-VtrVSr1YQ-V_1wm71YbNUONfBmqRIVOk17twlFmuLxKZn7ZbTVW4EcJADCM54xUkwE9QZ9fD-zAmOKZqEWf6egS14PFS2JuNy2FRTIdM-UDV_sEypvmQUgdZoC9gBb-8WL5jtK52HTNSFRxlAGpG7jAoLYukpqAdjPc" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 39)) {
    episodes.push({ id: "bb20-ep39", episodeNo: 39, title: "Bigg Boss 20 — Episode 39", date: "2026-10-14", playerUrl: "https://biggboss20.live/video-player/Kqx9IdhTKBmX515Fqn2BMdAUtdcS4vj0EIWr3CIDmcw-LZbXDEJZ5UFuZu7zj9kjn0bqqu-iCKYhmAJMFbET4T3Qe-zoTAEz5Vfe1-FtZ6YdxEL_ChNgnDfxgHq_GxvP76sIjlNeib5agFB5pzRkNSMSMyciW3JaNwXy-dQq4-xOSoEUWjo" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 38)) {
    episodes.push({ id: "bb20-ep38", episodeNo: 38, title: "Bigg Boss 20 — Episode 38", date: "2026-10-13", playerUrl: "https://biggboss20.live/video-player/VJ18YobVTvx6Xp7arvkkjb1LeiPziDI7vZY2ZcenwHvjYGB6tizkq4J7Pe5S_UsPS3uKqbsbRTx1iudixVQ7hiC6H-fn7xxSBiAJl-P-PxS_b1EMs5X1yudp0R9o30S-gVreOMdYhv8MfLEa7m2hk4gZvgA8-e6Dpm78FgDAETCuEgbBvbw" });
  }
  if (!episodes.some((ep) => ep.episodeNo === 37)) {
    episodes.push({ id: "bb20-ep37", episodeNo: 37, title: "Bigg Boss 20 — Episode 37", date: "2026-10-12", playerUrl: "https://biggboss20.live/video-player/8xGQCf6-O9bg0E_bCcT0mrkuf5vHVu_4C6hzLF5gEKluz96uZcuTNu4-tn4q29FC9c0cH6PgoihvhB1jwdUrWj2MnniJjJNg7_TT-JX_Uq8xmbNJSGd4zW5pMOah4CRhMeAXnQHaer1PyE9lb8K1FrwcrAZU5VtF72X0rPIPImn0FB3VgvM" });
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
