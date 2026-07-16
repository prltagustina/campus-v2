"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Home,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";
import { orderedAreas, cycles } from "@/lib/v3-config";
import { MARCO_GENERAL_COLOR } from "@/lib/constants";
import { AreasMaterialsIcon, CycleMaterialsIcon } from "@/components/v3/navigation-icons";

const primaryItems = [
  { href: "/", label: "Inicio", desktopLines: ["Inicio"], mobileLabel: "Inicio", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/areas",
    label: "Áreas y materiales",
    desktopLines: ["Áreas y", "Materiales"],
    mobileLabel: "Áreas",
    icon: AreasMaterialsIcon,
    match: (p: string) => p === "/areas" || p.startsWith("/area/") || p === "/marco-general",
  },
  {
    href: "/materiales-por-ciclo",
    label: "Materiales por ciclo",
    desktopLines: ["Materiales", "por Ciclo"],
    mobileLabel: "Ciclos",
    icon: CycleMaterialsIcon,
    match: (p: string) => p === "/materiales-por-ciclo" || p.startsWith("/ciclo/"),
  },
  {
    href: "/directivos",
    label: "Directivos",
    desktopLines: ["Directivos"],
    mobileLabel: "Directivos",
    icon: BriefcaseBusiness,
    match: (p: string) => p.startsWith("/directivos") || p.startsWith("/docentes"),
  },
  { href: "/familias", label: "Familias", desktopLines: ["Familias"], mobileLabel: "Familias", icon: Users, match: (p: string) => p.startsWith("/familias") },
  { href: "/eib", label: "EIB", desktopLines: ["EIB"], mobileLabel: "EIB", icon: MessageCircle, match: (p: string) => p.startsWith("/eib") },
] as const;

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

function areaNavForeground(area: (typeof orderedAreas)[number]) {
  if (area.slug === "ciencias-sociales") return "#F7FAFF";
  if (area.slug === "lenguas-extranjeras") return "#494963";
  return area.textOnColor;
}

