"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import type { AreaContent } from "@/lib/area-content";
import { grados, enfoquesTransversales, ENFOQUE_COLOR } from "@/lib/constants";
import { EjesSchemaInteractive } from "./ejes-schema-interactive";
import { ejesInfoPorArea } from "@/lib/ejes-info-data";

interface EjesSectionProps {
  area: Area;
  areaContent: AreaContent;
  selectedEje: number;
  setSelectedEje: (eje: number) => void;
  expandedGrados: string[];
  toggleGrado: (gradoId: string) => void;
  activeAxis: number | null;
  setActiveAxis: (idx: number | null) => void;
  /** For Ed. Artistica: selected subarea id */
  selectedSubarea?: string | null;
}

export function EjesSection({
  area,
  areaContent,
  selectedEje,
  setSelectedEje,
  expandedGrados,
  toggleGrado,
  activeAxis,
  setActiveAxis,
  selectedSubarea,
}: EjesSectionProps) {
  // For Ed. Artistica with a selected subarea, use the subarea's ejes info
  const effectiveKey = (area.slug === "educacion-artistica" && selectedSubarea)
    ? selectedSubarea
    : area.slug;
  const ejesInfo = ejesInfoPorArea[effectiveKey] || ejesInfoPorArea[area.slug];
  const useInteractiveSchema = !!ejesInfo;
  const totalEjes = areaContent.ejes.length;

  const goNext = useCallback(() => {
    setSelectedEje((selectedEje + 1) % totalEjes);
  }, [selectedEje, totalEjes, setSelectedEje]);

  const goPrev = useCallback(() => {
    setSelectedEje((selectedEje - 1 + totalEjes) % totalEjes);
  }, [selectedEje, totalEjes, setSelectedEje]);

  const currentEje = areaContent.ejes[selectedEje] || areaContent.ejes[0];

  const renderEnfoqueBadge = (enfoqueId: string) => {
    const enfoque = enfoquesTransversales.find((e) => e.id === enfoqueId);
    if (!enfoque) return null;
    return (
      <span
        key={enfoqueId}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase"
        style={{ backgroundColor: ENFOQUE_COLOR }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        {enfoque.name}
      </span>
    );
  };

  // Saberes, Vidas y Mundos: show the static home wheel instead of an ejes schema
  if (area.slug === "saberes-vidas-y-mundos") {
    return (
      <section id="ejes" className="scroll-mt-24">
        <div className="w-full mx-auto flex flex-col items-center" style={{ maxWidth: 420 }}>
          <Image
            src="/images/rueda-actualizada.png"
            alt="Rueda curricular - Saberes, Vidas y Mundos"
            width={520}
            height={520}
            className="w-full h-auto block"
          />
          <p className="mt-6 text-sm text-center text-[#494963]/60 leading-relaxed max-w-md">
            {"Saberes, Vidas y Mundos es un espacio curricular que integra contenidos de todas las \u00e1reas del dise\u00f1o curricular."}
          </p>
        </div>
      </section>
    );
  }

  if (useInteractiveSchema && ejesInfo) {
    return (
      <EjesSchemaInteractive
        area={area}
        ejesInfo={ejesInfo}
        activeAxis={activeAxis}
        setActiveAxis={setActiveAxis}
        svgConfigKey={effectiveKey !== area.slug ? effectiveKey : undefined}
      />
    );
  }

  // Carousel view for "Que ensenar"
  return (
    <section id="ejes" className="scroll-mt-32">
      {/* Carousel header with navigation */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-balance font-display"
            style={{ color: "#494963" }}
          >
            {currentEje.titulo}
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105"
            style={{ borderColor: area.color, color: area.color }}
            aria-label="Eje anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {areaContent.ejes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedEje(idx)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  backgroundColor:
                    selectedEje === idx ? area.color : "#d1d5db",
                  transform: selectedEje === idx ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Ir al eje ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 text-white"
            style={{ backgroundColor: area.color }}
            aria-label="Siguiente eje"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Eje counter */}
      <p className="text-sm text-[#494963]/40 font-medium mb-8">
        Eje {selectedEje + 1} de {totalEjes}
      </p>

      {/* Content - grados timeline with no divider lines */}
      <div className="relative">
        {grados.map((grado) => {
          const contenidos = currentEje.contenidos[grado.id];
          const hasContent = contenidos && contenidos.length > 0;
          const isExpanded = expandedGrados.includes(grado.id);

          return (
            <div key={grado.id} className="flex">
              <button
                type="button"
                onClick={() => hasContent && toggleGrado(grado.id)}
                className={`w-32 md:w-40 flex-shrink-0 pr-4 text-right py-3 transition-all ${
                  hasContent
                    ? "cursor-pointer hover:opacity-80"
                    : "cursor-default"
                }`}
                disabled={!hasContent}
              >
                <span
                  className={`text-[11px] font-bold uppercase tracking-wide transition-all ${
                    hasContent
                      ? isExpanded
                        ? ""
                        : "opacity-60"
                      : "text-gray-300"
                  }`}
                  style={hasContent ? { color: area.color } : undefined}
                >
                  {grado.name}
                </span>
              </button>

              <button
                type="button"
                onClick={() => hasContent && toggleGrado(grado.id)}
                className={`relative w-1 flex-shrink-0 transition-all ${
                  hasContent ? "cursor-pointer" : "cursor-default"
                }`}
                disabled={!hasContent}
              >
                <div
                  className={`w-full h-full transition-all ${
                    hasContent
                      ? isExpanded
                        ? ""
                        : "opacity-40"
                      : "bg-gray-200"
                  }`}
                  style={
                    hasContent ? { backgroundColor: area.color } : undefined
                  }
                />
              </button>

              <div className="flex-1 pl-6 overflow-hidden">
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    hasContent && isExpanded
                      ? "max-h-[1000px] opacity-100 py-3"
                      : hasContent
                        ? "max-h-0 opacity-0 py-0"
                        : "py-3"
                  }`}
                >
                  {hasContent && isExpanded && (
                    <div className="space-y-3">
                      {contenidos.map((contenido, cIdx) => (
                        <div key={cIdx}>
                          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            {contenido.texto}
                          </p>
                          {contenido.enfoques &&
                            contenido.enfoques.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {contenido.enfoques.map((enfoqueId) =>
                                  renderEnfoqueBadge(enfoqueId)
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                  {!hasContent && <div className="h-4" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
