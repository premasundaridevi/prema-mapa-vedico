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
    cinza: "#f2f2f2",
    ouro: "#D4AF37"
  };

  const inputCls =
    "w-full h-12 px-4 border border-gray-300 rounded-md bg-white placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C] transition";

  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        {/* Tipografias profissionais */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Raleway:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        className="min-h-screen w-full flex items-center justify-center px-6"
        style={{ background: C.cinza }}
      >
        <div className="w-full max-w-3xl mx-auto py-14 md:py-20 text-center">
          {/* Título */}
          <h1
            className="mb-3 leading-tight"
            style={{
              color: C.azul,
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.4rem",
            }}
          >
            Análise Védica por <span style={{ color: C.ouro }}>Prema Sundari ☾</span>
          </h1>

          {/* Subfrase assinatura */}
          <p
            className="mb-10 md:mb-12"
            style={{
              color: C.verde,
              fontFamily: "'Raleway', sans-serif",
              fontSize: "1.05rem",
            }}
          >
            Receba uma análise personalizada com o{" "}
            <b>Método Prema Sundari</b> de <b>análise astrológica</b> e{" "}
            <b>aromaterapia</b>.
          </p>

          {/* Formulário – vertical, espaçado, responsivo */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7 text-left mx-auto" style={{ maxWidth: 720 }}>
            <div>
              <label className="block mb-2 text-sm" style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                Nome
              </label>
              <input name="nome" required className={inputCls} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  Data de nascimento
                </label>
                <input type="date" name="data" required className={inputCls} />
              </div>
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  Hora (opcional)
                </label>
                <input type="time" name="hora" className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm" style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                Cidade
              </label>
              <input name="cidade" required className={inputCls} />
            </div>

            <div>
              <label className="block mb-2 text-sm" style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                País
              </label>
              <input name="pais" required className={inputCls} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  E-mail
                </label>
                <input type="email" name="email" required className={inputCls} />
              </div>
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  Telefone (com DDD)
                </label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  pattern="[\d\s()+-]{9,}"
                  title="Digite um telefone válido (ex.: 11 91234-5678)"
                  className={inputCls}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs" style={{ color: "#6B7280", fontFamily: "'Raleway', sans-serif" }}>
              <input type="checkbox" name="consent" required className="h-4 w-4" />
              Concordo em receber meu mapa e comunicações (LGPD).
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-md font-semibold transition"
              style={{
                background: "linear-gradient(180deg, #E7C65A, #D4AF37 60%, #B88A1E)",
                color: C.azul,
                boxShadow: "0 10px 24px rgba(212,175,55,.30), inset 0 1px 0 rgba(255,255,255,.6)",
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              {loading ? "Gerando..." : "Gerar minha análise de carreira"}
            </button>

            <p className="text-center text-xs" style={{ color: "#7A8691", fontFamily: "'Raleway', sans-serif" }}>
              Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
            </p>

            {err && (
              <p className="text-sm text-red-600 text-center" style={{ fontFamily: "'Raleway', sans-serif" }}>
                {err}
              </p>
            )}
          </form>

          {/* Resultado (aparece abaixo) */}
          {resp && (
            <div className="mt-10 text-center" style={{ fontFamily: "'Raleway', sans-serif" }}>
              <h2
                className="mb-4"
                style={{ color: C.azul, fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}
              >
                Seu Resultado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ color: C.verde }}>
                <p><b>Ascendente:</b> {resp.ascendente ?? "—"}</p>
                <p><b>Sol:</b> {resp.sol}</p>
                <p><b>Lua:</b> {resp.lua}</p>
              </div>
              {resp.pdfUrl && (
                <a
                  href={resp.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline inline-block mt-4"
                  style={{ color: C.verde }}
                >
                  Abrir PDF
                </a>
              )}
            </div>
          )}

          {/* Mantras no rodapé */}
          <div className="mt-14 space-y-3">
            <p
              className="italic"
              style={{ color: C.rosa, fontFamily: "'Playfair Display', serif" }}
            >
              हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।<br />
              हरे राम हरे राम राम राम हरे हरे ॥
            </p>
            <p
              className="text-sm"
              style={{ color: C.verde, fontFamily: "'Raleway', sans-serif" }}
            >
              लोकाः समस्ताः सुखिनो भवन्तु । ॐ शान्तिः शान्तिः शान्तिः ॥
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
