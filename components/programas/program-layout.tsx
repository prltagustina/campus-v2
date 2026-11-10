import type { ReactNode } from "react";

/**
 * Estructura de vista de los programas, la misma de "Materiales por área"
 * (AreaWorkspace): fondo blanco, un bloque de color arriba (como
 * DocumentoExplainer, con el marco de 14 px de v3-section) y secciones con
 * título grande (como "Itinerarios didácticos" / "Formaciones docentes").
 */

/**
 * Sin columna lateral (la portada de Programas), el contenido no se estira
 * a todo el ancho: va en una columna centrada de 56rem, como el contenido
 * de Familias, Equipos y EIB (más los 14 px del marco de cada bloque). Con
 * la columna de niveles del Plan al costado ya es más angosto.
 */
export function ProgramView({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-white pb-8 md:pb-10">
      <div className="md:mx-auto md:max-w-[calc(56rem+28px)]">{children}</div>
    </div>
  );
}

/** Bloque de cabecera de color. `imagen`: la portada del programa, al costado desde 1024 px. */
export function ProgramBanner({
  color,
  colorTexto,
  rotulo,
  titulo,
  descripcion,
  imagen,
  imagenSiempre = false,
  children,
}: {
  color: string;
  colorTexto: string;
  rotulo?: string;
  titulo: ReactNode;
  descripcion?: ReactNode;
  imagen?: { src: string; width: number; height: number };
  /** Mostrar la portada también en celular y tablet (abajo del texto). */
  imagenSiempre?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0">
      <div className="rounded-none px-4 py-6 sm:rounded-2xl sm:px-6 sm:py-7" style={{ backgroundColor: color, color: colorTexto }}>
        {/* Texto a la izquierda del bloque (no centrado), portada a la derecha. */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            {rotulo ? <p className="mb-2 text-[11px] font-bold uppercase tracking-[.14em]">{rotulo}</p> : null}
            <h1 className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-.035em] sm:text-4xl lg:text-[2.6rem]">{titulo}</h1>
            {descripcion ? <div className="mt-3 max-w-xl text-pretty text-sm leading-relaxed sm:text-base">{descripcion}</div> : null}
            {children}
          </div>
          {imagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagen.src} alt="" width={imagen.width} height={imagen.height} className={`h-auto shrink-0 rounded-xl object-cover lg:w-[300px] xl:w-[340px] ${imagenSiempre ? "w-full max-w-md" : "hidden lg:block"}`} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

/**
 * Sección con título grande, igual que "Itinerarios didácticos" en cada área
 * (MaterialesSection): mismo ritmo (pt-5 / md:pt-6), mismo encabezado. Bajada
 * en tinta al 82 % (el área la usa al 50 %, bajo 4,5:1; el manual propone 82).
 */
export function ProgramSection({ id, titulo, subtitulo, children }: { id: string; titulo: string; subtitulo?: ReactNode; children: ReactNode }) {
  return (
    <section id={`seccion-${id}`} aria-labelledby={id} className="pt-5 md:px-[14px] md:pt-6">
      <div className="mb-6 max-w-2xl px-4 md:mb-8 md:px-0">
        <h2 id={id} className="text-balance font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">{titulo}</h2>
        {subtitulo ? <p className="mt-2 max-w-xl text-pretty text-sm text-[#494963]/[.82] sm:text-base lg:text-lg">{subtitulo}</p> : null}
      </div>
      {children}
    </section>
  );
}
