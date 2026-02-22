/**
 * Datos SVG extraidos de los esquemas de ejes oficiales del diseno curricular.
 * Cada area/subarea tiene su configuracion con coordenadas exactas del SVG original.
 */

export interface SvgNodeConfig {
  cx: number;
  cy: number;
  r: number;
}

export interface SvgLabelConfig {
  /** Transform position from the SVG <text> element */
  x: number;
  y: number;
  lines: string[];
  lineHeight: number;
  anchor: "start" | "middle" | "end";
}

export interface EjeSvgConfig {
  viewBox: string;
  /** Center circle */
  center: { cx: number; cy: number; r: number };
  /** Fill color of the center circle */
  centerFill: string;
  /** Dashed orbit circle */
  orbit: { cx: number; cy: number; r: number };
  /** Node circles (the small dots on the orbit) */
  nodes: SvgNodeConfig[];
  /** Node stroke color */
  nodeStroke: string;
  /** Node stroke width */
  nodeStrokeWidth: number;
  /** Arc paths (dashed connector arcs between nodes) */
  arcs: string[];
  /** Label text for each eje */
  labels: SvgLabelConfig[];
  /** Dark text color for "en [Area]" inside center circle */
  darkTextColor: string;
  /** Light text color for eje labels outside */
  labelColor: string;
}

/* ── Ciencias Sociales (3 ejes) ── */
const cienciasSociales: EjeSvgConfig = {
  viewBox: "0 0 496.66 375.89",
  center: { cx: 205.12, cy: 185.79, r: 79.35 },
  centerFill: "#9cf",
  orbit: { cx: 204.84, cy: 185.5, r: 112.01 },
  nodes: [
    { cx: 316.86, cy: 185.5, r: 8.19 },
    { cx: 148.81, cy: 282.52, r: 8.19 },
    { cx: 148.81, cy: 88.49, r: 8.19 },
  ],
  nodeStroke: "#9cf",
  nodeStrokeWidth: 3.47,
  arcs: [
    "M318.86,181.84c18.58-29.15,21.15-67.26,3.41-99.75-25.95-47.51-85.5-65-133.02-39.05-18.08,9.88-31.8,24.63-40.45,41.72",
    "M135.92,283.82c-34.57-.28-67.94-18.87-85.53-51.44-25.73-47.63-7.98-107.1,39.66-132.84,18.13-9.79,37.97-13.27,57.02-11.22",
    "M320.02,185.5c19.68,28.42,23.7,66.41,7.21,99.54-24.12,48.47-82.96,68.21-131.43,44.09-18.45-9.18-32.72-23.4-42.01-40.15",
  ],
  labels: [
    { x: 0, y: 19, lines: ["Las sociedades ", "y la construcci\u00f3n", "de los espacios"], lineHeight: 26.4, anchor: "start" },
    { x: 350.22, y: 152.98, lines: ["Las sociedades", "en el tiempo. ", "Cambios y ", "continuidades"], lineHeight: 26.4, anchor: "start" },
    { x: 0, y: 316.06, lines: ["Las sociedades,", "la vida cotidiana", "y las pr\u00e1cticas culturales "], lineHeight: 26.4, anchor: "start" },
  ],
  darkTextColor: "#40566b",
  labelColor: "#87c3f4",
};

