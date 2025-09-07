"use client";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setResp(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/mapa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro ao gerar mapa");
      setResp(json);
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#0F4C5C] mb-2">
        Análise Védica por{" "}
        <span className="text-[#c9a227]">Prema Sundari ☾</span>
      </h1>
      <p className="text-center text-[#2f6f5e] mb-8">
        Alinhe sua <b>carreira</b> ao seu <b>Dharma</b> com clareza e método.
      </p>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          required
          className="w-full p-3 border rounded-md"
        />

        <div className="flex gap-4">
          <input
            type="date"
            name="data"
            required
            className="w-1/2 p-3 border rounded-md"
          />
          <input
            type="time"
            name="hora"
            placeholder="Hora (opcional)"
            className="w-1/2 p-3 border rounded-md"
          />
        </div>

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          name="pais"
          placeholder="País"
          required
          className="w-full p-3 border rounded-md"
        />

        <label className="flex items-center text-xs text-gray-600">
          <input type="checkbox" name="consent" required className="mr-2" />
          Concordo em receber meu mapa e comunicações (LGPD).
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md font-semibold text-white bg-[#c9a227] hover:bg-[#b38c1d] transition"
        >
          {loading ? "Gerando..." : "Gerar minha análise de carreira"}
        </button>

        <p className="text-xs text-center text-gray-500 mt-2">
          Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
        </p>
      </form>

      {/* Resultado */}
      {resp && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-serif mb-2 text-[#0F4C5C]">
            Seu Resultado
          </h2>
          <p>
            <b>Ascendente:</b> {resp.ascendente ?? "--"}
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
            className="mt-4 inline-block underline text-[#2f6f5e]"
          >
            Abrir PDF
          </a>

          <div className="mt-4 text-sm text-[#2f6f5e]">
            <p>
              Na leitura completa, conecto <b>Casa 10</b> (carreira),{" "}
              <b>Sol</b> (liderança) e <b>Saturno</b> (método)
            </p>
            <p>
              para definir critérios práticos de decisão e próximos passos
              alinhados ao seu Dharma.
            </p>
          </div>
        </div>
      )}

      {/* Rodapé com mantra */}
      <footer className="mt-12 text-center text-sm text-[#c47c7c] italic">
        Hare Krishna Hare Krishna Krishna Krishna Hare Hare <br />
        Hare Rama Hare Rama Rama Rama Hare Hare
      </footer>
    </main>
  );
}
