"use client";
import { useState } from "react";

export default function Home(){
  const [loading,setLoading]=useState(false)
  const [resp,setResp]=useState<any>(null)
  const [err,setErr]=useState<string>()

  async function onSubmit(e:any){
    e.preventDefault(); setLoading(true); setErr(undefined)
    const body = Object.fromEntries(new FormData(e.target).entries())
    const r = await fetch("/api/mapa",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})
    const j = await r.json(); if(!r.ok){ setErr(j.error||"Erro"); setLoading(false); return }
    setResp(j); setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 16px'}}>
      <div style={{width:'100%', maxWidth:720, textAlign:'center'}}>
        <h1 style={{fontSize:32, marginBottom:16}}>
          Mapa Védico da Prema Sundari <span style={{color:'#C9A227'}}>☾</span>
        </h1>

        {/* CARTÃO DO FORMULÁRIO */}
        <form onSubmit={onSubmit} className="card" id="form" style={{margin:'0 auto', maxWidth:520, textAlign:'left'}}>
          <label>Seu nome</label>
          <input className="input" name="nome" required style={{marginTop:6, marginBottom:12}}/>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div>
              <label>Data de nascimento</label>
              <input className="input" type="date" name="data" required style={{marginTop:6}}/>
            </div>
            <div>
              <label>Hora (opcional)</label>
              <input className="input" type="time" name="hora" style={{marginTop:6}}/>
            </div>
          </div>

          <label style={{marginTop:12, display:'block'}}>Cidade de nascimento</label>
          <input className="input" name="cidade" required style={{marginTop:6}}/>

          <label style={{marginTop:12, display:'block'}}>País</label>
          <input className="input" name="pais" required style={{marginTop:6}}/>

          <label style={{fontSize:12, display:'flex', alignItems:'center', gap:8, marginTop:12}}>
            <input type="checkbox" name="consent" value="true" required/> Concordo em receber meu mapa e comunicações (LGPD).
          </label>

          <button className="btn" disabled={loading} style={{marginTop:16, width:'100%'}}>
            {loading? "Gerando…" : "Gerar Mapa"}
          </button>
          {err && <div style={{color:'#b00020', fontSize:12, marginTop:8}}>{err}</div>}
        </form>

        {/* CARTÃO DO RESULTADO */}
        <div style={{marginTop:20}}>
          {resp ? (
            <div className="card" style={{margin:'0 auto', maxWidth:520, textAlign:'left'}}>
              <h2 style={{fontSize:22, marginBottom:8}}>Seu Resultado</h2>
              <p><b>Ascendente:</b> {resp.ascendente ?? "—"}</p>
              <p><b>Sol:</b> {resp.sol}</p>
              <p><b>Lua:</b> {resp.lua}</p>
              <a className="link" href={resp.pdfUrl} target="_blank" rel="noreferrer">Abrir “PDF”</a>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
