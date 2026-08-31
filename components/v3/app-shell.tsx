"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Home,
  MapPinned,
  MessageCircle,
  Search,
  Users,
  X,
} from "lucide-react";
import { orderedAreas, cycles } from "@/lib/v3-config";
import { MARCO_GENERAL_COLOR, TERRITORIO_ENABLED, MATERIALES_POR_CICLO_ENABLED } from "@/lib/constants";
import { AreasMaterialsIcon, CycleMaterialsIcon } from "@/components/v3/navigation-icons";
import { AreaNavLink, areaNavForeground, SolidAreaArrow } from "@/components/v3/area-nav-link";

// gridRow: peso relativo de cada item en el grid vertical de la nav desktop
// (ver "gridTemplateRows" más abajo). Se recalcula solo con los items visibles,
// así que alternar TERRITORIO_ENABLED / MATERIALES_POR_CICLO_ENABLED no rompe el layout.
const primaryItems = [
  { href: "/", label: "Inicio", desktopLines: ["Inicio"], desktopSubline: undefined, mobileLabel: "Inicio", icon: Home, match: (p: string) => p === "/", gridRow: ".7fr", enabled: true },
  {
    href: "/areas",
    label: "Áreas, materiales y formaciones",
    desktopLines: ["Áreas"],
    desktopSubline: "Materiales y formaciones",
    mobileLabel: "Áreas",
    icon: AreasMaterialsIcon,
    match: (p: string) => p === "/areas" || p.startsWith("/area/") || p === "/marco-general",
    gridRow: "1.3fr",
    enabled: true,
  },
  {
    href: "/materiales-por-ciclo",
    label: "Materiales por ciclo",
    desktopLines: ["Materiales", "por Ciclo"],
    desktopSubline: undefined,
    mobileLabel: "Ciclos",
    icon: CycleMaterialsIcon,
    match: (p: string) => p === "/materiales-por-ciclo" || p.startsWith("/ciclo/"),
    gridRow: "1.3fr",
    enabled: MATERIALES_POR_CICLO_ENABLED,
  },
  {
    href: "/territorio",
    label: "Territorio",
    desktopLines: ["Territorio"],
    desktopSubline: undefined,
    mobileLabel: "Territorio",
    icon: MapPinned,
    match: (p: string) => p.startsWith("/territorio"),
    gridRow: ".8fr",
    enabled: TERRITORIO_ENABLED,
  },
  {
    href: "/directivos",
    label: "Equipos directivos",
    desktopLines: ["Equipos directivos"],
    desktopSubline: undefined,
    mobileLabel: "Equipos",
    icon: BriefcaseBusiness,
    match: (p: string) => p.startsWith("/directivos") || p.startsWith("/docentes"),
    gridRow: ".7fr",
    enabled: true,
  },
  { href: "/familias", label: "Familias", desktopLines: ["Familias"], desktopSubline: undefined, mobileLabel: "Familias", icon: Users, match: (p: string) => p.startsWith("/familias"), gridRow: ".7fr", enabled: true },
  { href: "/eib", label: "EIB", desktopLines: ["EIB"], desktopSubline: undefined, mobileLabel: "EIB", icon: MessageCircle, match: (p: string) => p.startsWith("/eib"), gridRow: ".7fr", enabled: true },
].filter((item) => item.enabled !== false);

// Traducción horizontal de la guarda cromática vertical de las portadas.
// Los valores se tomaron de la portada de Matemática, de arriba hacia abajo.
const documentSpineGradient = `linear-gradient(to right,
  #fbe269 0%,
  #fec700 2%,
  #ffb500 5%,
  #ff9900 10%,
  #ff8841 15%,
  #ff8874 20%,
  #ff858f 25%,
  #f66e7e 30%,
  #ee506e 35%,
  #e24d78 40%,
  #d06596 45%,
  #bd72b3 50%,
  #956ec9 55%,
  #6961dd 60%,
  #5c76ee 65%,
  #7ca9f6 70%,
  #a3d3fc 75%,
  #83cde1 80%,
  #53c5be 85%,
  #45c29e 90%,
  #6fc276 95%,
  #87c014 100%
)`;

