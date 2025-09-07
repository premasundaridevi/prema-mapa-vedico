"use client";
import { useState } from "react";

export default function Page() {
  // Paleta Prema
  const C = {
    azul: "#0F4C5C",
    verde: "#2f6f5e",
    rosa: "#c47c7c",
    branco: "#ffffff",
    cinza: "#f2f2f2",
    ouro: "#D4AF37", // dourado nobre
  };

  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  const inputCls =
    "w-full h-12 px-4 border border-gray-300 rounded-md bg-white/95 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C] transition";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setResp(null);
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
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        // céu noturno com brilho sutil
        background:
          `radial-gradient(1400px 700px at 50% -10%, rgba(12,36,45,.18), transparent 55%),
           radial-gradient(900px 500px at 20% 10%, rgba(196,124,124,.08), transparent 60%),
           linear-gradient(180deg, #0F4C5C 0%, #2f6f5e 55%, #0F4C5C 100%)`,
      }}
    >
      {/* estrelas discretas */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.35) 0, transparent 50%)," +
            "radial-gradient(1.5px 1.5px at 70% 15%, rgba(255,255,255,.28) 0, transparent 50%)," +
            "radial-gradient(1.8px 1.8px at 60% 65%, rgba(255,255,255,.25) 0, transparent 50%)," +
            "radial-gradient(1.2px 1.2px at 35% 75%, rgba(255,255,255,.22) 0, transparent 50%)",
        }}
      />

      {/* cartão central */}
      <div
        className="relative w-full max-w-3xl mx-auto my-16"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.94))`,
          borderRadius: 20,
          boxShadow:
            "0 30px 80px rgba(0,0,0,.25), 0 0 0 1px rgba(255,255,255,.35) inset",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* barra dourada */}
        <div
          className="w-full"
          style={{
            height: 6,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            background:
              "linear-gradient(90deg, #B88A1E, #D4AF37 30%, #F4E3A1 50%, #D4AF37 70%, #B88A1E)",
          }}
        />

        <div className="p-10 md:p-12">
          {/* cabeçalho */}
          <div className="text-center">
            <h1
              className="font-bold leading-tight"
              style={{
                color: C.azul,
                fontFamily: "Georgia, serif",
                fontSize: 42,
              }}
            >
              Análise Védica por <span style={{ color: C.ouro }}>Prema Sundari ☾</span>
            </h1>

            <p className="mt-3 text-base md:text-lg" style={{ color: C.verde }}>
              Receba uma análise personalizada com o{" "}
              <b>Método Prema Sundari</b> de <b>Astrologia Védica</b> e{" "}
              <b>Aromaterapia</b> — clareza, dharma e prosperidade com método.
            </p>

            {/* divisor */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span
                style={{
                  width: 56,
                  height: 2,
                  background: C.ouro,
                  display: "inline-block",
                }}
              />
              <span
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: C.ouro,
                  boxShadow: "0 0 0 5px rgba(212,175,55,.22)",
                }}
              />
              <span
                style={{
                  width: 56,
                  height: 2,
                  background: C.ouro,
                  display: "inline-block",
                }}
              />
            </div>
          </div>

          {/* formulário */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* nome */}
            <div>
              <label className="block mb-2 text-sm" style={{ color: C.azul }}>
                Nome
              </label>
              <input name="nome" required className={inputCls} />
            </div>

            {/* data + hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul }}>
                  Data de nascimento
                </label>
                <input type="date" name="data" required className={inputCls} />
              </div>
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul }}>
                  Hora (opcional)
                </label>
                <input type="time" name="hora" className={inputCls} />
              </div>
            </div>

            {/* cidade + país */}
            <div>
              <label className="block mb-2 text-sm" style={{ color: C.azul }}>
                Cidade
              </label>
              <input name="cidade" required className={inputCls} />
            </div>
            <div>
              <label className="block mb-2 text-sm" style={{ color: C.azul }}>
                País
              </label>
              <input name="pais" required className={inputCls} />
            </div>

            {/* e-mail + telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul }}>
                  E-mail
                </label>
                <input type="email" name="email" required className={inputCls} />
              </div>
              <div>
                <label className="block mb-2 text-sm" style={{ color: C.azul }}>
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

            {/* lgpd */}
            <label className="flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
              <input type="checkbox" name="consent" required className="h-4 w-4" />
              Concordo em receber meu mapa e comunicações (LGPD).
            </label>

            {/* botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-md font-semibold transition"
              style={{
                background:
                  "linear-gradient(180deg, #E7C65A, #D4AF37 60%, #B88A1E)",
                color: C.azul,
                boxShadow:
                  "0 10px 24px rgba(212,175,55,.35), inset 0 1px 0 rgba(255,255,255,.6)",
              }}
            >
              {loading ? "Gerando..." : "Gerar minha análise de carreira"}
            </button>

            {/* assinatura técnica */}
            <p className="text-xs text-center mt-2" style={{ color: "#7A8691" }}>
              Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
            </p>

            {err && (
              <p className="text-sm text-red-600 text-center mt-2">{err}</p>
            )}
          </form>

          {/* resultado */}
          {resp && (
            <div
              className="mt-10 p-6 md:p-8 text-center rounded-xl"
              style={{
                background: C.cinza,
                border: `1px solid rgba(15,76,92,.12)`,
              }}
            >
              <h2
                className="text-xl mb-3"
                style={{ color: C.azul, fontFamily: "Georgia, serif" }}
              >
                Seu Resultado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ color: C.verde }}>
                <p>
                  <b>Ascendente:</b> {resp.ascendente ?? "—"}
                </p>
                <p>
                  <b>Sol:</b> {resp.sol}
                </p>
                <p>
                  <b>Lua:</b> {resp.lua}
                </p>
              </div>
              {resp.pdfUrl && (
                <a
                  href={resp.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block underline"
                  style={{ color: C.verde }}
                >
                  Abrir PDF
                </a>
              )}
            </div>
          )}

          {/* mantra no rodapé */}
          <div className="text-center mt-10">
            <p
              className="text-sm md:text-base italic"
              style={{ color: C.rosa, lineHeight: 1.7 }}
            >
              हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। <br />
              हरे राम हरे राम राम राम हरे हरे॥
            </p>
            <p className="text-xs mt-2" style={{ color: C.verde }}>
              Hare Krishna Hare Krishna Krishna Krishna Hare Hare • Hare Rama
              Hare Rama Rama Rama Hare Hare
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
