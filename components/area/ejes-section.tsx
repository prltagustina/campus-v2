"use client";

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
}: EjesSectionProps) {
  const currentEje = areaContent.ejes[selectedEje] || areaContent.ejes[0];
  
  const ejesInfo = ejesInfoPorArea[area.slug];
  const useInteractiveSchema = !!ejesInfo;

  const renderEnfoqueBadge = (enfoqueId: string) => {
    const enfoque = enfoquesTransversales.find(e => e.id === enfoqueId);
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

  if (useInteractiveSchema && ejesInfo) {
    return (
      <EjesSchemaInteractive
        area={area}
        ejesInfo={ejesInfo}
        activeAxis={activeAxis}
        setActiveAxis={setActiveAxis}
      />
    );
  }

  // Fallback: classic timeline view
  return (
    <>
      <section id="ejes" className="mb-16 scroll-mt-32">
        <div className="mb-4">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">EJES</span>
        </div>
        
        <div className="flex gap-3 mb-6">
          {areaContent.ejes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedEje(idx)}
              className="w-5 h-5 rounded-full transition-all"
              style={{ 
                border: `3px solid ${area.color}`,
                backgroundColor: selectedEje === idx ? area.color : 'transparent'
              }}
            />
          ))}
        </div>

        <h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-10"
          style={{ color: area.color }}
        >
          {currentEje.titulo}
        </h2>

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
                  className={`w-32 md:w-40 flex-shrink-0 pr-4 text-right py-3 transition-all ${hasContent ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                  disabled={!hasContent}
                >
                  <span 
                    className={`text-[11px] font-bold uppercase tracking-wide transition-all ${
                      hasContent 
                        ? (isExpanded ? '' : 'opacity-60') 
                        : 'text-gray-300'
                    }`}
                    style={hasContent ? { color: area.color } : undefined}
                  >
                    {grado.name}
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => hasContent && toggleGrado(grado.id)}
                  className={`relative w-1 flex-shrink-0 transition-all ${hasContent ? 'cursor-pointer' : 'cursor-default'}`}
                  disabled={!hasContent}
                >
                  <div 
                    className={`w-full h-full transition-all ${
                      hasContent 
                        ? (isExpanded ? '' : 'opacity-40') 
                        : 'bg-gray-200'
                    }`}
                    style={hasContent ? { backgroundColor: area.color } : undefined}
                  />
                </button>
                
                <div className="flex-1 pl-6 overflow-hidden">
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      hasContent && isExpanded 
                        ? 'max-h-[1000px] opacity-100 py-3' 
                        : hasContent 
                          ? 'max-h-0 opacity-0 py-0' 
                          : 'py-3'
                    }`}
                  >
                    {hasContent && isExpanded && (
                      <div className="space-y-3">
                        {contenidos.map((contenido, cIdx) => (
                          <div key={cIdx}>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                              {contenido.texto}
                            </p>
                            {contenido.enfoques && contenido.enfoques.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {contenido.enfoques.map(enfoqueId => renderEnfoqueBadge(enfoqueId))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {!hasContent && (
                      <div className="h-4" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
