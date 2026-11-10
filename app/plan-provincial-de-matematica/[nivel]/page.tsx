import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NivelBotonera } from "@/components/programas/matematica-nav";
import { PlanRepositorio } from "@/components/programas/plan-repositorio";
import { ProgramBanner, ProgramView } from "@/components/programas/program-layout";
import { getNivel, niveles, planMatematica, repositorioDe } from "@/lib/programas/plan-matematica";

export const dynamicParams = false;

export function generateStaticParams() {
  return niveles.map((nivel) => ({ nivel: nivel.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ nivel: string }> }): Promise<Metadata> {
  const nivel = getNivel((await params).nivel);
  return { title: `${nivel?.nombre ?? "Nivel"} · ${planMatematica.nombre} · Campus Educativo` };
}

/**
 * Un nivel del Plan, según la maqueta de Visuales Curricular (2026-11-10):
 * el bloque rojo del programa, la botonera horizontal de niveles (sin
 * columnas al costado), los grados o años y, debajo, Materiales,
 * Formaciones y Juegos Matemáticos del grado elegido. Mismos componentes
 * del sitio: el bloque de color, el botón de los niveles, las pestañas de
 * idiomas y el repositorio de las áreas.
 */
export default async function NivelPage({ params }: { params: Promise<{ nivel: string }> }) {
  const nivel = getNivel((await params).nivel);
  if (!nivel) notFound();
  const { color, colorTexto } = planMatematica;
  const claves = nivel.etapas.length ? nivel.etapas.map((etapa) => etapa.slug) : ["todo"];
  const porEtapa = Object.fromEntries(claves.map((slug) => [slug, repositorioDe(nivel, slug === "todo" ? undefined : slug)]));

  return (
    <ProgramView>
      <ProgramBanner
        color={color}
        colorTexto={colorTexto}
        titulo={planMatematica.nombre}
        descripcion="Materiales, formaciones y juegos matemáticos para Educación Inicial, Primaria y Secundaria."
        imagen={planMatematica.imagen}
      />
      <NivelBotonera actual={nivel.id} />
      <PlanRepositorio
        nivelId={nivel.id}
        nivelNombre={nivel.nombre}
        etapas={nivel.etapas}
        etapaTipo={nivel.etapaTipo}
        porEtapa={porEtapa}
        color={color}
        colorTexto={colorTexto}
      />
    </ProgramView>
  );
}
