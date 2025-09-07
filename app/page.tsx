"use client";
import Head from "next/head";
import { useState } from "react";

export default function Page() {
  // Paleta Prema
  const C = {
    azul: "#0F4C5C",
    verde: "#2f6f5e",
    rosa: "#c47c7c",
    branco: "#ffffff",
    cinza: "#f6f7f6",     // fundo delicado
    linha: "#E9ECEF",     // divisórias hairline
    ouro:  "#D4AF37"      // dourado sutil
  };

  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  const inputCls =
    "w-full h-12 px-4 rounded-md bg-white border border-[#E6E8EA] " +
    "placeholder-gray-400 transition " +
    "focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/18 focus:border-[#0F4C5C]";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null); setResp(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/mapa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Erro ao gerar mapa");
      setResp(j);
    } catch (e:any) {
      setErr(e.message);
    } finally { setLoading(false); }
  }

  return (
    <>
      <Head>
        {/* Tipografias */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Raleway:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Fundo leve, sem card/bloco */}
      <main className="min-h-screen w-full flex items-center justify-center px-6"
            style={{ background: C.cinza }}>
        <div className="w-full max-w-3xl mx-auto py-14 md:py-20 text-center">
          {/* Cabeçalho */}
          <h1
            className="leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: C.azul,
              fontSize: "2.5rem",
              letterSpacing: "0.2px"
            }}
          >
            Análise Védica por <span style={{ color: C.ouro }}>Prema Sundari ☾</span>
          </h1>

          {/* filete dourado delicado */}
          <div className="flex items-center justify-center gap-3 mt-3 mb-5">
            <span style={{ width: 56, height: 1, background: C.linha }} />
            <span
              style={{
                width: 8, height: 8, background: C.ouro, borderRadius: 9999,
                boxShadow: "0 0 0 4px rgba(212,175,55,.18)"
              }}
            />
            <span style={{ width: 56, height: 1, background: C.linha }} />
          </div>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: C.verde,
              fontSize: "1.02rem",
              lineHeight: 1.6
            }}
          >
            Receba uma análise personalizada com o <b>Método Prema Sundari</b> de{" "}
            <b>análise astrológica</b> e <b>aromaterapia</b>.
          </p>

          {/* divisória hairline */}
          <div className="my-8" style={{ height: 1, background: C.linha }} />

          {/* Formulário — mesma estrutura, mais delicado e com respiro */}
          <form onSubmit={onSubmit} className="space-y-7 md:space-y-8 mx-auto" style={{ maxWidth: 720 }}>
            <div className="text-center">
              <label className="block mb-2 text-sm"
                     style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                Nome completo
              </label>
              <input name="nome" placeholder="Ex.: Ana Maria Silva" required className={inputCls} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="text-center">
                <label className="block mb-2 text-sm"
                       style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  Data de nascimento
                </label>
                <input type="date" name="data" required className={inputCls} />
              </div>
              <div className="text-center">
                <label className="block mb-2 text-sm"
                       style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  Hora (opcional)
                </label>
                <input type="time" name="hora" className={inputCls} />
              </div>
            </div>

            <div className="text-center">
              <label className="block mb-2 text-sm"
                     style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                Local de nascimento (cidade/UF ou cidade mais próxima)
              </label>
              <input name="cidade" placeholder="Ex.: São Paulo, SP, Brasil" required className={inputCls} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="text-center">
                <label className="block mb-2 text-sm"
                       style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  E-mail
                </label>
                <input type="email" name="email" placeholder="Ex.: voce@email.com" required className={inputCls} />
              </div>
              <div className="text-center">
                <label className="block mb-2 text-sm"
                       style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  WhatsApp (código do país + DDD + número)
                </label>
                <input
                  type="tel" name="telefone" required
                  placeholder="Ex.: +55 11 91234-5678"
                  pattern="[\d\s()+-]{9,}"
                  title="Digite um telefone válido (ex.: +55 11 91234-5678)"
                  className={inputCls}
                />
              </div>
            </div>

            <label className="flex items-center justify-center gap-2 text-xs"
                   style={{ color: "#6B7280", fontFamily: "'Raleway', sans-serif" }}>
              <input type="checkbox" name="consent" required className="h-4 w-4" />
              Concordo em receber meu mapa e comunicações (LGPD).
            </label>

            <button
              type="submit" disabled={loading}
              className="w-full h-12 rounded-md font-semibold transition"
              style={{
                background: "linear-gradient(180deg, #EAD37A, #D4AF37 60%, #B88A1E)",
                color: C.azul,
                boxShadow: "0 10px 24px rgba(212,175,55,.25), inset 0 1px 0 rgba(255,255,255,.6)",
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: ".2px"
              }}
            >
              {loading ? "Gerando..." : "Gerar minha análise de carreira"}
            </button>

            <p className="text-center text-xs"
               style={{ color: "#7A8691", fontFamily: "'Raleway', sans-serif" }}>
              Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
            </p>

            {err && (
              <p className="text-sm text-red-600 text-center"
                 style={{ fontFamily: "'Raleway', sans-serif" }}>
                {err}
              </p>
            )}
          </form>

          {/* Resultado (quando houver) */}
          {resp && (
            <div className="mt-10 text-center" style={{ fontFamily: "'Raleway', sans-serif" }}>
              <h2 className="mb-4"
                  style={{ color: C.azul, fontFamily: "'Playfair Display', serif", fontSize: "1.45rem" }}>
                Seu Resultado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ color: C.verde }}>
                <p><b>Ascendente:</b> {resp.ascendente ?? "—"}</p>
                <p><b>Sol:</b> {resp.sol}</p>
                <p><b>Lua:</b> {resp.lua}</p>
              </div>
              {resp.pdfUrl && (
                <a href={resp.pdfUrl} target="_blank" rel="noreferrer"
                   className="underline inline-block mt-4" style={{ color: C.verde }}>
                  Abrir PDF
                </a>
              )}
            </div>
          )}

          {/* divisória */}
          <div className="my-12" style={{ height: 1, background: C.linha }} />

          {/* Mantras — delicados e centralizados */}
          <div className="space-y-4 text-center">
            {/* Lokah Samastah (sânscrito) + tradução */}
            <p className="text-sm"
               style={{ color: C.verde, fontFamily: "'Raleway', sans-serif", lineHeight: 1.7 }}>
              लोकाः समस्ताः सुखिनो भवन्तु । ॐ शान्तिः शान्तिः शान्तिः ॥
            </p>
            <p className="text-xs"
               style={{ color: "#6B7A7A", fontFamily: "'Raleway', sans-serif" }}>
              “Que todos os seres, em todos os lugares, sejam felizes e livres; e que os
              pensamentos, palavras e ações da minha própria vida contribuam, de alguma forma,
              para essa felicidade e liberdade para todos.”
            </p>

            {/* Mahāmantra — transliterado (sem sânscrito) */}
            <p className="italic"
               style={{
                 color: C.rosa,
                 fontFamily: "'Playfair Display', serif",
                 letterSpacing: ".2px"
               }}>
              Hare Krishna Hare Krishna Krishna Krishna Hare Hare
              Hare Rama Hare Rama Rama Rama Hare Hare
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
