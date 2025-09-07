"use client";
import { useState } from "react";

export default function Home() {
  // Paleta oficial Prema
  const C = {
    azul: "#0F4C5C",
    verde: "#2f6f5e",
    rosa: "#c47c7c",
    ouro: "#D4AF37",
    branco: "#ffffff",
    cinza: "#f2f2f2",
    borda: "#e9ecef",
    textoSuave: "#667085",
  };

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
    <>
      {/* MAIN — fundo claro e cartão central */}
      <main
        style={{
          minHeight: "100vh",
          background: C.cinza,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 720, textAlign: "center" }}>
          {/* Título + subtítulo profissional */}
          <h1
            style={{
              color: C.azul,
              fontFamily: "Georgia, serif",
              fontSize: 32,
              margin: 0,
              marginBottom: 8,
            }}
          >
            Análise Védica por <span style={{ color: C.ouro }}>Prema Sundari ☾</span>
          </h1>
          <p style={{ color: C.verde, marginTop: 4, marginBottom: 20 }}>
            Alinhe sua <b>carreira</b> ao seu <b>Dharma</b> com clareza e método.
          </p>

          {/* CARD — formulário */}
          <form
            onSubmit={onSubmit}
            id="form"
            style={{
              margin: "0 auto",
              maxWidth: 560,
              textAlign: "left",
              background: C.branco,
              border: `1px solid ${C.borda}`,
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,.06)",
              padding: 20,
            }}
          >
            <label style={{ color: C.azul, fontSize: 14 }}>Nome</label>
            <input
              name="nome"
              required
              style={{
                width: "100%", marginTop: 6, marginBottom: 12,
                border: `1px solid ${C.borda}`, borderRadius: 8, padding: "10px 12px"
              }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ color: C.azul, fontSize: 14 }}>Data de nascimento</label>
                <input
                  type="date" name="data" required
                  style={{
                    width: "100%", marginTop: 6,
                    border: `1px solid ${C.borda}`, borderRadius: 8, padding: "10px 12px"
                  }}
                />
              </div>
              <div>
                <label style={{ color: C.azul, fontSize: 14 }}>Hora (opcional)</label>
                <input
                  type="time" name="hora"
                  style={{
                    width: "100%", marginTop: 6,
                    border: `1px solid ${C.borda}`, borderRadius: 8, padding: "10px 12px"
                  }}
                />
              </div>
            </div>

            <label style={{ color: C.azul, fontSize: 14, marginTop: 12, display: "block" }}>Cidade</label>
            <input
              name="cidade" required
              style={{
                width: "100%", marginTop: 6, marginBottom: 12,
                border: `1px solid ${C.borda}`, borderRadius: 8, padding: "10px 12px"
              }}
            />

            <label style={{ color: C.azul, fontSize: 14 }}>País</label>
            <input
              name="pais" required
              style={{
                width: "100%", marginTop: 6,
                border: `1px solid ${C.borda}`, borderRadius: 8, padding: "10px 12px"
              }}
            />

            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textoSuave, marginTop: 10 }}>
              <input type="checkbox" name="consent" value="true" required />
              Concordo em receber meu mapa e comunicações (LGPD).
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", marginTop: 14,
                background: C.ouro, color: C.azul,
                fontWeight: 700, padding: "12px 18px",
                borderRadius: 10, border: 0, cursor: "pointer",
                transition: "filter .2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.06)")}
              onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
            >
              {loading ? "Gerando..." : "Gerar minha análise de carreira"}
            </button>

            {/* Nota técnica */}
            <p style={{ color: "#98A2B3", fontSize: 12, marginTop: 8 }}>
              Sistema: zodíaco sideral · Ayanāṁśa Lahiri (Chitrapaksha)
            </p>

            {err && <p style={{ color: "#B42318", fontSize: 13, marginTop: 6 }}>{err}</p>}
          </form>

          {/* CARD — resultado (aparece após envio) */}
          {resp && (
            <div
              style={{
                margin: "16px auto 0", maxWidth: 560, textAlign: "left",
                background: C.branco, border: `1px solid ${C.borda}`,
                borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,.06)", padding: 20,
              }}
            >
              <h2 style={{ color: C.azul, fontFamily: "Georgia, serif", fontSize: 22, marginTop: 0 }}>Seu Resultado</h2>
              <p><b>Ascendente:</b> {resp.ascendente ?? "—"}</p>
              <p><b>Sol:</b> {resp.sol}</p>
              <p><b>Lua:</b> {resp.lua}</p>
              <a
                href={resp.pdfUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: C.verde, textDecoration: "underline", display: "inline-block", marginTop: 8 }}
              >
                Abrir PDF
              </a>

              <div style={{ color: C.verde, fontSize: 14, marginTop: 12 }}>
                Na leitura completa, conecto <b>Casa 10</b> (carreira), <b>Sol</b> (liderança) e <b>Saturno</b> (método)
                para próximos passos alinhados ao seu Dharma.
              </div>
            </div>
          )}
        </div>
      </main>

      {/* RODAPÉ — azul com mantra */}
      <footer
        style={{
          background: C.azul, color: C.branco, padding: "20px 16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 96, height: 3, background: C.ouro,
            borderRadius: 2, margin: "0 auto 8px",
          }}
        />
        <div style={{ lineHeight: 1.6, fontStyle: "italic", opacity: 0.95 }}>
          Hare Krishna Hare Krishna Krishna Krishna Hare Hare <br />
          Hare Rama Hare Rama Rama Rama Hare Hare
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 8 }}>
          © {new Date().getFullYear()} Prema Sundari · Astrologia Védica & Carreira
        </div>
      </footer>
    </>
  );
}
