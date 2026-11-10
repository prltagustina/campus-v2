import { redirect } from "next/navigation";
import { niveles, rutaNivel } from "@/lib/programas/plan-matematica";

/**
 * El Plan entra directo a Educación Inicial, como Áreas entra directo a
 * Marco General: los niveles están en la columna lateral (en celular, en la
 * barra inferior), así que no hace falta una portada intermedia.
 */
export default function PlanMatematicaPage() {
  redirect(rutaNivel(niveles[0]));
}
