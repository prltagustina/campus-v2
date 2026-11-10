import { Download, Eye } from "lucide-react";
import { ShareResourceButton } from "@/components/v3/share-resource-button";

export interface TarjetaPortada {
  id: string;
  titulo: string;
  detalle?: string;
  meta?: string;
  /** Tapa publicada en el Campus (vertical, 212 × 300). */
  portada: string;
  /** Descarga directa ("Descargar PDF"). */
  descargar?: string;
  /** Visor (Google Drive): solo el ojo. */
  ver?: string;
}

/**
 * Botón de acción de las tarjetas con portada: mismo botón que «Descargar
 * PDF» del bloque de documento, en el color de la sección. «Ver» va solo con
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
      {ver ? null : "Descargar PDF"}
    </a>
  );
}

/**
 * Documentos con portada (como en el Campus): grilla de tarjetas con la tapa,
 * título, bajada y acciones; dos por fila en celular y tres desde 1024 px.
 * La sombra de la tapa es la que el manual reserva para las portadas de
 * documentos. La usan Modo Secundaria (Alfabetización, Itinerarios
 * Matemáticos) y los Juegos Matemáticos del Plan.
 */
export function TarjetasPortada({ items, color = "#494963" }: { items: TarjetaPortada[]; color?: string }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3" style={{ ["--accion" as string]: color }}>
      {items.map((item) => {
        const contexto = item.detalle ? `${item.titulo}, ${item.detalle}` : item.titulo;
        return (
          <li key={item.id} className="flex min-w-0 flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.portada} alt="" loading="lazy" className="aspect-[3/4] w-full max-w-[220px] rounded-md border border-[#494963]/[.08] object-cover shadow-[0_8px_20px_rgba(20,20,35,.16)]" />
            <h3 className="mt-4 text-pretty text-[15px] font-medium leading-snug text-[#494963] sm:text-[17px]">{item.titulo}</h3>
            {item.detalle ? <p className="mt-1 text-sm text-[#494963]/[.82]">{item.detalle}</p> : null}
            {item.meta ? <p className="mt-1 text-xs text-[#494963]/[.82]">{item.meta}</p> : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {item.descargar ? <AccionPortada tipo="descargar" url={item.descargar} titulo={contexto} /> : null}
              {item.ver ? <AccionPortada tipo="ver" url={item.ver} titulo={contexto} /> : null}
              <ShareResourceButton title={contexto} url={item.descargar ?? item.ver ?? ""} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
