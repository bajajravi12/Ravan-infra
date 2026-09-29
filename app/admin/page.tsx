"use client";
import {useState} from "react";

type Episode={id:string;episodeNo:number;title:string;date:string;playerUrl:string};
const blank={episodeNo:"",title:"",date:"",playerUrl:""};

export default function Admin(){
  const [episodes,setEpisodes]=useState<Episode[]>([]);
  const [key,setKey]=useState("");
  const [unlocked,setUnlocked]=useState(false);
  const [form,setForm]=useState(blank);
  const [editing,setEditing]=useState<string|null>(null);
  const [msg,setMsg]=useState("");

  async function load(adminKey=key){
    const r=await fetch("/api/episodes",{headers:{"x-admin-key":adminKey}});
    const d=await r.json();
    if(!r.ok){setUnlocked(false);setMsg(d.error||"Invalid admin key");return false;}
    setEpisodes(d);setUnlocked(true);setMsg("");return true;
  }

  async function unlock(e:React.FormEvent){
    e.preventDefault();
    await load(key);
  }

  async function submit(e:React.FormEvent){
    e.preventDefault(); setMsg("");
    const url=editing?"/api/episodes/"+editing:"/api/episodes";
    const method=editing?"PUT":"POST";
    const r=await fetch(url,{method,headers:{"Content-Type":"application/json","x-admin-key":key},body:JSON.stringify({...form,episodeNo:Number(form.episodeNo)})});
    const d=await r.json();
    if(!r.ok){setMsg(d.error||"Failed");return}
    setForm(blank);setEditing(null);setMsg(editing?"Episode updated ✓":"Episode added ✓");load();
  }

  function edit(ep:Episode){
    setEditing(ep.id);
    setForm({episodeNo:String(ep.episodeNo),title:ep.title,date:ep.date,playerUrl:ep.playerUrl});
    window.scrollTo({top:0,behavior:"smooth"});
  }

  async function remove(id:string){
    if(!confirm("Delete this episode?"))return;
    const r=await fetch("/api/episodes/"+id,{method:"DELETE",headers:{"x-admin-key":key}});
    const d=await r.json();
    setMsg(d.error||"Deleted ✓");
    if(r.ok)load();
  }

  if(!unlocked) return <section className="shell page admin">
    <div className="adminGrid">
      <form className="panel" onSubmit={unlock}>
        <div className="eyebrow">PRIVATE AREA</div>
        <h1>Admin Access</h1>
        <p>Admin panel sirf authorized key ke saath open hoga.</p>
        <label>Admin Key<input value={key} onChange={e=>setKey(e.target.value)} type="password" placeholder="ADMIN_KEY" autoFocus required/></label>
        <button className="primary" type="submit">Unlock Admin →</button>
        {msg&&<div className="msg">{msg}</div>}
      </form>
    </div>
  </section>;

  return <section className="shell page admin">
    <div className="sectionHead"><div><div className="eyebrow">CONTROL PANEL</div><h1>Episode Admin</h1><p>Future me naye episodes, title aur player links yahin se manage karo.</p></div></div>
    <div className="adminGrid">
      <form className="panel" onSubmit={submit}>
        <h2>{editing?"Edit Episode":"Add New Episode"}</h2>
        <label>Episode No.<input value={form.episodeNo} onChange={e=>setForm({...form,episodeNo:e.target.value})} type="number" min="1" required/></label>
        <label>Episode Title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Bigg Boss 20 — 27 September 2026" required/></label>
        <label>Episode Date<input value={form.date} onChange={e=>setForm({...form,date:e.target.value})} type="date" required/></label>
        <label>Player / Video URL<input value={form.playerUrl} onChange={e=>setForm({...form,playerUrl:e.target.value})} placeholder="https://..." type="url" required/></label>
        <button className="primary" type="submit">{editing?"✓ Update Episode":"＋ Add Episode"}</button>
        {editing&&<button type="button" className="secondary cancelBtn" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel Edit</button>}
        {msg&&<div className="msg">{msg}</div>}
      </form>

      <div className="panel">
        <h2>All Episodes ({episodes.length})</h2>
        {episodes.sort((a,b)=>b.episodeNo-a.episodeNo).map(ep=><div className="adminRow" key={ep.id}>
          <div><b>EP {ep.episodeNo}</b><span>{ep.title}</span><small>{ep.date}</small></div>
          <div className="rowActions"><button className="editBtn" onClick={()=>edit(ep)}>Edit</button><button className="danger" onClick={()=>remove(ep.id)}>Delete</button></div>
        </div>)}
      </div>
    </div>
    <p className="note">Production me strong <code>ADMIN_KEY</code> environment variable zaroor set karna. API bhi key ke bina episode management allow nahi karegi.</p>
  </section>;
}