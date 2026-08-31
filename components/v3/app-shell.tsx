"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  ChevronDown,
  Home,
  MapPinned,
  MessageCircle,
  Search,
  Users,
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
  const shortNames: Record<string, string> = {
    "saberes-vidas-y-mundos": "S, V y M",
    "educacion-fisica": "Ed. Física",
    "educacion-artistica": "Ed. Artística",
    "educacion-tecnologica": "Ed. Tecnológica",
  };
  const items: { slug: string; href: string; name: string; shortName: string; color: string; textColor: string }[] = [
    { slug: "marco-general", href: "/area/marco-general", name: "Marco General", shortName: "Marco General", color: MARCO_GENERAL_COLOR, textColor: "#E9E9EE" },
    ...orderedAreas.map((area) => ({ slug: area.slug, href: `/area/${area.slug}`, name: area.name, shortName: shortNames[area.slug] ?? area.name, color: area.color, textColor: areaNavForeground(area) })),
  ];
  const currentIndex = items.findIndex((item) =>
    item.slug === "marco-general"
      ? pathname === "/area/marco-general" || pathname === "/marco-general"
      : pathname === `/area/${item.slug}` || pathname.startsWith(`/area/${item.slug}/`),
  );
  if (currentIndex === -1) return null;
  const current = items[currentIndex];
  const previous = items[(currentIndex - 1 + items.length) % items.length];
  const next = items[(currentIndex + 1) % items.length];
  const chipClass = "flex min-w-0 flex-1 flex-col gap-0.5 rounded-2xl border px-4 py-2.5 text-[var(--chip)] transition-colors duration-150 hover:bg-[var(--chip)] hover:text-[var(--chip-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]";

  return (
    <nav aria-label="Navegación entre áreas" className="flex flex-col gap-2 bg-white px-3 py-4">
      <span
        aria-current="page"
        className="flex min-w-0 flex-col gap-0.5 rounded-2xl px-4 py-2.5"
        style={{ backgroundColor: current.color, color: current.textColor }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[.12em] opacity-70">Estás en</span>
        <span className="truncate text-sm font-bold tracking-[-.02em]">{current.name}</span>
      </span>
      <div className="flex items-stretch gap-2">
        <Link
          href={previous.href}
          className={chipClass}
          style={{ borderColor: previous.color, ["--chip" as string]: previous.color, ["--chip-fg" as string]: previous.textColor }}
        >
          <span className="flex items-center text-[10px] font-bold uppercase tracking-[.12em] opacity-70">
            <span aria-hidden="true" className="mr-2 block h-[10px] w-[7px] shrink-0 bg-current [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
            Anterior
          </span>
          <span className="truncate text-sm font-bold tracking-[-.02em]">{previous.shortName}</span>
        </Link>
        <Link
          href={next.href}
          className={`${chipClass} items-end text-right`}
          style={{ borderColor: next.color, ["--chip" as string]: next.color, ["--chip-fg" as string]: next.textColor }}
        >
          <span className="flex items-center text-[10px] font-bold uppercase tracking-[.12em] opacity-70">
            Siguiente <SolidAreaArrow compact />
          </span>
          <span className="truncate text-sm font-bold tracking-[-.02em]">{next.shortName}</span>
        </Link>
      </div>
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
  const areasOpen = pathname === "/areas" || pathname.startsWith("/area/") || pathname === "/marco-general";
  const cyclesOpen = MATERIALES_POR_CICLO_ENABLED && (pathname === "/materiales-por-ciclo" || pathname.startsWith("/ciclo/"));
  const territoryOpen = TERRITORIO_ENABLED && pathname.startsWith("/territorio");
  const territoryActions = pathname.startsWith("/territorio/acciones");
  const territoryProximas = pathname.startsWith("/territorio/proximas");
  const hasSecondary = areasOpen || cyclesOpen || territoryOpen;
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
        <label className="ml-auto flex h-9 shrink-0 items-center gap-2 border-b-2 border-[#3F3F59]/65 px-1 text-xs text-[#3F3F59] transition-[border-color] focus-within:border-[#34344B]">
          <Search className="h-4 w-4 shrink-0 text-[#3F3F59]" />
          <span className="sr-only">Buscar</span>
          <input
            type="search"
            autoComplete="off"
            spellCheck={false}
            className="w-16 appearance-none border-0 bg-transparent p-0 font-semibold text-[#34344B] shadow-none outline-none ring-0 placeholder:text-[#3F3F59]/80 [&::-webkit-search-cancel-button]:hidden sm:w-32 md:w-48"
            placeholder="Buscar"
          />
        </label>
        </div>
      </div>

      <div className="flex h-[calc(100dvh-118px)] gap-0 overflow-hidden bg-white pb-[calc(4rem+env(safe-area-inset-bottom))] md:gap-3 md:p-3 md:pb-3 lg:h-[calc(100dvh-154px)] lg:gap-4 lg:p-5">
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
          className="h-full min-h-0 min-w-0 flex-1 rounded-none bg-white overflow-y-auto md:rounded-2xl md:[scrollbar-gutter:stable]"
          tabIndex={-1}
        >
          {cyclesOpen ? (
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
          {hasSecondary && areasOpen ? (
            <div className="xl:hidden">
              <AreaHorizontalNav pathname={pathname} />
            </div>
          ) : null}
        </main>
      </div>

      <nav
        aria-label="Navegación móvil"
        className="fixed inset-x-0 bottom-0 z-50 grid h-[calc(4rem+env(safe-area-inset-bottom))] min-h-16 border-t border-white/10 bg-[#494963] pb-[env(safe-area-inset-bottom)] md:hidden"
        style={{ gridTemplateColumns: `repeat(${primaryItems.length}, minmax(0, 1fr))` }}
      >
        {primaryItems.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} aria-label={item.label} className={`flex min-w-0 flex-col items-center justify-center gap-1 text-[9px] font-bold min-[390px]:text-[10px] ${active ? "text-white" : "text-white/50"}`}>
              <span className={`grid h-8 w-9 place-items-center rounded-lg min-[390px]:w-10 ${active ? "bg-white text-[#494963]" : ""}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <span className="max-w-full truncate px-0.5">{item.mobileLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
