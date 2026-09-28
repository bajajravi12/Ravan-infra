"use client";
import {useEffect,useState} from "react";

type Episode={id:string;episodeNo:number;title:string;date:string;playerUrl:string};

export default function Admin(){
  const [episodes,setEpisodes]=useState<Episode[]>([]);
  const [key,setKey]=useState("");
  const [form,setForm]=useState({episodeNo:"",title:"",date:"",playerUrl:""});
  const [msg,setMsg]=useState("");
  const load=()=>fetch("/api/episodes").then(r=>r.json()).then(setEpisodes);
  useEffect(()=>{load()},[]);
  async function add(e:React.FormEvent){
    e.preventDefault();setMsg("");
    const r=await fetch("/api/episodes",{method:"POST",headers:{"Content-Type":"application/json","x-admin-key":key},body:JSON.stringify({...form,episodeNo:Number(form.episodeNo)})});
    const d=await r.json(); if(!r.ok){setMsg(d.error||"Failed");return}
    setForm({episodeNo:"",title:"",date:"",playerUrl:""});setMsg("Episode added ✓");load();
  }
  async function remove(id:string){
    if(!confirm("Delete this episode?"))return;
    const r=await fetch("/api/episodes/"+id,{method:"DELETE",headers:{"x-admin-key":key}});
    const d=await r.json();setMsg(d.error||"Deleted ✓");if(r.ok)load();
  }
  return <section className="shell page admin">
    <div className="sectionHead"><div><div className="eyebrow">CONTROL PANEL</div><h1>Episode Admin</h1><p>Add or remove episode player links.</p></div></div>
    <div className="adminGrid">
      <form className="panel" onSubmit={add}><h2>Add Episode</h2><label>Admin Key<input value={key} onChange={e=>setKey(e.target.value)} type="password" placeholder="ADMIN_KEY" required/></label><label>Episode No.<input value={form.episodeNo} onChange={e=>setForm({...form,episodeNo:e.target.value})} type="number" required/></label><label>Title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Bigg Boss 20 — 27 September 2026" required/></label><label>Date<input value={form.date} onChange={e=>setForm({...form,date:e.target.value})} type="date" required/></label><label>Player URL<input value={form.playerUrl} onChange={e=>setForm({...form,playerUrl:e.target.value})} placeholder="https://..." type="url" required/></label><button className="primary" type="submit">＋ Add Episode</button>{msg&&<div className="msg">{msg}</div>}</form>
      <div className="panel"><h2>Episodes</h2>{episodes.map(ep=><div className="adminRow" key={ep.id}><div><b>EP {ep.episodeNo}</b><span>{ep.title}</span></div><button className="danger" onClick={()=>remove(ep.id)}>Delete</button></div>)}</div>
    </div>
    <p className="note">For production, set a strong <code>ADMIN_KEY</code> environment variable. File-based storage persists on a normal VPS/server filesystem; serverless hosts may require a database.</p>
  </section>;
}