import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";
import { SectionTabs } from "@/components/v3/section-rail";
import { TemaPanel } from "@/components/programas/secundaria-secciones";
import { getSeccionSecundaria, modoSecundaria, seccionesSecundaria, temasDeSeccion } from "@/lib/programas/modo-secundaria";

export const dynamicParams = false;

export function generateStaticParams() {
  return seccionesSecundaria.filter((seccion) => seccion.slug).map((seccion) => ({ seccion: seccion.slug! }));
}

export async function generateMetadata({ params }: { params: Promise<{ seccion: string }> }): Promise<Metadata> {
  const seccion = getSeccionSecundaria((await params).seccion);
  return { title: `${seccion?.nombre ?? "Sección"} · ${modoSecundaria.nombre} · Campus Educativo` };
}

/**
 * Una sección de Modo Secundaria con la plantilla de Familias, Equipos y
 * EIB: encabezado editorial y una pestaña por tema, en el orden del Campus.
 * La pestaña queda en la dirección (`#evaluacion`) para compartirla.
 */
export default async function SeccionSecundariaPage({ params }: { params: Promise<{ seccion: string }> }) {
  const seccion = getSeccionSecundaria((await params).seccion);
  if (!seccion) notFound();
  const temas = temasDeSeccion(seccion.id);

  return (
    <div className="flex min-h-full flex-col overflow-hidden rounded-none bg-[#F7F7F9] md:rounded-2xl md:border md:border-[#494963]/[.06]">
      <EditorialPageHeading title={seccion.nombre} />
      <SectionTabs title={`Temas de ${seccion.nombre}`} items={temas.map((tema) => ({ id: tema.slug, label: tema.nombre }))} keepVisitedPanels hashSync>
        {temas.map((tema) => (
          <div key={tema.slug} className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
            <div className="mx-auto max-w-4xl">
              <TemaPanel tema={tema} />
            </div>
          </div>
        ))}
      </SectionTabs>
    </div>
  );
}
