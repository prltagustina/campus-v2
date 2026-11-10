import Link from "next/link";
import { SolidAreaArrow } from "@/components/v3/area-nav-link";
import { niveles, planMatematica, rutaNivel, type NivelId } from "@/lib/programas/plan-matematica";

const { color, colorTexto } = planMatematica;
const variables = { ["--plan" as string]: color, ["--plan-fg" as string]: colorTexto };

/**
 * Botonera horizontal de niveles del Plan (maqueta de Visuales Curricular,
 * 2026-11-10), en lugar de la columna lateral. Mismo botón que tenían los
 * niveles (borde rojo, relleno rojo el activo, flecha de las áreas), más
 * grande que las pestañas de grado de abajo para que se lean como dos
 * niveles distintos. En celular, el nombre corto (Inicial, Primaria,
 * Secundaria) para que entren los tres en una fila.
 */
export function NivelBotonera({ actual }: { actual: NivelId }) {
  return (
    <nav aria-label="Niveles del Plan Provincial de Matemática" className="px-4 pt-5 md:px-[14px] md:pt-6" style={variables}>
      <ul className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {niveles.map((nivel) => {
          const activo = nivel.id === actual;
          return (
            <li key={nivel.id} className="min-w-0">
              <Link
                href={rutaNivel(nivel)}
                aria-current={activo ? "page" : undefined}
                className={`flex h-full min-h-14 w-full min-w-0 items-center justify-center gap-3 rounded-[9px] border border-[var(--plan)] px-3 py-3 text-center text-[15px] font-semibold leading-[1.1] tracking-[-0.035em] transition-colors duration-150 hover:bg-[var(--plan)] hover:text-[var(--plan-fg)] active:bg-[var(--plan)] active:text-[var(--plan-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] sm:min-h-16 sm:justify-between sm:px-5 sm:text-left sm:text-lg ${
                  activo ? "bg-[var(--plan)] text-[var(--plan-fg)]" : "bg-white text-[var(--plan)]"
                }`}
              >
                <span className="min-w-0 text-balance sm:hidden">{nivel.nombreCorto}</span>
                <span className="hidden min-w-0 text-balance sm:inline">{nivel.nombre}</span>
                <span className="hidden shrink-0 sm:inline-flex" aria-hidden="true">
                  <SolidAreaArrow />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