function CampusBrand() {
  return (
    <Image
      src="https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2023/03/logo_campus.png"
      alt="Campus Educativo"
      width={274}
      height={84}
      priority
      unoptimized
      className="h-auto w-[150px] shrink-0 object-contain sm:w-[190px] lg:w-[244px]"
    />
  );
}

function SantaFeBrand() {
  return (
    <Image
      src="https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2024/08/sf_provincia.png"
      alt="Santa Fe Provincia"
      width={620}
      height={150}
      priority
      unoptimized
      className="h-auto w-[104px] shrink-0 object-contain sm:w-[126px] lg:w-[164px]"
    />
  );
}

/**
 * Nav horizontal scrolleable de áreas para tablet/mobile (<1280px): mismo
 * criterio cromático y misma pastilla (borde/relleno por color de área,
 * ícono de check/flecha) que ya usa `AreaNavLink` en el aside de escritorio,
 * solo que en una fila horizontal con scroll táctil en vez de una columna.
 * Reemplaza al dropdown anterior, que era menos accesible y menos parecido
 * al sistema de desktop.
 */
function AreaHorizontalNav({ pathname }: { pathname: string }) {
  const marcoActive = pathname === "/area/marco-general" || pathname === "/marco-general";

  return (
    <nav
      aria-label="Áreas curriculares"
      className="scrollbar-hide flex gap-2 overflow-x-auto bg-[#F8F8FA] px-3 py-2.5"
    >
      <Link
        href="/area/marco-general"
        aria-current={marcoActive ? "page" : undefined}
        className={`flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#494963] px-4 text-sm font-medium tracking-[-0.02em] transition-colors duration-150 hover:bg-[#494963] hover:text-[#E9E9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963] ${marcoActive ? "bg-[#494963] text-[#E9E9EE]" : "bg-white text-[#494963]"}`}
      >
        Marco General
        {marcoActive ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <SolidAreaArrow compact />}
      </Link>
      {orderedAreas.map((area) => {
        const active = pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`);
        const activeForeground = areaNavForeground(area);
        return (
          <Link
            key={area.slug}
            href={`/area/${area.slug}`}
            aria-current={active ? "page" : undefined}
            className="flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium tracking-[-0.02em] transition-colors duration-150 hover:bg-[var(--area)] hover:text-[var(--area-active-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]"
            style={{
              borderColor: area.color,
              ["--area" as string]: area.color,
              ["--area-active-fg" as string]: activeForeground,
              backgroundColor: active ? area.color : "white",
              color: active ? activeForeground : area.color,
            }}
          >
            {area.name}
            {active ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <SolidAreaArrow compact />}
          </Link>
        );
      })}
    </nav>
  );
}

function AreaSubnav({ pathname }: { pathname: string }) {
  const marcoActive = pathname === "/area/marco-general" || pathname === "/marco-general";

  return (
    <nav aria-label="Áreas curriculares" className="grid h-full min-h-full auto-rows-[minmax(48px,1fr)] gap-1.5 pr-1">
      <Link
        href="/area/marco-general"
        aria-current={marcoActive ? "page" : undefined}
        className={`flex h-full min-h-0 w-full items-center justify-between rounded-[9px] border border-[#494963] px-[15px] py-2 text-[clamp(17px,1.35vw,20px)] font-normal leading-none tracking-[-0.035em] transition-colors duration-150 hover:bg-[#494963] hover:text-[#E9E9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${marcoActive ? "bg-[#494963] text-[#E9E9EE]" : "bg-white text-[#494963]"}`}
      >
        <span className="whitespace-nowrap">Marco General</span>
        <SolidAreaArrow />
      </Link>
      {orderedAreas.map((area) => {
        const active = pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`);
        return (
          <AreaNavLink
            key={area.slug}
            area={area}
            active={active}
          />
        );
      })}
    </nav>
  );
}

function CycleSubnav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Ciclos" className="grid h-full grid-rows-3 gap-2 p-0.5 pr-1">
      {cycles.map((cycle, index) => {
        const active = pathname === `/ciclo/${cycle.slug}`;
        return (
          <Link
            key={cycle.slug}
            href={`/ciclo/${cycle.slug}`}
            aria-current={active ? "page" : undefined}
            className={`cycle-card cycle-card-${index + 1} group relative flex min-h-0 flex-col justify-end overflow-hidden rounded-[10px] p-4 text-[#494963] transition-[opacity,background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${pathname.startsWith("/ciclo/") && !active ? "opacity-60" : "opacity-100"}`}
          >
            <span className="relative flex items-center justify-between gap-3">
              <span className="block text-2xl font-bold tracking-[-0.04em]">{cycle.name}</span>
              <SolidAreaArrow />
            </span>
            <span className="relative mt-1 block text-base text-current/75">
              {cycle.detail}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function TerritorySubnav({ pathname }: { pathname: string }) {
  const actionsActive = pathname.startsWith("/territorio/acciones");
  const proximasActive = pathname.startsWith("/territorio/proximas");

  return (
    <nav aria-label="Territorio" className="grid h-full auto-rows-[minmax(0,1fr)] gap-1.5 p-0.5 pr-1">
      <Link
        href="/territorio/acciones"
        aria-current={actionsActive ? "page" : undefined}
        className={`group flex h-full min-h-[85px] w-full flex-col justify-start rounded-[10px] border border-[#494963] p-5 text-[#494963] transition-[background-color,box-shadow] duration-150 hover:bg-[#F0F0F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${actionsActive ? "bg-[#E5E5EA] shadow-[inset_0_0_0_1px_rgba(73,73,99,.06)]" : "bg-white"}`}
      >
        <span className="flex w-full items-center justify-between gap-3 text-2xl font-semibold tracking-[-0.04em]">
          <span>Ver acciones</span>
          <SolidAreaArrow compact />
        </span>
      </Link>
      <Link
        href="/territorio/proximas"
        aria-current={proximasActive ? "page" : undefined}
        className={`group flex h-full min-h-[85px] w-full flex-col justify-start rounded-[10px] border border-[#494963] p-5 text-[#494963] transition-[background-color,box-shadow] duration-150 hover:bg-[#F0F0F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${proximasActive ? "bg-[#E5E5EA] shadow-[inset_0_0_0_1px_rgba(73,73,99,.06)]" : "bg-white"}`}
      >
        <span className="flex w-full items-center justify-between gap-3 text-2xl font-semibold tracking-[-0.04em]">
          <span>Próximas</span>
          <SolidAreaArrow compact />
        </span>
      </Link>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileAreasMenuOpen, setMobileAreasMenuOpen] = useState(false);

  useEffect(() => {
    setMobileAreasMenuOpen(false);
  }, [pathname]);

  const areasOpen = pathname === "/areas" || pathname.startsWith("/area/") || pathname === "/marco-general";
  const cyclesOpen = MATERIALES_POR_CICLO_ENABLED && (pathname === "/materiales-por-ciclo" || pathname.startsWith("/ciclo/"));
  const territoryOpen = TERRITORIO_ENABLED && pathname.startsWith("/territorio");
  const territoryActions = pathname.startsWith("/territorio/acciones");
  const territoryProximas = pathname.startsWith("/territorio/proximas");
  const hasSecondary = areasOpen || cyclesOpen || territoryOpen;
  const hasInstitutionalSwitcher = pathname.startsWith("/directivos")
    || pathname.startsWith("/docentes")
    || pathname.startsWith("/familias")
    || pathname.startsWith("/eib");
  const currentArea = orderedAreas.find((area) => pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`));
  const currentCycle = cycles.find((cycle) => pathname === `/ciclo/${cycle.slug}`);
  const activePrimary = primaryItems.find((item) => item.match(pathname));
  const currentLabel = (territoryActions ? "Acciones" : territoryProximas ? "Próximas" : undefined)
    ?? currentArea?.name
    ?? (pathname === "/area/marco-general" || pathname === "/marco-general" ? "Marco General" : undefined)
    ?? currentCycle?.name
    ?? activePrimary?.label
    ?? "Diseño Curricular";
  const parentLabel = (territoryActions || territoryProximas) ? "Territorio" : currentArea || pathname.includes("marco-general") ? "Áreas" : currentCycle ? "Ciclos" : null;

  return (
    <div
      className="v3-scroll-theme h-dvh overflow-hidden bg-[#F5F5F7] text-[#494963]"
      style={{ ["--section-scrollbar" as string]: currentArea?.color ?? MARCO_GENERAL_COLOR }}
    >
      <header className="h-[72px] border-b border-[#494963]/[.07] bg-white px-4 lg:h-[100px] lg:px-8" role="banner">
        <div className="mx-auto flex h-full max-w-[1376px] items-center justify-between">
          <Link href="/" aria-label="Campus Educativo — Inicio"><CampusBrand /></Link>
          <nav className="mx-auto hidden items-center gap-8 text-[15px] font-medium text-[#66666B] lg:flex xl:gap-12 xl:text-base">
            <span>Formación Continua</span>
            <span className="flex items-center gap-2">Programas <ChevronDown className="h-3.5 w-3.5 fill-current" strokeWidth={1.5} /></span>
            <span>Recursos</span>
            <span>Blog</span>
          </nav>
          <SantaFeBrand />
        </div>
      </header>

      <div
        className="h-[46px] bg-[#EDEDF0] px-4 text-[#494963] lg:h-[54px]"
        style={{
          backgroundImage: documentSpineGradient,
        }}
      >
        <div className="mx-auto flex h-full max-w-[1160px] items-center">
        <nav aria-label="Ruta actual" className="flex min-w-0 max-w-full flex-none items-center gap-2 text-xs md:max-w-[calc(100%-17rem)] md:text-sm">
          <Link href="/" className="hidden shrink-0 font-bold text-[#3F3F59] sm:inline">Diseño Curricular</Link>
          {parentLabel && <><span className="hidden text-[#3F3F59]/55 sm:inline">/</span><span className="hidden font-semibold text-[#3F3F59]/85 sm:inline">{parentLabel}</span></>}
          <span className="hidden text-[#3F3F59]/55 sm:inline">/</span><span className="truncate font-extrabold text-[#34344B]">{currentLabel}</span>
        </nav>
        <label className="ml-auto hidden h-9 items-center gap-2 border-b-2 border-[#3F3F59]/65 px-1 text-xs text-[#3F3F59] transition-[border-color] focus-within:border-[#34344B] md:flex">
          <Search className="h-4 w-4 shrink-0 text-[#3F3F59]" />
          <span className="sr-only">Buscar</span>
          <input
            type="search"
            autoComplete="off"
            spellCheck={false}
            className="w-48 appearance-none border-0 bg-transparent p-0 font-semibold text-[#34344B] shadow-none outline-none ring-0 placeholder:text-[#3F3F59]/80 [&::-webkit-search-cancel-button]:hidden"
            placeholder="Buscar"
          />
        </label>
        </div>
      </div>

      <div className="flex h-[calc(100dvh-118px)] gap-3 overflow-hidden bg-white p-3 pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-3 lg:h-[calc(100dvh-154px)] lg:gap-4 lg:p-5">
        {/* Tablet (768–1279px): rail compacto, ícono + texto en una línea, sin la jerarquía
            de dos niveles que solo tiene sentido con el ancho de escritorio. */}
        <nav aria-label="Navegación principal" className="hidden shrink-0 flex-col gap-1.5 md:flex md:w-[172px] xl:hidden">
          {primaryItems.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${active ? "bg-[#494963] text-white" : "bg-[#DADAE1] text-[#494963] hover:bg-[#d1d1d9]"}`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="truncate">{item.mobileLabel}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop (≥1280px): rail completo, ícono arriba / texto abajo, con la bajada de Áreas. */}
        <nav
          aria-label="Navegación principal"
          className="hidden w-[230px] shrink-0 gap-1.5 xl:grid"
          style={{ gridTemplateRows: primaryItems.map((item) => item.gridRow).join(" ") }}
        >
          {primaryItems.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-start justify-between rounded-lg p-4 text-left text-base font-medium leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${active ? "bg-[#494963] text-white" : "bg-[#DADAE1] text-[#494963] hover:bg-[#d1d1d9]"}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                <span>
                  {item.desktopLines.map((line) => (
                    <span
                      key={line}
                      className={`block ${item.desktopSubline ? "text-[19px] font-semibold" : ""}`}
                    >
                      {line}
                    </span>
                  ))}
                  {item.desktopSubline ? (
                    <span className="mt-1 block text-xs font-medium" style={{ opacity: 0.72 }}>
                      {item.desktopSubline}
                    </span>
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>

        {hasSecondary && (
          <aside className="v3-secondary hidden h-full min-h-0 w-[280px] shrink-0 overflow-y-auto bg-white xl:block xl:w-[300px]">
            {areasOpen ? <AreaSubnav pathname={pathname} /> : cyclesOpen ? <CycleSubnav pathname={pathname} /> : <TerritorySubnav pathname={pathname} />}
          </aside>
        )}

        <main
          id="contenido"
          className={`h-full min-h-0 min-w-0 flex-1 rounded-2xl bg-white ${hasInstitutionalSwitcher ? "overflow-hidden" : "overflow-y-auto [scrollbar-gutter:stable]"}`}
          tabIndex={-1}
        >
          {hasSecondary && areasOpen ? (
            <div className="xl:hidden">
              <AreaHorizontalNav pathname={pathname} />
            </div>
          ) : cyclesOpen ? (
            <div className="sticky top-0 z-30 grid grid-cols-3 gap-1.5 border-b border-[#494963]/10 bg-[#F8F8FA]/95 p-2.5 backdrop-blur-md xl:hidden">
              {cycles.map((cycle, index) => {
                const active = pathname === `/ciclo/${cycle.slug}`;
                return (
                  <Link
                    key={cycle.slug}
                    href={`/ciclo/${cycle.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`cycle-card cycle-card-mobile cycle-card-${index + 1} relative flex min-h-[90px] flex-col justify-end overflow-hidden rounded-lg px-2.5 pb-2.5 pt-9 text-left text-[10px] font-bold leading-[1.08] text-[#494963] transition-[background-color,border-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] min-[390px]:text-[11px]`}
                  >
                    <span className="relative z-[1] flex items-center justify-between gap-1.5">
                      <span>{cycle.name}</span>
                      <SolidAreaArrow compact />
                    </span>
                    <small className="relative z-[1] mt-1 block text-[8px] font-medium leading-tight text-[#494963]/55 min-[390px]:text-[9px] sm:text-[10px]">{cycle.detail}</small>
                  </Link>
                );
              })}
            </div>
          ) : territoryOpen ? (
            <div className="sticky top-0 z-30 grid grid-cols-2 gap-1.5 border-b border-[#494963]/10 bg-[#F8F8FA]/95 p-2.5 backdrop-blur-md xl:hidden">
              <Link
                href="/territorio/acciones"
                aria-current={territoryActions ? "page" : undefined}
                className={`group flex min-h-14 w-full items-center justify-between rounded-lg border border-[#494963] px-4 text-sm font-semibold text-[#494963] transition-colors hover:bg-[#F0F0F3] ${territoryActions ? "bg-[#E5E5EA]" : "bg-white"}`}
              >
                Ver acciones
                <SolidAreaArrow compact />
              </Link>
              <Link
                href="/territorio/proximas"
                aria-current={territoryProximas ? "page" : undefined}
                className={`group flex min-h-14 w-full items-center justify-between rounded-lg border border-[#494963] px-4 text-sm font-semibold text-[#494963] transition-colors hover:bg-[#F0F0F3] ${territoryProximas ? "bg-[#E5E5EA]" : "bg-white"}`}
              >
                Próximas
                <SolidAreaArrow compact />
              </Link>
            </div>
          ) : null}
          {children}
        </main>
      </div>

      {mobileAreasMenuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Cerrar menú de áreas"
            onClick={() => setMobileAreasMenuOpen(false)}
            className="absolute inset-0 bg-[#1A1A26]/40"
          />
          <div className="absolute inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] max-h-[70vh] overflow-y-auto rounded-t-3xl bg-white p-4 pb-6 shadow-[0_-16px_40px_rgba(20,20,35,.25)]">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-[#494963]">Áreas</span>
              <button type="button" onClick={() => setMobileAreasMenuOpen(false)} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-full bg-[#494963]/[.06] text-[#494963]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav aria-label="Áreas curriculares" className="divide-y divide-[#494963]/[.07] overflow-hidden rounded-2xl border border-[#494963]/[.08]">
              <Link
                href="/area/marco-general"
                className="flex min-h-14 items-center justify-between gap-3 border-l-4 border-[#494963] px-4 text-[15px] font-semibold tracking-[-0.02em] text-[#494963] transition-colors hover:bg-[#494963] hover:text-[#EDEDF0]"
              >
                Marco General
                <SolidAreaArrow compact />
              </Link>
              {orderedAreas.map((area) => {
                const activeForeground = areaNavForeground(area);
                return (
                  <Link
                    key={area.slug}
                    href={`/area/${area.slug}`}
                    className="flex min-h-14 items-center justify-between gap-3 border-l-4 px-4 text-[15px] font-semibold tracking-[-0.02em] text-[var(--area)] transition-colors hover:bg-[var(--area)] hover:text-[var(--area-fg)]"
                    style={{ borderColor: area.color, ["--area" as string]: area.color, ["--area-fg" as string]: activeForeground }}
                  >
                    {area.name}
                    <SolidAreaArrow compact />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}

      <nav
        aria-label="Navegación móvil"
        className="fixed inset-x-0 bottom-0 z-50 grid h-[calc(4rem+env(safe-area-inset-bottom))] min-h-16 border-t border-white/10 bg-[#494963] pb-[env(safe-area-inset-bottom)] md:hidden"
        style={{ gridTemplateColumns: `repeat(${primaryItems.length}, minmax(0, 1fr))` }}
      >
        {primaryItems.map((item) => {
          const active = item.match(pathname) || (item.href === "/areas" && mobileAreasMenuOpen);
          const Icon = item.icon;
          if (item.href === "/areas") {
            return (
              <button
                key={item.href}
                type="button"
                aria-expanded={mobileAreasMenuOpen}
                aria-label={item.label}
                onClick={() => setMobileAreasMenuOpen((current) => !current)}
                className={`flex min-w-0 flex-col items-center justify-center gap-1 text-[8px] font-bold min-[390px]:text-[9px] ${active ? "text-white" : "text-white/50"}`}
              >
                <span className={`grid h-7 w-8 place-items-center rounded-lg min-[390px]:w-9 ${active ? "bg-white text-[#494963]" : ""}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
                <span className="max-w-full truncate px-0.5">{item.mobileLabel}</span>
              </button>
            );
          }
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} aria-label={item.label} className={`flex min-w-0 flex-col items-center justify-center gap-1 text-[8px] font-bold min-[390px]:text-[9px] ${active ? "text-white" : "text-white/50"}`}>
              <span className={`grid h-7 w-8 place-items-center rounded-lg min-[390px]:w-9 ${active ? "bg-white text-[#494963]" : ""}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
              <span className="max-w-full truncate px-0.5">{item.mobileLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
