/// <reference types="@cloudflare/workers-types" />
export interface Env {
  DB: D1Database;
  ADMIN_KEY: string;
}

type Episode = {
  id: string;
  episode_no: number;
  title: string;
  date: string;
  player_url: string;
};

const ALLOWED_SOURCE_HOSTS = ["articleweb.xyz"];

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers || {}),
    },
  });
}

function isAllowedSource(url: string) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return ALLOWED_SOURCE_HOSTS.some((x) => host === x || host.endsWith("." + x));
  } catch {
    return false;
  }
}

function normalizeHtml(value: string) {
  return value
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&")
    .replace(/\\u0026/g, "&")
    .replace(/\\u003d/g, "=");
}

async function resolveArticleWeb(sourceUrl: string) {
  if (!isAllowedSource(sourceUrl)) throw new Error("Unsupported source host");

  const first = await fetch(sourceUrl, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!first.ok) throw new Error(`Source returned HTTP ${first.status}`);
  const html = normalizeHtml(await first.text());

  const direct = html.match(
    /https:\/\/streaming\.disk\.yandex\.net\/hls\/[^"'<>\s]+?master-playlist\.m3u8/i
  );
  if (direct?.[0]) return direct[0];

  const intermediate = html.match(
    /(?:https?:)?\/\/[^"'<>\s]+gdrive\.php[^"'<>\s]*/i
  );
  if (!intermediate?.[0]) throw new Error("No intermediate video URL found");

  const nextUrl = new URL(
    intermediate[0].replace(/^\\?\//, "/"),
    sourceUrl
  ).toString();

  if (!isAllowedSource(nextUrl)) throw new Error("Unsupported intermediate host");

  const second = await fetch(nextUrl, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!second.ok) throw new Error(`Intermediate URL returned HTTP ${second.status}`);
  const html2 = normalizeHtml(await second.text());

  const hls = html2.match(
    /https:\/\/streaming\.disk\.yandex\.net\/hls\/[^"'<>\s]+?master-playlist\.m3u8/i
  );

  if (!hls?.[0]) throw new Error("Playable HLS stream was not found");
  return hls[0];
}

async function listEpisodes(env: Env) {
  // Idempotent source migration: ensure the latest episode is present even
  // when the D1 schema seed was applied before this episode was added.
  await env.DB.prepare(
    "INSERT INTO episodes (id, episode_no, title, date, player_url) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title, date=excluded.date, player_url=excluded.player_url"
  ).bind(
    "bb20-ep33",
    33,
    "Bigg Boss 20 — Episode 33",
    "2026-10-08",
    "https://articleweb.xyz/vid/gofile.php?id=Ni4VUaMQbP97ww"
  ).run();

  return env.DB.prepare(
    "SELECT id, episode_no, title, date, player_url FROM episodes ORDER BY episode_no DESC"
  ).all<Episode>();
}

function page(title: string, body: string, script = "") {
  return new Response(`<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#080b14;color:#f4f7ff;font-family:Inter,system-ui,sans-serif}
.wrap{max-width:1100px;margin:auto;padding:24px}.top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:24px}
h1{margin:0;font-size:28px}.muted{color:#8f9bb3}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.card{background:#111728;border:1px solid #202b42;border-radius:18px;padding:18px}.ep{font-size:14px;color:#8fa8ff;font-weight:700}
button,a{border:0;border-radius:12px;padding:11px 15px;text-decoration:none;font-weight:700;cursor:pointer}
.btn{background:#5b6cff;color:white}.danger{background:#d94760;color:white}.back{color:#9fb0ff;background:#151c2d}
input{width:100%;padding:13px;border-radius:11px;border:1px solid #2b3854;background:#0c1120;color:white;margin:6px 0 12px}
form{background:#111728;border:1px solid #202b42;border-radius:18px;padding:18px;margin-bottom:22px}
.player{position:relative;background:#000;border-radius:18px;overflow:hidden;aspect-ratio:16/9}.player video{width:100%;height:100%}
.row{display:flex;gap:10px;flex-wrap:wrap}.small{font-size:13px}
</style></head><body><main class="wrap">${body}</main><script>${script}</script></body></html>`,{headers:{"content-type":"text/html;charset=UTF-8"}});
}

async function home(env: Env) {
  const result = await listEpisodes(env);
  const episodes = result.results || [];
  const cards = episodes.map((e) => `<article class="card">
    <div class="ep">EP ${e.episode_no}</div><h2>${escapeHtml(e.title)}</h2>
    <div class="muted small">${escapeHtml(e.date)}</div>
    <br><a class="btn" href="/watch/${encodeURIComponent(e.id)}">▶ Watch</a>
  </article>`).join("");
  return page("Bigg Boss 20", `<div class="top"><div><div class="muted">RAVAN INFRA</div><h1>Bigg Boss 20</h1></div><a class="back" href="/admin">Admin</a></div>
  <div class="grid">${cards || '<div class="card">No episodes yet.</div>'}</div>`);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]!));
}

async function watch(env: Env, id: string) {
  const ep = await env.DB.prepare(
    "SELECT id, episode_no, title, date, player_url FROM episodes WHERE id=?"
  ).bind(id).first<Episode>();
  if (!ep) return new Response("Episode not found", { status: 404 });

  const safeId = encodeURIComponent(ep.id);
  const script = `(async()=>{const s=document.getElementById("status"),v=document.getElementById("v");
  try{
    const r=await fetch("/api/stream/${safeId}");const d=await r.json();
    if(!r.ok)throw Error(d.error||"Stream error");
    if(v.canPlayType("application/vnd.apple.mpegurl")){v.src=d.hlsUrl;s.textContent="Ready";return;}
    const tag=document.createElement("script");
    tag.src="https://cdn.jsdelivr.net/npm/hls.js@1.6.15/dist/hls.min.js";
    tag.onload=()=>{if(!window.Hls||!Hls.isSupported()){s.textContent="HLS is not supported";return;}
      const h=new Hls();h.loadSource(d.hlsUrl);h.attachMedia(v);
      h.on(Hls.Events.MANIFEST_PARSED,()=>s.textContent="Ready");};
    tag.onerror=()=>{s.textContent="HLS player library failed to load"};
    document.head.appendChild(tag);
  }catch(e){s.textContent=e.message||"Unable to play";}
  })();`;
  return page(ep.title,
    '<div class="top"><a class="back" href="/">← Episodes</a><div class="ep">EP '+ep.episode_no+'</div></div>' +
    '<h1>'+escapeHtml(ep.title)+'</h1><div class="muted">'+escapeHtml(ep.date)+'</div><br>' +
    '<div class="player"><video id="v" controls playsinline></video></div><p id="status" class="muted">Resolving HLS…</p>',
    script);
}

async function admin(env: Env) {
  const script = `const k=document.getElementById("key");k.value=localStorage.getItem("adminKey")||"";
  async function load(){
    const r=await fetch("/api/episodes");const d=await r.json();
    document.getElementById("list").innerHTML=(d.results||[]).map(e =>
      '<div class="card"><div class="ep">EP '+e.episode_no+'</div><b>'+e.title+
      '</b><div class="muted small">'+e.date+
      '</div><br><button class="danger" onclick="del(\\''+e.id+'\\')">Delete</button></div>'
    ).join("");
  }
  document.getElementById("f").onsubmit=async(e)=>{
    e.preventDefault();localStorage.setItem("adminKey",k.value);
    const r=await fetch("/api/episodes",{method:"POST",headers:{"content-type":"application/json","x-admin-key":k.value},
      body:JSON.stringify({episodeNo:+no.value,title:title.value,date:date.value,playerUrl:url.value})});
    const d=await r.json();if(!r.ok)return alert(d.error);alert("Saved");load();
  };
  async function del(id){
    if(!confirm("Delete episode?"))return;
    const r=await fetch("/api/episodes/"+encodeURIComponent(id),{method:"DELETE",headers:{"x-admin-key":k.value}});
    const d=await r.json();if(!r.ok)return alert(d.error);load();
  }
  load();`;
  return page("Admin",
    '<div class="top"><div><div class="muted">RAVAN INFRA</div><h1>Episode Admin</h1></div><a class="back" href="/">Home</a></div>' +
    '<form id="f"><label>Admin Key</label><input id="key" type="password" required>' +
    '<label>Episode No</label><input id="no" type="number" required>' +
    '<label>Title</label><input id="title" value="Bigg Boss 20 — Episode " required>' +
    '<label>Date</label><input id="date" type="date" required>' +
    '<label>Source URL</label><input id="url" type="url" placeholder="https://articleweb.xyz/vid/gofile.php?id=..." required>' +
    '<button class="btn">Save Episode</button></form><div id="list" class="grid"></div>',
    script);
}


export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "GET" && path === "/") return home(env);
    if (request.method === "GET" && path === "/admin") return admin(env);

    if (request.method === "GET" && path === "/api/episodes") {
      return json(await listEpisodes(env));
    }

    if (request.method === "POST" && path === "/api/episodes") {
      if (request.headers.get("x-admin-key") !== env.ADMIN_KEY) return json({error:"Unauthorized"},{status:401});
      const b = await request.json<any>();
      const episodeNo = Number(b.episodeNo);
      if (!Number.isInteger(episodeNo) || episodeNo < 1) return json({error:"Invalid episode number"},{status:400});
      if (!b.title || !b.date || !b.playerUrl || !isAllowedSource(b.playerUrl)) return json({error:"Invalid title/date/source URL"},{status:400});
      const id = `bb20-ep${episodeNo}`;
      await env.DB.prepare("INSERT INTO episodes (id,episode_no,title,date,player_url) VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,date=excluded.date,player_url=excluded.player_url")
        .bind(id,episodeNo,String(b.title),String(b.date),String(b.playerUrl)).run();
      return json({ok:true,id});
    }

    if (request.method === "DELETE" && path.startsWith("/api/episodes/")) {
      if (request.headers.get("x-admin-key") !== env.ADMIN_KEY) return json({error:"Unauthorized"},{status:401});
      const id = decodeURIComponent(path.split("/").pop() || "");
      await env.DB.prepare("DELETE FROM episodes WHERE id=?").bind(id).run();
      return json({ok:true});
    }

    if (request.method === "GET" && path.startsWith("/api/stream/")) {
      const id = decodeURIComponent(path.split("/").pop() || "");
      const ep = await env.DB.prepare("SELECT id,episode_no,title,date,player_url FROM episodes WHERE id=?").bind(id).first<Episode>();
      if (!ep) return json({error:"Episode not found"},{status:404});
      try { const hlsUrl = await resolveArticleWeb(ep.player_url); return json({episodeId:ep.id,episodeNo:ep.episode_no,hlsUrl}); }
      catch (e) { return json({error:e instanceof Error?e.message:"Stream resolution failed"},{status:502}); }
    }

    if (path.startsWith("/watch/") && request.method === "GET") {
      return watch(env, decodeURIComponent(path.slice("/watch/".length)));
    }

    return new Response("Not Found", {status:404});
  }
};