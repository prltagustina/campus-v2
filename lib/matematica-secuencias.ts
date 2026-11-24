/* ─────────────────────────────────────────────
 * Cuadernillos de Matemática (Primaria): la secuencia didáctica de cada uno y
 * su portada nueva.
 * - Secuencia: título tal como figura en el PDF del Campus (relevado el
 *   2026-11-24).
 * - Eje: según la sección teórica de cada cuadernillo (a validar con el
 *   equipo de Matemática).
 * - Portada: simulación del sistema de portadas nuevo (diapositiva 10 de
 *   "Sistema de portadas - Secuencias Didácticas"), un tono de la paleta por
 *   grado. Generadas aparte y copiadas a /public/portadas/nuevas.
 * La bajada es la descripción que acompaña al nombre del archivo en los
 * repositorios (Diseño Curricular y Plan Provincial de Matemática).
 * ───────────────────────────────────────────── */

const NO = "Números y operaciones";
const GM = "Geometría y medida";
const AF = "Iniciación al álgebra y funciones";

const secuencias: Record<string, { secuencia: string; eje: string }> = {
  "1ro-n1": { secuencia: "Conociendo los números y el sistema de numeración", eje: NO },
  "1ro-n1-1": { secuencia: "Entre sumas y restas: construyendo un repertorio de cálculos memorizados en primer grado", eje: NO },
  "1ro-n1-2": { secuencia: "¡Figuras en juego!", eje: GM },
  "1ro-n1-3": { secuencia: "Operaciones de suma y resta: construyendo estrategias de cálculos", eje: NO },
  "2do-n1": { secuencia: "Entre sumas y restas: construyendo un repertorio de cálculos memorizados", eje: NO },
  "2do-n1-1": { secuencia: "Figuras bajo la lupa", eje: GM },
  "2do-n1-2": { secuencia: "Los números tienen secretos", eje: NO },
  "2do-n1-3": { secuencia: "Entre sapos, fichas y cálculos", eje: NO },
  "3ro-n1": { secuencia: "Exploradores de figuras", eje: GM },
  "3ro-n1-1": { secuencia: "Cálculos de suma y resta: ampliando el repertorio de cálculos memorizados", eje: NO },
  "3ro-n1-2": { secuencia: "Cálculos de multiplicar y dividir: ampliando el repertorio de cálculos memorizados", eje: NO },
  "3ro-n1-3": { secuencia: "Del medallero al cajero: números en juego", eje: NO },
  "4to-n1": { secuencia: "Entre productos, cocientes y secretos de las tablas", eje: NO },
  "4to-n1-1": { secuencia: "Figuras bajo la lupa: entre pistas, propiedades y diagonales", eje: GM },
  "5to-n1": { secuencia: "Circunferencias y triángulos: construcciones con regla y compás", eje: GM },
  "5to-n1-1": { secuencia: "Entre figuritas, camisetas y recetas", eje: NO },
  "6to-n1": { secuencia: "Entre descuentos y promociones: aprendiendo sobre porcentajes", eje: NO },
  "6to-n1-1": { secuencia: "Una vuelta por el mundo de las divisiones", eje: NO },
  "7mo-n1": { secuencia: "Los Juegos Suramericanos 2026", eje: AF },
  "7mo-n1-1": { secuencia: "Patios, bordes y polígonos: el camino hacia las fórmulas", eje: AF },
};

export type ClaveCuadernillo = keyof typeof secuencias;

/** Portada nueva y bajada del cuadernillo (clave: "1ro-n1", "4to-n1-1"...). */
export function cuadernilloMatematica(clave: ClaveCuadernillo) {
  const { secuencia, eje } = secuencias[clave];
  return {
    portada: `/portadas/nuevas/matematica-${clave}.jpg`,
    bajada: `Secuencia didáctica: ${secuencia}\u00a0· ${eje}`,
  };
}