/* ── Educacion Fisica (3 ejes) ── */
const educacionFisica: EjeSvgConfig = {
  viewBox: "0 0 527.5 404.65",
  center: { cx: 162.88, cy: 203.82, r: 83.9 },
  centerFill: "#20baa1",
  orbit: { cx: 158.68, cy: 203.82, r: 119.94 },
  nodes: [
    { cx: 98.69, cy: 307.7, r: 8.4 },
    { cx: 278.62, cy: 203.82, r: 8.4 },
    { cx: 98.69, cy: 99.95, r: 8.4 },
  ],
  nodeStroke: "#20baa1",
  nodeStrokeWidth: 3.92,
  arcs: [
    "M279.97,204.37c15.41,30.54,15.51,68.03-3.02,99.77-29.07,49.8-93.01,66.6-142.81,37.53-14.78-8.63-26.66-20.34-35.29-33.83",
    "M98.85,307.83c-34.15-1.97-66.64-20.67-84.82-52.61C-14.49,205.1,3.01,141.35,53.13,112.83c14.88-8.47,30.96-12.88,46.96-13.58",
    "M100.09,99.42c18.61-28.7,50.93-47.69,87.68-47.69,57.67,0,104.41,46.75,104.41,104.41,0,17.12-4.12,33.28-11.42,47.53",
  ],
  labels: [
    { x: 85.94, y: 48.57, lines: ["Pr\u00e1cticas corporales motrices", "y ludomotrices referidas al", "conocimiento y disponibilidad", "de s\u00ed mismo."], lineHeight: 21.6, anchor: "start" },
    { x: 294.68, y: 208.79, lines: ["Pr\u00e1cticas corporales motrices ", "y ludomotrices en interacci\u00f3n ", "con otras personas."], lineHeight: 21.6, anchor: "start" },
    { x: 26.39, y: 332.41, lines: ["Pr\u00e1cticas corporales motrices", "y ludomotrices en interacci\u00f3n", "con el ambiente."], lineHeight: 21.6, anchor: "start" },
  ],
  darkTextColor: "#15826d",
  labelColor: "#20baa1",
};

/* ── Matematica (4 ejes) ── */
const matematica: EjeSvgConfig = {
  viewBox: "0 0 511.91 357.72",
  center: { cx: 244.26, cy: 177.49, r: 80.31 },
  centerFill: "#e42254",
  orbit: { cx: 240.24, cy: 177.49, r: 114.81 },
  nodes: [
    { cx: 125.44, cy: 177.49, r: 8.04 },
    { cx: 355.05, cy: 177.49, r: 8.04 },
    { cx: 240.24, cy: 292.3, r: 8.04 },
    { cx: 240.24, cy: 62.69, r: 8.04 },
  ],
  nodeStroke: "#e42254",
  nodeStrokeWidth: 3.75,
  arcs: [
    "M240.51,62.69c14.22-12.59,32.92-20.23,53.4-20.23,44.51,0,80.59,36.09,80.59,80.6,0,20.62-7.75,39.45-20.5,53.7",
    "M354,176.76c12.75,14.25,20.5,33.08,20.5,53.7,0,44.51-36.08,80.6-80.59,80.6-20.96,0-40.06-8.01-54.4-21.13",
    "M126.37,176.03c-11.82,14.02-18.94,32.13-18.94,51.9,0,44.5,36.08,80.59,80.59,80.59,19.57,0,37.53-6.98,51.48-18.59",
    "M126.37,176.03c-12.36-14.16-19.86-32.7-19.86-52.97,0-44.51,36.08-80.6,80.59-80.6,20.48,0,39.17,7.64,53.4,20.23",
  ],
  labels: [
    { x: 0, y: 156, lines: ["La Tierra,", "el universo", "y sus cambios"], lineHeight: 21.68, anchor: "start" },
    { x: 380, y: 156, lines: ["Materiales:", "composici\u00f3n,", "propiedades", "y cambios"], lineHeight: 21.68, anchor: "start" },
    { x: 230, y: 310, lines: ["Los fen\u00f3menos del", "mundo f\u00edsico"], lineHeight: 21.68, anchor: "start" },
    { x: 230, y: 2.45, lines: ["N\u00fameros y", "operaciones"], lineHeight: 21.68, anchor: "start" },
  ],
  darkTextColor: "#89133b",
  labelColor: "#e42254",
};

