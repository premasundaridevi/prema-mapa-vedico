import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, data, hora, cidade, pais, email, telefone } = req.body;

  if (!nome || !data || !cidade || !pais || !email || !telefone) {
    return res.status(400).json({ error: "Campos obrigatórios faltando" });
  }

  try {
    // 🔹 Resposta simulada por enquanto
    const resultado = {
      ascendente: 
      sol: 
      lua: 
      pdfUrl: "/exemplo-mapa.pdf",
    };

    return res.status(200).json(resultado);
  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao gerar o mapa", detail: err.message });
  }
}
