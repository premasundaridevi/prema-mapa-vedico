// lib/wheel.ts
// Gera um SVG de roda védica simples (12 casas) + marcadores de Asc, Sol e Lua.

type PlanetSet = {
  asc: number; // graus 0–360
  sun: number;
  moon: number;
};

export function polarToXY(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

export function formatSvg({ asc, sun, moon }: PlanetSet) {
  // Paleta Prema
  const C = {
    azul:  "#0F4C5C",
    verde: "#2f6f5e",
    rosa:  "#c47c7c",
    ouro:  "#D4AF37",
    branco:"#ffffff",
    cinza: "#f2f2f2",
  };

  const size = 480;          // tamanho do SVG
  const cx = size / 2;       // centro X
  const cy = size / 2;       // centro Y
  const R  = 200;            // raio da roda
  const inner = 145;         // raio do anel interno
  const tickR = R + 6;

  const ring = `
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="${C.branco}" stroke="${C.azul}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="${inner}" fill="none" stroke="${C.cinza}" stroke-width="1.5"/>
  `;

  // 12 casas (cada 30º). Começamos a casa 1 no Ascendente.
  const houseLines = Array.from({ length: 12 }, (_, i) => {
    const deg = (asc + i * 30) % 360;
    const p = polarToXY(R, deg - 90); // -90 para 0º apontar “para cima”
    return `<line x1="${cx}" y1="${cy}" x2="${cx + p.x}" y2="${cy + p.y}" stroke="${C.cinza}" stroke-width="1"/>`;
  }).join("");

  // Ticks a cada 30º (signos) como marca externa
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const deg = i * 30;
    const p = polarToXY(tickR, deg - 90);
    return `<circle cx="${cx + p.x}" cy="${cy + p.y}" r="2" fill="${C.azul}" />`;
  }).join("");

  // Função para desenhar um marcador de planeta
  function marker(deg: number, color: string, label: string) {
    const p = polarToXY((inner + R) / 2, deg - 90);
    const px = cx + p.x, py = cy + p.y;
    return `
      <g>
        <circle cx="${px}" cy="${py}" r="6.5" fill="${C.branco}" stroke="${color}" stroke-width="2"/>
        <text x="${px}" y="${py + 22}" font-size="11" text-anchor="middle" fill="${color}" font-family="Raleway, Arial">
          ${label}
        </text>
      </g>
    `;
  }

  const svg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="transparent"/>
    ${ring}
    ${houseLines}
    ${ticks}
    ${marker(asc,  C.ouro,  "Asc")}
    ${marker(sun,  C.azul,  "Sol")}
    ${marker(moon, C.rosa,  "Lua")}
    <text x="${cx}" y="${cy + 4}" font-size="12" text-anchor="middle" fill="${C.verde}" font-family="Raleway, Arial">
      Sistema sideral • Ayanāṁśa Lahiri
    </text>
  </svg>`;
  return svg.trim();
}
