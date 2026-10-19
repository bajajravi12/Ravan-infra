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
    return [{
    { id: "bb20-ep43", episodeNo: 43, title: "Bigg Boss 20 — Episode 43", date: "2026-10-18", playerUrl: "https://biggboss20.live/video-player/VVuVMlhlOAEmCH9lt8Hsi023bUY3BFJTyXvFAJDfboSRHbvglpGSxMoqIcLV1ptPLKijdghab_WRLvCWwnFq_oGahLD_vtalKoV3HwmojnAcPJgEdHkRJeD4iUDeW7EUxIiASIn7agFU1mZmGi9Lr94gx9ensyKYckcgggEJyOby1oht7jQ" },
    { id: "bb20-ep42", episodeNo: 42, title: "Bigg Boss 20 — Episode 42", date: "2026-10-17", playerUrl: "https://biggboss20.live/video-player/bt0unOGnL_hdoroP6gyHb3gGJAOQXUsuTRPy2_qBNMxEiaOjET7-9FWKA8rq-jFWhbGN_M5jpT49VKJ2J7BLsSt38_lBp8nUQTRLjc1z2HdWEtJrvtzKAVdEktSPfmsrSfvfvebvQsLGPr0bMDsQKL1CLbb2gbLrc2ebdM9ivGuFe_J6zSQ" },
    { id: "bb20-ep41", episodeNo: 41, title: "Bigg Boss 20 — Episode 41", date: "2026-10-16", playerUrl: "https://biggboss20.live/video-player/35tIxjZ9n-_U5vgz6yxU9s02j_tGVpwPTI6B4ccXqIV4nFkplPHiR-OGL8hLqZTHN36RbKcgtoJ5wySdN-g8qwrX0Av6QG51KTyaeG5dsJZt9xqJUMrWvy6bXmFq_iHo-ugVdl4UU8iyV4cAlAi1bnpYQmcvNbOnCSRxjU1aNJDX1S5zJX8" },
    { id: "bb20-ep40", episodeNo: 40, title: "Bigg Boss 20 — Episode 40", date: "2026-10-15", playerUrl: "https://biggboss20.live/video-player/UFCu16Lgpj8h4xP-VtrVSr1YQ-V_1wm71YbNUONfBmqRIVOk17twlFmuLxKZn7ZbTVW4EcJADCM54xUkwE9QZ9fD-zAmOKZqEWf6egS14PFS2JuNy2FRTIdM-UDV_sEypvmQUgdZoC9gBb-8WL5jtK52HTNSFRxlAGpG7jAoLYukpqAdjPc" },
      id: "bb20-ep39",
      episodeNo: 39,
      title: "Bigg Boss 20 — Episode 39",
      date: "2026-10-14",
      playerUrl: "https://biggboss20.live/video-player/Kqx9IdhTKBmX515Fqn2BMdAUtdcS4vj0EIWr3CIDmcw-LZbXDEJZ5UFuZu7zj9kjn0bqqu-iCKYhmAJMFbET4T3Qe-zoTAEz5Vfe1-FtZ6YdxEL_ChNgnDfxgHq_GxvP76sIjlNeib5agFB5pzRkNSMSMyciW3JaNwXy-dQq4-xOSoEUWjo"
    }, {
      id: "bb20-ep38",
      episodeNo: 38,
      title: "Bigg Boss 20 — Episode 38",
      date: "2026-10-13",
      playerUrl: "https://biggboss20.live/video-player/VJ18YobVTvx6Xp7arvkkjb1LeiPziDI7vZY2ZcenwHvjYGB6tizkq4J7Pe5S_UsPS3uKqbsbRTx1iudixVQ7hiC6H-fn7xxSBiAJl-P-PxS_b1EMs5X1yudp0R9o30S-gVreOMdYhv8MfLEa7m2hk4gZvgA8-e6Dpm78FgDAETCuEgbBvbw"
    }, {
      id: "bb20-ep35",
      episodeNo: 35,
      title: "Bigg Boss 20 — Episode 35",
      date: "2026-10-10",
      playerUrl: "https://articleweb.xyz/vid/mobile.php?id=3yHxxwi32dLZBQ"
    }, {
      id: "bb20-ep28",
      episodeNo: 28,
      title: "Bigg Boss 20 — Episode 28",
      date: "2026-10-03",
      playerUrl: "https://articleweb.xyz/vid/gofile.php?id=bCQt4ecbb1FBcw"
    }];
  }
}

function db(){
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

const SOURCE_URL_MIGRATIONS: Record<number, string> = {
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
