"use client";

import { areasData } from "@/lib/areas-data";

interface AreaDotsNavProps {
  areasOrder: number[];
  selectedAreaId: number | "marco-general";
  onAreaClick: (areaId: number | "marco-general") => void;
  onAreaDoubleClick: (areaId: number | "marco-general") => void;
}

const MARCO_GENERAL_COLOR = "#4A4A63";

export function AreaDotsNav({
  areasOrder,
  selectedAreaId,
  onAreaClick,
  onAreaDoubleClick,
}: AreaDotsNavProps) {
  const isMarcoSelected = selectedAreaId === "marco-general";

  return (
    <nav className="flex flex-col items-start pt-8" style={{ gap: 0 }}>
      {areasOrder.map((areaId) => {
        const area = areasData.find((a) => a.id === areaId);
        const isSelected = selectedAreaId === areaId;
        return (
          <button
            key={areaId}
            type="button"
            onClick={() => onAreaClick(areaId)}
            onDoubleClick={() => onAreaDoubleClick(areaId)}
            className="flex items-center gap-3 py-[9px] px-1 group w-full text-left transition-all duration-200"
          >
            <div
              className={`rounded-full flex-shrink-0 transition-all duration-300 ${
                isSelected ? "w-4 h-4" : "w-3 h-3 group-hover:scale-125"
              }`}
              style={{
                backgroundColor: isSelected ? area?.color : "#ccc",
                boxShadow: isSelected
                  ? `0 0 0 2px white, 0 0 0 3.5px ${area?.color}`
                  : "none",
              }}
            />
            <span
              className={`text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 leading-none ${
                isSelected
                  ? "font-bold"
                  : "font-medium text-gray-300 group-hover:text-gray-400"
              }`}
              style={{
                color: isSelected ? area?.color : undefined,
              }}
            >
              {area?.name}
            </span>
          </button>
        );
      })}

      {/* Separator */}
      <div className="w-full h-px bg-[#494963]/10 my-1.5" />

      {/* Marco General */}
      <button
        type="button"
        onClick={() => onAreaClick("marco-general")}
        onDoubleClick={() => onAreaDoubleClick("marco-general")}
        className="flex items-center gap-3 py-[9px] px-1 group w-full text-left transition-all duration-200"
      >
        <div
          className={`rounded-full flex-shrink-0 transition-all duration-300 ${
            isMarcoSelected ? "w-4 h-4" : "w-3 h-3 group-hover:scale-125"
          }`}
          style={{
            backgroundColor: isMarcoSelected ? MARCO_GENERAL_COLOR : "#ccc",
            boxShadow: isMarcoSelected
              ? `0 0 0 2px white, 0 0 0 3.5px ${MARCO_GENERAL_COLOR}`
              : "none",
          }}
        />
        <span
          className={`text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 leading-none ${
            isMarcoSelected
              ? "font-bold"
              : "font-medium text-gray-300 group-hover:text-gray-400"
          }`}
          style={{
            color: isMarcoSelected ? MARCO_GENERAL_COLOR : undefined,
          }}
        >
          Marco General
        </span>
      </button>
    </nav>
  );
}