function SolidAreaArrow({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${compact ? "ml-2 h-[10px] w-[7px]" : "ml-3 h-[14px] w-[9px]"} block shrink-0 bg-current [clip-path:polygon(0_0,100%_50%,0_100%)]`}
    />
  );
}

function MobileAreaMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedArea = orderedAreas.find(
    (area) => pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`),
  );
  const marcoActive = pathname === "/area/marco-general" || pathname === "/marco-general";
  const selectedLabel = selectedArea?.name ?? (marcoActive ? "Marco General" : "Elegir área");
  const selectedColor = selectedArea?.color ?? (marcoActive ? "#494963" : "rgba(255,255,255,.1)");
  const selectedForeground = selectedArea ? areaNavForeground(selectedArea) : "#E9E9EE";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="flex items-center justify-between gap-3 bg-[#494963] px-3 py-2.5 text-white">
      <span className="shrink-0 text-sm font-semibold text-white/80 sm:text-[15px]">Área</span>
      <div ref={menuRef} className="relative ml-auto w-[76%] min-w-0 max-w-[320px] flex-none">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="menu-areas-mobile"
          aria-label={`Cambiar área. Área actual: ${selectedLabel}`}
          className="flex min-h-10 w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2 text-left transition-[filter] hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#494963]"
          style={{
            backgroundColor: selectedColor,
            borderColor: selectedArea || marcoActive ? selectedColor : "rgba(255,255,255,.2)",
            color: selectedForeground,
          }}
        >
          <span className="min-w-0 truncate text-sm font-semibold leading-tight">{selectedLabel}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>

        {open ? (
          <nav
            id="menu-areas-mobile"
            aria-label="Elegir área curricular"
            className="absolute inset-x-0 top-[calc(100%+.4rem)] z-[60] max-h-[min(410px,55dvh)] overflow-y-auto overscroll-contain rounded-xl border border-[#494963]/10 bg-white p-1 shadow-[0_10px_28px_rgba(35,35,55,.14)]"
          >
            {orderedAreas.map((area) => {
              const active = pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`);
              const activeForeground = areaNavForeground(area);
              return (
                <Link
                  key={area.slug}
                  href={`/area/${area.slug}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[var(--area)] hover:text-[var(--area-active-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${active ? "bg-[var(--area)] text-[var(--area-active-fg)]" : "bg-transparent text-[var(--area)]"}`}
                  style={{
                    ["--area" as string]: area.color,
                    ["--area-active-fg" as string]: activeForeground,
                  }}
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-medium leading-tight">{area.name}</span>
                  {active ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <SolidAreaArrow compact />}
                </Link>
              );
            })}
            <Link
              href="/area/marco-general"
              aria-current={marcoActive ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#494963] hover:text-[#E9E9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${marcoActive ? "bg-[#494963] text-[#E9E9EE]" : "bg-transparent text-[#494963]"}`}
            >
              <span className="min-w-0 flex-1 truncate text-sm font-medium leading-tight">Marco General</span>
              {marcoActive ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <SolidAreaArrow compact />}
            </Link>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

function AreaSubnav({ pathname }: { pathname: string }) {
  const marcoActive = pathname === "/area/marco-general" || pathname === "/marco-general";

  return (
    <nav aria-label="Áreas curriculares" className="grid h-full min-h-full auto-rows-[minmax(48px,1fr)] gap-1.5 pr-1">
      {orderedAreas.map((area) => {
        const active = pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`);
        const activeForeground = areaNavForeground(area);
        return (
          <Link
            key={area.slug}
            href={`/area/${area.slug}`}
            aria-current={active ? "page" : undefined}
            className={`group flex h-full min-h-0 w-full items-center justify-between rounded-[9px] border px-[15px] py-2 text-[clamp(17px,1.35vw,20px)] font-normal leading-none tracking-[-0.035em] transition-colors duration-150 hover:bg-[var(--area)] hover:text-[var(--area-active-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${active ? "bg-[var(--area)] text-[var(--area-active-fg)]" : "bg-white text-[var(--area)]"}`}
            style={{
              borderColor: area.color,
              ["--area" as string]: area.color,
              ["--area-active-fg" as string]: activeForeground,
            }}
          >
            <span className="whitespace-nowrap">{area.name}</span>
            <SolidAreaArrow />
          </Link>
        );
      })}
      <Link
        href="/area/marco-general"
        aria-current={marcoActive ? "page" : undefined}
        className={`flex h-full min-h-0 w-full items-center justify-between rounded-[9px] border border-[#494963] px-[15px] py-2 text-[clamp(17px,1.35vw,20px)] font-normal leading-none tracking-[-0.035em] transition-colors duration-150 hover:bg-[#494963] hover:text-[#E9E9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${marcoActive ? "bg-[#494963] text-[#E9E9EE]" : "bg-white text-[#494963]"}`}
      >
        <span className="whitespace-nowrap">Marco General</span>
        <SolidAreaArrow />
      </Link>
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

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const areasOpen = pathname === "/areas" || pathname.startsWith("/area/") || pathname === "/marco-general";
  const cyclesOpen = pathname === "/materiales-por-ciclo" || pathname.startsWith("/ciclo/");
  const hasSecondary = areasOpen || cyclesOpen;
  const hasInstitutionalSwitcher = pathname.startsWith("/directivos")
    || pathname.startsWith("/docentes")
    || pathname.startsWith("/familias")
    || pathname.startsWith("/eib");
  const currentArea = orderedAreas.find((area) => pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`));
  const currentCycle = cycles.find((cycle) => pathname === `/ciclo/${cycle.slug}`);
  const activePrimary = primaryItems.find((item) => item.match(pathname));
  const currentLabel = currentArea?.name
    ?? (pathname === "/area/marco-general" || pathname === "/marco-general" ? "Marco General" : undefined)
    ?? currentCycle?.name
    ?? activePrimary?.label
    ?? "Diseño Curricular";
  const parentLabel = currentArea || pathname.includes("marco-general") ? "Áreas" : currentCycle ? "Ciclos" : null;

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
          <span className="sr-only">Buscar materiales</span>
          <input
            type="search"
            autoComplete="off"
            spellCheck={false}
            className="w-48 appearance-none border-0 bg-transparent p-0 font-semibold text-[#34344B] shadow-none outline-none ring-0 placeholder:text-[#3F3F59]/80 [&::-webkit-search-cancel-button]:hidden"
            placeholder="Buscar materiales"
          />
        </label>
        </div>
      </div>

      <div className="flex h-[calc(100dvh-118px)] gap-3 overflow-hidden bg-white p-3 pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-3 lg:h-[calc(100dvh-154px)] lg:gap-4 lg:p-5">
        <nav aria-label="Navegación principal" className="hidden w-[210px] shrink-0 grid-rows-[.75fr_1.45fr_1.45fr_.75fr_.75fr_.75fr] gap-1.5 md:grid xl:w-[230px]">
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
                  {item.desktopLines.map((line) => <span key={line} className="block">{line}</span>)}
                </span>
              </Link>
            );
          })}
        </nav>

        {hasSecondary && (
          <aside className="v3-secondary hidden h-full min-h-0 w-[280px] shrink-0 overflow-y-auto bg-white xl:block xl:w-[300px]">
            {areasOpen ? <AreaSubnav pathname={pathname} /> : <CycleSubnav pathname={pathname} />}
          </aside>
        )}

        <main
          id="contenido"
          className={`h-full min-h-0 min-w-0 flex-1 rounded-2xl bg-white ${hasInstitutionalSwitcher ? "overflow-hidden" : "overflow-y-auto [scrollbar-gutter:stable]"}`}
          tabIndex={-1}
        >
          {hasSecondary && areasOpen ? (
            <>
              <div className="md:hidden">
                <MobileAreaMenu pathname={pathname} />
              </div>
              <div className="hidden gap-1.5 bg-[#F8F8FA] p-2.5 md:grid md:grid-cols-3 xl:hidden">
                {orderedAreas.map((area) => {
                  const active = pathname === `/area/${area.slug}` || pathname.startsWith(`/area/${area.slug}/`);
                  const activeForeground = areaNavForeground(area);
                  return (
                    <Link
                      key={area.slug}
                      href={`/area/${area.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-10 items-center justify-between rounded-[8px] border px-2.5 py-1.5 text-[11px] font-medium leading-tight tracking-[-0.025em] transition-colors duration-150 hover:bg-[var(--area)] hover:text-[var(--area-active-fg)] ${active ? "bg-[var(--area)] text-[var(--area-active-fg)]" : "bg-white text-[var(--area)]"}`}
                      style={{ borderColor: area.color, ["--area" as string]: area.color, ["--area-active-fg" as string]: activeForeground }}
                    >
                      {area.name}
                      <SolidAreaArrow compact />
                    </Link>
                  );
                })}
                <Link
                  href="/area/marco-general"
                  aria-current={pathname === "/area/marco-general" || pathname === "/marco-general" ? "page" : undefined}
                  className={`flex min-h-10 items-center justify-between rounded-[8px] border border-[#494963] px-2.5 py-1.5 text-[11px] font-medium tracking-[-0.025em] transition-colors duration-150 hover:bg-[#494963] hover:text-[#E9E9EE] ${pathname === "/area/marco-general" || pathname === "/marco-general" ? "bg-[#494963] text-[#E9E9EE]" : "bg-white text-[#494963]"}`}
                >
                  Marco General
                  <SolidAreaArrow compact />
                </Link>
              </div>
            </>
          ) : hasSecondary ? (
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
          ) : null}
          {children}
        </main>
      </div>

      <nav aria-label="Navegación móvil" className="fixed inset-x-0 bottom-0 z-50 grid h-[calc(4rem+env(safe-area-inset-bottom))] min-h-16 grid-cols-6 border-t border-white/10 bg-[#494963] pb-[env(safe-area-inset-bottom)] md:hidden">
        {primaryItems.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} aria-label={item.label} className={`flex flex-col items-center justify-center gap-1 text-[9px] font-bold ${active ? "text-white" : "text-white/50"}`}>
              <span className={`grid h-7 w-9 place-items-center rounded-lg ${active ? "bg-white text-[#494963]" : ""}`}><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
              <span>{item.mobileLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
