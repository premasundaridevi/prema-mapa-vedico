"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string>();

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setErr(undefined);
    const body = Object.fromEntries(new FormData(e.target).entries());

    const r = await fetch("/api/mapa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const j = await r.json();
    if (!r.ok) { setErr(j.error || "Erro ao gerar mapa"); setLoading(false); return; }
    setResp(j); setLoading(false);
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(to bottom, #0F4C5C, #0B2730 60%, #0F4C5C)" }}
    >
      <div className="w-full max-w-2xl text-center">

        {/* Título + Subtítulo */}
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
          Análise Védica por <span style={{ color: "#D4AF37" }}>Prema Sundari ☾</span>
        </h1>
        <p className="text-white/85">
          Alinhe sua <b>carreira</b> ao seu <b>Dharma</b>: identifique talentos, fortaleça liderança
          e decida com critérios — não com pressa.
        </p>

        {/* Mantras + Intenção */}
        <div className="mt-3 text-white/75 text-sm">
          <div>तत्त्वमसि · <i>Tat tvam asi</i> — você é isso.</div>
          <div className="mt-1">Intenção: “Eu escolho servir com competência, coragem e verdade.”</div>

          {/* Mantra Hare Krishna */}
          <div className="mt-3 italic text-white/80 leading-relaxed">
            Hare Krishna Hare Krishna Krishna Krishna Hare Hare <br />
            Hare Rama Hare Rama Rama Rama Hare Hare
          </div>
        </div>

        {/* Linha dourada */}
        <div className="mx-auto mt-4 mb-6" style={{ height: 3, width: 96, background: "#D4AF37", borderRadius: 2 }} />

        {/* Formulário */}
        <form onSubmit={onSubmit} id="form" className="bg-white rounded-xl shadow-lg p-6 text-left">
          <label className="block mb-2 text-sm font-medium" style={{color:"#0F4C5C"}}>Nome</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" name="nome" required />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{color:"#0F4C5C"}}>Data de nascimento</label>
              <input className="w-full border border-gray-300 rounded-md px-3 py-2" type="date" name="data" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{color:"#0F4C5C"}}>Hora (opcional)</label>
              <input className="w-full border border-gray-300 rounded-md px-3 py-2" type="time" name="hora" />
            </div>
          </div>

          <label className="block mt-4 mb-2 text-sm font-medium" style={{color:"#0F4C5C"}}>Cidade</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" name="cidade" required />

          <label className="block mb-2 text-sm font-medium" style={{color:"#0F4C5C"}}>País</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" name="pais" required />

          <label className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <input type="checkbox" name="consent" value="true" required />
            Concordo em receber meu mapa e comunicações (LGPD).
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 font-semibold py-3 rounded-md transition hover:brightness-105"
            style={{ background:"#D4AF37", color:"#0F4C5C" }}
          >
            {loading ? "Gerando..." : "Gerar minha análise de carreira"}
          </button>

          {/* Nota técnica */}
          <p className="text-xs text-gray-500 mt-3">
            Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
          </p>

          {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
        </form>

        {/* Resultado */}
        {resp && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6 text-left">
            <h2 className="text-xl font-serif mb-3" style={{color:"#0F4C5C"}}>Seu Resultado</h2>
            <p><b>Ascendente:</b> {resp.ascendente ?? "—"}</p>
            <p><b>Sol:</b> {resp.sol}</p>
            <p><b>Lua:</b> {resp.lua}</p>
            <a href={resp.pdfUrl} target="_blank" rel="noreferrer" className="underline" style={{color:"#2f6f5e"}}>
              Abrir PDF
            </a>

            <div className="mt-4 text-sm" style={{color:"#2f6f5e"}}>
              <p>
                Na leitura completa, conecto <b>Casa 10</b> (carreira), <b>Sol</b> (liderança) e <b>Saturno</b> (método)
                para definir critérios práticos de decisão e próximos passos alinhados ao seu Dharma.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
