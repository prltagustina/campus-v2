import { areasData } from "@/lib/areas-data";

const BLANCO = /^#?f{3}(f{3})?$/i;

/**
 * Color para texto sobre blanco dentro del contenido de un área (títulos de
 * los repositorios, tarjetas, Descargar, Ver contenidos, ejes del popover,
 * enlaces). Solo cambia en las dos áreas claras, el celeste de Ciencias
 * Sociales y el amarillo de Lenguas Extranjeras, que no se leen sobre
 * blanco: usan el tono oscuro que ya tienen definido en areas-data
 * (textOnColor: #1a3a5c y #5c4a00). Las demás áreas siguen con su color tal
 * cual. Las botoneras (menú de áreas, subáreas e idiomas) siguen en el color
 * del área, igual que fondos, bordes, flechas y barras (pedido de Agus,
 * 2026-11-25).
 */
export function colorTextoArea(color: string) {
  const area = areasData.find((a) => a.color.toLowerCase() === color.toLowerCase());
  return area && !BLANCO.test(area.textOnColor) ? area.textOnColor : color;
}

/** Texto sobre un relleno del color del área (p. ej. Descargar al pasar el
 * mouse): el textOnColor del área (blanco, o su tono oscuro en las claras). */
export function colorSobreArea(color: string) {
  return areasData.find((a) => a.color.toLowerCase() === color.toLowerCase())?.textOnColor ?? "#ffffff";
}