/* ── Ciencias Naturales (4 ejes) ── */
const cienciasNaturales: EjeSvgConfig = {
  viewBox: "0 0 529.69 441.51",
  center: { cx: 260.81, cy: 204.2, r: 79.35 },
  centerFill: "#78b72a",
  orbit: { cx: 260.55, cy: 204.2, r: 113.43 },
  nodes: [
    { cx: 147.12, cy: 204.2, r: 7.94 },
    { cx: 373.97, cy: 204.2, r: 7.94 },
    { cx: 260.55, cy: 317.63, r: 7.94 },
    { cx: 260.55, cy: 90.78, r: 7.94 },
  ],
  nodeStroke: "#78b72a",
  nodeStrokeWidth: 3.71,
  arcs: [
    "M260.81,90.78c14.05-12.44,32.53-19.99,52.76-19.99,43.98,0,79.62,35.66,79.62,79.63,0,20.38-7.66,38.98-20.25,53.06",
    "M372.93,203.48c12.6,14.08,20.25,32.68,20.25,53.06,0,43.98-35.64,79.63-79.62,79.63-20.71,0-39.58-7.91-53.74-20.88",
    "M148.05,202.76c-11.68,13.85-18.71,31.74-18.71,51.28,0,43.97,35.64,79.62,79.62,79.62,19.34,0,37.08-6.9,50.87-18.36",
    "M148.05,202.76c-12.21-13.99-19.62-32.31-19.62-52.33,0-43.98,35.64-79.63,79.62-79.63,20.23,0,38.7,7.55,52.76,19.99",
  ],
  labels: [
    { x: 259.82, y: 19, lines: ["Los seres vivos: unidad, ", "diversidad, interacciones ", "y cambios"], lineHeight: 21.68, anchor: "start" },
    { x: 404.07, y: 166.5, lines: ["Materiales: ", "composici\u00f3n,", "propiedades ", "y cambios"], lineHeight: 21.68, anchor: "start" },
    { x: 259.82, y: 355.29, lines: ["Los fen\u00f3menos ", "del mundo f\u00edsico: ", "movimiento, fuerzas, ", "energ\u00eda, luz y sonido"], lineHeight: 26.4, anchor: "start" },
    { x: 0, y: 166.5, lines: ["La Tierra, ", "el universo", "y sus cambios"], lineHeight: 21.68, anchor: "start" },
  ],
  darkTextColor: "#3c5d26",
  labelColor: "#78b72a",
};

/* ── Ed. Tecnologica (4 ejes) ── */
const educacionTecnologica: EjeSvgConfig = {
  viewBox: "0 0 529.69 441.51",
  center: { cx: 260.81, cy: 204.2, r: 79.35 },
  centerFill: "#3c3ae5",
  orbit: { cx: 260.55, cy: 204.2, r: 113.43 },
  nodes: [
    { cx: 147.12, cy: 204.2, r: 7.94 },
    { cx: 373.97, cy: 204.2, r: 7.94 },
    { cx: 260.55, cy: 317.63, r: 7.94 },
    { cx: 260.55, cy: 90.78, r: 7.94 },
  ],
  nodeStroke: "#3c3ae5",
  nodeStrokeWidth: 3.71,
  arcs: [
    "M260.81,90.78c14.05-12.44,32.53-19.99,52.76-19.99,43.98,0,79.62,35.66,79.62,79.63,0,20.38-7.66,38.98-20.25,53.06",
    "M372.93,203.48c12.6,14.08,20.25,32.68,20.25,53.06,0,43.98-35.64,79.63-79.62,79.63-20.71,0-39.58-7.91-53.74-20.88",
    "M148.05,202.76c-11.68,13.85-18.71,31.74-18.71,51.28,0,43.97,35.64,79.62,79.62,79.62,19.34,0,37.08-6.9,50.87-18.36",
    "M148.05,202.76c-12.21-13.99-19.62-32.31-19.62-52.33,0-43.98,35.64-79.63,79.62-79.63,20.23,0,38.7,7.55,52.76,19.99",
  ],
  labels: [
    { x: 259.82, y: 19, lines: ["Los procesos", "tecnol\u00f3gicos"], lineHeight: 21.68, anchor: "start" },
    { x: 404.07, y: 166.5, lines: ["Los medios", "t\u00e9cnicos"], lineHeight: 21.68, anchor: "start" },
    { x: 259.82, y: 355.29, lines: ["La reflexi\u00f3n sobre la", "tecnolog\u00eda como proceso", "sociocultural"], lineHeight: 26.4, anchor: "start" },
    { x: 0, y: 166.5, lines: ["Las tecnolog\u00edas de la", "informaci\u00f3n y la", "comunicaci\u00f3n"], lineHeight: 21.68, anchor: "start" },
  ],
  darkTextColor: "#1e1d73",
  labelColor: "#3c3ae5",
};

/* ── Lengua y Literatura (5 ejes) -- uses existing hardcoded coords ── */
/* The Lengua SVG has 5 nodes; we keep the existing system for it */

/* ── Lenguas Extranjeras (5 ejes) -- uses existing hardcoded coords ── */
/* Same 5-node layout as Lengua */

