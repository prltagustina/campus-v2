"use client";

import { Children, type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";

export interface SectionRailItem {
  id: string;
  label: string;
  description?: string;
}

interface SectionTabsProps {
  title?: string;
  items: SectionRailItem[];
  children: ReactNode;
  /** Mantiene montados los paneles ya visitados para no recargar embeds remotos. */
  keepVisitedPanels?: boolean;
}

/** Selector editorial estable para páginas con varias colecciones de contenido. */
export function SectionTabs({ title = "Secciones", items, children, keepVisitedPanels = false }: SectionTabsProps) {
  const panels = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(() => new Set([0]));
  const panelViewportRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replaceAll(":", "");
  const safeIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));
  const activeItem = items[safeIndex];

  const activateTab = (index: number) => {
    if (index === safeIndex) return;
    if (keepVisitedPanels) {
      setVisitedIndices((current) => {
        if (current.has(index)) return current;
        const next = new Set(current);
        next.add(index);
        return next;
      });
    }
    setActiveIndex(index);
    panelViewportRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % items.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;
    else return;

    event.preventDefault();
    activateTab(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    tabs?.[nextIndex]?.focus();
  };

  const tabs = items.map((item, index) => {
    const selected = index === safeIndex;
    return (
      <button
        key={item.id}
        id={`${instanceId}-tab-${item.id}`}
        type="button"
        role="tab"
        aria-selected={selected}
        aria-controls={`${instanceId}-panel-${item.id}`}
        tabIndex={selected ? 0 : -1}
        onClick={() => activateTab(index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
        className={`relative min-h-10 min-w-0 flex-1 whitespace-nowrap rounded-full px-3 py-1.5 text-center text-[11px] font-semibold leading-tight transition-[background-color,color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963] sm:px-5 sm:text-xs md:min-h-11 md:flex-none md:px-6 md:text-[13px] ${selected ? "bg-[#494963] text-white shadow-[0_4px_14px_rgba(73,73,99,.16)]" : "text-[#494963]/65 hover:bg-white/70 hover:text-[#494963]"}`}
      >
        {item.label}
      </button>
    );
  });

  if (!activeItem || panels.length === 0) return null;

  return (
    <div
      id={`${instanceId}-switcher`}
      className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#F7F7F9]"
    >
      <div className="z-30 shrink-0 border-b border-[#494963]/[.06] bg-[#F7F7F9] px-4 py-2.5 sm:px-6 md:py-3">
        <div className="mx-auto max-w-4xl">
          <span className="sr-only">{title}</span>
          <div
            role="tablist"
            aria-label={title}
            className="flex w-full min-w-0 gap-1.5 rounded-full bg-[#E6E6EB] p-1.5 md:w-fit"
          >
            {tabs}
          </div>
        </div>
      </div>

      <div
        ref={panelViewportRef}
        className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-gutter:stable]"
      >
        {keepVisitedPanels ? panels.map((panel, index) => {
          if (!visitedIndices.has(index)) return null;
          const item = items[index];
          if (!item) return null;
          const active = index === safeIndex;
          return (
            <div
              key={item.id}
              id={`${instanceId}-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`${instanceId}-tab-${item.id}`}
              aria-label={item.label}
              className="min-w-0"
              hidden={!active}
            >
              {panel}
            </div>
          );
        }) : (
          <div
            id={`${instanceId}-panel-${activeItem.id}`}
            role="tabpanel"
            aria-labelledby={`${instanceId}-tab-${activeItem.id}`}
            aria-label={activeItem.label}
            className="min-w-0"
          >
            {panels[safeIndex]}
          </div>
        )}
      </div>
    </div>
  );
}
