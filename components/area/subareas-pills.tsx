"use client";

import type { Area } from "@/lib/areas-data";
import { subAreasPorArea } from "@/lib/constants";

interface SubareasPillsProps {
  area: Area;
  subAreas: { id: string; name: string }[];
  selectedSubarea: string | null;
  setSelectedSubarea: (id: string | null) => void;
}

export function SubareasPills({
  area,
  subAreas,
  selectedSubarea,
  setSelectedSubarea,
}: SubareasPillsProps) {
  const displaySubAreas = subAreas.length > 0 
    ? subAreas 
    : (area.slug === "educacion-artistica" ? subAreasPorArea["educacion-artistica"] || [] : []);

  if (displaySubAreas.length === 0) return null;

  const options = [{ id: area.slug, name: "Ed. Artística" }, ...displaySubAreas];
  const selectedId = selectedSubarea ?? area.slug;

  return (
    <section className="mb-12">
      <div className="flex flex-wrap gap-2.5 md:gap-5" role="tablist" aria-label="Educación Artística y sus lenguajes">
        {options.map((subarea) => (
          <button
            type="button"
            key={subarea.id}
            role="tab"
            aria-selected={selectedId === subarea.id}
            onClick={() => setSelectedSubarea(subarea.id === area.slug ? null : subarea.id)}
            className={`rounded-full border px-5 py-2.5 text-[14px] font-semibold leading-tight transition-colors ${
              selectedId === subarea.id
                ? 'border-transparent text-white'
                : 'border-[#EBEDEC] bg-white text-[#7A7A7A] hover:bg-[#EBEDEC] hover:text-[#494963]'
            }`}
            style={selectedId === subarea.id ? { backgroundColor: area.color } : undefined}
          >
            {subarea.name}
          </button>
        ))}
      </div>
    </section>
  );
}
