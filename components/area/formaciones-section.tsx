"use client";

import { Bookmark, Monitor, Clock, Users, MapPin } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface FormacionesSectionProps {
  area: Area;
}

export function FormacionesSection({ area }: FormacionesSectionProps) {
  return (
    <section id="formacion" className="scroll-mt-32">
      {/* Section header -- centered, stronger hierarchy */}
      <div className="flex flex-col items-center text-center mb-14 md:mb-20">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963] font-display">
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
              className="p-6 md:p-7"
              style={{ backgroundColor: area.color, color: area.textOnColor }}
            >
              <h4 className="text-sm md:text-base font-bold leading-snug mb-3 pr-4">
                Afectividad y emociones en la escuela. Fortaleciendo los
                vinculos desde la ESI - C{i}
              </h4>
              <p className="text-[11px] font-medium" style={{ opacity: 0.75 }}>
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

    </section>
  );
}
