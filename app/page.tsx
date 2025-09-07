"use client";
import { useState } from "react";

export default function AnaliseVedicaForm() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Aqui entra integração com backend ou API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdfdfd] to-[#f2f2f2] px-6">
      <div className="max-w-lg w-full text-center space-y-10 p-10">
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#0F4C5C] tracking-wide leading-snug">
          Análise Védica por Prema Sundari
        </h1>

        {/* Frase de impacto */}
        <p className="text-lg md:text-xl font-raleway text-[#2f6f5e] leading-relaxed">
          Receba uma análise personalizada com o método{" "}
          <span className="text-[#c47c7c] font-semibold">Prema Sundari</span>{" "}
          de Astrologia Védica e Aromaterapia.  
          Um mergulho profundo em autoconhecimento e espiritualidade.
        </p>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-left max-w-md mx-auto"
        >
          <div className="flex flex-col">
            <label className="text-[#0F4C5C] font-raleway text-sm mb-2">
              Nome completo
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-[#c47c7c]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c47c7c]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#0F4C5C] font-raleway text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-[#c47c7c]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c47c7c]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#0F4C5C] font-raleway text-sm mb-2">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-[#c47c7c]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c47c7c]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#c47c7c] text-white font-raleway font-semibold tracking-wide rounded-md shadow-lg hover:bg-[#b36b6b] transition"
          >
            Solicitar minha análise
          </button>
        </form>

        {/* Mantras */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-sm md:text-base text-[#2f6f5e] italic leading-relaxed">
            Hare Krishna Hare Krishna <br />
            Krishna Krishna Hare Hare <br />
            Hare Rama Hare Rama <br />
            Rama Rama Hare Hare
          </p>

          <p className="text-xs md:text-sm text-[#0F4C5C]/80 leading-relaxed">
            सर्वे भवन्तु सुखिनः <br />
            सर्वे सन्तु निरामयाः <br />
            सर्वे भद्राणि पश्यन्तु <br />
            मा कश्चिद् दुःखभाग्भवेत्
          </p>

          <p className="text-xs md:text-sm text-[#2f6f5e] italic">
            “Que todos os seres sejam livres e felizes”
          </p>
        </div>
      </div>
    </div>
  );
}
