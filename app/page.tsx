"use client";
import Head from "next/head";
import { useState } from "react";

export default function Page() {
  // Paleta Prema
  const C = {
    azul: "#0F4C5C",
    verde: "#2f6f5e",
    ouro:  "#D4AF37",
    branco:"#ffffff",
    cinza: "#f2f2f2",
    hair:  "#E9ECEF",
  };

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const inputCls =
    "w-full h-12 px-4 rounded-md bg-white border border-[#E6E8EA] placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/18 focus:border-[#0F4C5C] transition";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const r = await fetch("/api/mapa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Erro ao enviar dados");
      // opcional: redirecionar/mostrar toast
      alert("Dados enviados com sucesso! Em breve você receberá sua análise.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Raleway:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Fundo claro, tudo centralizado */}
      <main className="min-h-screen w-full px-6 flex flex-col items-center"
            style={{ background: C.cinza }}>
        {/* Cabeçalho */}
        <section className="pt-16 pb-6 text-center">
          <h1
            className="leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: C.azul,
              fontSize: "2.6rem",
            }}
          >
            Análise Védica por <span style={{ color: C.ouro }}>Prema Sundari ☾</span>
          </h1>

          <p
            className="mt-3"
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: C.verde,
              fontSize: "1.06rem",
            }}
          >
            Alinhe sua <b>carreira</b> ao seu <b>Dharma</b> com clareza e método.
          </p>
        </section>

        {/* Card do formulário (apresentação do seu anexo) */}
        <section className="w-full max-w-3xl">
          <div
            className="mx-auto"
            style={{
              background: C.branco,
              borderRadius: 14,
              boxShadow:
                "0 12px 30px rgba(15,76,92,.08), 0 2px 8px rgba(15,76,92,.04)",
              padding: "28px 22px",
            }}
          >
            <form onSubmit={onSubmit} className="space-y-6 md:space-y-7">
              <div>
                <label className="block mb-2 text-sm"
                       style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  Nome
                </label>
                <input name="nome" required className={inputCls} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm"
                         style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                    Data de nascimento
                  </label>
                  <input type="date" name="data" required className={inputCls} />
                </div>
                <div>
                  <label className="block mb-2 text-sm"
                         style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                    Hora (opcional)
                  </label>
                  <input type="time" name="hora" className={inputCls} />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm"
                       style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  Cidade
                </label>
                <input name="cidade" required className={inputCls} />
              </div>

              <div>
                <label className="block mb-2 text-sm"
                       style={{ color: C.azul, fontFamily: "'Raleway', sans-serif" }}>
                  País
                </label>
                <input name="pais" required className={inputCls} />
              </div>

              <label className="flex items-center gap-2 text-xs"
                     style={{ color: "#6B7280", fontFamily: "'Raleway', sans-serif" }}>
                <input type="checkbox" name="consent" required className="h-4 w-4" />
                Concordo em receber meu mapa e comunicações (LGPD).
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-md font-semibold transition"
                style={{
                  background: "linear-gradient(180deg, #EAD37A, #D4AF37 60%, #B88A1E)",
                  color: C.azul,
                  boxShadow:
                    "0 10px 24px rgba(212,175,55,.25), inset 0 1px 0 rgba(255,255,255,.6)",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                {loading ? "Gerando..." : "Gerar minha análise de carreira"}
              </button>

              <p className="text-center text-xs"
                 style={{ color: "#7A8691", fontFamily: "'Raleway', sans-serif" }}>
                Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
              </p>

              {err && (
                <p className="text-center text-sm text-red-600"
                   style={{ fontFamily: "'Raleway', sans-serif" }}>
                  {err}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
