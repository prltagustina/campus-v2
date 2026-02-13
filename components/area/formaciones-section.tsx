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
      <div className="mb-8">
        <h3
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "#494963" }}
        >
          Formaciones Docentes
        </h3>
        <div
          className="mt-2 h-[2px] w-10 rounded-full"
          style={{ backgroundColor: area.color }}
        />
      </div>

      {/* Formation cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all group bg-white"
          >
            {/* Header */}
            <div
              className="p-5 text-white"
              style={{ backgroundColor: area.color }}
            >
              <h4 className="text-sm font-bold leading-snug mb-2 pr-6">
                Afectividad y emociones en la escuela. Fortaleciendo los
                vinculos desde la ESI - C{i}
              </h4>
              <p className="text-[11px] opacity-75 font-medium">
                Comunidades de Aprendizajes
              </p>
            </div>

            {/* Details */}
            <div className="p-5 space-y-2.5">
              {[
                { icon: Monitor, text: "Virtual asincronico" },
                { icon: Clock, text: "3 Encuentros" },
                { icon: Users, text: "Docentes" },
                { icon: MapPin, text: "Plataforma Educativa" },
                { icon: Bookmark, text: "Nivel: Todos" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-[13px] text-gray-600"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-50 px-5 py-3">
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

      {/* Mobile area navigation */}
      <div className="lg:hidden mt-12 flex items-center justify-between border-t border-gray-100 pt-6">
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
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
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
