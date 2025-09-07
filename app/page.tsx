"use client";
import { useState } from "react";

export default function Page() {
  // Paleta
  const C = {
    azul: "#0F4C5C",
    verde: "#2f6f5e",
    rosa: "#c47c7c",
    ouro: "#D4AF37",
    branco: "#ffffff",
    cinza: "#f2f2f2",
    borda: "#E6E8EA",
  };

  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  const inputCls =
    "w-full h-12 px-4 border rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/15 focus:border-[#0F4C5C] transition";

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
      className="min-h-screen px-4 py-10 flex items-start justify-center"
      style={{
        background: `radial-gradient(1200px 600px at 50% -10%, rgba(15,76,92,.08), transparent 60%),
                     linear-gradient(#f7f8f8,#f2f2f2)`,
      }}
    >
      <div className="w-full max-w-3xl">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3" style={{ width: 92, height: 3, background: C.ouro, borderRadius: 2 }} />
          <h1
            className="font-bold leading-tight"
            style={{
              color: C.azul,
              fontFamily: "Georgia, serif",
              fontSize: 40,
            }}
          >
            Análise Védica por <span style={{ color: C.ouro }}>Prema Sundari ☾</span>
          </h1>
          <p className="mt-2" style={{ color: C.verde }}>
            Alinhe sua <b>carreira</b> ao seu <b>Dharma</b> com clareza e método.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{
            background: C.branco,
            border: `1px solid ${C.borda}`,
            borderRadius: 16,
            boxShadow: "0 20px 60px rgba(15,76,92,.08)",
            padding: 28,
            maxWidth: 720,
          }}
        >
          {/* Linha decorativa */}
          <div className="flex items-center gap-3 mb-6">
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: C.ouro,
                boxShadow: "0 0 0 4px rgba(212,175,55,.18)",
              }}
            />
            <span style={{ color: C.azul, fontFamily: "Georgia, serif", letterSpacing: ".02em" }}>
              Seus dados de nascimento
            </span>
          </div>

          {/* Nome */}
          <div className="mb-5">
            <label className="block mb-2 text-sm" style={{ color: C.azul }}>
              Nome
            </label>
            <input name="nome" required className={inputCls} />
          </div>

          {/* Data / Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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

          {/* Cidade / País */}
          <div className="mb-5">
            <label className="block mb-2 text-sm" style={{ color: C.azul }}>
              Cidade
            </label>
            <input name="cidade" required className={inputCls} />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm" style={{ color: C.azul }}>
              País
            </label>
            <input name="pais" required className={inputCls} />
          </div>

          {/* Leads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
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

          {/* Consentimento */}
          <label className="flex items-center gap-2 text-xs mb-5" style={{ color: "#6B7280" }}>
            <input type="checkbox" name="consent" required className="h-4 w-4" />
            Concordo em receber meu mapa e comunicações (LGPD).
          </label>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-md font-semibold transition"
            style={{
              background: C.ouro,
              color: C.azul,
              boxShadow: "0 6px 18px rgba(212,175,55,.32)",
            }}
          >
            {loading ? "Gerando..." : "Gerar minha análise de carreira"}
          </button>

          {/* Nota técnica */}
          <p className="text-xs text-center mt-3" style={{ color: "#8A949F" }}>
            Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
          </p>

          {err && (
            <p className="text-sm text-red-600 text-center mt-2">
              {err}
            </p>
          )}
        </form>

        {/* Resultado */}
        {resp && (
          <div
            className="mx-auto mt-8"
            style={{
              background: C.branco,
              border: `1px solid ${C.borda}`,
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(15,76,92,.08)",
              padding: 24,
              maxWidth: 720,
              textAlign: "center",
            }}
          >
            <h2
              className="text-xl mb-3"
              style={{ color: C.azul, fontFamily: "Georgia, serif" }}
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

        {/* Mantra no rodapé */}
        <div className="text-center mt-10 italic" style={{ color: C.rosa }}>
          Hare Krishna Hare Krishna Krishna Krishna Hare Hare <br />
          Hare Rama Hare Rama Rama Rama Hare Hare
        </div>
      </div>
    </main>
  );
}
