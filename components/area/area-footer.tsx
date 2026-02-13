"use client";

import Link from "next/link";
import { Home, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import type { Area } from "@/lib/areas-data";

/* ── Contrast helper ─────────────────────────────── */
function getContrastColor(hex: string): string {
  const c = hex.replace("#", "");
  const r = Number.parseInt(c.substring(0, 2), 16);
  const g = Number.parseInt(c.substring(2, 4), 16);
  const b = Number.parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#1a1a2e" : "#ffffff";
}

function getContrastMuted(hex: string): string {
  const c = hex.replace("#", "");
  const r = Number.parseInt(c.substring(0, 2), 16);
  const g = Number.parseInt(c.substring(2, 4), 16);
  const b = Number.parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "rgba(26,26,46,0.5)" : "rgba(255,255,255,0.55)";
}

function getContrastSubtle(hex: string): string {
  const c = hex.replace("#", "");
  const r = Number.parseInt(c.substring(0, 2), 16);
  const g = Number.parseInt(c.substring(2, 4), 16);
  const b = Number.parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "rgba(26,26,46,0.12)" : "rgba(255,255,255,0.15)";
}

/* ── Types ───────────────────────────────────────── */
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

  const textColor = getContrastColor(area.color);
  const mutedColor = getContrastMuted(area.color);
  const subtleColor = getContrastSubtle(area.color);

  return (
    <footer
      id="area-footer"
      className="fixed bottom-0 left-0 right-0 z-[70]"
      style={{ marginLeft: "4rem" }}
    >
      {/* Top bar: section quick links */}
      <div
        className="w-full py-3 flex items-center justify-center gap-6 sm:gap-10"
        style={{ backgroundColor: area.color }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            className="text-[11px] font-bold tracking-wider transition-opacity hover:opacity-100 opacity-60"
            style={{ color: textColor }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Thin divider */}
      <div style={{ backgroundColor: area.color }}>
        <div className="w-full h-px" style={{ backgroundColor: subtleColor }} />
      </div>

      {/* Bottom bar: prev / home / next navigation */}
      <div
        className="relative py-4 px-6 sm:px-10 flex items-center justify-between"
        style={{ backgroundColor: area.color }}
      >
        {/* Prev area */}
        <div className="flex-1 flex justify-start">
          {prevArea ? (
            <Link
              href={`/area/${prevArea.slug}`}
              className="flex items-center gap-2 transition-opacity hover:opacity-100 opacity-80"
              style={{ color: textColor }}
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="hidden sm:block">
                <span
                  className="block text-[10px] uppercase tracking-wider"
                  style={{ color: mutedColor }}
                >
                  Anterior
                </span>
                <span className="block text-sm font-bold leading-tight">
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
            className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-70"
            style={{
              backgroundColor: subtleColor,
              color: textColor,
            }}
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>

        {/* Next area + scroll to top */}
        <div className="flex-1 flex justify-end items-center gap-3">
          {nextArea ? (
            <Link
              href={`/area/${nextArea.slug}`}
              className="flex items-center gap-2 transition-opacity hover:opacity-100 opacity-80"
              style={{ color: textColor }}
            >
              <div className="hidden sm:block text-right">
                <span
                  className="block text-[10px] uppercase tracking-wider"
                  style={{ color: mutedColor }}
                >
                  Siguiente
                </span>
                <span className="block text-sm font-bold leading-tight">
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
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-opacity hover:opacity-100 opacity-60"
            style={{
              borderColor: subtleColor,
              color: textColor,
            }}
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
