import fs from "fs";
import path from "path";
import {neon} from "@neondatabase/serverless";

export type Episode={
  id:string;
  episodeNo:number;
  title:string;
  date:string;
  playerUrl:string;
};

const filePath=path.join(process.cwd(),"data","episodes.json");

function fileEpisodes():Episode[]{
  try{
    const episodes = JSON.parse(fs.readFileSync(filePath,"utf8")) as Episode[];
    if (!episodes.some((ep) => ep.episodeNo === 58)) {
      episodes.push({"id":"bb20-ep58","episodeNo":58,"title":"Bigg Boss 20 — Episode 58","date":"2026-11-02","playerUrl":"https://biggboss20.live/video-player/1yVByfKeUZdAvsvzgwYFR2kX4anPDQQjc2FsboojyNNaPUj4Et6xvOeA4QDoHC5pe6mK7w0ShLTw-PvTY6t4tSZ6dxwJbzWVCOo9ELCldwyORTTt6duXkYMfZ1CJ3vJ5wyByNxYWgLQB7TB9ArWs05IuZkgwRA3eCwcvihknCqOyr8UrLHs"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 57)) {
      episodes.push({"id":"bb20-ep57","episodeNo":57,"title":"Bigg Boss 20 — Episode 57","date":"2026-11-01","playerUrl":"https://biggboss20.live/video-player/kwyTkt6T-HxXHCccN9VuZKTjR4SWecIu9un3wGfX02ja00lt5lK7BR7mqhYZ16YUxqZ2UK3G0gj3nVlFlFEnyXYI6DZ5MUwGnQ1oAQp3SGwV9kCI_2aUsUXpgU0w-HB9Yc95mTdwHvE_75wUtvXcWqaNx0u5oIEwD672HotsLy_4T677FQE"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 59)) {
      episodes.push({"id":"bb20-ep59","episodeNo":59,"title":"Bigg Boss 20 — Episode 59","date":"2026-11-03","playerUrl":"https://biggboss20.live/video-player/qHllbpVF8kEpY796tGMEbJU1EGz_UP5Bhg92-IrGofhfGGAcuugzDVm43XZKi-t12LdlYK7C-ehePqQ92Bc1LPO_70BcPYaRxHoavspRSPR80LSdqVvteV2z8mI-zeqIpIIEdSD5nMn_EGtBzSHQj0uVnNj9fIb0rUL5GlgAWVzBNeIWrX8"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 60)) {
      episodes.push({"id":"bb20-ep60","episodeNo":60,"title":"Bigg Boss 20 — Episode 60","date":"2026-11-04","playerUrl":"https://biggboss20.live/video-player/SYu4rPwiXjnA-dBPRdwu3JIX_6ydYn80J49LIe_QwKEefdNeJ0RPupl2FxmBVaZ5tpVWMknHP24ttpL05BlQdMFYCNykCn92ubCMEtoSWWooF3M2WOgkEurEC6dOb_O0gUZBXallO344jpnSbKHLe1tAplLIh33c08eWgKzcAVc5sHPX_wE"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 61)) {
      episodes.push({"id":"bb20-ep61","episodeNo":61,"title":"Bigg Boss 20 — Episode 61","date":"2026-11-05","playerUrl":"https://biggboss20.live/video-player/M_j6QUhhJJqDD_XonVubPpKC9spmuDp3JO_FB9vDvcATpML4c9B0d7u7oNXZ4W7scM-tBloPWUDebZjGBdiOO_c5drVuTN-vRu-3po6HAzIHEG1FBcJdzaHxhI0k7pHD7wK50ZwM730lTdXEu7IKuhdLClqVFcMBSeb5x4oddXKNwd_7u1Q"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 62)) {
      episodes.push({"id":"bb20-ep62","episodeNo":62,"title":"Bigg Boss 20 — Episode 62","date":"2026-11-06","playerUrl":"https://biggboss20.live/video-player/f-emNGZYzNx1wU5RMj2MwaoxkVg-BwGx_pmCN19yS4brCChUh7SDZHi7vB2B-PY0xTvFiRbG8frBpVedlL_ruoaULRoiTYZ3pwh6bVTatmC8lmf7i0sF8OqAi4aMri0vSyhr0eoLA4hbj7n5XAW39CnGEgD2lfT5n25fGrrPfJi9ZHZReHg"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 63)) {
      episodes.push({"id":"bb20-ep63","episodeNo":63,"title":"Bigg Boss 20 — Episode 63","date":"2026-11-07","playerUrl":"https://biggboss20.live/video-player/bSMty5Pt61UsyPHOB5djL7z9ZgmNYZPygLsDQt8-7iVNEC03BlEfSSh5j7GQFZsbRXOF49bDlzkBo1BsXc0LT3EAZdE5tbVv6fTCY9DXL5LiU8Tbdu-9v5285TSujDdoaqDy3w7N-GuVd6l5MqyOoJLSLea4uUMFq9nm_qnfEDAw9QpyQCU"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 64)) {
      episodes.push({"id":"bb20-ep64","episodeNo":64,"title":"Bigg Boss 20 — Episode 64","date":"2026-11-08","playerUrl":"https://biggboss20.live/video-player/0WPzOFXFreyiU8Gzq0n94OSycCZ8kMnH7iFWfQkwcwmvocdmm9kWiJCHctdWjF0azWX8FsQ1lFYCYt3VKrbdWOaVljionUxyT98SJmYokiCEcq5cdGoxZjue0K7J3qV3G3hZ99SUz2BgM7Zzh1DI0vINwrz0w9v2ZKFo8zMqD0xZQjKA5r0"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 65)) {
      episodes.push({"id":"bb20-ep65","episodeNo":65,"title":"Bigg Boss 20 — Episode 65","date":"2026-11-09","playerUrl":"https://biggboss20.live/video-player/5Vrcex3NmgyKyr7afhxCe2mAKcVrd7WLGYvL9ww2JNEsGXk6B3E-KNvlgHCtbPICBWUH-SLjNefT_cVSpavtZuABRzGLnCujHVA_eTavWRBgqP0DQoljGMgPYCspt3cRpde9srG5HCWNNA_NA6pRIyqGonMzeqxQPOifHZOPSu0YJQpjrjw"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 66)) {
      episodes.push({"id":"bb20-ep66","episodeNo":66,"title":"Bigg Boss 20 — Episode 66","date":"2026-11-10","playerUrl":"https://biggboss20.live/video-player/2e9pKgOMm7-QALGridkBQGCgt2xEyRCIgeIODoVea1qHaZw8Ex7EE713JD-AfFWIguPcEpM5N0qwYIw4BFVmWDFcvhaXsLTXPjN5GG8PHjNEDjWF9K2GuEvD7wZOugNL4yeVLt0AXIHg08GahjWrdIBX-Mx1YcOWgBpTZndkYXxJVok16LM"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 67)) {
      episodes.push({"id":"bb20-ep67","episodeNo":67,"title":"Bigg Boss 20 — Episode 67","date":"2026-11-11","playerUrl":"https://biggboss20.live/video-player/MmsfVMDJwz2UyfOTrJ7ylT-gcCEUofYvYA4ZQE62iVEb4WKtyUHgtoenn9T4Z8IF-gM5ShQCMZB7apU-0Sc5fi2xna76UT-Flq0Q9FkmZ8X6hNv6YpMlaQXnG3Wh2NEyoF35gkjjln76CjizlcYdRJs6Ac0_J5i2hYh_rTqr0Xos_wobvO4"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 68)) {
      episodes.push({"id":"bb20-ep68","episodeNo":68,"title":"Bigg Boss 20 — Episode 68","date":"2026-11-12","playerUrl":"https://biggboss20.live/video-player/lyylSzRp3oCxfUvfdW0lPHMrRNriH8xlMCoxxxkw0Cl6ZD8dxSgpjJgcY6PeyKRfKrrDEv96qfs7Ajc-NwoYPiqbtDKotFGKAU_a3AV34qJxL0BKzuN3MwNXIsw0JW0BpnQVV__kqPZiZVy5HqlZrIc6k4Pbpj8BvWWza8kGglHMS1Xx-zI"});
    }
    if (!episodes.some((ep) => ep.episodeNo === 69)) {
      episodes.push({"id":"bb20-ep69","episodeNo":69,"title":"Bigg Boss 20 — Episode 69","date":"2026-11-13","playerUrl":"https://biggboss20.live/video-player/Zs05Q5MJzosHLoc2DmRP314vtdsFIU4Spvz2NInSf9CFbMZeV6mHK6_JSXKCXaBQw1EpiZtthRg4el0paChlXtJ1o-AbMlJ_5umXdV7rUts8fPMapYBUo53NIlYzBN1u7dZ-MYDD31AtYZALYHG-2HIMTXBfJEHyAaAnQ-HBZR9UP77sGqk"});
    }
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
      episodes.push({
        id: "bb20-ep43",
        episodeNo: 43,
        title: "Bigg Boss 20 — Episode 43",
        date: "2026-10-18",
        playerUrl: "https://biggboss20.live/video-player/VVuVMlhlOAEmCH9lt8Hsi023bUY3BFJTyXvFAJDfboSRHbvglpGSxMoqIcLV1ptPLKijdghab_WRLvCWwnFq_oGahLD_vtalKoV3HwmojnAcPJgEdHkRJeD4iUDeW7EUxIiASIn7agFU1mZmGi9Lr94gx9ensyKYckcgggEJyOby1oht7jQ"
      });
    }
    if (!episodes.some((ep) => ep.episodeNo === 42)) {
      episodes.push({
        id: "bb20-ep42",
        episodeNo: 42,
        title: "Bigg Boss 20 — Episode 42",
        date: "2026-10-17",
        playerUrl: "https://biggboss20.live/video-player/bt0unOGnL_hdoroP6gyHb3gGJAOQXUsuTRPy2_qBNMxEiaOjET7-9FWKA8rq-jFWhbGN_M5jpT49VKJ2J7BLsSt38_lBp8nUQTRLjc1z2HdWEtJrvtzKAVdEktSPfmsrSfvfvebvQsLGPr0bMDsQKL1CLbb2gbLrc2ebdM9ivGuFe_J6zSQ"
      });
    }
    if (!episodes.some((ep) => ep.episodeNo === 41)) {
      episodes.push({
        id: "bb20-ep41",
        episodeNo: 41,
        title: "Bigg Boss 20 — Episode 41",
        date: "2026-10-16",
        playerUrl: "https://biggboss20.live/video-player/35tIxjZ9n-_U5vgz6yxU9s02j_tGVpwPTI6B4ccXqIV4nFkplPHiR-OGL8hLqZTHN36RbKcgtoJ5wySdN-g8qwrX0Av6QG51KTyaeG5dsJZt9xqJUMrWvy6bXmFq_iHo-ugVdl4UU8iyV4cAlAi1bnpYQmcvNbOnCSRxjU1aNJDX1S5zJX8"
      });
    }
    if (!episodes.some((ep) => ep.episodeNo === 40)) {
      episodes.push({
        id: "bb20-ep40",
        episodeNo: 40,
        title: "Bigg Boss 20 — Episode 40",
        date: "2026-10-15",
        playerUrl: "https://biggboss20.live/video-player/UFCu16Lgpj8h4xP-VtrVSr1YQ-V_1wm71YbNUONfBmqRIVOk17twlFmuLxKZn7ZbTVW4EcJADCM54xUkwE9QZ9fD-zAmOKZqEWf6egS14PFS2JuNy2FRTIdM-UDV_sEypvmQUgdZoC9gBb-8WL5jtK52HTNSFRxlAGpG7jAoLYukpqAdjPc"
      });
    }
    if (!episodes.some((ep) => ep.episodeNo === 28)) {
      episodes.push({
        id: "bb20-ep28",
        episodeNo: 28,
        title: "Bigg Boss 20 — Episode 28",
        date: "2026-10-03",
        playerUrl: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw"
      });
    }
    if (!episodes.some((ep) => ep.episodeNo === 39)) {
      episodes.push({
        id: "bb20-ep39",
        episodeNo: 39,
        title: "Bigg Boss 20 — Episode 39",
        date: "2026-10-14",
        playerUrl: "https://biggboss20.live/video-player/Kqx9IdhTKBmX515Fqn2BMdAUtdcS4vj0EIWr3CIDmcw-LZbXDEJZ5UFuZu7zj9kjn0bqqu-iCKYhmAJMFbET4T3Qe-zoTAEz5Vfe1-FtZ6YdxEL_ChNgnDfxgHq_GxvP76sIjlNeib5agFB5pzRkNSMSMyciW3JaNwXy-dQq4-xOSoEUWjo"
      });
    }
    if (!episodes.some((ep) => ep.episodeNo === 38)) {
      episodes.push({
        id: "bb20-ep38",
        episodeNo: 38,
        title: "Bigg Boss 20 — Episode 38",
        date: "2026-10-13",
        playerUrl: "https://biggboss20.live/video-player/VJ18YobVTvx6Xp7arvkkjb1LeiPziDI7vZY2ZcenwHvjYGB6tizkq4J7Pe5S_UsPS3uKqbsbRTx1iudixVQ7hiC6H-fn7xxSBiAJl-P-PxS_b1EMs5X1yudp0R9o30S-gVreOMdYhv8MfLEa7m2hk4gZvgA8-e6Dpm78FgDAETCuEgbBvbw"
      });
    }
    if (!episodes.some((ep) => ep.episodeNo === 35)) {
      episodes.push({
        id: "bb20-ep35",
        episodeNo: 35,
        title: "Bigg Boss 20 — Episode 35",
        date: "2026-10-10",
        playerUrl: "https://biggboss20.live/video-player/N6MGtnn213YXuiyMEAfUbX_MzsP6TbM5ffwcE-zJaKB-3taP5G_JopdWMVK7By9evGQUPCFOSLiOJ_3lvcCDe0E3OlcCgba8a8qmfZv7jQgAaaUay1mT3bxDfQNHLVEi2WTMUTCncpsuq_YZ_zDA1UI112TohtRuuZ8kNFcLOkkoK2JatOI"
      });
    }
    return episodes.sort((a,b)=>b.episodeNo-a.episodeNo);
  }catch{
    return [
      {"id":"bb20-ep58","episodeNo":58,"title":"Bigg Boss 20 — Episode 58","date":"2026-11-02","playerUrl":"https://biggboss20.live/video-player/1yVByfKeUZdAvsvzgwYFR2kX4anPDQQjc2FsboojyNNaPUj4Et6xvOeA4QDoHC5pe6mK7w0ShLTw-PvTY6t4tSZ6dxwJbzWVCOo9ELCldwyORTTt6duXkYMfZ1CJ3vJ5wyByNxYWgLQB7TB9ArWs05IuZkgwRA3eCwcvihknCqOyr8UrLHs"},
      {"id":"bb20-ep56","episodeNo":56,"title":"Bigg Boss 20 — Episode 56","date":"2026-10-31","playerUrl":"https://biggboss20.live/video-player/FIxrCYER2BzmYqCUIrm8wfKPYh4QPqTUhz9t3xAN7LsW_YXx8TJaCZqHYaEHi3LmLIUDSqV5NY7fBvtbJpa3U6_ih9tITYS_noR1MPzOazwn3Fn1KVqbzD0_ix5FNAu7bnm1QRNh1DH9UtXF4oVq87H76iHogqb0mwQ7qU6n83SOo2_N9RM"},
      {"id":"bb20-ep55","episodeNo":55,"title":"Bigg Boss 20 — Episode 55","date":"2026-10-30","playerUrl":"https://biggboss20.live/video-player/vJUi_ecVX096TS23d6BgxBcO8BBdjql3Y8Dm7J9QHt1CDgWcqC0rfJXbC9_o06oApOA_GtgV5KVH6o0RvGcXErmspHJiJfIDb5xIPTkeGNUGhHNrC1MmHFHYj2Uerm5x7LolnvI95WTBMncfWyd-e0wefeBrJISfZ11IOl4YHBhXQc8x3sU"},
      {"id":"bb20-ep54","episodeNo":54,"title":"Bigg Boss 20 — Episode 54","date":"2026-10-29","playerUrl":"https://biggboss20.live/video-player/n8JYlC4EjV_NAqFbBBcKkWGXmS7mE47WHH8ab_qoJ2PoX8I9k8WoNzqiSz5k06yuJULYLpWMkeQJ9HJVnl6eU_TA9mpa0Z0ae6-62vPq57cnI62aQLWli9LZO8NBmUR0FNBhhgNjAOz5Fql8kH5NzORuFBD112wcmOzTv6ZGId2YikxiZsw"},
      {"id":"bb20-ep53","episodeNo":53,"title":"Bigg Boss 20 — Episode 53","date":"2026-10-28","playerUrl":"https://biggboss20.live/video-player/MsbAviOxcFtV7c8e21x7gmREUC3a6sS1a4g-sdp36zFOq1Ez_PjJWwlVsuwDZEGmRQr57DAC5MiVSvG77Yt9n6faTnmhZUT_4uUJh5fi5ViOquQ3crvKEPjYsyeHe7eCN3CTCQ1w-5V87lL4LVi7QEBIKl4z8emKd1SCLvQoPOdB26BQAfc"},
      {"id":"bb20-ep52","episodeNo":52,"title":"Bigg Boss 20 — Episode 52","date":"2026-10-27","playerUrl":"https://biggboss20.live/video-player/yoheML4H7cVdUIfgpiVA646id-kOlngm3-95uaraNG7Jf2xx0_yCSCP_0R3KHoKkH24JxTAJUvrsMsRuk_K9y8QHodLu_xlUFtQq44zqB63N-h_S6vXj6QtQxoORrBfBEP5NFvoAusy-NAIjOD5VCYtnULVR5_ysoV_QRr8mPHYCcbAY9WI"},
      {"id":"bb20-ep49","episodeNo":49,"title":"Bigg Boss 20 — Episode 49","date":"2026-10-24","playerUrl":"https://biggboss20.live/video-player/hpmsksZmJt1qEpVJq_SO4vIXFDwTVtHLv45VHrkDOBiRUPiKnT8s2EcAesN25BWn8q6__i9hlgXYDEq-X1jSXQV2riHp1czumsmPh8sJJCYq-N3yzcqVQXRbpNseLlYGJ_1e0WBPpWosmmPohYQ3ODpq6lnAsKQfB5Bh1De8R7d6t5Lapl8"},
      {"id":"bb20-ep48","episodeNo":48,"title":"Bigg Boss 20 — Episode 48","date":"2026-10-23","playerUrl":"https://biggboss20.live/video-player/g45wHFY7MmE7krDXj3u8t3nF0EZpCkkeYCF_yqG0-7j88ZgPmL5zfBgXoMZxErC4aTZ_Th3-FiUXkOkFqs2ZoXMo0jhE0R8WE1eRAasUVw9ROVWdkQVGZ7Wbwve9TsNfDlQKchuT13KUK2uy_q2JEFOwP-QcUGUkG8xqd4D1PRKU1AyaUAU"},
      {"id":"bb20-ep47","episodeNo":47,"title":"Bigg Boss 20 — Episode 47","date":"2026-10-22","playerUrl":"https://biggboss20.live/video-player/ZF7iJtpvVC45es_oU-4z3rHkBr6PT0sgpL16MZpY_2PfMfv__m84SsfrExs72OnxkFCrIy-6Hn1A9dersn5kRix9PW8qQgIGcGv5E8tpvW9AL7t0946PLQoGOJsE96PPGhw1Yq1zB7V0arLspW3njIXIckKWdlHOCfrGmkXStkwT6NixRe0"},
      {"id":"bb20-ep46","episodeNo":46,"title":"Bigg Boss 20 — Episode 46","date":"2026-10-21","playerUrl":"https://biggboss20.live/video-player/Jaz2X452Bl12H1sPkqqC-YrukgnpSgcVUIhBcFGkN2iYnxs8MdR65stIozx0MY9E59acYtFAS5RwzCA6n8E5xg6U5xJsWjQI_GxzyTkXrbHJwkp1Snhcrg7XHe3a_X5coi2ZGOW8cS04n40tdVynsvwxCWfOtQGTd7Myp668tGVXdSiA1u0"},
      {"id":"bb20-ep45","episodeNo":45,"title":"Bigg Boss 20 — Episode 45","date":"2026-10-20","playerUrl":"https://biggboss20.live/video-player/iQwxviPtmlc9HKiNGgtXRrWJl-cwGz0t7KxxW6ZGWgMeIF2_Myhye8RjSTB5Qw2CP9i1I8paGWNRjMhxG4kXe0fu_NzfoO3eg0uK6dd-iNJiUCCF2gWya6_Jt6Z1ufeyUXG4DbChELr4xUmLhvB0w8BwIm2jbxFhlyVaaMavxSVEboafYfk"},
      {"id":"bb20-ep44","episodeNo":44,"title":"Bigg Boss 20 — Episode 44","date":"2026-10-19","playerUrl":"https://biggboss20.live/video-player/Cx7JwXqUBUBgfGscOQd6gTIvhp8oN7EYBtxEk-BcZNBSWR_AK2-utvm8hhjbjQ2JmmouY7DW5Qsk3TbBGdHulUhu1LGCX5b2QmegEWOnXcRvvqmSAy80CDgBqUODvWXLUKuquUevhLNMKFkoKQ9-zEPF_f9MH2CiJGbux-epJVFBlERMA4A"},
      {
        id: "bb20-ep43",
        episodeNo: 43,
        title: "Bigg Boss 20 — Episode 43",
        date: "2026-10-18",
        playerUrl: "https://biggboss20.live/video-player/VVuVMlhlOAEmCH9lt8Hsi023bUY3BFJTyXvFAJDfboSRHbvglpGSxMoqIcLV1ptPLKijdghab_WRLvCWwnFq_oGahLD_vtalKoV3HwmojnAcPJgEdHkRJeD4iUDeW7EUxIiASIn7agFU1mZmGi9Lr94gx9ensyKYckcgggEJyOby1oht7jQ"
      },
      {
        id: "bb20-ep42",
        episodeNo: 42,
        title: "Bigg Boss 20 — Episode 42",
        date: "2026-10-17",
        playerUrl: "https://biggboss20.live/video-player/bt0unOGnL_hdoroP6gyHb3gGJAOQXUsuTRPy2_qBNMxEiaOjET7-9FWKA8rq-jFWhbGN_M5jpT49VKJ2J7BLsSt38_lBp8nUQTRLjc1z2HdWEtJrvtzKAVdEktSPfmsrSfvfvebvQsLGPr0bMDsQKL1CLbb2gbLrc2ebdM9ivGuFe_J6zSQ"
      },
      {
        id: "bb20-ep41",
        episodeNo: 41,
        title: "Bigg Boss 20 — Episode 41",
        date: "2026-10-16",
        playerUrl: "https://biggboss20.live/video-player/35tIxjZ9n-_U5vgz6yxU9s02j_tGVpwPTI6B4ccXqIV4nFkplPHiR-OGL8hLqZTHN36RbKcgtoJ5wySdN-g8qwrX0Av6QG51KTyaeG5dsJZt9xqJUMrWvy6bXmFq_iHo-ugVdl4UU8iyV4cAlAi1bnpYQmcvNbOnCSRxjU1aNJDX1S5zJX8"
      },
      {
        id: "bb20-ep40",
        episodeNo: 40,
        title: "Bigg Boss 20 — Episode 40",
        date: "2026-10-15",
        playerUrl: "https://biggboss20.live/video-player/UFCu16Lgpj8h4xP-VtrVSr1YQ-V_1wm71YbNUONfBmqRIVOk17twlFmuLxKZn7ZbTVW4EcJADCM54xUkwE9QZ9fD-zAmOKZqEWf6egS14PFS2JuNy2FRTIdM-UDV_sEypvmQUgdZoC9gBb-8WL5jtK52HTNSFRxlAGpG7jAoLYukpqAdjPc"
      },
      {
        id: "bb20-ep39",
        episodeNo: 39,
        title: "Bigg Boss 20 — Episode 39",
        date: "2026-10-14",
        playerUrl: "https://biggboss20.live/video-player/Kqx9IdhTKBmX515Fqn2BMdAUtdcS4vj0EIWr3CIDmcw-LZbXDEJZ5UFuZu7zj9kjn0bqqu-iCKYhmAJMFbET4T3Qe-zoTAEz5Vfe1-FtZ6YdxEL_ChNgnDfxgHq_GxvP76sIjlNeib5agFB5pzRkNSMSMyciW3JaNwXy-dQq4-xOSoEUWjo"
      },
      {
        id: "bb20-ep38",
        episodeNo: 38,
        title: "Bigg Boss 20 — Episode 38",
        date: "2026-10-13",
        playerUrl: "https://biggboss20.live/video-player/VJ18YobVTvx6Xp7arvkkjb1LeiPziDI7vZY2ZcenwHvjYGB6tizkq4J7Pe5S_UsPS3uKqbsbRTx1iudixVQ7hiC6H-fn7xxSBiAJl-P-PxS_b1EMs5X1yudp0R9o30S-gVreOMdYhv8MfLEa7m2hk4gZvgA8-e6Dpm78FgDAETCuEgbBvbw"
      },
      {
        id: "bb20-ep37",
        episodeNo: 37,
        title: "Bigg Boss 20 — Episode 37",
        date: "2026-10-12",
        playerUrl: "https://biggboss20.live/video-player/8xGQCf6-O9bg0E_bCcT0mrkuf5vHVu_4C6hzLF5gEKluz96uZcuTNu4-tn4q29FC9c0cH6PgoihvhB1jwdUrWj2MnniJjJNg7_TT-JX_Uq8xmbNJSGd4zW5pMOah4CRhMeAXnQHaer1PyE9lb8K1FrwcrAZU5VtF72X0rPIPImn0FB3VgvM"
      },
      {
        id: "bb20-ep36",
        episodeNo: 36,
        title: "Bigg Boss 20 — Episode 36",
        date: "2026-10-11",
        playerUrl: "https://biggboss20.live/video-player/y6oev8-gwLQ2mNvkSJUY5nyK8ZN5W_HNgv_MYLKFjjtk5bZ5U_F3sywK_e4RKjaO_4raW6D32yOkhgWox1vZu0cvG2252j5kOLnqadu0B0B7ksicX2mkWU2bms5YUpKxES6Q79YZh1L6KhgcA8EA65LdHMPZT4yjkYp1HaUsH_QIJJ88LVU"
      },
      {
        id: "bb20-ep35",
        episodeNo: 35,
        title: "Bigg Boss 20 — Episode 35",
        date: "2026-10-10",
        playerUrl: "https://biggboss20.live/video-player/N6MGtnn213YXuiyMEAfUbX_MzsP6TbM5ffwcE-zJaKB-3taP5G_JopdWMVK7By9evGQUPCFOSLiOJ_3lvcCDe0E3OlcCgba8a8qmfZv7jQgAaaUay1mT3bxDfQNHLVEi2WTMUTCncpsuq_YZ_zDA1UI112TohtRuuZ8kNFcLOkkoK2JatOI"
      },
      {
        id: "bb20-ep28",
        episodeNo: 28,
        title: "Bigg Boss 20 — Episode 28",
        date: "2026-10-03",
        playerUrl: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw"
      }
    ];
  }
}

function db(){
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

const SOURCE_URL_MIGRATIONS: Record<number, string> = {
  56: "https://biggboss20.live/video-player/FIxrCYER2BzmYqCUIrm8wfKPYh4QPqTUhz9t3xAN7LsW_YXx8TJaCZqHYaEHi3LmLIUDSqV5NY7fBvtbJpa3U6_ih9tITYS_noR1MPzOazwn3Fn1KVqbzD0_ix5FNAu7bnm1QRNh1DH9UtXF4oVq87H76iHogqb0mwQ7qU6n83SOo2_N9RM",
  55: "https://biggboss20.live/video-player/vJUi_ecVX096TS23d6BgxBcO8BBdjql3Y8Dm7J9QHt1CDgWcqC0rfJXbC9_o06oApOA_GtgV5KVH6o0RvGcXErmspHJiJfIDb5xIPTkeGNUGhHNrC1MmHFHYj2Uerm5x7LolnvI95WTBMncfWyd-e0wefeBrJISfZ11IOl4YHBhXQc8x3sU",
  54: "https://biggboss20.live/video-player/n8JYlC4EjV_NAqFbBBcKkWGXmS7mE47WHH8ab_qoJ2PoX8I9k8WoNzqiSz5k06yuJULYLpWMkeQJ9HJVnl6eU_TA9mpa0Z0ae6-62vPq57cnI62aQLWli9LZO8NBmUR0FNBhhgNjAOz5Fql8kH5NzORuFBD112wcmOzTv6ZGId2YikxiZsw",
  53: "https://biggboss20.live/video-player/MsbAviOxcFtV7c8e21x7gmREUC3a6sS1a4g-sdp36zFOq1Ez_PjJWwlVsuwDZEGmRQr57DAC5MiVSvG77Yt9n6faTnmhZUT_4uUJh5fi5ViOquQ3crvKEPjYsyeHe7eCN3CTCQ1w-5V87lL4LVi7QEBIKl4z8emKd1SCLvQoPOdB26BQAfc",
  52: "https://biggboss20.live/video-player/yoheML4H7cVdUIfgpiVA646id-kOlngm3-95uaraNG7Jf2xx0_yCSCP_0R3KHoKkH24JxTAJUvrsMsRuk_K9y8QHodLu_xlUFtQq44zqB63N-h_S6vXj6QtQxoORrBfBEP5NFvoAusy-NAIjOD5VCYtnULVR5_ysoV_QRr8mPHYCcbAY9WI",
  51: "https://biggboss20.live/video-player/Ww_1D5Q8MuFIIbKiJDpSwsO6W198_1YamgY4iJwokbUuoC9CypckzuBz48lYAvAuqhNniTDi-7Z0HNIUwF1u0HpeNfhvjxvEXAQ9a-cq_5M4OIry6j_lFkM7qqD1ibuXHI-80K4NDh97eAY-YwZx-V0HljRdssk-JYK2oyp8kk2Q6gAeFwQ",
  50: "https://biggboss20.live/video-player/xYQbaYDHCeWUzEQAX8ZTKjXahvt8GIREDzoUe5lOXAUuwsmkMdqY1n4CF9nGviCdNgw0VkPU7JHWwhp_X7I-ZnOH95K8z3aVLoG8aHcEyXFrvhcnhaWlUHDpc5k2Aay_ENxARjZQfrmU4_TjF__FbZFDnOuAljfOIl9Cd754t3c-TjDBw_A",
  49: "https://biggboss20.live/video-player/hpmsksZmJt1qEpVJq_SO4vIXFDwTVtHLv45VHrkDOBiRUPiKnT8s2EcAesN25BWn8q6__i9hlgXYDEq-X1jSXQV2riHp1czumsmPh8sJJCYq-N3yzcqVQXRbpNseLlYGJ_1e0WBPpWosmmPohYQ3ODpq6lnAsKQfB5Bh1De8R7d6t5Lapl8",
  48: "https://biggboss20.live/video-player/g45wHFY7MmE7krDXj3u8t3nF0EZpCkkeYCF_yqG0-7j88ZgPmL5zfBgXoMZxErC4aTZ_Th3-FiUXkOkFqs2ZoXMo0jhE0R8WE1eRAasUVw9ROVWdkQVGZ7Wbwve9TsNfDlQKchuT13KUK2uy_q2JEFOwP-QcUGUkG8xqd4D1PRKU1AyaUAU",
  47: "https://biggboss20.live/video-player/ZF7iJtpvVC45es_oU-4z3rHkBr6PT0sgpL16MZpY_2PfMfv__m84SsfrExs72OnxkFCrIy-6Hn1A9dersn5kRix9PW8qQgIGcGv5E8tpvW9AL7t0946PLQoGOJsE96PPGhw1Yq1zB7V0arLspW3njIXIckKWdlHOCfrGmkXStkwT6NixRe0",
  46: "https://biggboss20.live/video-player/Jaz2X452Bl12H1sPkqqC-YrukgnpSgcVUIhBcFGkN2iYnxs8MdR65stIozx0MY9E59acYtFAS5RwzCA6n8E5xg6U5xJsWjQI_GxzyTkXrbHJwkp1Snhcrg7XHe3a_X5coi2ZGOW8cS04n40tdVynsvwxCWfOtQGTd7Myp668tGVXdSiA1u0",
  45: "https://biggboss20.live/video-player/iQwxviPtmlc9HKiNGgtXRrWJl-cwGz0t7KxxW6ZGWgMeIF2_Myhye8RjSTB5Qw2CP9i1I8paGWNRjMhxG4kXe0fu_NzfoO3eg0uK6dd-iNJiUCCF2gWya6_Jt6Z1ufeyUXG4DbChELr4xUmLhvB0w8BwIm2jbxFhlyVaaMavxSVEboafYfk",
  44: "https://biggboss20.live/video-player/Cx7JwXqUBUBgfGscOQd6gTIvhp8oN7EYBtxEk-BcZNBSWR_AK2-utvm8hhjbjQ2JmmouY7DW5Qsk3TbBGdHulUhu1LGCX5b2QmegEWOnXcRvvqmSAy80CDgBqUODvWXLUKuquUevhLNMKFkoKQ9-zEPF_f9MH2CiJGbux-epJVFBlERMA4A",
  43: "https://biggboss20.live/video-player/VVuVMlhlOAEmCH9lt8Hsi023bUY3BFJTyXvFAJDfboSRHbvglpGSxMoqIcLV1ptPLKijdghab_WRLvCWwnFq_oGahLD_vtalKoV3HwmojnAcPJgEdHkRJeD4iUDeW7EUxIiASIn7agFU1mZmGi9Lr94gx9ensyKYckcgggEJyOby1oht7jQ",
  42: "https://biggboss20.live/video-player/bt0unOGnL_hdoroP6gyHb3gGJAOQXUsuTRPy2_qBNMxEiaOjET7-9FWKA8rq-jFWhbGN_M5jpT49VKJ2J7BLsSt38_lBp8nUQTRLjc1z2HdWEtJrvtzKAVdEktSPfmsrSfvfvebvQsLGPr0bMDsQKL1CLbb2gbLrc2ebdM9ivGuFe_J6zSQ",
  41: "https://biggboss20.live/video-player/35tIxjZ9n-_U5vgz6yxU9s02j_tGVpwPTI6B4ccXqIV4nFkplPHiR-OGL8hLqZTHN36RbKcgtoJ5wySdN-g8qwrX0Av6QG51KTyaeG5dsJZt9xqJUMrWvy6bXmFq_iHo-ugVdl4UU8iyV4cAlAi1bnpYQmcvNbOnCSRxjU1aNJDX1S5zJX8",
  40: "https://biggboss20.live/video-player/UFCu16Lgpj8h4xP-VtrVSr1YQ-V_1wm71YbNUONfBmqRIVOk17twlFmuLxKZn7ZbTVW4EcJADCM54xUkwE9QZ9fD-zAmOKZqEWf6egS14PFS2JuNy2FRTIdM-UDV_sEypvmQUgdZoC9gBb-8WL5jtK52HTNSFRxlAGpG7jAoLYukpqAdjPc",
  39: "https://biggboss20.live/video-player/Kqx9IdhTKBmX515Fqn2BMdAUtdcS4vj0EIWr3CIDmcw-LZbXDEJZ5UFuZu7zj9kjn0bqqu-iCKYhmAJMFbET4T3Qe-zoTAEz5Vfe1-FtZ6YdxEL_ChNgnDfxgHq_GxvP76sIjlNeib5agFB5pzRkNSMSMyciW3JaNwXy-dQq4-xOSoEUWjo",
  38: "https://biggboss20.live/video-player/VJ18YobVTvx6Xp7arvkkjb1LeiPziDI7vZY2ZcenwHvjYGB6tizkq4J7Pe5S_UsPS3uKqbsbRTx1iudixVQ7hiC6H-fn7xxSBiAJl-P-PxS_b1EMs5X1yudp0R9o30S-gVreOMdYhv8MfLEa7m2hk4gZvgA8-e6Dpm78FgDAETCuEgbBvbw",
  37: "https://biggboss20.live/video-player/8xGQCf6-O9bg0E_bCcT0mrkuf5vHVu_4C6hzLF5gEKluz96uZcuTNu4-tn4q29FC9c0cH6PgoihvhB1jwdUrWj2MnniJjJNg7_TT-JX_Uq8xmbNJSGd4zW5pMOah4CRhMeAXnQHaer1PyE9lb8K1FrwcrAZU5VtF72X0rPIPImn0FB3VgvM",
  36: "https://biggboss20.live/video-player/y6oev8-gwLQ2mNvkSJUY5nyK8ZN5W_HNgv_MYLKFjjtk5bZ5U_F3sywK_e4RKjaO_4raW6D32yOkhgWox1vZu0cvG2252j5kOLnqadu0B0B7ksicX2mkWU2bms5YUpKxES6Q79YZh1L6KhgcA8EA65LdHMPZT4yjkYp1HaUsH_QIJJ88LVU",
  35: "https://biggboss20.live/video-player/N6MGtnn213YXuiyMEAfUbX_MzsP6TbM5ffwcE-zJaKB-3taP5G_JopdWMVK7By9evGQUPCFOSLiOJ_3lvcCDe0E3OlcCgba8a8qmfZv7jQgAaaUay1mT3bxDfQNHLVEi2WTMUTCncpsuq_YZ_zDA1UI112TohtRuuZ8kNFcLOkkoK2JatOI",
  34: "https://articleweb.xyz/vid/gofile.php?id=OqcxbMRgquqg3w",
  33: "https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww",
  32: "https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg",
  31: "https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w",
  30: "https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA",
  29: "https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A",
  28: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw",
  14: "https://articleweb.xyz/vid/gofile.php?id=c_o1kLYy0mLtPA",
  15: "https://articleweb.xyz/vid/gofile.php?id=88YgNUCmaUzK2w",
  16: "https://articleweb.xyz/vid/gofile.php?id=yUsNPNBn98TdeQ",
  17: "https://articleweb.xyz/vid/gofile.php?id=LFz4HJAS924syA",
  18: "https://articleweb.xyz/vid/gofile.php?id=DZyVommnhMBrPw",
  19: "https://articleweb.xyz/vid/gofile.php?id=wJc__5OC63W9DA",
  20: "https://articleweb.xyz/vid/gofile.php?id=89pbEp1i_zhi1g",
  21: "https://articleweb.xyz/vid/gofile.php?id=OfhO74WIGZrj2Q",
  22: "https://articleweb.xyz/vid/gofile.php?id=jjDh0ejkvVJtKw",
  23: "https://articleweb.xyz/vid/gofile.php?id=_xPpLZssg6ZFCQ"
};

async function ensureTable(sql:any){
  await sql`CREATE TABLE IF NOT EXISTS episodes (
    id TEXT PRIMARY KEY,
    episode_no INTEGER NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    player_url TEXT NOT NULL
  )`;
}

export async function getEpisodes():Promise<Episode[]>{
  const sql=db();
  if(!sql) return fileEpisodes();

  await ensureTable(sql);

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep58', 58, 'Bigg Boss 20 — Episode 58', '2026-11-02', 'https://biggboss20.live/video-player/1yVByfKeUZdAvsvzgwYFR2kX4anPDQQjc2FsboojyNNaPUj4Et6xvOeA4QDoHC5pe6mK7w0ShLTw-PvTY6t4tSZ6dxwJbzWVCOo9ELCldwyORTTt6duXkYMfZ1CJ3vJ5wyByNxYWgLQB7TB9ArWs05IuZkgwRA3eCwcvihknCqOyr8UrLHs')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep57', 57, 'Bigg Boss 20 — Episode 57', '2026-11-01', 'https://biggboss20.live/video-player/kwyTkt6T-HxXHCccN9VuZKTjR4SWecIu9un3wGfX02ja00lt5lK7BR7mqhYZ16YUxqZ2UK3G0gj3nVlFlFEnyXYI6DZ5MUwGnQ1oAQp3SGwV9kCI_2aUsUXpgU0w-HB9Yc95mTdwHvE_75wUtvXcWqaNx0u5oIEwD672HotsLy_4T677FQE')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep59', 59, 'Bigg Boss 20 — Episode 59', '2026-11-03', 'https://biggboss20.live/video-player/qHllbpVF8kEpY796tGMEbJU1EGz_UP5Bhg92-IrGofhfGGAcuugzDVm43XZKi-t12LdlYK7C-ehePqQ92Bc1LPO_70BcPYaRxHoavspRSPR80LSdqVvteV2z8mI-zeqIpIIEdSD5nMn_EGtBzSHQj0uVnNj9fIb0rUL5GlgAWVzBNeIWrX8')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep60', 60, 'Bigg Boss 20 — Episode 60', '2026-11-04', 'https://biggboss20.live/video-player/SYu4rPwiXjnA-dBPRdwu3JIX_6ydYn80J49LIe_QwKEefdNeJ0RPupl2FxmBVaZ5tpVWMknHP24ttpL05BlQdMFYCNykCn92ubCMEtoSWWooF3M2WOgkEurEC6dOb_O0gUZBXallO344jpnSbKHLe1tAplLIh33c08eWgKzcAVc5sHPX_wE')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep61', 61, 'Bigg Boss 20 — Episode 61', '2026-11-05', 'https://biggboss20.live/video-player/M_j6QUhhJJqDD_XonVubPpKC9spmuDp3JO_FB9vDvcATpML4c9B0d7u7oNXZ4W7scM-tBloPWUDebZjGBdiOO_c5drVuTN-vRu-3po6HAzIHEG1FBcJdzaHxhI0k7pHD7wK50ZwM730lTdXEu7IKuhdLClqVFcMBSeb5x4oddXKNwd_7u1Q')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep62', 62, 'Bigg Boss 20 — Episode 62', '2026-11-06', 'https://biggboss20.live/video-player/f-emNGZYzNx1wU5RMj2MwaoxkVg-BwGx_pmCN19yS4brCChUh7SDZHi7vB2B-PY0xTvFiRbG8frBpVedlL_ruoaULRoiTYZ3pwh6bVTatmC8lmf7i0sF8OqAi4aMri0vSyhr0eoLA4hbj7n5XAW39CnGEgD2lfT5n25fGrrPfJi9ZHZReHg')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep63', 63, 'Bigg Boss 20 — Episode 63', '2026-11-07', 'https://biggboss20.live/video-player/bSMty5Pt61UsyPHOB5djL7z9ZgmNYZPygLsDQt8-7iVNEC03BlEfSSh5j7GQFZsbRXOF49bDlzkBo1BsXc0LT3EAZdE5tbVv6fTCY9DXL5LiU8Tbdu-9v5285TSujDdoaqDy3w7N-GuVd6l5MqyOoJLSLea4uUMFq9nm_qnfEDAw9QpyQCU')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep64', 64, 'Bigg Boss 20 — Episode 64', '2026-11-08', 'https://biggboss20.live/video-player/0WPzOFXFreyiU8Gzq0n94OSycCZ8kMnH7iFWfQkwcwmvocdmm9kWiJCHctdWjF0azWX8FsQ1lFYCYt3VKrbdWOaVljionUxyT98SJmYokiCEcq5cdGoxZjue0K7J3qV3G3hZ99SUz2BgM7Zzh1DI0vINwrz0w9v2ZKFo8zMqD0xZQjKA5r0')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep65', 65, 'Bigg Boss 20 — Episode 65', '2026-11-09', 'https://biggboss20.live/video-player/5Vrcex3NmgyKyr7afhxCe2mAKcVrd7WLGYvL9ww2JNEsGXk6B3E-KNvlgHCtbPICBWUH-SLjNefT_cVSpavtZuABRzGLnCujHVA_eTavWRBgqP0DQoljGMgPYCspt3cRpde9srG5HCWNNA_NA6pRIyqGonMzeqxQPOifHZOPSu0YJQpjrjw')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep66', 66, 'Bigg Boss 20 — Episode 66', '2026-11-10', 'https://biggboss20.live/video-player/2e9pKgOMm7-QALGridkBQGCgt2xEyRCIgeIODoVea1qHaZw8Ex7EE713JD-AfFWIguPcEpM5N0qwYIw4BFVmWDFcvhaXsLTXPjN5GG8PHjNEDjWF9K2GuEvD7wZOugNL4yeVLt0AXIHg08GahjWrdIBX-Mx1YcOWgBpTZndkYXxJVok16LM')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep67', 67, 'Bigg Boss 20 — Episode 67', '2026-11-11', 'https://biggboss20.live/video-player/MmsfVMDJwz2UyfOTrJ7ylT-gcCEUofYvYA4ZQE62iVEb4WKtyUHgtoenn9T4Z8IF-gM5ShQCMZB7apU-0Sc5fi2xna76UT-Flq0Q9FkmZ8X6hNv6YpMlaQXnG3Wh2NEyoF35gkjjln76CjizlcYdRJs6Ac0_J5i2hYh_rTqr0Xos_wobvO4')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep68', 68, 'Bigg Boss 20 — Episode 68', '2026-11-12', 'https://biggboss20.live/video-player/lyylSzRp3oCxfUvfdW0lPHMrRNriH8xlMCoxxxkw0Cl6ZD8dxSgpjJgcY6PeyKRfKrrDEv96qfs7Ajc-NwoYPiqbtDKotFGKAU_a3AV34qJxL0BKzuN3MwNXIsw0JW0BpnQVV__kqPZiZVy5HqlZrIc6k4Pbpj8BvWWza8kGglHMS1Xx-zI')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep69', 69, 'Bigg Boss 20 — Episode 69', '2026-11-13', 'https://biggboss20.live/video-player/Zs05Q5MJzosHLoc2DmRP314vtdsFIU4Spvz2NInSf9CFbMZeV6mHK6_JSXKCXaBQw1EpiZtthRg4el0paChlXtJ1o-AbMlJ_5umXdV7rUts8fPMapYBUo53NIlYzBN1u7dZ-MYDD31AtYZALYHG-2HIMTXBfJEHyAaAnQ-HBZR9UP77sGqk')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep56', 56, 'Bigg Boss 20 — Episode 56', '2026-10-31', 'https://biggboss20.live/video-player/FIxrCYER2BzmYqCUIrm8wfKPYh4QPqTUhz9t3xAN7LsW_YXx8TJaCZqHYaEHi3LmLIUDSqV5NY7fBvtbJpa3U6_ih9tITYS_noR1MPzOazwn3Fn1KVqbzD0_ix5FNAu7bnm1QRNh1DH9UtXF4oVq87H76iHogqb0mwQ7qU6n83SOo2_N9RM')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep55', 55, 'Bigg Boss 20 — Episode 55', '2026-10-30', 'https://biggboss20.live/video-player/vJUi_ecVX096TS23d6BgxBcO8BBdjql3Y8Dm7J9QHt1CDgWcqC0rfJXbC9_o06oApOA_GtgV5KVH6o0RvGcXErmspHJiJfIDb5xIPTkeGNUGhHNrC1MmHFHYj2Uerm5x7LolnvI95WTBMncfWyd-e0wefeBrJISfZ11IOl4YHBhXQc8x3sU')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep54', 54, 'Bigg Boss 20 — Episode 54', '2026-10-29', 'https://biggboss20.live/video-player/n8JYlC4EjV_NAqFbBBcKkWGXmS7mE47WHH8ab_qoJ2PoX8I9k8WoNzqiSz5k06yuJULYLpWMkeQJ9HJVnl6eU_TA9mpa0Z0ae6-62vPq57cnI62aQLWli9LZO8NBmUR0FNBhhgNjAOz5Fql8kH5NzORuFBD112wcmOzTv6ZGId2YikxiZsw')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep53', 53, 'Bigg Boss 20 — Episode 53', '2026-10-28', 'https://biggboss20.live/video-player/MsbAviOxcFtV7c8e21x7gmREUC3a6sS1a4g-sdp36zFOq1Ez_PjJWwlVsuwDZEGmRQr57DAC5MiVSvG77Yt9n6faTnmhZUT_4uUJh5fi5ViOquQ3crvKEPjYsyeHe7eCN3CTCQ1w-5V87lL4LVi7QEBIKl4z8emKd1SCLvQoPOdB26BQAfc')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep52', 52, 'Bigg Boss 20 — Episode 52', '2026-10-27', 'https://biggboss20.live/video-player/yoheML4H7cVdUIfgpiVA646id-kOlngm3-95uaraNG7Jf2xx0_yCSCP_0R3KHoKkH24JxTAJUvrsMsRuk_K9y8QHodLu_xlUFtQq44zqB63N-h_S6vXj6QtQxoORrBfBEP5NFvoAusy-NAIjOD5VCYtnULVR5_ysoV_QRr8mPHYCcbAY9WI')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep48', 48, 'Bigg Boss 20 — Episode 48', '2026-10-23', 'https://biggboss20.live/video-player/g45wHFY7MmE7krDXj3u8t3nF0EZpCkkeYCF_yqG0-7j88ZgPmL5zfBgXoMZxErC4aTZ_Th3-FiUXkOkFqs2ZoXMo0jhE0R8WE1eRAasUVw9ROVWdkQVGZ7Wbwve9TsNfDlQKchuT13KUK2uy_q2JEFOwP-QcUGUkG8xqd4D1PRKU1AyaUAU')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep47', 47, 'Bigg Boss 20 — Episode 47', '2026-10-22', 'https://biggboss20.live/video-player/ZF7iJtpvVC45es_oU-4z3rHkBr6PT0sgpL16MZpY_2PfMfv__m84SsfrExs72OnxkFCrIy-6Hn1A9dersn5kRix9PW8qQgIGcGv5E8tpvW9AL7t0946PLQoGOJsE96PPGhw1Yq1zB7V0arLspW3njIXIckKWdlHOCfrGmkXStkwT6NixRe0')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep51', 51, 'Bigg Boss 20 — Episode 51', '2026-10-26', 'https://biggboss20.live/video-player/Ww_1D5Q8MuFIIbKiJDpSwsO6W198_1YamgY4iJwokbUuoC9CypckzuBz48lYAvAuqhNniTDi-7Z0HNIUwF1u0HpeNfhvjxvEXAQ9a-cq_5M4OIry6j_lFkM7qqD1ibuXHI-80K4NDh97eAY-YwZx-V0HljRdssk-JYK2oyp8kk2Q6gAeFwQ')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep50', 50, 'Bigg Boss 20 — Episode 50', '2026-10-25', 'https://biggboss20.live/video-player/xYQbaYDHCeWUzEQAX8ZTKjXahvt8GIREDzoUe5lOXAUuwsmkMdqY1n4CF9nGviCdNgw0VkPU7JHWwhp_X7I-ZnOH95K8z3aVLoG8aHcEyXFrvhcnhaWlUHDpc5k2Aay_ENxARjZQfrmU4_TjF__FbZFDnOuAljfOIl9Cd754t3c-TjDBw_A')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep49', 49, 'Bigg Boss 20 — Episode 49', '2026-10-24', 'https://biggboss20.live/video-player/hpmsksZmJt1qEpVJq_SO4vIXFDwTVtHLv45VHrkDOBiRUPiKnT8s2EcAesN25BWn8q6__i9hlgXYDEq-X1jSXQV2riHp1czumsmPh8sJJCYq-N3yzcqVQXRbpNseLlYGJ_1e0WBPpWosmmPohYQ3ODpq6lnAsKQfB5Bh1De8R7d6t5Lapl8')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep46', 46, 'Bigg Boss 20 — Episode 46', '2026-10-21', 'https://biggboss20.live/video-player/Jaz2X452Bl12H1sPkqqC-YrukgnpSgcVUIhBcFGkN2iYnxs8MdR65stIozx0MY9E59acYtFAS5RwzCA6n8E5xg6U5xJsWjQI_GxzyTkXrbHJwkp1Snhcrg7XHe3a_X5coi2ZGOW8cS04n40tdVynsvwxCWfOtQGTd7Myp668tGVXdSiA1u0')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep45', 45, 'Bigg Boss 20 — Episode 45', '2026-10-20', 'https://biggboss20.live/video-player/iQwxviPtmlc9HKiNGgtXRrWJl-cwGz0t7KxxW6ZGWgMeIF2_Myhye8RjSTB5Qw2CP9i1I8paGWNRjMhxG4kXe0fu_NzfoO3eg0uK6dd-iNJiUCCF2gWya6_Jt6Z1ufeyUXG4DbChELr4xUmLhvB0w8BwIm2jbxFhlyVaaMavxSVEboafYfk')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;

  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep44', 44, 'Bigg Boss 20 — Episode 44', '2026-10-19', 'https://biggboss20.live/video-player/Cx7JwXqUBUBgfGscOQd6gTIvhp8oN7EYBtxEk-BcZNBSWR_AK2-utvm8hhjbjQ2JmmouY7DW5Qsk3TbBGdHulUhu1LGCX5b2QmegEWOnXcRvvqmSAy80CDgBqUODvWXLUKuquUevhLNMKFkoKQ9-zEPF_f9MH2CiJGbux-epJVFBlERMA4A')
    ON CONFLICT (id) DO UPDATE SET player_url = EXCLUDED.player_url, title = EXCLUDED.title, date = EXCLUDED.date`;


  await sql`DELETE FROM episodes WHERE episode_no = 43`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep43', 43, 'Bigg Boss 20 — Episode 43', '2026-10-18', 'https://biggboss20.live/video-player/VVuVMlhlOAEmCH9lt8Hsi023bUY3BFJTyXvFAJDfboSRHbvglpGSxMoqIcLV1ptPLKijdghab_WRLvCWwnFq_oGahLD_vtalKoV3HwmojnAcPJgEdHkRJeD4iUDeW7EUxIiASIn7agFU1mZmGi9Lr94gx9ensyKYckcgggEJyOby1oht7jQ')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 42`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep42', 42, 'Bigg Boss 20 — Episode 42', '2026-10-17', 'https://biggboss20.live/video-player/bt0unOGnL_hdoroP6gyHb3gGJAOQXUsuTRPy2_qBNMxEiaOjET7-9FWKA8rq-jFWhbGN_M5jpT49VKJ2J7BLsSt38_lBp8nUQTRLjc1z2HdWEtJrvtzKAVdEktSPfmsrSfvfvebvQsLGPr0bMDsQKL1CLbb2gbLrc2ebdM9ivGuFe_J6zSQ')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 41`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep41', 41, 'Bigg Boss 20 — Episode 41', '2026-10-16', 'https://biggboss20.live/video-player/35tIxjZ9n-_U5vgz6yxU9s02j_tGVpwPTI6B4ccXqIV4nFkplPHiR-OGL8hLqZTHN36RbKcgtoJ5wySdN-g8qwrX0Av6QG51KTyaeG5dsJZt9xqJUMrWvy6bXmFq_iHo-ugVdl4UU8iyV4cAlAi1bnpYQmcvNbOnCSRxjU1aNJDX1S5zJX8')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 40`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep40', 40, 'Bigg Boss 20 — Episode 40', '2026-10-15', 'https://biggboss20.live/video-player/UFCu16Lgpj8h4xP-VtrVSr1YQ-V_1wm71YbNUONfBmqRIVOk17twlFmuLxKZn7ZbTVW4EcJADCM54xUkwE9QZ9fD-zAmOKZqEWf6egS14PFS2JuNy2FRTIdM-UDV_sEypvmQUgdZoC9gBb-8WL5jtK52HTNSFRxlAGpG7jAoLYukpqAdjPc')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  for (const [episodeNo, sourceUrl] of Object.entries(SOURCE_URL_MIGRATIONS)) {
    await sql`UPDATE episodes
      SET player_url = ${sourceUrl}
      WHERE episode_no = ${Number(episodeNo)}
        AND player_url NOT LIKE 'https://articleweb.xyz/%'`;
  }

  await sql`DELETE FROM episodes WHERE episode_no = 39`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep39', 39, 'Bigg Boss 20 — Episode 39', '2026-10-14', 'https://biggboss20.live/video-player/Kqx9IdhTKBmX515Fqn2BMdAUtdcS4vj0EIWr3CIDmcw-LZbXDEJZ5UFuZu7zj9kjn0bqqu-iCKYhmAJMFbET4T3Qe-zoTAEz5Vfe1-FtZ6YdxEL_ChNgnDfxgHq_GxvP76sIjlNeib5agFB5pzRkNSMSMyciW3JaNwXy-dQq4-xOSoEUWjo')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 38`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep38', 38, 'Bigg Boss 20 — Episode 38', '2026-10-13', 'https://biggboss20.live/video-player/VJ18YobVTvx6Xp7arvkkjb1LeiPziDI7vZY2ZcenwHvjYGB6tizkq4J7Pe5S_UsPS3uKqbsbRTx1iudixVQ7hiC6H-fn7xxSBiAJl-P-PxS_b1EMs5X1yudp0R9o30S-gVreOMdYhv8MfLEa7m2hk4gZvgA8-e6Dpm78FgDAETCuEgbBvbw')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 37`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep37', 37, 'Bigg Boss 20 — Episode 37', '2026-10-12', 'https://biggboss20.live/video-player/8xGQCf6-O9bg0E_bCcT0mrkuf5vHVu_4C6hzLF5gEKluz96uZcuTNu4-tn4q29FC9c0cH6PgoihvhB1jwdUrWj2MnniJjJNg7_TT-JX_Uq8xmbNJSGd4zW5pMOah4CRhMeAXnQHaer1PyE9lb8K1FrwcrAZU5VtF72X0rPIPImn0FB3VgvM')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 36`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep36', 36, 'Bigg Boss 20 — Episode 36', '2026-10-11', 'https://biggboss20.live/video-player/y6oev8-gwLQ2mNvkSJUY5nyK8ZN5W_HNgv_MYLKFjjtk5bZ5U_F3sywK_e4RKjaO_4raW6D32yOkhgWox1vZu0cvG2252j5kOLnqadu0B0B7ksicX2mkWU2bms5YUpKxES6Q79YZh1L6KhgcA8EA65LdHMPZT4yjkYp1HaUsH_QIJJ88LVU')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 35`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep35', 35, 'Bigg Boss 20 — Episode 35', '2026-10-10', 'https://biggboss20.live/video-player/N6MGtnn213YXuiyMEAfUbX_MzsP6TbM5ffwcE-zJaKB-3taP5G_JopdWMVK7By9evGQUPCFOSLiOJ_3lvcCDe0E3OlcCgba8a8qmfZv7jQgAaaUay1mT3bxDfQNHLVEi2WTMUTCncpsuq_YZ_zDA1UI112TohtRuuZ8kNFcLOkkoK2JatOI')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 34`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep34', 34, 'Bigg Boss 20 — Episode 34', '2026-10-09', 'https://articleweb.xyz/vid/gofile.php?id=OqcxbMRgquqg3w')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 33`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep33', 33, 'Bigg Boss 20 — Episode 33', '2026-10-08', 'https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 32`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep32', 32, 'Bigg Boss 20 — Episode 32', '2026-10-07', 'https://articleweb.xyz/vid/gofile.php?id=vorh1TQ1qAvmEg')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 31`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep31', 31, 'Bigg Boss 20 — Episode 31', '2026-10-06', 'https://articleweb.xyz/vid/gofile.php?id=awIT7U3qcY13_w')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 30`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep30', 30, 'Bigg Boss 20 — Episode 30', '2026-10-05', 'https://articleweb.xyz/vid/gofile.php?id=FPpOkRJdo1sToA')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 29`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep29', 29, 'Bigg Boss 20 — Episode 29', '2026-10-04', 'https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  await sql`DELETE FROM episodes WHERE episode_no = 28`;
  await sql`INSERT INTO episodes (id, episode_no, title, date, player_url)
    VALUES ('bb20-ep28', 28, 'Bigg Boss 20 — Episode 28', '2026-10-03', 'https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw')
    ON CONFLICT (id) DO UPDATE SET
      player_url = EXCLUDED.player_url,
      title = EXCLUDED.title,
      date = EXCLUDED.date`;

  const rows=await sql`SELECT id, episode_no, title, date, player_url
    FROM episodes ORDER BY episode_no DESC`;

  if(!rows.length){
    const seed=fileEpisodes();
    for(const ep of seed){
      await sql`INSERT INTO episodes (id,episode_no,title,date,player_url)
        VALUES (${ep.id},${ep.episodeNo},${ep.title},${ep.date},${ep.playerUrl})
        ON CONFLICT (id) DO NOTHING`;
    }
    return seed.sort((a,b)=>b.episodeNo-a.episodeNo);
  }

  const episodes = rows.map((r:any)=>({
    id:String(r.id),
    episodeNo:Number(r.episode_no),
    title:String(r.title),
    date:String(r.date),
    playerUrl:String(r.player_url)
  }));

  if (!episodes.some((ep) => ep.episodeNo === 29)) {
    episodes.push({
      id: "bb20-ep29",
      episodeNo: 29,
      title: "Bigg Boss 20 — Episode 29",
      date: "2026-10-04",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=iAXzDcKk-GkA0A"
    });
  }

  if (!episodes.some((ep) => ep.episodeNo === 28)) {
    episodes.push({
      id: "bb20-ep28",
      episodeNo: 28,
      title: "Bigg Boss 20 — Episode 28",
      date: "2026-10-03",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw"
    });
  }

  return episodes.sort((a,b)=>b.episodeNo-a.episodeNo);
}

export async function saveEpisodes(episodes:Episode[]):Promise<void>{
  const sql=db();

  if(!sql){
    fs.writeFileSync(filePath,JSON.stringify(episodes,null,2),"utf8");
    return;
  }

  await ensureTable(sql);
  await sql`DELETE FROM episodes`;

  for(const ep of episodes){
    await sql`INSERT INTO episodes (id,episode_no,title,date,player_url)
      VALUES (${ep.id},${ep.episodeNo},${ep.title},${ep.date},${ep.playerUrl})`;
  }
}
