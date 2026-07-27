"use client";

import { ArrowUpRight, BookOpen, Monitor } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface FormacionesSectionProps {
  area: Area;
  artisticLanguage?: string;
}

export function FormacionesSection({ area, artisticLanguage }: FormacionesSectionProps) {
  const normalizedLanguage = artisticLanguage?.toLocaleLowerCase("es");
  const items = (area.teacherTrainings ?? []).flatMap((group) =>
    (group.items ?? [])
      .filter((item) => !normalizedLanguage || item.name.toLocaleLowerCase("es").includes(normalizedLanguage))
      .map((item) => ({ ...item, group: group.name })),
  );
  const contextName = artisticLanguage ?? area.name;

  return (
    <section id="formacion" className="scroll-mt-32">
      <div className="flex flex-col items-center text-center mb-14 md:mb-20">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963] font-display">
          Formaciones Docentes
        </h3>
        <p className="mt-3 text-[#494963]/50">Cursos y trayectos vinculados con {contextName}.</p>
      </div>

      {items.length ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group bg-white"
          >
            <div
              className="p-6 md:p-7"
              style={{ backgroundColor: area.color, color: area.textOnColor }}
            >
              <h4 className="text-sm md:text-base font-bold leading-snug mb-3 pr-4">
                {item.name}
              </h4>
              <p className="text-[11px] font-medium" style={{ opacity: 0.75 }}>
                {item.group}
              </p>
            </div>
            <div className="p-6 md:p-7 space-y-3 text-[13px] text-gray-600">
              <p className="flex items-center gap-3"><Monitor className="w-4 h-4 text-gray-300" />Campus Educativo</p>
              <p className="flex items-center gap-3"><BookOpen className="w-4 h-4 text-gray-300" />Formación docente</p>
              {item.url ? <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 pt-3 text-xs font-bold" style={{ color: area.color }}>+ Info <ArrowUpRight className="h-3.5 w-3.5" /></a> : <p className="pt-3 text-xs text-gray-400">Próximamente</p>}
            </div>
          </div>
        ))}
      </div> : null}
    </section>
  );
}
