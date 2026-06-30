"use client";

import Link from "next/link";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface AreaFooterProps {
  area: Area;
  prevArea: Area | null;
  nextArea: Area | null;
  scrollToSection: (sectionId: string) => void;
}

const SECTIONS = [
  { id: "materiales", label: "ITINERARIOS" },
  { id: "formacion", label: "FORMACIONES DOCENTES" },
  { id: "video", label: "VIDEO" },
  { id: "ejes", label: "EJES" },
];

export function AreaFooter({
  area,
  prevArea,
  nextArea,
  scrollToSection,
}: AreaFooterProps) {
  return (
    <footer id="area-footer" className="w-full bg-[#494963]">
      {/* Top bar: section quick links */}
      <div className="w-full py-4 px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-12">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            className="text-[11px] font-bold tracking-[0.15em] text-white/60 transition-all hover:text-white"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Bottom bar: prev / home / scroll-to-top / next -- same bg, no separator.
          Extra bottom padding on mobile clears the fixed bottom tab bar. */}
      <div className="relative pt-5 pb-28 lg:pb-5 px-6 sm:px-10 flex items-center justify-between bg-[#3d3d54]">
        {/* Prev area */}
        <div className="flex-1 flex justify-start">
          {prevArea ? (
            <Link
              href={`/area/${prevArea.slug}`}
              className="flex items-center gap-2.5 text-white/50 transition-colors hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="hidden sm:block">
                <span className="block text-[10px] uppercase tracking-wider text-white/30 font-medium">
                  Anterior
                </span>
                <span className="block text-sm font-bold leading-tight text-white">
                  {prevArea.name}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Center: Home button */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white/40 transition-all hover:bg-white/10 hover:text-white"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>

        {/* Next area */}
        <div className="flex-1 flex justify-end items-center">
          {nextArea ? (
            <Link
              href={`/area/${nextArea.slug}`}
              className="flex items-center gap-2.5 text-white/50 transition-colors hover:text-white"
            >
              <div className="hidden sm:block text-right">
                <span className="block text-[10px] uppercase tracking-wider text-white/30 font-medium">
                  Siguiente
                </span>
                <span className="block text-sm font-bold leading-tight text-white">
                  {nextArea.name}
                </span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </footer>
  );
}
