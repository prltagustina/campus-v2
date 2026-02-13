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
  // Relative luminance (WCAG formula simplified)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#1a1a2e" : "#ffffff";
}

function getContrastMuted(hex: string): string {
  const c = hex.replace("#", "");
  const r = Number.parseInt(c.substring(0, 2), 16);
  const g = Number.parseInt(c.substring(2, 4), 16);
  const b = Number.parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "rgba(26,26,46,0.5)" : "rgba(255,255,255,0.5)";
}

function getContrastSubtle(hex: string): string {
  const c = hex.replace("#", "");
  const r = Number.parseInt(c.substring(0, 2), 16);
  const g = Number.parseInt(c.substring(2, 4), 16);
  const b = Number.parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "rgba(26,26,46,0.15)" : "rgba(255,255,255,0.2)";
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
    <footer id="area-footer" className="w-full relative z-[70]">
      {/* Top bar: section links */}
      <div
        className="w-full py-5 flex items-center justify-center gap-6 sm:gap-10"
        style={{ backgroundColor: area.color }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            className="text-xs font-bold tracking-wider transition-opacity hover:opacity-100"
            style={{ color: mutedColor }}
            onMouseEnter={(e) => (e.currentTarget.style.color = textColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = mutedColor)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Thin divider */}
      <div style={{ backgroundColor: area.color }}>
        <div className="w-full h-px" style={{ backgroundColor: subtleColor }} />
      </div>

      {/* Bottom bar: navigation */}
      <div style={{ backgroundColor: area.color }}>
        <div className="relative py-6 px-6 sm:px-10">
          {/* Prev area */}
          <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2">
            {prevArea && (
              <Link
                href={`/area/${prevArea.slug}`}
                className="flex items-center gap-2 transition-opacity hover:opacity-100"
                style={{ color: textColor, opacity: 0.8 }}
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
            )}
          </div>

          {/* Home button */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-100"
              style={{
                backgroundColor: subtleColor,
                color: textColor,
                opacity: 0.7,
              }}
            >
              <Home className="w-5 h-5" />
            </Link>
          </div>

          {/* Next area + scroll to top */}
          <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex items-center gap-4">
            {nextArea && (
              <Link
                href={`/area/${nextArea.slug}`}
                className="flex items-center gap-2 transition-opacity hover:opacity-100"
                style={{ color: textColor, opacity: 0.8 }}
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
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-opacity hover:opacity-100"
              style={{
                borderColor: subtleColor,
                color: textColor,
                opacity: 0.6,
              }}
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full h-px" style={{ backgroundColor: subtleColor }} />
      </div>
    </footer>
  );
}
