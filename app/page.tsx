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
    if (!r.ok) { setErr(j.error || "Erro ao gerar mapa"); setLoading(false); return; }
    setResp(j); setLoading(false);
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(to bottom, #0F4C5C, #0B2730 60%, #0F4C5C)" }}
    >
      <div className="w-full max-w-2xl text-center">
