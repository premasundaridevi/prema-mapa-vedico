// pages/api/mapa.js
const swe = require("swisseph");
const tzlookup = require("tz-lookup");
const { DateTime } = require("luxon");
const path = require("path");

const ephePath = path.resolve(process.cwd(), "public/ephe");
swe.set_ephe_path(ephePath);
swe.set_sid_mode(swe.SIDM_LAHIRI, 0, 0);

const PLANETS = [
  { key: "sun", sweId: swe.SUN },
  { key: "moon", sweId: swe.MOON },
];

const SIGNS = [
  "Áries","Touro","Gêmeos","Câncer","Leão","Virgem",
  "Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"
];

function degToSign(d) {
  const idx = Math.floor(((d % 360) + 360) % 360 / 30);
  return SIGNS[idx];
}

function calcPlanetSidereal(jd_ut, body) {
  return new Promise((resolve, reject) => {
    swe.calc_ut(jd_ut, body, swe.FLG_SIDEREAL, (res) => {
      if (res && res.rc !== swe.ERR) resolve(res.longitude);
      else reject(new Error(res?.serr || "Erro no cálculo planetário"));
    });
  });
}

function calcHousesSidereal(jd_ut, lat, lon) {
  return new Promise((resolve, reject) => {
    swe.houses_ex(jd_ut, swe.FLG_SIDEREAL, lat, lon, "P", (res) => {
      if (res && res.ascendant != null) resolve({ asc: res.ascendant });
      else reject(new Error(res?.serr || "Erro no cálculo das casas/ascendente"));
    });
  });
}

function toJulianUT(y, m, d, hh, mm, tz) {
  const local = DateTime.fromObject({ year: y, month: m, day: d, hour: hh, minute: mm }, { zone: tz });
  const utc = local.toUTC();
  const hourDecimal = utc.hour + utc.minute / 60 + utc.second / 3600;
  return swe.julday(utc.year, utc.month, utc.day, hourDecimal, swe.GREG_CAL);
}

function required(v, name) {
  if (v === undefined || v === null || v === "") throw new Error(`Campo obrigatório faltando: ${name}`);
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { data, ano, mes, dia, hora, minuto, cidade, pais, lat, lon } = req.body || {};
    required(cidade, "cidade");
    required(pais, "pais");
    required(hora, "hora");
    required(minuto, "minuto");

    let Y, M, D;
    if (data) {
      const [yy, mm, dd] = String(data).split("-").map(Number);
      Y = yy; M = mm; D = dd;
    } else {
      required(ano, "ano"); required(mes, "mes"); required(dia, "dia");
      Y = Number(ano); M = Number(mes); D = Number(dia);
    }
    const HH = Number(hora);
    const MM = Number(minuto);

    let latitude, longitude, tzName;
    if (lat != null && lon != null) {
      latitude = Number(lat); longitude = Number(lon);
      tzName = tzlookup(latitude, longitude);
    } else {
      if (String(cidade).toLowerCase().includes("são paulo")) {
        latitude = -23.5505; longitude = -46.6333;
      } else {
        latitude = 0; longitude = 0; // coloque um geocoder real depois
      }
      tzName = tzlookup(latitude, longitude);
    }

    const jd_ut = toJulianUT(Y, M, D, HH, MM, tzName);

    const out = {};
    for (const p of PLANETS) {
      const lonG = await calcPlanetSidereal(jd_ut, p.sweId);
      out[p.key] = { deg: lonG, sign: degToSign(lonG) };
    }

    const { asc } = await calcHousesSidereal(jd_ut, latitude, longitude);
    out.asc = { deg: asc, sign: degToSign(asc) };

    return res.status(200).json({
      sistema: "sideral • Ayanāṁśa Lahiri (Chitrapaksha)",
      local: { latitude, longitude, tz: tzName },
      dataUT_jd: jd_ut,
      resultado: {
        ascendente: out.asc.sign,
        sol: out.sun.sign,
        lua: out.moon.sign,
        graus: out,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message || "Erro ao gerar mapa" });
  }
};
