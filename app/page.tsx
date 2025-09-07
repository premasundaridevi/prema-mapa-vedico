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
    if (!r.ok) {
      setErr(j.error || "Erro ao gerar mapa");
      setLoading(false);
      return;
    }
    setResp(j);
    setLoading(false);
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(to bottom, #0F4C5C, #0B2730 60%, #0F4C5C)",
      }}
    >
      <div className="w-full max-w-2xl text-center">
        {/* TÍTULO */}
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
          Análise Védica por{" "}
          <span style={{ color: "#D4AF37" }}>Prema Sundari ☾</span>
        </h1>
        <p className="text-white/80 mb-6">
          Descubra sua essência através do Jyotish — a ciência da luz.
        </p>

        {/* CARTÃO DO FORMULÁRIO */}
        <form
          onSubmit={onSubmit}
          id="form"
          className="bg-white rounded-xl shadow-lg p-6 text-left"
        >
          <label className="block mb-2 text-sm font-medium text-prema-azul">
            Nome
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            name="nome"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-prema-azul">
                Data de nascimento
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="date"
                name="data"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-prema-azul">
                Hora (opcional)
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="time"
                name="hora"
              />
            </div>
          </div>

          <label className="block mt-4 mb-2 text-sm font-medium text-prema-azul">
            Cidade
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            name="cidade"
            required
          />

          <label className="block mb-2 text-sm font-medium text-prema-azul">
            País
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            name="pais"
            required
          />

          <label className="flex items-center gap-2 text-xs text-gray-600 mt-2">
            <input type="checkbox" name="consent" value="true" required />{" "}
            Concordo em receber meu mapa e comunicações (LGPD).
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#D4AF37] text-[#0F4C5C] font-semibold py-3 rounded-md transition hover:brightness-105"
          >
            {loading ? "Gerando..." : "Gerar Mapa"}
          </button>

          {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
        </form>

        {/* CARTÃO DO RESULTADO */}
        {resp && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6 text-left">
            <h2 className="text-xl font-serif mb-3 text-prema-azul">
              Seu Resultado
            </h2>
            <p>
              <b>Ascendente:</b> {resp.ascendente ?? "—"}
            </p>
            <p>
              <b>Sol:</b> {resp.sol}
            </p>
            <p>
              <b>Lua:</b> {resp.lua}
            </p>
            <a
              href={resp.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-prema-verde underline mt-2 inline-block"
            >
              Abrir PDF
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
