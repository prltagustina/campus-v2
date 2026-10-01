"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
    // Desktop/tablet (rail con aside siempre visible para elegir área): entra
    // directo a Marco General, sin portada intermedia.
    // Mobile (tab bar inferior, sin aside): va al picker de áreas en una sola
    // columna (`/areas`, sin portada) para poder elegir antes de entrar.
    href: "/area/marco-general",
    mobileHref: "/areas",
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

// Mismo gradiente exacto que la franja equivalente del Campus real
// (campuseducativo.santafe.edu.ar/diseno-curricular/), tomado de su CSS
// calculado: naranja a violeta, dos puntas nomás - no el arcoíris de
// muchos colores que tenía antes (se acerca más a la versión final).
const documentSpineGradient = `linear-gradient(90deg, #FFA102 0%, #48139C 100%)`;

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
  // rounded-[9px]: mismo radio que los botones de área (AreaNavLink) y el
  // resto de los botones del sitio — antes estos tres usaban rounded-2xl,
  // más redondeado que todo lo demás.
  const chipClass = "flex min-w-0 flex-1 flex-col gap-0.5 rounded-[9px] border px-4 py-2.5 text-[var(--chip)] transition-colors duration-150 hover:bg-[var(--chip)] hover:text-[var(--chip-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]";

  return (
    <nav aria-label="Navegación entre áreas" className="flex flex-col gap-2 bg-white px-3 pb-4 pt-10">
      <span
        aria-current="page"
        className="flex min-w-0 flex-col gap-0.5 rounded-[9px] px-4 py-2.5"
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
            <ChevronLeft aria-hidden="true" className="-ml-0.5 mr-1 h-3.5 w-3.5 shrink-0" strokeWidth={2.75} />
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
            Siguiente <ChevronRight aria-hidden="true" className="-mr-0.5 ml-1 h-3.5 w-3.5 shrink-0" strokeWidth={2.75} />
          </span>
          <span className="truncate text-sm font-bold tracking-[-.02em]">{next.shortName}</span>
        </Link>
      </div>
    </nav>
  );
}

