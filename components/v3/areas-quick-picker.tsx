import Link from "next/link";
import { orderedAreas } from "@/lib/v3-config";
import { AreaNavLink, SolidAreaArrow } from "@/components/v3/area-nav-link";

/**
 * Grilla de acceso a todas las áreas: solo mobile (<768px). Desde tablet (md)
 * ya está el aside de escritorio (`AreaSubnav`), con Marco General + áreas en
 * una columna igual que desktop.
 */
export function AreasQuickPicker({ hideMarcoGeneral = false, hideLabel = false }: { hideMarcoGeneral?: boolean; hideLabel?: boolean }) {
  return (
    <nav aria-label="Áreas curriculares" className="px-4 pb-10 pt-6 md:hidden">
      {!hideLabel && <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-[#494963]/40">Elegí un área</p>}
      {/* gap-2.5: misma separación que AreaSubnav (desktop/tablet) y que la
         nav principal (Inicio/Áreas/Equipos/Familias/EIB), para que sea
         consistente en todos los dispositivos. */}
      <div className="grid grid-cols-1 gap-2.5">
        {!hideMarcoGeneral && (
          <Link
            href="/area/marco-general"
            className="group flex min-h-14 w-full items-center justify-between rounded-[9px] border border-[#494963] px-[15px] py-3 text-[clamp(17px,1.35vw,20px)] font-normal leading-[1.08] tracking-[-0.035em] text-[#494963] transition-colors duration-150 hover:bg-[#494963] hover:text-[#E9E9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963]"
          >
            <span className="min-w-0 text-pretty">Marco General</span>
            <SolidAreaArrow />
          </Link>
        )}
        {orderedAreas.map((area) => (
          <AreaNavLink key={area.slug} area={area} variant="wheel" />
        ))}
      </div>
    </nav>
  );
}
