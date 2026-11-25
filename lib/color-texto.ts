/**
 * Color para texto sobre blanco en el color de un área: el mismo color si se
 * lee bien; si es claro (el celeste de Ciencias Sociales, el amarillo de
 * Lenguas Extranjeras), el mismo tono oscurecido hacia la tinta del sitio
 * (#494963) hasta que contraste 3:1, para que siga leyéndose «en color»
 * (títulos de los ejes en el popover de contenidos, como el mock de Agu).
 */
export function colorTextoSobreBlanco(color: string) {
  const hex = color.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return color;
  const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const tinta = [0x49, 0x49, 0x63];
  const contraste = (c: number[]) => {
    const [r, g, b] = c.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 1.05 / (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05);
  };
  for (let t = 0; t <= 1; t += 0.05) {
    const mezcla = rgb.map((v, i) => Math.round(v * (1 - t) + tinta[i] * t));
    if (contraste(mezcla) >= 3) return `#${mezcla.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }
  return "#494963";
}