function AreaSubnav({ pathname }: { pathname: string }) {
  const marcoActive = pathname === "/area/marco-general" || pathname === "/marco-general";

  // minmax(48px,1fr) para las 10 filas: la fila cuyo texto envuelve a 2
  // líneas en tablet crece sola por su contenido (el grid no la recorta);
  // forzar un piso más alto para todas infla el total y fuerza scroll.
  return (
    <nav aria-label="Áreas curriculares" className="grid h-full min-h-full auto-rows-[minmax(48px,1fr)] gap-2.5 pr-1">
      <Link
        href="/area/marco-general"
        aria-current={marcoActive ? "page" : undefined}
        className={`flex h-full min-h-0 w-full min-w-0 items-center justify-between rounded-[9px] border border-[#494963] px-[15px] py-2 text-[clamp(15px,1.35vw,20px)] xl:text-[clamp(17px,1.35vw,20px)] font-normal leading-[1.15] tracking-[-0.035em] transition-colors duration-150 hover:bg-[#494963] hover:text-[#E9E9EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${marcoActive ? "bg-[#494963] text-[#E9E9EE]" : "bg-white text-[#494963]"}`}
      >
        <span className="min-w-0 text-balance text-pretty break-words">Marco General</span>
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
  // Inicio: su primer bloque (VideoEmbed) es un v3-section con 14px de
  // padding propio a la izquierda — sin compensar, el video quedaba 14px
  // más adentro que la botonera de Áreas (que no tiene ese padding extra).
  // Familias/Docentes/EIB no la necesitan: su contenido no trae ese padding
  // propio, ya arrancan al ras de la botonera tal cual.
  const isHome = pathname === "/";
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

  // iOS Safari a veces no repinta el fondo al ajustar dvh/svh cuando la
  // barra de direcciones cambia de tamaño (bug conocido de WebKit). Medimos
  // el alto real con JS para no depender de esas unidades en mobile.
  // useLayoutEffect: se fija antes del primer pintado, para no arrancar con
  // el valor de respaldo (100svh) y saltar después al alto real.
  useLayoutEffect(() => {
    const setAppHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-vh", `${height}px`);
    };
    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    window.addEventListener("orientationchange", setAppHeight);
    window.visualViewport?.addEventListener("resize", setAppHeight);
    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("orientationchange", setAppHeight);
      window.visualViewport?.removeEventListener("resize", setAppHeight);
    };
  }, []);

  // Mobile: todo (header, franja del buscador y contenido) scrollea junto en un
  // único scroll — el header y la franja se van hacia arriba al bajar y vuelven
  // al llegar arriba, como un scroll normal de página. Desktop: header/franja
  // fijos y el <main> scrollea por dentro (necesario para el sidebar).
  // useLayoutEffect (no useEffect): resetea el scroll ANTES de pintar la
  // página nueva — si no, el primer frame se pintaba en la posición de
  // scroll de la página anterior (p. ej. bajado en Inicio) y recién después
  // saltaba al tope, mostrando un instante de fondo gris de más hasta que
  // el layout terminaba de acomodarse — más notorio en Marco General por
  // ser la vista con más contenido.
  const rootScrollRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    rootScrollRef.current?.scrollTo(0, 0);
    document.getElementById("contenido")?.scrollTo(0, 0);
  }, [pathname]);

  // PRUEBA: navegación inspirada en therawmaterials.com (rail principal
  // Inicio/Áreas/etc). Ahí es scroll real entre secciones de una misma
  // página; acá son rutas distintas, así que se simula: el ítem activo
  // "crece" (más peso en el grid), un puntito único se desliza hasta él
  // (en vez de aparecer/desaparecer en cada uno) y una franja tipo
  // "Estás en (X)" aparece un instante al cambiar de página.
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const desktopItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [desktopDot, setDesktopDot] = useState<{ top: number; left: number } | null>(null);
  // Inicio y Áreas son las únicas vistas con scroll real de sobra (video +
  // documento + rueda + historia; documento + materiales + formaciones +
  // video) para que el gesto de la referencia tenga sentido de verdad.
  // Equipos directivos/Familias/EIB usan tabs, casi no scrollean - ahí se
  // deja la versión simulada (crecer/mover solo al cambiar de página).
  const scrollTracked = pathname === "/" || areasOpen;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!scrollTracked) {
      setScrollProgress(0);
      return;
    }
    const desktopScrollEl = document.getElementById("contenido");
    const mobileScrollEl = rootScrollRef.current;
    let raf = 0;

    const measure = (el: HTMLElement) => {
      const max = el.scrollHeight - el.clientHeight;
      return max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    };
    const scheduleUpdate = (el: HTMLElement) => () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollProgress(measure(el));
        raf = 0;
      });
    };

    const cleanups: Array<() => void> = [];
    if (desktopScrollEl) {
      const handler = scheduleUpdate(desktopScrollEl);
      desktopScrollEl.addEventListener("scroll", handler, { passive: true });
      setScrollProgress(measure(desktopScrollEl));
      cleanups.push(() => desktopScrollEl.removeEventListener("scroll", handler));
    }
    if (mobileScrollEl) {
      const handler = scheduleUpdate(mobileScrollEl);
      mobileScrollEl.addEventListener("scroll", handler, { passive: true });
      cleanups.push(() => mobileScrollEl.removeEventListener("scroll", handler));
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname, scrollTracked]);

  useLayoutEffect(() => {
    const activeHref = activePrimary?.href;
    if (!activeHref) return;

    const updateDots = () => {
      const desktopEl = desktopItemRefs.current[activeHref];
      const desktopNav = desktopNavRef.current;
      if (desktopEl && desktopNav) {
        const navRect = desktopNav.getBoundingClientRect();
        const elRect = desktopEl.getBoundingClientRect();
        // Con scroll real: el punto viaja dentro del propio ítem según
        // cuánto se scrolleó (arriba del todo = recién entrando, abajo del
        // todo = terminando la vista). Simulado: se queda fijo en la
        // esquina, como antes.
        const travel = scrollTracked ? Math.max(0, elRect.height - 24) * scrollProgress : 0;
        setDesktopDot({ top: elRect.top - navRect.top + 12 + travel, left: elRect.right - navRect.left - 12 });
      }

    };

    updateDots();

    // El ítem activo crece con una transición de grid-template-rows: medir
    // una sola vez al cambiar de ruta agarra el tamaño DE ANTES de crecer
    // (la transición todavía no arrancó). ResizeObserver va reportando el
    // tamaño real cuadro a cuadro mientras crece, así el punto sigue a la
    // esquina en vez de quedar mal ubicado al terminar. rAF de por medio
    // (no llamar updateDots directo en cada callback): sin eso, en
    // Directivos/Familias/EIB (sin scroll real, un solo salto de tamaño)
    // el punto parpadeaba - RO puede disparar más de una vez por cuadro.
    const desktopEl = desktopItemRefs.current[activeHref];
    let raf = 0;
    const throttledUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        updateDots();
        raf = 0;
      });
    };
    const ro = desktopEl && "ResizeObserver" in window ? new ResizeObserver(throttledUpdate) : undefined;
    ro?.observe(desktopEl!);
    return () => {
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname, activePrimary, scrollTracked, scrollProgress]);

  return (
    <div
      ref={rootScrollRef}
      className="v3-scroll-theme flex h-[var(--app-vh,100svh)] flex-col overflow-y-auto overscroll-none bg-[#F5F5F7] text-[#494963] md:h-dvh md:overflow-hidden"
      style={{ ["--section-scrollbar" as string]: currentArea?.color ?? MARCO_GENERAL_COLOR }}
    >
      <header className="h-[72px] shrink-0 border-b border-[#494963]/[.07] bg-white px-4 lg:h-[100px] lg:px-8" role="banner">
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

      {/* Texto blanco (antes navy #3F3F59/#34344B): sobre el degradé
         naranja→violeta el navy quedaba con poco contraste en el tramo
         naranja - pedido explícito de pasar todo (breadcrumb + Buscar) a
         blanco. */}
      <div
        className="h-[46px] shrink-0 overflow-hidden bg-[#EDEDF0] px-4 text-white lg:h-[54px]"
        style={{
          backgroundImage: documentSpineGradient,
        }}
      >
        <div className="mx-auto flex h-full max-w-[1160px] items-center">
        <nav aria-label="Ruta actual" className="flex min-w-0 max-w-full flex-none items-center gap-2 text-xs md:max-w-[calc(100%-17rem)] md:text-sm">
          <Link href="/" className="hidden shrink-0 font-bold text-white sm:inline">Diseño Curricular</Link>
          {parentLabel && <><span className="hidden text-white/55 sm:inline">/</span><span className="hidden font-semibold text-white/85 sm:inline">{parentLabel}</span></>}
          <span className="hidden text-white/55 sm:inline">/</span><span className="truncate font-extrabold text-white">{currentLabel}</span>
        </nav>
        <label className="ml-auto flex h-9 shrink-0 items-center gap-2 border-b-2 border-white/65 px-1 text-xs text-white transition-[border-color] focus-within:border-white">
          <Search className="h-4 w-4 shrink-0 text-white" />
          <span className="sr-only">Buscar</span>
          <input
            type="search"
            autoComplete="off"
            spellCheck={false}
            className="w-16 appearance-none border-0 bg-transparent p-0 font-semibold text-white shadow-none outline-none ring-0 placeholder:text-white/80 [&::-webkit-search-cancel-button]:hidden sm:w-32 md:w-48"
            placeholder="Buscar"
          />
        </label>
        </div>
      </div>

      {/* Separación entre rail/aside/contenido fija en 24px desde tablet
         (antes 16px, se sentía muy poco aire entre la navegación y el
         contenido) — mismo valor en los tres casos (rail→aside, rail→
         contenido cuando no hay aside, aside→contenido), no crece por
         breakpoint para que sea igual en todos lados.
         bg-white fijo (antes gris en Familias/Docentes/EIB): esa franja de
         abajo es el hueco reservado para la tab bar fija de mobile
         (pb-[5rem+safe-area]) — en gris quedaba como un zócalo visible al
         hacer scroll hasta el final en páginas con poco contenido, cosa que
         no pasaba en blanco porque se mezclaba con el fondo de la página. */}
      <div className="flex min-h-0 gap-0 bg-white pb-[calc(5rem+env(safe-area-inset-bottom))] max-md:block max-md:shrink-0 max-md:overflow-visible md:flex-1 md:gap-6 md:overflow-hidden md:bg-white md:p-3 md:pb-3 lg:p-5">
        {/* Tablet y desktop: rail apilado (ícono arriba / texto abajo), con la
            bajada de Áreas. Ancho fluido (clamp) en vez de saltos por
            breakpoint: escala parejo entre 168px (md, 768px) y 230px (1280px,
            donde vuelve al ancho de siempre) — así el mínimo de desktop se ve
            igual que el máximo de tablet, sin un salto brusco justo ahí.
            gap-2.5: mismo separación que AreaSubnav de al lado (antes
            gap-1.5, quedaban más juntos que los botones de área). */}
        <nav
          ref={desktopNavRef}
          aria-label="Navegación principal"
          className="relative hidden w-[168px] shrink-0 gap-2.5 transition-[grid-template-rows] duration-500 ease-in-out md:grid md:w-[clamp(168px,12.1vw_+_75px,230px)]"
          style={{
            // El activo suma peso propio (+.6fr): "crece" respecto a los
            // demás, como la sección activa de la referencia - los otros
            // conservan su proporción entre sí. Tamaño fijo apenas se
            // entra (no ligado al scroll): crecer y encogerse en vivo
            // mientras se scrollea se sentía raro/inestable. Lo que sí
            // sigue el scroll real (Inicio/Áreas) es el puntito, más abajo.
            gridTemplateRows: primaryItems
              .map((item) => `${parseFloat(item.gridRow) + (item.match(pathname) ? 0.6 : 0)}fr`)
              .join(" "),
          }}
        >
          {primaryItems.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                ref={(el) => { desktopItemRefs.current[item.href] = el; }}
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
          {/* Puntito único que se desliza hasta el ítem activo (en vez de
             uno fijo por ítem) - mismo espíritu que el indicador de scroll
             de la referencia, adaptado a que acá el "movimiento" lo dispara
             un cambio de ruta, no un scroll real. */}
          {desktopDot ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-white transition-[top,left] duration-150 ease-out"
              style={{ top: desktopDot.top, left: desktopDot.left }}
            />
          ) : null}
        </nav>

        {hasSecondary && (
          // Áreas: el aside con la columna de áreas + Marco General ya se ve
          // desde tablet (md), igual que desktop — no solo desde xl. Ancho
          // fluido (clamp): escala parejo entre 164px (md, 768px) y 300px
          // (1280px, ancho de siempre) en vez de saltar por breakpoint — así
          // el mínimo de desktop se ve igual que el máximo de tablet.
          // Ciclos y Territorio no cambian acá, siguen mostrándose recién en xl.
          <aside className={`v3-secondary hidden h-full min-h-0 w-[280px] shrink-0 overflow-y-auto bg-white ${areasOpen ? "md:block md:w-[clamp(164px,26.6vw_-_40px,300px)]" : "xl:block xl:w-[300px]"}`}>
            {areasOpen ? <AreaSubnav pathname={pathname} /> : cyclesOpen ? <CycleSubnav pathname={pathname} /> : <TerritorySubnav pathname={pathname} />}
          </aside>
        )}

        {/* areasOpen: las tarjetas de color del contenido (portada, recursos,
           etc.) ya traen su propio "marco" de 14px (v3-section) en el borde
           izquierdo. Sumado al gap del flex de acá arriba, el espacio aside→
           contenido quedaba más grande que el de rail→aside. -ml-[14px]
           cancela ese marco solo acá, para que los dos gaps midan lo mismo. */}
        <div className={`flex min-h-0 min-w-0 flex-col rounded-none bg-white max-md:overflow-visible md:flex-1 md:overflow-hidden md:rounded-2xl md:bg-white ${areasOpen || isHome ? "md:-ml-[14px]" : ""}`}>
        <main
          id="contenido"
          className="min-h-0 overscroll-none max-md:overflow-visible md:flex-1 md:overflow-y-auto"
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
            // Ya redundante desde tablet (md), donde ahora está el aside con
            // Marco General + áreas, como en desktop. Queda solo para mobile.
            <div className="md:hidden">
              <AreaHorizontalNav pathname={pathname} />
            </div>
          ) : null}
        </main>
        </div>
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
            <Link
              key={item.href}

              href={item.mobileHref ?? item.href}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 text-[9px] font-bold min-[390px]:text-[10px] ${active ? "text-white" : "text-white/50"}`}
            >
              <span className={`grid h-8 w-9 place-items-center rounded-lg min-[390px]:w-10 ${active ? "bg-white text-[#494963]" : ""}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="max-w-full truncate px-0.5">{item.mobileLabel}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
