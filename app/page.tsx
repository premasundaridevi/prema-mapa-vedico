"use client";
import Head from "next/head";
import { useState } from "react";

export default function Page() {
  // Paleta Prema
  const C = {
    azul:  "#0F4C5C",
    verde: "#2f6f5e",
    ouro:  "#D4AF37",
    branco:"#ffffff",
    cinza: "#f2f2f2",
  };

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const inputCls =
    "w-full h-12 px-4 rounded-md bg-white border border centralizado -[#E6E8EA] " +
    "focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/18 focus:border-[#0F4C5C] transition " +
    "placeholder-transparent";

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
      alert("Dados enviados com sucesso! Em breve você receberá sua análise.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Opções para hora exata
  const horas   = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutos = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Raleway:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Fundo claro; tudo centralizado */}
      <main
        className="min-h-screen w-full flex flex-col items-center justify-start"
        style={{ background: C.cinza }}
      >
        {/*Cabeçalho centralizado*/}
        <section className="w-full max-w-5xl text-center px-6 sm:px-10 pt-16 pb-4">
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
            className="mt-4"
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: C.verde,
              fontSize: "1.08rem",
              maxWidth: 900,
              margin: "auto",
              lineHeight: 1.6,
            }}
          >
            <b>Esse é o primeiro passo</b> para você alinhar seu <b>Dharma</b> à sua vida
            profissional com a <b>análise personalizada</b> no <b>método Prema Sundari</b>.
          </p>
        </section>

        {/* Card do formulário – somente o espaço necessário; alinhamento centralizado */}
        <section className="w-full px-6 sm:px-10 pb-12">
          <div
            className="mx-auto text-center"
            style={{
              background: C.branco,
              borderRadius: 14,
              boxShadow:
                "0 12px 30px rgba(15,76,92,.08), 0 2px 8px rgba(15,76,92,.04)",
              padding: "28px 22px",
              maxWidth: 720,
            }}
          >
            <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-7">
              {/* Nome */}
              <div>
                <label
                  className="block mb-3 text-sm"
                  style={{ color: C.azul, fontFamily: "'Raleway', sans-serif", textAlign: "center", letterSpacing: ".2px" }}
                >
                  Nome
                </label>
                <input name= "nome" required className={inputCls} />
              </div>

              {/* Data + Hora exata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label
                    className="block mb-3 text-sm"
                    style={{ color: C.azul, fontFamily: "'Raleway', sans-serif", textAlign: "center" }}
                  >
                    Data de nascimento
                  </label>
                  <input type= "date" name= "data" required className={inputCls} />
                </div>

                <div>
                  <label
                    className="block mb-3 text-sm"
                    style={{ color: C.azul, fontFamily: "'Raleway', sans-serif", textAlign: "center" }}
                  >
                    Hora exata (24h)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select name= "hora" required className={inputCls}>
                      <option value="" className="hidden"></option>
                      {horas.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <select name="minuto" required className={inputCls}>
                      <option value="" className="hidden"></option>
                      {minutos.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Cidade */}
              <div>
                <label
                  className="block mb-3 text-sm"
                  style={{ color: C.azul, fontFamily: "'Raleway', sans-serif", textAlign: "center" }}
                >
                  Cidade
                </label>
                <input name= "cidade" required className={inputCls} />
              </div>

              {/* País */}
              <div>
                <label
                  className= "block mb-3 text-sm"
                  style={{ color: C.azul, fontFamily: "'Raleway', sans-serif", textAlign: "center" }}
                >
                  País
                </label>
                <input name="pais" required className={inputCls} />
              </div>

              {/* E-mail + WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label
                    className="block mb-3 text-sm"
                    style={{ color: C.azul, fontFamily: "'Raleway', sans-serif", textAlign: "center" }}
                  >
                    E-mail
                  </label>
                  <input type= "email" name="email" required className={inputCls} />
                </div>
                <div>
                  <label
                    className= "block mb-3 text-sm"
                    style={{ color: C.azul, fontFamily: "'Raleway', sans-serif", textAlign: "center" }}
                  >
                    WhatsApp (cód. país + DDD + número)
                  </label>
                  <input
                    type= "tel"
                    name= "telefone"
                    required
                    pattern="[\d\s()+-]{9,}"
                    title="Digite um telefone válido (ex.: +55 11 91234-5678)"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Consentimento */}
              <label
                className="flex items-center gap-2 text-xs justify-center"
                style={{ color: "#6B7280", fontFamily: "'Raleway', sans-serif" }}
              >
                <input type="checkbox" name="consent" required className="h-4 w-4" />
                Concordo em receber meu mapa e comunicações (LGPD).
              </label>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-md font-semibold transition"
                style={{
                  background: "linear-gradient(180deg, #EAD37A, #D4AF37 60%, #B88A1E)",
                  color: C.azul,
                  boxShadow: "0 10px 24px rgba(212,175,55,.25), inset 0 1px 0 rgba(255,255,255,.6)",
                  fontFamily: "'Raleway', sans-serif",
                  letterSpacing: ".2px",
                }}
              >
                {loading ? "Gerando..." : "Gerar minha análise de carreira"}
              </button>

              {/* Sistema */}
              <p
                className="text-center text-xs"
                style={{ color: "#7A8691", fontFamily: "'Raleway', sans-serif" }}
              >
                Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
              </p>

              {err && (
                <p
                  className="text-center text-sm text-red-600"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {err}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Rodapé – Mahā-mantra discreto centralizado */}
        <footer className="w-full text-center pb-10 px-6">
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: "#6b7b83",
              fontSize: ".82rem",
              lineHeight: 1.6,
            }}
          >
            Hare Krishna Hare Krishna • Krishna Krishna Hare Hare •
            Hare Rama Hare Rama • Rama Rama Hare Hare
          </p>
        </footer>
      </main>
    </>
  );
}
