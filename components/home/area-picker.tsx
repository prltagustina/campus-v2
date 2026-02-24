"use client";

import Link from "next/link";
import { type Area } from "@/lib/areas-data";

interface AreaPickerProps {
  areasOrder: number[];
  selectedAreaId: number | "marco-general";
  selectedArea: Area | null;
  onAreaClick: (areaId: number | "marco-general") => void;
  onAreaDoubleClick: (areaId: number | "marco-general") => void;
}

const MARCO_GENERAL_COLOR = "#4A4A63";

export function AreaPicker({ 
  selectedAreaId,
  selectedArea, 
}: AreaPickerProps) {
  const isMarcoGeneral = selectedAreaId === "marco-general";
  const displayColor = isMarcoGeneral ? MARCO_GENERAL_COLOR : selectedArea?.color;
  const displayName = isMarcoGeneral ? "Marco General" : selectedArea?.name;
  const displaySlug = isMarcoGeneral ? "marco-general" : selectedArea?.slug;

  return (
    <div className="w-full max-w-[420px] lg:max-w-none lg:pt-8">
      {/* Titulo */}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black transition-all duration-300 mb-7 font-display"
        style={{ color: displayColor }}
      >
        {displayName}
      </h2>
      
      {/* Ejes del area seleccionada (solo si no es Marco General) */}
      {!isMarcoGeneral && selectedArea?.axes && selectedArea.axes.length > 0 && (
        <>
          <h3 
            className="text-base lg:text-lg font-semibold mb-5"
            style={{ color: "#494963" }}
          >
            Ejes de contenidos:
          </h3>
          <div className="space-y-3.5 mb-9">
            {selectedArea.axes.map((eje, ejeIndex) => (
              <div key={ejeIndex} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex-shrink-0 mt-0.5"
                  style={{ 
                    border: `3px solid ${displayColor}`,
                    backgroundColor: 'transparent'
                  }}
                />
                <span 
                  className="text-base lg:text-lg leading-relaxed"
                  style={{ color: displayColor }}
                >
                  {eje}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Botón ver más */}
      <Link
        href={isMarcoGeneral ? "/marco-general" : `/area/${displaySlug}`}
        className="inline-block px-10 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:brightness-110"
        style={{ backgroundColor: displayColor, color: isMarcoGeneral ? "#ffffff" : selectedArea?.textOnColor || "#ffffff" }}
      >
        Ver más
      </Link>
    </div>
  );
}
