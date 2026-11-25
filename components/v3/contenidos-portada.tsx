"use client";

import { FileText, Plus } from "lucide-react";
import { useRef, type ReactNode, type RefObject } from "react";
import type { ContenidosSecuencia } from "@/lib/contenidos-secuencias";
import { useIsMobile } from "@/hooks/use-mobile";
import { colorTextoSobreBlanco } from "@/lib/color-texto";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/**
 * «Ver contenidos» de una tarjeta con portada: la portada, el nombre de la
 * secuencia y sus ejes con los contenidos, para saber de qué trata antes de
 * descargarla (pedido de Visuales Curricular). Se abre con un clic, no al
 * pasar el mouse; adentro van las mismas acciones de la tarjeta. En escritorio es un popover que se abre siempre en el mismo lugar
 * (pedido explícito: que no salte por la vista): debajo del botón y centrado
 * sobre la tarjeta (arriba del botón si abajo no entra). En celular, un panel
 * desde abajo.
 */
export function ContenidosPortada({
  titulo,
  descripcion,
  portada,
  contenidos,
  color,
  acciones,
}: {
  /** Título de la tarjeta: encabeza el popover si la secuencia no tiene
   * otro nombre. */
  titulo: string;
  /** Título y bajada, para lectores de pantalla. */
  descripcion: string;
  portada?: string;
  contenidos: ContenidosSecuencia;
  color: string;
  acciones: ReactNode;
}) {
  const isMobile = useIsMobile();
  const botonRef = useRef<HTMLButtonElement>(null);
  // Ancla a medida: a lo ancho, la tarjeta entera (para centrar el popover
  // sobre ella); a lo alto, el botón (para abrirlo justo debajo).
  const anclaRef = useRef({
    getBoundingClientRect: () => {
      const boton = botonRef.current?.getBoundingClientRect() ?? new DOMRect();
      const tarjeta = botonRef.current?.closest("li")?.getBoundingClientRect() ?? boton;
      return new DOMRect(tarjeta.left, boton.top, tarjeta.width, boton.height);
    },
  });

  const trigger = (
    <button
      ref={botonRef}
      type="button"
      aria-label={`Ver contenidos: ${descripcion}`}
      className="mt-2.5 inline-flex h-8 w-fit items-center gap-1.5 rounded-[9px] bg-[color-mix(in_srgb,var(--accion)_9%,white)] px-2.5 text-[13px] font-semibold text-[var(--accion-texto)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--accion)_16%,white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963] data-[state=open]:bg-[color-mix(in_srgb,var(--accion)_16%,white)]"
    >
      <Plus className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      Ver contenidos
    </button>
  );

  // El popover y el panel van en un portal, fuera de la grilla de tarjetas:
  // el color de la sección se vuelve a pasar acá.
  const estiloColor = {
    ["--accion" as string]: color,
    ["--accion-texto" as string]: colorTextoSobreBlanco(color),
    // Barra de scroll (si la lista no entra) en el color del área.
    ["--section-scrollbar" as string]: color,
  };

  const tapa = portada ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={portada} alt="" className="aspect-[212/300] w-full rounded-[4px] object-cover shadow-[0_6px_14px_rgba(20,20,35,.16)]" />
  ) : (
    <span className="grid aspect-[212/300] w-full place-items-center rounded-[4px] border border-[color-mix(in_srgb,var(--accion)_22%,transparent)] bg-white text-[var(--accion)]" aria-hidden="true">
      <FileText className="h-5 w-5 opacity-60" strokeWidth={1.5} />
    </span>
  );

  // Editorial y mínimo: la portada con el nombre de la secuencia y, debajo,
  // cada eje en mayúsculas y en el color del área con su bajada (los
  // contenidos) en párrafos, como el diseño de Visuales Curricular.
  const encabezado = (Titulo: typeof SheetTitle | "p") => (
    <div className="flex items-start gap-4 border-b border-[#494963]/[.1] pb-4">
      <div className="w-[76px] shrink-0">{tapa}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase leading-none tracking-[.15em] text-[#494963]/55">Secuencia didáctica</p>
        <Titulo className="mt-2 text-pretty font-display text-[19px] font-medium leading-[1.15] tracking-[-0.02em] text-[#494963]">{contenidos.secuencia ?? titulo}</Titulo>
      </div>
    </div>
  );

  const lista = (
    <div className="pt-4">
      <p className="text-[10px] font-bold uppercase leading-none tracking-[.15em] text-[#494963]/55">Contenidos</p>
      <div className="mt-3 divide-y divide-[#494963]/[.1]">
        {contenidos.ejes.map(({ eje, items }) => (
          <section key={eje} className="py-4 first:pt-0">
            <h4 className="text-[15px] font-bold uppercase leading-snug tracking-[.02em] text-[var(--accion-texto)]">{eje}</h4>
            {items?.length ? (
              <ul className="mt-3 space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="text-sm leading-snug text-[#494963]/[.86]">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="bottom" style={estiloColor} className="v3-scroll-theme max-h-[88dvh] gap-0 overflow-y-auto rounded-t-2xl border-0 bg-white px-5 pb-6 pt-6">
          <div className="pr-10">{encabezado(SheetTitle)}</div>
          <SheetDescription className="sr-only">Contenidos de {descripcion}</SheetDescription>
          {lista}
          <div className="mt-4 flex flex-wrap items-center gap-2">{acciones}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover>
      <PopoverAnchor virtualRef={anclaRef as RefObject<{ getBoundingClientRect: () => DOMRect }>} />
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="center"
        sideOffset={8}
        collisionPadding={16}
        style={estiloColor}
        aria-label={`Contenidos de ${descripcion}`}
        className="flex max-h-[min(36rem,var(--radix-popover-content-available-height))] w-[min(23rem,calc(100vw-2rem))] flex-col rounded-2xl border-0 bg-white p-0 text-[#494963] shadow-[0_12px_32px_rgba(73,73,99,.18)] ring-1 ring-[#494963]/[.08]"
      >
        {/* Encabezado y acciones fijos; si la lista es larga, se desplaza
           solo ella (Descargar siempre a la vista). */}
        <div className="shrink-0 px-5 pt-5">{encabezado("p")}</div>
        <div className="v3-scroll-theme min-h-0 flex-1 overflow-y-auto px-5 pb-1">{lista}</div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-[#494963]/[.08] px-5 py-4">{acciones}</div>
      </PopoverContent>
    </Popover>
  );
}
