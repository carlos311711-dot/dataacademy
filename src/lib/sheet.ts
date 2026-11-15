// Lee la pestaña "Cursos" del Google Sheet (compartido como "cualquiera con el enlace puede ver").
// Sin API key ni dependencias: export CSV de Google. El sheet solo tiene info pública (precios, temarios).

// CSV RFC 4180: comillas, comas y saltos de línea dentro de celdas, "" como comilla escapada.
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head = [], ...body] = rows;
  const keys = head.map((h) => h.trim().toLowerCase());
  return body.filter((r) => r.some((c) => c.trim())).map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])));
}

// Una línea por fila con CURSO y todas sus columnas: una columna nueva en el sheet llega sola al prompt.
// Qué columnas son públicas lo decide la fórmula QUERY del sheet, no este código.
export const cursosTexto = (rows: Record<string, string>[]) =>
  rows
    .filter((r) => r.curso)
    .map((r) => "- " + Object.entries(r).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" | "))
    .join("\n");

const SHEET_ID = import.meta.env?.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID;
const URL_CSV = SHEET_ID && `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&headers=1&sheet=Cursos`;

// ponytail: caché en memoria 5 min por instancia; si Google falla se queda con lo último bueno
// (o "" → chat.ts usa src/data/academy.ts). Un fallo también espera 5 min antes de reintentar.
let cache = { at: 0, text: "" };
export async function cursosDelSheet(): Promise<string> {
  if (!URL_CSV || Date.now() - cache.at < 5 * 60_000) return cache.text;
  cache.at = Date.now();
  try {
    const res = await fetch(URL_CSV, { signal: AbortSignal.timeout(4_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = cursosTexto(parseCsv(await res.text()));
    if (text) cache.text = text;
  } catch (e) {
    console.error("Google Sheet de cursos no disponible, uso academy.ts", e);
  }
  return cache.text;
}
