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

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3">
        {displaySubAreas.map((subarea) => (
          <button
            type="button"
            key={subarea.id}
            onClick={() => setSelectedSubarea(subarea.id === selectedSubarea ? null : subarea.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedSubarea === subarea.id
                ? 'text-white border-transparent shadow-md'
                : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
            }`}
            style={selectedSubarea === subarea.id ? { backgroundColor: area.color } : undefined}
          >
            {subarea.name}
          </button>
        ))}
      </div>
    </div>
  );
}