/* ── Subareas de Ed. Artistica (3 ejes cada una, misma estructura) ── */
function makeArtisticaSubarea(
  viewBox: string,
  centerCx: number,
  centerCy: number,
  centerR: number,
  orbitCx: number,
  orbitCy: number,
  orbitR: number,
  nodesArr: SvgNodeConfig[],
  arcsArr: string[],
  labelsArr: SvgLabelConfig[]
): EjeSvgConfig {
  return {
    viewBox,
    center: { cx: centerCx, cy: centerCy, r: centerR },
    centerFill: "#ff6d7e",
    orbit: { cx: orbitCx, cy: orbitCy, r: orbitR },
    nodes: nodesArr,
    nodeStroke: "#ff6d7e",
    nodeStrokeWidth: 3.65,
    arcs: arcsArr,
    labels: labelsArr,
    darkTextColor: "#72132b",
    labelColor: "#ff6d7e",
  };
}

const artesVisualesArcs = [
  "M269.05,142.42c14.34,28.43,14.44,63.33-2.81,92.87-27.07,46.36-86.59,62-132.94,34.93-13.76-8.04-24.82-18.93-32.85-31.49",
  "M100.45,238.73c-31.79-1.84-62.04-19.24-78.96-48.98C-5.07,143.1,11.23,83.76,57.88,57.2c13.85-7.88,28.82-11.99,43.72-12.65",
  "M101.6,44.72C118.92,18,149.01.32,183.22.32c53.68,0,97.2,43.52,97.2,97.2,0,15.94-3.84,30.98-10.63,44.25",
];

const artesVisuales = makeArtisticaSubarea(
  "0 0 394.89 283.82",
  161.31, 141.39, 78.1,
  157.41, 141.39, 111.65,
  [
    { cx: 101.56, cy: 238.09, r: 7.82 },
    { cx: 269.05, cy: 141.39, r: 7.82 },
    { cx: 101.56, cy: 44.69, r: 7.82 },
  ],
  artesVisualesArcs,
  [
    { x: 289.67, y: 129.66, lines: ["Artes Visuales"], lineHeight: 21.6, anchor: "start" },
    { x: 289.67, y: 155, lines: ["en contexto"], lineHeight: 21.6, anchor: "start" },
    { x: 3.91, y: 268.64, lines: ["Apreciaci\u00f3n"], lineHeight: 21.6, anchor: "start" },
  ]
);

const musica = makeArtisticaSubarea(
  "0 0 375.46 283.82",
  161.31, 141.39, 78.1,
  157.4, 141.39, 111.65,
  [
    { cx: 101.56, cy: 238.09, r: 7.82 },
    { cx: 269.05, cy: 141.39, r: 7.82 },
    { cx: 101.56, cy: 44.69, r: 7.82 },
  ],
  artesVisualesArcs,
  [
    { x: 289.12, y: 129.66, lines: ["M\u00fasicas en"], lineHeight: 21.6, anchor: "start" },
    { x: 289.12, y: 151, lines: ["contexto"], lineHeight: 21.6, anchor: "start" },
    { x: 3.91, y: 268.64, lines: ["Apreciaci\u00f3n"], lineHeight: 21.6, anchor: "start" },
  ]
);

const audioVisuales = makeArtisticaSubarea(
  "0 0 404.25 283.82",
  173.55, 141.39, 78.1,
  169.64, 141.39, 111.65,
  [
    { cx: 113.8, cy: 238.09, r: 7.82 },
    { cx: 281.29, cy: 141.39, r: 7.82 },
    { cx: 113.8, cy: 44.69, r: 7.82 },
  ],
  [
    "M281.29,142.42c14.34,28.43,14.44,63.33-2.81,92.87-27.07,46.36-86.59,62-132.94,34.93-13.76-8.04-24.82-18.93-32.85-31.49",
    "M112.68,238.73c-31.79-1.84-62.04-19.24-78.96-48.98-26.55-46.65-10.26-106,36.4-132.55,13.85-7.88,28.82-11.99,43.72-12.65",
    "M113.84,44.72C131.16,18,161.24.32,195.46.32c53.68,0,97.2,43.52,97.2,97.2,0,15.94-3.84,30.98-10.63,44.25",
  ],
  [
    { x: 301.91, y: 117.46, lines: ["Artes audiovisuales"], lineHeight: 21.6, anchor: "start" },
    { x: 301.91, y: 139, lines: ["en contexto"], lineHeight: 21.6, anchor: "start" },
    { x: 3.91, y: 268.64, lines: ["Apreciaci\u00f3n"], lineHeight: 21.6, anchor: "start" },
  ]
);

