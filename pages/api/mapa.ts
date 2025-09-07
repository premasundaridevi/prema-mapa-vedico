export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { nome, data, hora, cidade, pais, email, telefone } = req.body;

    // data vem como "2025-09-07" (YYYY-MM-DD)
    const [ano, mes, dia] = data.split("-").map(Number);

    // hora vem como "HH:MM"
    const [h, m] = hora ? hora.split(":").map(Number) : [12, 0];

    // Aqui você terá dia, mês, ano, hora e minuto corretos
    console.log({ ano, mes, dia, h, m, cidade, pais });

    // ➝ Chamar a lib de astrologia sideral (Swiss Ephemeris, Astrale ou API externa)
    // ➝ Calcular com Ayanamsa Lahiri
    // ➝ Retornar ascendente, sol, lua etc.

    res.json({
      ascendente: "Leão",
      sol: "Virgem",
      lua: "Peixes",
      pdfUrl: "/meu-mapa.pdf",
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
