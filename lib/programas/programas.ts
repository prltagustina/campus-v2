import { getEtapa, getNivel, planMatematica, rutaNivel } from "@/lib/programas/plan-matematica";
import { getSeccionSecundaria, modoSecundaria, rutaSeccionSecundaria } from "@/lib/programas/modo-secundaria";

/**
 * Las tres experiencias del prototipo como entradas distintas del Campus
 * (en el Campus real están en el menú "Programas"). Diseño Curricular
 * conserva sus rutas de siempre; los otros dos tienen las propias.
 */
export const programas = [
  {
    id: "diseno-curricular",
    nombre: "Diseño Curricular Educación Primaria",
    nombreCorto: "Diseño Curricular",
    href: "/",
    imagen: { src: "/images/portada-diseno-curricular.png", alt: "", width: 2481, height: 3509 },
  },
  {
    id: "plan-provincial-de-matematica",
    nombre: planMatematica.nombre,
    nombreCorto: planMatematica.nombre,
    href: `/${planMatematica.slug}`,
    imagen: { ...planMatematica.imagen, alt: "" },
  },
  {
    id: "modo-secundaria",
    nombre: modoSecundaria.nombre,
    nombreCorto: modoSecundaria.nombre,
    href: `/${modoSecundaria.slug}`,
    imagen: { ...modoSecundaria.logo, alt: "" },
  },
] as const;

export type ProgramaId = (typeof programas)[number]["id"] | "portada";

/** Rutas que no son de Diseño Curricular. */
export function programaDeRuta(pathname: string): ProgramaId {
  if (pathname === "/programas") return "portada";
  if (pathname === `/${planMatematica.slug}` || pathname.startsWith(`/${planMatematica.slug}/`)) return "plan-provincial-de-matematica";
  if (pathname === `/${modoSecundaria.slug}` || pathname.startsWith(`/${modoSecundaria.slug}/`)) return "modo-secundaria";
  return "diseno-curricular";
}

export interface Miga {
  label: string;
  href?: string;
}

/** Migas de los programas (Diseño Curricular arma las suyas en AppShell). */
export function migasDePrograma(pathname: string): Miga[] {
  const partes = pathname.split("/").filter(Boolean);
  const programa = programaDeRuta(pathname);

  if (programa === "portada") return [{ label: "Programas" }];

  if (programa === "plan-provincial-de-matematica") {
    const migas: Miga[] = [{ label: planMatematica.nombre, href: `/${planMatematica.slug}` }];
    const nivel = partes[1] ? getNivel(partes[1]) : undefined;
    if (nivel) migas.push({ label: nivel.nombreCorto, href: rutaNivel(nivel) });
    const etapa = nivel && partes[2] ? getEtapa(nivel, partes[2]) : undefined;
    if (etapa) migas.push({ label: etapa.nombre, href: pathname });
    return migas;
  }

  if (programa === "modo-secundaria") {
    const migas: Miga[] = [{ label: modoSecundaria.nombre, href: `/${modoSecundaria.slug}` }];
    const seccion = partes[1] ? getSeccionSecundaria(partes[1]) : undefined;
    if (seccion) migas.push({ label: seccion.nombre, href: rutaSeccionSecundaria(seccion) });
    return migas;
  }

  return [];
}