const teatro = makeArtisticaSubarea(
  "0 0 376.2 283.82",
  157.4, 141.39, 78.1,
  153.49, 141.39, 111.65,
  [
    { cx: 97.65, cy: 238.09, r: 7.82 },
    { cx: 265.14, cy: 141.39, r: 7.82 },
    { cx: 97.65, cy: 44.69, r: 7.82 },
  ],
  [
    "M265.14,142.42c14.34,28.43,14.44,63.33-2.81,92.87-27.07,46.36-86.59,62-132.94,34.93-13.76-8.04-24.82-18.93-32.85-31.49",
    "M96.53,238.73c-31.79-1.84-62.04-19.24-78.96-48.98C-8.98,143.1,7.32,83.76,53.97,57.2c13.85-7.88,28.82-11.99,43.72-12.65",
    "M97.69,44.72C115.01,18,145.09.32,179.31.32c53.68,0,97.2,43.52,97.2,97.2,0,15.94-3.84,30.98-10.63,44.25",
  ],
  [
    { x: 284.49, y: 115.77, lines: ["Teatro en"], lineHeight: 21.6, anchor: "start" },
    { x: 284.49, y: 137, lines: ["contexto"], lineHeight: 21.6, anchor: "start" },
    { x: 0, y: 268.64, lines: ["Apreciaci\u00f3n"], lineHeight: 21.6, anchor: "start" },
  ]
);

const danza = makeArtisticaSubarea(
  "0 0 392.35 283.82",
  173.55, 141.39, 78.1,
  169.64, 141.39, 111.65,
  [
    { cx: 113.8, cy: 238.09, r: 7.82 },
    { cx: 281.29, cy: 141.39, r: 7.82 },
    { cx: 113.8, cy: 44.69, r: 7.82 },
  ],
  [
    "M281.29,142.42c14.34,28.43,14.44,63.33-2.81,92.87-27.07,46.36-86.59,62-132.94,34.93-13.76-8.04-24.82-18.93-32.85-31.49",
    "M112.68,238.73c-31.79-1.84-62.04-19.24-78.96-48.98-26.55-46.65-10.26-106,36.4-132.55,13.85-7.88,28.82-11.99,43.72-12.65",
    "M113.84,44.72C131.16,18,161.24.32,195.46.32c53.68,0,97.2,43.52,97.2,97.2,0,15.94-3.84,30.98-10.63,44.25",
  ],
  [
    { x: 302.94, y: 114.36, lines: ["Danza en"], lineHeight: 21.6, anchor: "start" },
    { x: 302.94, y: 136, lines: ["contexto"], lineHeight: 21.6, anchor: "start" },
    { x: 16.15, y: 268.64, lines: ["Apreciaci\u00f3n"], lineHeight: 21.6, anchor: "start" },
  ]
);

/**
 * Maps area slug (or subarea id) to its SVG configuration.
 * Areas with 5 ejes (lengua, lenguas-extranjeras) use the existing hardcoded system.
 * Ed. Artistica shows the generic 3-eje schema unless a subarea is selected.
 */
export const ejesSvgConfigs: Record<string, EjeSvgConfig> = {
  "ciencias-sociales": cienciasSociales,
  "educacion-fisica": educacionFisica,
  "matematica": matematica,
  "ciencias-naturales": cienciasNaturales,
  "educacion-tecnologica": educacionTecnologica,
  // Ed. Artistica subareas
  "artes-visuales": artesVisuales,
  "musica": musica,
  "artes-audiovisuales": audioVisuales,
  "teatro": teatro,
  "danza": danza,
};

/**
 * Map subarea id from constants to the key used in ejesSvgConfigs.
 * The constants use "artes-visuales", "musica", "teatro", "danza"
 * but audiovisuales is not in constants yet - we need to handle it.
 */
export const subareaToSvgKey: Record<string, string> = {
  "artes-visuales": "artes-visuales",
  "musica": "musica",
  "artes-audiovisuales": "artes-audiovisuales",
  "teatro": "teatro",
  "danza": "danza",
};
