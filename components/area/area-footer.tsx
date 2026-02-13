"use client";

import Link from "next/link";
import { Home, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface AreaFooterProps {
  area: Area;
  prevArea: Area | null;
  nextArea: Area | null;
  scrollToSection: (sectionId: string) => void;
}

const SECTIONS = [
  { id: "ejes", label: "EJES" },
  { id: "video", label: "VIDEO" },
  { id: "materiales", label: "MATERIALES" },
  { id: "formacion", label: "FORMACIONES DOCENTES" },
];

export function AreaFooter({
  area,
  prevArea,
  nextArea,
  scrollToSection,
}: AreaFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="area-footer" className="lg:ml-16">
      {/* Top bar: section quick links -- uses area institutional color */}
      <div
        className="w-full py-4 flex items-center justify-center gap-8 sm:gap-12"
        style={{ backgroundColor: area.color }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            className="text-[11px] font-bold tracking-[0.15em] text-white/70 transition-all hover:text-white"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Bottom bar: prev / home / next navigation */}
      <div className="relative py-4 px-6 sm:px-10 flex items-center justify-between bg-[#f5f5f5]">
        {/* Prev area */}
        <div className="flex-1 flex justify-start">
          {prevArea ? (
            <Link
              href={`/area/${prevArea.slug}`}
              className="flex items-center gap-2.5 text-[#494963]/60 transition-colors hover:text-[#494963]"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="hidden sm:block">
                <span className="block text-[10px] uppercase tracking-wider text-[#494963]/40 font-medium">
                  Anterior
                </span>
                <span className="block text-sm font-bold leading-tight text-[#494963]">
                  {prevArea.name}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Home button */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="w-11 h-11 rounded-full bg-[#494963]/5 flex items-center justify-center text-[#494963]/50 transition-all hover:bg-[#494963]/10 hover:text-[#494963]"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>

        {/* Next area + scroll to top */}
        <div className="flex-1 flex justify-end items-center gap-3">
          {nextArea ? (
            <Link
              href={`/area/${nextArea.slug}`}
              className="flex items-center gap-2.5 text-[#494963]/60 transition-colors hover:text-[#494963]"
            >
              <div className="hidden sm:block text-right">
                <span className="block text-[10px] uppercase tracking-wider text-[#494963]/40 font-medium">
                  Siguiente
                </span>
                <span className="block text-sm font-bold leading-tight text-[#494963]">
                  {nextArea.name}
                </span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-[#494963]/10 flex items-center justify-center text-[#494963]/30 transition-all hover:border-[#494963]/30 hover:text-[#494963]/60"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
