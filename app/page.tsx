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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0F4C5C] to-[#2f6f5e] text-white px-6">
      <div className="bg-[#0F4C5C]/70 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md text-center space-y-6">
        {/* Título */}
        <h1 className="text-3xl font-bold text-[#FFD700]">
          Análise Védica por Prema Sundari
        </h1>
        <p className="text-sm text-gray-200">
          Conecte-se com sua essência através do mapa astrológico védico 🌙
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-gray-300 text-black"
          />
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-gray-300 text-black"
          />
          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-gray-300 text-black"
          />
          <input
            type="text"
            name="local"
            placeholder="Local de nascimento"
            value={form.local}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-gray-300 text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-gray-300 text-black"
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            className="p-3 rounded-md border border-gray-300 text-black"
          />

          {/* Botão */}
          <button
            type="submit"
            className="mt-4 bg-[#FFD700] text-[#0F4C5C] font-bold py-3 px-6 rounded-lg hover:bg-[#e6c200] transition"
          >
            Gerar meu mapa
          </button>
        </form>

        {/* Mantra */}
        <footer className="mt-6 text-xs text-gray-300 italic">
          Hare Krishna Hare Krishna Krishna Krishna Hare Hare <br />
          Hare Rama Hare Rama Rama Rama Hare Hare
        </footer>
      </div>
    </main>
  );
}
