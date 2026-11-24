// Corre con: node src/lib/sheet.check.ts
import assert from "node:assert/strict";
import { parseCsv, cursosTexto } from "./sheet.ts";

const rows = parseCsv('CURSO,INICIO,HORARIO\r\nSQL,04/01/2027,"JUE: 8 PM\n SAB: 6 ""PM"""\nEXCEL,11/12/2026,LUN\n,,\n');
assert.deepEqual(rows, [
  { curso: "SQL", inicio: "04/01/2027", horario: 'JUE: 8 PM\n SAB: 6 "PM"' },
  { curso: "EXCEL", inicio: "11/12/2026", horario: "LUN" },
]);
// sin fila vacía, ordenado por fecha de inicio, saltos de línea aplanados
assert.equal(
  cursosTexto([...rows, { curso: "", inicio: "", horario: "x" }]),
  '- curso: EXCEL | inicio: 11/12/2026 | horario: LUN\n- curso: SQL | inicio: 04/01/2027 | horario: JUE: 8 PM SAB: 6 "PM"',
);
console.log("sheet ok");
