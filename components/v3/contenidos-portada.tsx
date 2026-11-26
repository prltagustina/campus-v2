"use client";

import { Plus } from "lucide-react";
import { useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { ContenidosSecuencia } from "@/lib/contenidos-secuencias";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { colorTextoArea } from "@/lib/color-texto";

/**
 * «Ver contenidos» de una tarjeta con portada: el nombre de la secuencia y
 * sus ejes con los contenidos, para saber de qué trata antes de descargarla
 * (pedido de Visuales Curricular). Es solo información: la portada y las
 * acciones (Descargar, Compartir) ya están en la tarjeta y no se repiten
 * (pedido de Agu y Cami, 2026-11-25). Se abre con un clic, no al pasar el
 * mouse. En escritorio es un popover que se abre siempre en el mismo lugar
 * (que no salte por la vista): al costado de la tarjeta si es el único
 * documento del grupo, si no debajo del botón y centrado sobre la tarjeta
 * (arriba del botón si abajo no entra), con el fondo apenas oscurecido; un
 * clic afuera lo cierra. En celular, un panel desde abajo.
 */
export function ContenidosPortada({
  titulo,
  descripcion,
  contenidos,
  color,
}: {
  /** Título de la tarjeta: encabeza el popover si la secuencia no tiene
   * otro nombre. */
  titulo: string;
  /** Título y bajada, para lectores de pantalla. */
  descripcion: string;
  contenidos: ContenidosSecuencia;
  color: string;
}) {
  const isMobile = useIsMobile();
  const [abierto, setAbierto] = useState(false);
  // Documento solo en su grupo (con lugar a la derecha): el popover se abre
  // al costado de la tarjeta, alineado arriba con ella, para aprovechar el
  // blanco de la fila (pedido de Agus, acordado con Cami, 2026-11-25). Con
  // varias tarjetas, debajo del botón y centrado sobre la tarjeta.
  const [alCostado, setAlCostado] = useState(false);
  const alCostadoRef = useRef(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  // Ancla a medida: al costado, la tarjeta entera; si no, a lo ancho la
  // tarjeta (para centrar el popover) y a lo alto el botón (para abrirlo
  // justo debajo).
  const anclaRef = useRef({
    getBoundingClientRect: () => {
      const boton = botonRef.current?.getBoundingClientRect() ?? new DOMRect();
      const tarjeta = botonRef.current?.closest("li")?.getBoundingClientRect() ?? boton;
      if (alCostadoRef.current) return tarjeta;
      return new DOMRect(tarjeta.left, boton.top, tarjeta.width, boton.height);
    },
  });

  const cambiar = (abrir: boolean) => {
    if (abrir) {
      const tarjeta = botonRef.current?.closest("li");
      const sola = tarjeta?.parentElement?.children.length === 1;
      const lugar = tarjeta ? window.innerWidth - tarjeta.getBoundingClientRect().right : 0;
      // 23rem de popover + 16 de separación + 16 de margen.
      alCostadoRef.current = Boolean(sola && lugar >= 368 + 32);
      setAlCostado(alCostadoRef.current);
    }
    setAbierto(abrir);
  };

  const trigger = (
    <button
      ref={botonRef}
      type="button"
      aria-label={`Ver contenidos: ${descripcion}`}
      className="inline-flex h-8 w-fit items-center gap-1.5 rounded-[9px] bg-[color-mix(in_srgb,var(--accion)_9%,white)] px-2.5 text-[13px] font-semibold text-[var(--accion-texto)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--accion)_16%,white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963] data-[state=open]:bg-[color-mix(in_srgb,var(--accion)_16%,white)]"
    >
      <Plus className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      Ver contenidos
    </button>
  );

  // El popover y el panel van en un portal, fuera de la grilla de tarjetas:
  // el color de la sección se vuelve a pasar acá.
  const estiloColor = {
    ["--accion" as string]: color,
    ["--accion-texto" as string]: colorTextoArea(color),
    // Barra de scroll (si la lista no entra) en el color del área.
    ["--section-scrollbar" as string]: color,
  };

  // Editorial y mínimo: el nombre de la secuencia y, debajo, cada eje en
  // mayúsculas y en el color del área (en Sociales y Lenguas Extranjeras,
  // su tono oscuro, por contraste) con su bajada (los contenidos).
  const encabezado = (Titulo: typeof SheetTitle | "p") => (
    <div className="border-b border-[#494963]/[.1] pb-4">
      <p className="text-[10px] font-bold uppercase leading-none tracking-[.15em] text-[#494963]/55">Secuencia didáctica</p>
      <Titulo className="mt-2 text-pretty font-display text-[19px] font-medium leading-[1.15] tracking-[-0.02em] text-[#494963]">{contenidos.secuencia ?? titulo}</Titulo>
    </div>
  );

  const lista = (
    <div className="pt-4">
      <p className="text-[10px] font-bold uppercase leading-none tracking-[.15em] text-[#494963]/55">Contenidos</p>
      <div className="mt-3 divide-y divide-[#494963]/[.1]">
        {contenidos.ejes.map(({ eje, items }) => (
          <section key={eje} className="py-4 first:pt-0 last:pb-0">
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
        <SheetContent side="bottom" style={estiloColor} className="v3-scroll-theme max-h-[88dvh] gap-0 overflow-y-auto rounded-t-2xl border-0 bg-white px-5 pb-8 pt-6">
          <div className="pr-10">{encabezado(SheetTitle)}</div>
          <SheetDescription className="sr-only">Contenidos de {descripcion}</SheetDescription>
          {lista}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={abierto} onOpenChange={cambiar}>
      <PopoverAnchor virtualRef={anclaRef as RefObject<{ getBoundingClientRect: () => DOMRect }>} />
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      {/* Fondo apenas oscurecido mientras está abierto (pedido de Cami),
         debajo del popover. Solo visual (pointer-events-none): nunca puede
         dejar la página bloqueada; un clic afuera igual cierra el popover. */}
      {abierto
        ? createPortal(<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 bg-[#25253a]/25 animate-in fade-in-0 duration-200" />, document.body)
        : null}
      <PopoverContent
        side={alCostado ? "right" : "bottom"}
        align={alCostado ? "start" : "center"}
        sideOffset={alCostado ? 16 : 8}
        collisionPadding={16}
        style={estiloColor}
        aria-label={`Contenidos de ${descripcion}`}
        className="flex max-h-[min(36rem,var(--radix-popover-content-available-height))] w-[min(23rem,calc(100vw-2rem))] flex-col rounded-2xl border-0 bg-white p-0 text-[#494963] shadow-[0_12px_32px_rgba(73,73,99,.18)] ring-1 ring-[#494963]/[.08]"
      >
        {/* Encabezado fijo; si la lista es larga, se desplaza solo ella. */}
        <div className="shrink-0 px-5 pt-5">{encabezado("p")}</div>
        <div className="v3-scroll-theme min-h-0 flex-1 overflow-y-auto px-5 pb-5">{lista}</div>
      </PopoverContent>
    </Popover>
  );
}
