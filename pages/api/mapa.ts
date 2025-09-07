// pages/api/mapa.ts
import type { NextApiRequest, NextApiResponse } from "next";
import * as swe from "swisseph";
import tzlookup from "tz-lookup";
import { DateTime } from "luxon";
import path from "path";

// --- utilidades
const SIGNS = [
  "Áries","Touro","Gêmeos","Câncer","Leão","Virgem",
  "Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"
];
const norm360 = (x: number) => ((x % 360) + 360) % 360;
const toSign = (deg: number) => SIGNS[Math.floor(norm360(deg) / 30)];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { nome, data, hora, minuto, cidade, pais, email, telefone } = req.body || {};
    if (!nome || !data || hora == null || minuto == null || !cidade || !pais || !email || !telefone) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    // 1) Geocodifica cidade -> lat/lon (API grátis do Open-Meteo)
    const q = encodeURIComponent(`${cidade}, ${pais}`);
    const geoR = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1&language=pt&format=json`
    );
    const geo = await geoR.json();
    if (!geo?.results?.length) {
      return res.status(400).json({ error: "Cidade não encontrada" });
    }
    const { latitude: lat, longitude: lon } = geo.results[0];

    // 2) Descobre fuso/IANA a partir de lat/lon
    const zone = tzlookup(lat, lon);

    // 3) Converte data local -> UTC preciso (DST incluso)
    const [Y, M, D] = String(data).split("-").map(Number);
    const H = Number(hora);
    const Min = Number(minuto);
    const dtLocal = DateTime.fromObject({ year: Y, month: M, day: D, hour: H, minute: Min }, { zone });
    const dtUtc = dtLocal.toUTC();

    // 4) Prepara Swiss Ephemeris (caminho dos arquivos)
    const ephePath = path.join(process.cwd(), "public", "ephe");
    swe.set_ephe_path(ephePath);
    // Modo sideral: Lahiri
    swe.set_sid_mode(swe.SIDM_LAHIRI);

    // 5) Calcula JD em UT (horas decimais)
    const utHour = dtUtc.hour + dtUtc.minute / 60 + dtUtc.second / 3600;
    const jd_ut = swe.julday(dtUtc.year, dtUtc.month, dtUtc.day, utHour, swe.GREG_CAL);

    // 6) Sol e Lua (sideral)
    const flags = swe.FLG_SWIEPH; // sidéreo já vem de set_sid_mode
    const sunLon: number = await new Promise((resolve, reject) => {
      swe.calc_ut(jd_ut, swe.SUN, flags, (r: any) => (r?.error ? reject(r.error) : resolve(norm360(r.longitude))));
    });
    const moonLon: number = await new Promise((resolve, reject) => {
      swe.calc_ut(jd_ut, swe.MOON, flags, (r: any) => (r?.error ? reject(r.error) : resolve(norm360(r.longitude))));
    });

    // 7) Ascendente (tropical -> ajusta pela ayanamsa p/ virar sideral)
    const ascTrop: number = await new Promise((resolve, reject) => {
      swe.houses(jd_ut, lat, lon, "P", (r: any) => (r?.error ? reject(r.error) : resolve(norm360(r.ascmc[0]))));
    });
    const ayan = swe.get_ayanamsa_ut(jd_ut);
    const ascLon = norm360(ascTrop - ayan);

    // 8) Resultado (signos + graus)
    const resultado = {
      ascendente: toSign(ascLon),
      sol: toSign(sunLon),
      lua: toSign(moonLon),
      graus: { asc: ascLon, sol: sunLon, lua: moonLon },

      // se você já criou /lib/wheel.ts, descomente 3 linhas abaixo:
      // wheel: (() => {
      //   const { formatSvg } = require("../../lib/wheel");
      //   return "data:image/svg+xml;utf8," + encodeURIComponent(formatSvg({ asc: ascLon, sun: sunLon, moon: moonLon }));
      // })(),
    };

    return res.status(200).json(resultado);
  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao gerar o mapa", detail: err?.message || String(err) });
  }
}
