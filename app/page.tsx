"use client";

import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    nome: "",
    data: "",
    hora: "",
    local: "",
    email: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0F4C5C] to-[#2f6f5e] text-white px-6">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-[#c47c7c]">
          Análise Védica por Prema Sundari
        </h1>
        <p className="text-lg text-[#f2f2f2]">
          Descubra seu mapa astrológico védico.  
          Preencha seus dados e receba sua análise espiritual personalizada.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black"
          />
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black"
          />
          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black"
          />
          <input
            type="text"
            name="local"
            placeholder="Local de nascimento"
            value={form.local}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black"
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black"
          />

          <button
            type="submit"
            className="bg-[#c47c7c] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-[#b36a6a] transition"
          >
            Gerar meu mapa
          </button>
        </form>

        {/* Mantra */}
        <p className="mt-10 text-sm italic text-[#f2f2f2]">
          Hare Krishna Hare Krishna Krishna Krishna Hare Hare  
          Hare Rama Hare Rama Rama Rama Hare Hare
        </p>
      </div>
    </div>
  );
}
