"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CirclePlay, History, Orbit, type LucideIcon } from "lucide-react";

export interface StickySectionNavItem {
  id: string;
  label: string;
  mobileLabel?: string;
  icon: LucideIcon;
}

interface StickySectionNavProps {
  title: string;
  items: StickySectionNavItem[];
  backHref?: string;
  backLabel?: string;
  variant?: "default" | "area";
  accent?: string;
  accentText?: string;
  /**
   * En vistas con poco ancho deja únicamente la botonera de secciones.
   * La fila contextual vuelve a aparecer en desktop, donde comparte línea
   * con las pestañas y ya no duplica información verticalmente.
   */
  tabsOnlyBelowDesktop?: boolean;
}

const homeSectionItems: StickySectionNavItem[] = [
  { id: "presentacion", label: "Presentación", icon: CirclePlay },
  { id: "documento", label: "Documento", icon: BookOpen },
  { id: "rueda", label: "Rueda", icon: Orbit },
  { id: "historia", label: "Historia", icon: History },
];

/** Evita serializar componentes de íconos desde la página server de Inicio. */
export function HomeSectionNav() {
  return <StickySectionNav title="Inicio" items={homeSectionItems} />;
}

/**
 * Navegación contextual que se fija dentro de #contenido, el único contenedor
 * de scroll de AppShell. De este modo no duplica ni tapa el encabezado global.
 */
export function StickySectionNav({
  title,
  items,
  backHref,
  backLabel = "Volver",
  variant = "default",
  accent = "#494963",
  accentText = "#ffffff",
  tabsOnlyBelowDesktop = false,
}: StickySectionNavProps) {
  const [activeSection, setActiveSection] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.some((item) => item.id === activeSection)) {
      setActiveSection(items[0]?.id ?? "");
    }
  }, [activeSection, items]);

  useEffect(() => {
    const scrollRoot = document.getElementById("contenido");
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((target): target is HTMLElement => Boolean(target));

    if (!scrollRoot || targets.length === 0) return;

    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;

      const rootRect = scrollRoot.getBoundingClientRect();
      const maxScrollTop = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight);
      const remainingScroll = Math.max(0, maxScrollTop - scrollRoot.scrollTop);
      const endThreshold = Math.max(8, Math.min(64, scrollRoot.clientHeight * 0.06));
      const lastTarget = targets[targets.length - 1];

      // La última sección no siempre puede cruzar la franja del observer: al
      // llegar al límite físico del contenedor la activamos explícitamente.
      // Exigimos que exista recorrido para no marcarla al cargar una página
      // cuyo contenido completo entra en la pantalla.
      if (maxScrollTop > 2 && remainingScroll <= endThreshold) {
        setActiveSection(lastTarget.id);
        return;
      }

      // Fuera del final, la sección activa es la última que alcanzó una línea
      // editorial estable dentro del viewport. Así el estado no depende de la
      // altura relativa de cada bloque ni salta entre dos secciones visibles.
      let nextTarget = targets[0];

      if (scrollRoot.scrollTop > 2) {
        // La línea editorial se mantiene estable tanto con la barra compacta
        // de áreas como con las barras contextuales de dos filas.
        const activationLine = rootRect.top + Math.min(180, Math.max(144, scrollRoot.clientHeight * 0.22));

        for (const target of targets) {
          if (target.getBoundingClientRect().top > activationLine) break;
          nextTarget = target;
        }
      }

      setActiveSection(nextTarget.id);
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const observer = new IntersectionObserver(
      scheduleUpdate,
      {
        root: scrollRoot,
        rootMargin: "-18% 0px -64% 0px",
        threshold: [0, 0.01, 0.2],
      },
    );

    targets.forEach((target) => observer.observe(target));
    scrollRoot.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    targets.forEach((target) => resizeObserver.observe(target));
    scheduleUpdate();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      scrollRoot.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [items]);

  const navigateTo = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLabel = items.find((item) => item.id === activeSection)?.label ?? items[0]?.label;
  const isAreaVariant = variant === "area";

  return (
    <header
      className={`sticky top-0 z-40 w-full ${isAreaVariant
        ? "border-b border-black/[.06] shadow-[0_8px_24px_-20px_rgba(25,25,42,.45)]"
        : "bg-[#494963] text-white shadow-[0_8px_24px_-20px_rgba(25,25,42,.9)]"
      }`}
      style={isAreaVariant ? { backgroundColor: accent, color: accentText } : undefined}
    >
      <div className={`${tabsOnlyBelowDesktop ? "hidden lg:flex" : "flex"} min-h-14 min-w-0 items-center gap-2.5 px-3 sm:px-4 lg:px-5`}>
        {backHref ? (
          <Link
            href={backHref}
            className={`inline-flex min-h-10 min-w-0 flex-shrink items-center gap-2 rounded-full px-2 text-xs font-bold transition-colors sm:px-3 sm:text-sm ${isAreaVariant ? "text-current hover:bg-white/20" : "text-white hover:bg-white/10"}`}
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">{backLabel}</span>
          </Link>
        ) : null}

        {backHref ? <span className={`hidden h-5 w-px shrink-0 sm:block ${isAreaVariant ? "bg-current opacity-20" : "bg-white/20"}`} aria-hidden="true" /> : null}
        <span
          className={`min-w-0 truncate text-sm font-semibold sm:text-[15px] ${isAreaVariant ? "text-current" : "text-white/80"}`}
        >
          {title}
        </span>

        <nav className="ml-auto hidden shrink-0 items-center gap-1 lg:flex" aria-label={`Secciones de ${title}`}>
          {items.map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                aria-current={active ? "location" : undefined}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 xl:px-3 xl:text-xs ${isAreaVariant
                  ? active
                    ? "shadow-[0_3px_12px_rgba(25,25,42,.12)] focus-visible:outline-current"
                    : "text-current opacity-65 hover:bg-white/20 hover:opacity-100 focus-visible:outline-current"
                  : active
                    ? "bg-white text-[#494963] focus-visible:outline-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-white"
                }`}
                style={isAreaVariant && active ? { backgroundColor: accentText, color: accent } : undefined}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <span
          className={`ml-auto shrink-0 text-[11px] font-semibold lg:hidden ${isAreaVariant ? "text-current opacity-75" : "text-white/60"}`}
        >
          {activeLabel}
        </span>
      </div>

      <nav className={`grid lg:hidden ${tabsOnlyBelowDesktop ? "" : isAreaVariant ? "border-t border-black/[.06]" : "border-t border-white/10"} ${items.length === 3 ? "grid-cols-3" : "grid-cols-4"}`} aria-label={`Secciones de ${title}`}>
        {items.map((item) => {
          const active = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.id)}
              aria-current={active ? "location" : undefined}
              className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 px-1 text-[9px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] sm:flex-row sm:gap-1.5 sm:text-[11px] ${isAreaVariant
                ? active
                  ? "focus-visible:outline-current"
                  : "text-current opacity-65 hover:bg-white/20 hover:opacity-100 focus-visible:outline-current"
                : active
                  ? "bg-white text-[#494963] focus-visible:outline-white"
                  : "text-white/55 hover:bg-white/10 hover:text-white focus-visible:outline-white"
              }`}
              style={isAreaVariant && active ? { backgroundColor: accentText, color: accent } : undefined}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="max-w-full truncate">{item.mobileLabel ?? item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
