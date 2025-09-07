// pages/api/mapa.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { formatSvg } from "../../lib/wheel";

// Util: converte "signo + grau" em grau absoluto (0–360)
// Ex.: "Leão", 15 → 120 + 15 = 135
const SIGN_INDEX: Record<string, number> = {
  "Áries":0, "Touro":1, "Gêmeos":2, "Câncer":3, "Leão":4, "Virgem":5,
  "Libra":6, "Escorpião":7, "Sagitário":8, "Capricórnio":9, "Aquário":10, "Peixes":11
};
function signoToDeg(signo: string, grau: number) {
  const idx = SIGN_INDEX[signo] ?? 0;
  return (idx * 30 + (grau || 0)) % 360;
}

export const config = {
  api: { bodyParser: true }, // rodando em Node (não Edge)
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const {
      nome, data, hora, minuto,
      cidade, pais, email, telefone
    } = (req.body || {}) as Record<string,string>;

    // Validação mínima (ajuste como preferir)
    if (!nome || !data || !cidade || !pais || !email || !telefone) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    // -------------------------------------------------------------------
    // 🔁  (FASE 1 — DEMO) Simulação de ângulos para visualizar a roda
    // Troque por cálculos REAIS depois (Swiss Ephemeris, Lahiri).
    // Exemplo: vamos fingir que veio "Asc: Leão 10º, Sol: Escorpião 17º, Lua: Touro 3º"
    const ascDeg  = signoToDeg("Leão", 10);        // 130°
    const sunDeg  = signoToDeg("Escorpião", 17);   // 227°
    const moonDeg = signoToDeg("Touro", 3);        // 63°
    // -------------------------------------------------------------------

    // Gera o SVG
    const svg = formatSvg({ asc: ascDeg, sun: sunDeg, moon: moonDeg });

    // **Opcional:** se quiser retornar dataURL (pronto pra <img src="...">):
    const svgBase64 = Buffer.from(svg, "utf8").toString("base64");
    const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

    // Monte o payload (mantendo seu contrato atual)
    return res.status(200).json({
      ascendente: 
      sol: 
      lua:
      pdfUrl: "/exemplo.pdf",
      chartSvg: svg,        // SVG puro (p/ usar com dangerouslySetInnerHTML)
      chartDataUrl: dataUrl // Data URL (p/ usar direto em <img src=...>)
    });

  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao gerar mapa", detail: err?.message });
  }
}
