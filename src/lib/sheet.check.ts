// Corre con: node src/lib/sheet.check.ts
import assert from "node:assert/strict";
import { parseCsv, cursosTexto } from "./sheet.ts";

const rows = parseCsv('CURSO,HORARIO,PROFES\r\nSQL,"JUE: 8 PM\n SAB: 6 ""PM""",JHON\n,,\n');
assert.deepEqual(rows, [{ curso: "SQL", horario: 'JUE: 8 PM\n SAB: 6 "PM"', profes: "JHON" }]);
assert.equal(cursosTexto([...rows, { curso: "", horario: "x", profes: "" }]), '- curso: SQL | horario: JUE: 8 PM\n SAB: 6 "PM" | profes: JHON');
console.log("sheet ok");
