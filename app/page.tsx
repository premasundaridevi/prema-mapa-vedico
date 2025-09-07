"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    nome: "",
    data: "",
    hora: "",
    cidade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✨ Mapa de ${form.nome} será gerado em breve!`);
    console.log(form);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-2xl font-bold mb-6">Mapa Védico da Prema Sundari 🌙</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade de nascimento"
          value={form.cidade}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Gerar Mapa
        </button>
      </form>
    </main>
  );
}
