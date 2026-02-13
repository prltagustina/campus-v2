"use client";

import Link from "next/link";
import { Home, Bookmark, Monitor, Clock, Users, MapPin } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface FormacionesSectionProps {
  area: Area;
  prevArea: Area | null;
  nextArea: Area | null;
}

export function FormacionesSection({
  area,
  prevArea,
  nextArea,
}: FormacionesSectionProps) {
  return (
    <section id="formacion" className="pb-24 lg:pb-0 scroll-mt-32">
      {/* Section header -- centered, stronger hierarchy */}
      <div className="flex flex-col items-center text-center mb-14 md:mb-20">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: area.color }}
        >
          Capacitaciones
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963]">
          Formaciones Docentes
        </h3>
      </div>

      {/* Formation cards -- larger with more whitespace */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group bg-white"
          >
            {/* Header */}
            <div
              className="p-6 md:p-7 text-white"
              style={{ backgroundColor: area.color }}
            >
              <h4 className="text-sm md:text-base font-bold leading-snug mb-3 pr-4">
                Afectividad y emociones en la escuela. Fortaleciendo los
                vinculos desde la ESI - C{i}
              </h4>
              <p className="text-[11px] opacity-75 font-medium">
                Comunidades de Aprendizajes
              </p>
            </div>

            {/* Details */}
            <div className="p-6 md:p-7 space-y-3">
              {[
                { icon: Monitor, text: "Virtual asincronico" },
                { icon: Clock, text: "3 Encuentros" },
                { icon: Users, text: "Docentes" },
                { icon: MapPin, text: "Plataforma Educativa" },
                { icon: Bookmark, text: "Nivel: Todos" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-[13px] text-gray-600"
                >
                  <Icon className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-50 px-6 md:px-7 py-4">
              <a
                href="#"
                className="text-xs font-bold transition-colors hover:underline"
                style={{ color: area.color }}
              >
                + Info
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile area navigation -- improved spacing */}
      <div className="lg:hidden mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
        {prevArea ? (
          <Link
            href={`/area/${prevArea.slug}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="truncate max-w-[120px]">{prevArea.name}</span>
          </Link>
        ) : (
          <div />
        )}
        <Link
          href="/"
          className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <Home className="w-4 h-4" />
        </Link>
        {nextArea ? (
          <Link
            href={`/area/${nextArea.slug}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <span className="truncate max-w-[120px]">{nextArea.name}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
