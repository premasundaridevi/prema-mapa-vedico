// lib/astro.ts
import swe from "swisseph";
import tzlookup from "tz-lookup";
import { DateTime } from "luxon";

swe.swe_set_ephe_path(process.cwd() + "/public/ephe"); // caminho dos arquivos

export type BirthInput = {
  date: string;   // "YYYY-MM-DD"
  hour: string;   // "00".."23"
  minute: string; // "00".."59"
  city: string;
  country: string;
  lat: number;    // decimais: -23.55
  lon: number;    // decimais: -46.63 (Oeste negativo)
};

export type ChartResult = {
  ascendente: string;
  sol: string;
  lua: string;
  chartSvg: string; // SVG puro (string)
};

export function getTimezoneId(lat: number, lon: number) {
  return tzlookup(lat, lon); // ex.: "America/Sao_Paulo"
}

export function toJulianDayUTC(d: Date) {
  // Swiss usa JD; aqui um atalho via swisseph:
  const yyyy = d.getUTCFullYear();
  const mm = d.getUTCMonth() + 1;
  const dd = d.getUTCDate();
  const hh = d.getUTCHours() + d.getUTCMinutes()/60 + d.getUTCSeconds()/3600;
  return swe.swe_julday(yyyy, mm, dd, hh, swe.SE_GREG_CAL);
}

function dms(angle: number) {
  // Normaliza 0..360 e quebra em graus/minutos
  const a = ((angle % 360) + 360) % 360;
  const deg = Math.floor(a);
  const min = Math.floor((a - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}'`;
}

function lahiriSidereal() {
  // usa ayanamsha Lahiri (Chitrapaksha)
  swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);
}

export async function computeChart(input: BirthInput): Promise<ChartResult> {
  lahiriSidereal();

  // 1) Fuso horário a partir de lat/lon
  const tz = getTimezoneId(input.lat, input.lon);
  const local = DateTime.fromISO(`${input.date}T${input.hour}:${input.minute}`, { zone: tz });
  const utc = local.toUTC();

  // 2) Julian Day (UTC)
  const jd = toJulianDayUTC(utc.toJSDate());

  // 3) Posições (siderais)
  const flags = swe.SEFLG_SIDEREAL | swe.SEFLG_SWIEPH | swe.SEFLG_SPEED;

  const sun = swe.swe_calc_ut(jd, swe.SE_SUN, flags);
  const moon = swe.swe_calc_ut(jd, swe.SE_MOON, flags);
  const asc  = swe.swe_houses(jd, input.lat, input.lon, "P"); // Placidus
  const ascDeg = asc.ascendant;

  const solStr  = dms(sun.longitude);
  const luaStr  = dms(moon.longitude);
  const ascStr  = dms(ascDeg);

  // 4) Gera um SVG minimalista da roda (placeholder bonito)
  const svg = buildWheelSvg(ascDeg, sun.longitude, moon.longitude);

  return {
    ascendente: ascStr,
    sol: solStr,
    lua: luaStr,
    chartSvg: svg,
  };
}

// --- Wheel SVG simples/limpo (você pode sofisticar depois) ---
function buildWheelSvg(asc: number, sun: number, moon: number): string {
  const size = 520, r = 220, cx = size/2, cy = size/2;
  const axis = (deg: number, len = r) => {
    const rad = (deg - 90) * Math.PI/180;
    const x = cx + len * Math.cos(rad);
    const y = cy + len * Math.sin(rad);
    return `${x},${y}`;
  };
  const marker = (label: string, deg: number, color: string) => {
    const rad = (deg - 90) * Math.PI/180;
    const x = cx + (r-30) * Math.cos(rad);
    const y = cy + (r-30) * Math.sin(rad);
    return `
      <circle cx="${x}" cy="${y}" r="6" fill="${color}" />
      <text x="${x}" y="${y-10}" font-size="12" text-anchor="middle" fill="#0F4C5C" font-family="Raleway">${label}</text>
    `;
  };

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gold" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#EAD37A"/>
      <stop offset="0.6" stop-color="#D4AF37"/>
      <stop offset="1" stop-color="#B88A1E"/>
    </linearGradient>
  </defs>

  <circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#e9ecef" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${r-50}" fill="none" stroke="#f2f2f2"/>
  <!-- eixos 12 casas -->
  ${Array.from({length:12},(_,i)=>{
    const deg=i*30;
    return `<line x1="${cx}" y1="${cy}" x2="${axis(deg)}" stroke="#e9ecef" stroke-width="1"/>`;
  }).join("")}

  <!-- Asc (linha destacada) -->
  <line x1="${cx}" y1="${cy}" x2="${axis(asc)}" stroke="url(#gold)" stroke-width="3"/>

  <!-- marcadores -->
  ${marker("☉", sun, "#2f6f5e")}
  ${marker("☾", moon, "#c47c7c")}
  ${marker("Asc", asc, "#0F4C5C")}

  <circle cx="${cx}" cy="${cy}" r="3" fill="#0F4C5C"/>
</svg>`.trim();
}
