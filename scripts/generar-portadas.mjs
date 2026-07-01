/**
 * Genera portadas (primera página) de los PDFs de itinerarios como imágenes
 * estáticas en /public/portadas. Se ejecuta una sola vez (o cuando cambian
 * los PDFs). Así el cliente carga imágenes livianas en vez de PDFs de ~6MB.
 *
 * Uso: node scripts/generar-portadas.mjs
 */
import {
  createCanvas,
  DOMMatrix,
  Path2D,
  ImageData,
} from "@napi-rs/canvas";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

// pdf.js espera estos globals del DOM para renderizar correctamente.
globalThis.DOMMatrix = DOMMatrix;
globalThis.Path2D = Path2D;
globalThis.ImageData = ImageData;

const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

const OUT_DIR = path.join(process.cwd(), "public", "portadas");
const TARGET_WIDTH = 600; // ancho del render (px)

// Lista de PDFs a procesar: { id, url } (url http) o { id, file } (ruta local)
const ART_DIR = path.join(process.cwd(), "public", "documentos", "articulacion");
const PDFS = [
  { id: "matematica-1ro", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/06/matematica_1er_-grado_2026.pdf" },
  { id: "matematica-2do", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/06/matematica_2do_grado_2026.pdf" },
  { id: "matematica-3ro", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/06/matematica_3er_grado_2026.pdf" },
  // Articulación primaria – secundaria (estudiantes + docentes) — PDFs locales
  { id: "ciencias-sociales-articulacion-estudiantes", file: path.join(ART_DIR, "ciencias-sociales-estudiantes.pdf") },
  { id: "ciencias-sociales-articulacion-docentes", file: path.join(ART_DIR, "ciencias-sociales-docentes.pdf") },
  { id: "lengua-articulacion-estudiantes", file: path.join(ART_DIR, "lengua-y-literatura-estudiantes.pdf") },
  { id: "lengua-articulacion-docentes", file: path.join(ART_DIR, "lengua-y-literatura-docentes.pdf") },
  { id: "ciencias-naturales-articulacion-estudiantes", file: path.join(ART_DIR, "ciencias-naturales-estudiantes.pdf") },
  { id: "ciencias-naturales-articulacion-docentes", file: path.join(ART_DIR, "ciencias-naturales-docentes.pdf") },
];

/** Factory de canvas (API por clase) para pdf.js usando @napi-rs/canvas. */
class NapiCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(target, width, height) {
    target.canvas.width = width;
    target.canvas.height = height;
  }
  destroy(target) {
    target.canvas.width = 0;
    target.canvas.height = 0;
  }
}

async function renderFirstPage({ url, file, id }) {
  let data;
  if (file) {
    console.log(`[portadas] Leyendo local ${id}...`);
    data = new Uint8Array(await readFile(file));
  } else {
    console.log(`[portadas] Descargando ${id}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} para ${url}`);
    data = new Uint8Array(await res.arrayBuffer());
  }

  const pdf = await getDocument({
    data,
    disableFontFace: true,
    CanvasFactory: NapiCanvasFactory,
  }).promise;
  const page = await pdf.getPage(1);

  const baseViewport = page.getViewport({ scale: 1 });
  const scale = TARGET_WIDTH / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: ctx, viewport, canvas }).promise;

  const jpg = await canvas.encode("jpeg", 82);
  const outPath = path.join(OUT_DIR, `${id}.jpg`);
  await writeFile(outPath, jpg);
  console.log(`[portadas] ✓ ${id}.jpg (${canvas.width}x${canvas.height}, ${(jpg.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const pdf of PDFS) {
    try {
      await renderFirstPage(pdf);
    } catch (err) {
      console.error(`[portadas] ✗ Error con ${pdf.id}:`, err.message);
    }
  }
  console.log("[portadas] Listo.");
}

main();
