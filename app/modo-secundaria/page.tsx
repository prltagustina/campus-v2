import type { Metadata } from "next";
import { TemaPanel } from "@/components/programas/secundaria-secciones";
import { modoSecundaria, temasDeSeccion } from "@/lib/programas/modo-secundaria";

export const metadata: Metadata = {
  title: `${modoSecundaria.nombre} · Campus Educativo`,
  description: "Documentos, aulas y materiales para la escuela secundaria.",
};

/**
 * Inicio de Modo Secundaria (primer botón de la columna, como Inicio en
 * Diseño Curricular): el logo, la introducción y los Accesos, que en el
 * Campus van primero. El resto de los temas está en las otras secciones de
 * la columna, cada uno en un solo lugar.
 */
export default function ModoSecundariaPage() {
  return (
    <div className="flex min-h-full flex-col overflow-hidden rounded-none bg-[#F7F7F9] md:rounded-2xl md:border md:border-[#494963]/[.06]">
      {/* Mismo encabezado que EditorialPageHeading, con el logo del programa como título. */}
      <header className="relative flex shrink-0 items-center border-b border-[#494963]/[.08] bg-white px-5 py-10 text-[#494963] md:px-10 md:py-12">
        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={modoSecundaria.logo.src} alt={modoSecundaria.logo.alt} width={modoSecundaria.logo.width} height={modoSecundaria.logo.height} className="h-auto w-full max-w-[480px]" />
          </h1>
          <div className="mt-8 flex max-w-[40rem] flex-col gap-4 text-base leading-[1.7] text-[#494963]/[.88] md:text-[17px]">
            {modoSecundaria.introduccion.map((parrafo) => <p key={parrafo.slice(0, 24)} className="text-pretty">{parrafo}</p>)}
          </div>
        </div>
      </header>

      {/* Mismo aire que el contenido de una pestaña en Familias/Equipos/EIB. */}
      <div className="px-4 py-6 sm:px-6 md:py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {temasDeSeccion("inicio").map((tema) => <TemaPanel key={tema.slug} tema={tema} />)}
        </div>
      </div>
    </div>
  );
}
