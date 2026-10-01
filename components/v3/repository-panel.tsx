import type { ReactNode } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";
import { ShareResourceButton } from "@/components/v3/share-resource-button";

/**
 * Tarjeta de repositorio compartida por las secciones institucionales
 * (Familias, Equipos directivos/Docentes, EIB): lista de filas separadas
 * por línea, con encabezado opcional (ícono + título + detalle + contador).
 * Antes cada página la reimplementaba a mano.
 */
export function RepositoryPanel({
  title,
  detail,
  icon,
  count,
  children,
  /** "Chips" (EIB): encabezado suelto, sin caja blanca de fondo ni líneas
   * divisorias — cada fila trae su propia tarjeta (ver `chip` en
   * ResourceRow), separadas por aire, como en la página de referencia. */
  chips = false,
}: {
  /** Título del panel (p. ej. "Marco normativo", "Documentos disponibles").
   * Opcional: se retiró de Familias/Directivos/EIB por redundante (la
   * propia tab ya dice "Documentos"/"Normativa") - sin título ni ícono, no
   * se arma encabezado y el panel arranca directo en los chips. */
  title?: string;
  /** Metadata secundaria (p. ej. "Resoluciones y documentos de referencia").
   * Opcional: se está retirando de Familias/Directivos/EIB por ser
   * descriptiva redundante — el título queda solo y gana presencia. */
  detail?: string;
  icon?: ReactNode;
  /** Badge numérico a la derecha del encabezado. Mismo criterio: se omite
   * salvo que el conteo aporte algo que el título no dice ya. */
  count?: number;
  children: ReactNode;
  chips?: boolean;
}) {
  const hasHeader = Boolean(title || icon || detail || count !== undefined);
  const header = hasHeader ? (
    // pb-5 (antes pb-3): más aire entre el título del panel (p. ej. "Marco
    // normativo") y los chips de abajo, quedaban muy pegados.
    <div className={`flex items-center justify-between gap-4 ${chips ? "px-1 pb-5" : "border-b border-[#494963]/[.07] px-5 py-3 sm:px-6"}`}>
      <div className="flex min-w-0 items-center gap-3">
        {icon ? <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#494963]/[.055] text-[#494963]">{icon}</span> : null}
        {(title || detail) ? (
          <div className="min-w-0">
            {title ? <h3 className="font-display text-xl font-semibold text-[#494963]">{title}</h3> : null}
            {detail ? <p className="mt-0.5 text-xs text-[#494963]/40">{detail}</p> : null}
          </div>
        ) : null}
      </div>
      {count !== undefined ? (
        <span className="rounded-full bg-[#494963]/[.06] px-3 py-1 text-xs font-bold text-[#494963]/55">{count}</span>
      ) : null}
    </div>
  ) : null;

  if (chips) return <div>{header}<div className="space-y-2">{children}</div></div>;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#494963]/[.08] bg-white">
      {header}
      <div className="divide-y divide-[#494963]/[.07]">{children}</div>
    </div>
  );
}

/**
 * Fila de un recurso: descarga (ícono de descarga, `download`) o enlace
 * externo (ícono de salida, nueva pestaña). Mismo tratamiento que
 * `RepositoryMaterialRow` (Itinerarios/repositorios de área): título en
 * `font-medium` (no negrita), ícono y botón de acción teñidos con el color
 * de sección si se pasa uno, y Descargar/Abrir + Compartir como acciones
 * separadas — no un solo ícono genérico. */
export function ResourceRow({
  title,
  description,
  href,
  download = false,
  icon,
  /** Color de acento (p. ej. el color del Marco General o de un área). Si se
   * omite queda neutro — así lo usan Familias/Docentes/EIB, que no tienen
   * un color propio. */
  color = "#494963",
  /** Muestra "Abrir"/"Descargar" en texto desde xl (antes siempre, en todos
   * lados). Solo Marco General lo usa — en Familias/Docentes/EIB el botón
   * de acción queda solo ícono, igual en todos los anchos. */
  showActionLabel = false,
  /** "Chip" (EIB): tarjeta blanca individual con borde propio (sin sombra -
   * blancos planos), en vez de fila plana dentro de una caja compartida -
   * usar junto con `RepositoryPanel chips`. */
  chip = false,
  /** Acciones al costado del texto ya desde mobile (no recién desde sm) —
   * por defecto en todos lados (antes había que pasarlo caso por caso y
   * quedaban filas apiladas por olvido, con el chip más alto de lo
   * necesario). Pasar `false` solo si un título+descripción puntual
   * necesita el quiebre a dos líneas en mobile. */
  sideActions = true,
}: {
  title: string;
  description?: string;
  href: string;
  download?: boolean;
  icon?: ReactNode;
  color?: string;
  showActionLabel?: boolean;
  chip?: boolean;
  sideActions?: boolean;
}) {
  const actionLabel = download ? "Descargar" : "Abrir";

  return (
    <article
      className={`group/resource grid min-w-0 gap-3 px-4 py-4 transition-colors sm:px-6 sm:py-5 ${sideActions ? "grid-cols-[minmax(0,1fr)_auto] items-center" : "sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"} sm:gap-5 ${chip ? "rounded-2xl border border-[#494963]/[.08] bg-white hover:border-[#494963]/[.16]" : "hover:bg-[#494963]/[.025]"}`}
      style={{ ["--area" as string]: color }}
    >
      <a
        href={href}
        download={download || undefined}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        aria-label={`${actionLabel} ${title}`}
        className="flex min-w-0 items-start gap-3"
      >
        {icon ?? <FileText className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />}
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium leading-snug text-[#494963] text-pretty sm:text-[17px]">{title}</span>
          {description ? <span className="mt-1 block text-sm font-medium leading-relaxed text-[#494963]/60 text-pretty">{description}</span> : null}
        </span>
      </a>

      <div className="flex items-center justify-start gap-1 sm:shrink-0">
        <a
          href={href}
          download={download || undefined}
          target={download ? undefined : "_blank"}
          rel={download ? undefined : "noopener noreferrer"}
          aria-label={`${actionLabel} ${title}`}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#494963]/[.06] text-[var(--area)] transition-colors hover:bg-[#494963]/[.12] hover:text-[#494963] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963] ${showActionLabel ? "xl:w-auto xl:rounded-none xl:bg-transparent xl:px-2 xl:hover:bg-transparent" : ""}`}
        >
          {download ? <Download className="h-4 w-4 shrink-0" /> : <ExternalLink className="h-4 w-4 shrink-0" />}
          {showActionLabel ? <span className="hidden text-xs font-semibold xl:inline xl:text-sm">{actionLabel}</span> : null}
        </a>
        <ShareResourceButton title={title} url={href} />
      </div>
    </article>
  );
}
