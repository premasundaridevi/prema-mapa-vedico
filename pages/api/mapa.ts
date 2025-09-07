import { NextApiRequest, NextApiResponse } from "next";
import { Chart } from "astronode";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { nome, data, hora, minuto, cidade, pais, email, telefone } = req.body;

    // Exemplo: montar data/hora
    const birthDate = new Date(`${data}T${hora}:${minuto}:00`);

    // Gera o gráfico
    const chart = new Chart({
      date: birthDate,
      location: { latitude: -23.55, longitude: -46.63 }, // precisa converter cidade → coords (usar API geocoding)
    });

    const svg = chart.renderSVG(); // retorna SVG do mapa
    // Salvar ou retornar direto
    res.status(200).json({
      ascendente: chart.ascendant,
      sol: chart.planets.sun.sign,
      lua: chart.planets.moon.sign,
      chartSVG: svg, // manda o gráfico inline
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
