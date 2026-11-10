import { Download, Eye, FileText } from "lucide-react";
import { ShareResourceButton } from "@/components/v3/share-resource-button";

export interface TarjetaPortada {
  id: string;
  titulo: string;
  detalle?: string;
  meta?: string;
  /** Rótulo chico arriba del título (p. ej. la categoría), como en las filas. */
  rotulo?: string;
  /** Tapa publicada en el Campus (vertical, 212 × 300). Sin tapa, una genérica
   * con el ícono de documento, para que la grilla no quede despareja. */
  portada?: string;
  /** Descarga directa ("Descargar PDF"). */
  descargar?: string;
  /** Visor (Google Drive): solo el ojo. */
  ver?: string;
}

/**
 * Botón de acción de las tarjetas con portada: mismo botón que «Descargar
 * PDF» del bloque de documento, en el color de la sección, con el texto
 * corto de las filas del repositorio. «Ver» va solo con
 * el ojo (el nombre completo queda para lectores de pantalla), así entra
 * junto a Descargar y Compartir.
 */
function AccionPortada({ tipo, url, titulo }: { tipo: "ver" | "descargar"; url: string; titulo: string }) {
  const ver = tipo === "ver";
  const Icono = ver ? Eye : Download;
  return (
    <a
      href={url}
      target={ver ? "_blank" : undefined}
      rel={ver ? "noopener noreferrer" : undefined}
      download={ver ? undefined : ""}
      aria-label={`${ver ? "Ver documento" : "Descargar PDF"}: ${titulo}${ver ? " (se abre en una pestaña nueva)" : ""}`}
      title={ver ? "Ver documento" : undefined}
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[9px] border border-[color-mix(in_srgb,var(--accion)_25%,transparent)] bg-white text-sm font-semibold text-[var(--accion)] transition-colors duration-150 hover:border-[var(--accion)] hover:bg-[var(--accion)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963] ${ver ? "w-10" : "px-3.5"}`}
    >
      <Icono className="h-4 w-4 shrink-0" aria-hidden="true" />
      {/* "Descargar", como en las filas del repositorio: el formato ya
         figura arriba y así entran Descargar, Ver y Compartir en una línea. */}
      {ver ? null : "Descargar"}
    </a>
  );
}

/**
 * Documentos con portada (como en el Campus), con el esqueleto de las
 * tarjetas de Formaciones del sitio: tarjeta blanca redondeada con la sombra
 * chica, arriba la tapa centrada sobre un fondo apenas teñido del color de la
 * sección y abajo el título, el formato y las acciones (alineadas abajo,
 * separadas por la línea fina de Formaciones). Cuando el bloque tiene ancho
 * para que entren las acciones en una línea (820 px, se mide el bloque y no
 * la pantalla), tres por fila, todas del mismo ancho; si no, cada tarjeta es
 * una fila (tapa chica a la izquierda, datos y acciones a la derecha), para
 * no apilar tapas enormes.
 * La usan Modo Secundaria (Alfabetización, Itinerarios Matemáticos) y los
 * Juegos Matemáticos del Plan.
 */
export function TarjetasPortada({
  items,
  color = "#494963",
  nivelTitulo = "h3",
}: {
  items: TarjetaPortada[];
  color?: string;
  /** h4 cuando las tarjetas van debajo de un encabezado de grado (h3). */
  nivelTitulo?: "h3" | "h4";
}) {
  const Titulo = nivelTitulo;
  return (
    <div className="@container">
    <ul className="grid gap-3 @min-[820px]:grid-cols-3 @min-[820px]:gap-4" style={{ ["--accion" as string]: color }}>
      {items.map((item) => {
        const contexto = item.detalle ? `${item.titulo}, ${item.detalle}` : item.titulo;
        return (
          <li key={item.id} className="flex min-w-0 overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(73,73,99,.065)] ring-1 ring-[#494963]/[.06] @min-[820px]:flex-col">
            <div className="flex shrink-0 items-center justify-center bg-[color-mix(in_srgb,var(--accion)_6%,white)] p-3 @min-[820px]:px-6 @min-[820px]:py-7">
              {item.portada ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.portada} alt="" loading="lazy" className="aspect-[212/300] w-16 rounded-[4px] object-cover shadow-[0_8px_20px_rgba(20,20,35,.16)] @min-[480px]:w-20 @min-[820px]:w-full @min-[820px]:max-w-[150px]" />
              ) : (
                <span className="grid aspect-[212/300] w-16 place-items-center rounded-[4px] border border-[color-mix(in_srgb,var(--accion)_22%,transparent)] bg-white text-[var(--accion)] @min-[480px]:w-20 @min-[820px]:w-full @min-[820px]:max-w-[150px]" aria-hidden="true">
                  <FileText className="h-5 w-5 opacity-60 @min-[820px]:h-8 @min-[820px]:w-8" strokeWidth={1.5} />
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-4 @min-[820px]:p-5">
              {item.rotulo ? <p className="mb-1.5 text-[10px] font-bold uppercase leading-none tracking-[.15em] text-[var(--accion)]">{item.rotulo}</p> : null}
              <Titulo className="text-pretty text-[15px] font-medium leading-snug text-[#494963] sm:text-[17px]">{item.titulo}</Titulo>
              {item.detalle ? <p className="mt-1 text-sm text-[#494963]/[.82]">{item.detalle}</p> : null}
              {item.meta ? <p className="mt-1 text-xs text-[#494963]/[.82]">{item.meta}</p> : null}
              {/* El pie (línea + acciones) va abajo de todo (mt-auto), con el
                 mismo aire arriba y abajo de la línea: así la línea queda a
                 la misma altura en todas las tarjetas de la fila y nunca
                 pegada al texto, aunque un título ocupe más líneas. */}
              <div className="mt-auto pt-3 @min-[820px]:pt-4">
                <div className="flex flex-wrap items-center gap-2 @min-[820px]:border-t @min-[820px]:border-[#494963]/[.07] @min-[820px]:pt-4">
                  {item.descargar ? <AccionPortada tipo="descargar" url={item.descargar} titulo={contexto} /> : null}
                  {item.ver ? <AccionPortada tipo="ver" url={item.ver} titulo={contexto} /> : null}
                  <ShareResourceButton title={contexto} url={item.descargar ?? item.ver ?? ""} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
    </div>
  );
}
