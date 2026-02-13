"use client";

import { areasData } from "@/lib/areas-data";

interface AreaWheelProps {
  selectedAreaId?: number | "marco-general";
  onAreaClick?: (areaId: number) => void;
  onCenterClick?: () => void;
}

// Las 9 áreas en la rueda actualizada, sentido horario desde arriba
// SVG: 0°=derecha, 90°=abajo, 180°=izquierda, 270°=arriba
// Cada sector = 40° (360°/9)
const wheelSectors = [
  { id: 6, startAngle: 250, endAngle: 290 },  // Lenguas Extranjeras (amarillo) - arriba izquierda
  { id: 0, startAngle: 290, endAngle: 330 },  // Matemática (rojo) - arriba
  { id: 1, startAngle: 330, endAngle: 370 },  // Lengua y Literatura (naranja) - arriba derecha
  { id: 2, startAngle: 10, endAngle: 50 },    // Ciencias Naturales (verde) - derecha arriba
  { id: 3, startAngle: 50, endAngle: 90 },    // Ciencias Sociales (celeste) - derecha
  { id: 8, startAngle: 90, endAngle: 130 },   // Saberes, Vidas y Mundos (violeta) - derecha abajo
  { id: 5, startAngle: 130, endAngle: 170 },  // Educación Artística (rosa) - abajo
  { id: 7, startAngle: 170, endAngle: 210 },  // Educación Tecnológica (azul) - abajo izquierda
  { id: 4, startAngle: 210, endAngle: 250 },  // Educación Física (teal) - izquierda
];

export function AreaWheel({ selectedAreaId, onAreaClick, onCenterClick }: AreaWheelProps) {
  // Crear path SVG para un sector de anillo
  const createArcPath = (
    startDeg: number,
    endDeg: number,
    innerR: number,
    outerR: number,
    cx: number,
    cy: number
  ) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    
    // Normalizar ángulos que cruzan 0/360
    let start = startDeg;
    let end = endDeg;
    if (end < start) end += 360;
    
    const startRad = toRad(start);
    const endRad = toRad(end);
    
    // Puntos externos
    const x1 = cx + outerR * Math.cos(startRad);
    const y1 = cy + outerR * Math.sin(startRad);
    const x2 = cx + outerR * Math.cos(endRad);
    const y2 = cy + outerR * Math.sin(endRad);
    
    // Puntos internos
    const x3 = cx + innerR * Math.cos(endRad);
    const y3 = cy + innerR * Math.sin(endRad);
    const x4 = cx + innerR * Math.cos(startRad);
    const y4 = cy + innerR * Math.sin(startRad);
    
    const largeArc = (end - start) > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  const handleSectorClick = (areaId: number) => {
    onAreaClick?.(areaId);
  };

  return (
    <div className="w-[320px] sm:w-[400px] lg:w-[450px] relative">
      <img
        src="/images/rueda-actualizada.png"
        alt="Rueda curricular con enfoques transversales"
        className="w-full h-auto pointer-events-none select-none"
        draggable={false}
      />
      {/* SVG overlay para interacción */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full"
      >
        {wheelSectors.map((sector) => {
          const area = areasData.find((a) => a.id === sector.id);
          const isSelected = selectedAreaId === sector.id;

          return (
            <path
              key={sector.id}
              d={createArcPath(sector.startAngle, sector.endAngle, 100, 195, 250, 250)}
              fill={isSelected ? `${area?.color}25` : "transparent"}
              stroke={isSelected ? area?.color : "transparent"}
              strokeWidth={isSelected ? 4 : 0}
              className="cursor-pointer transition-colors duration-150 hover:fill-white/20"
              onClick={() => handleSectorClick(sector.id)}
            >
              <title>{area?.name}</title>
            </path>
          );
        })}
        {/* Círculo central clickeable - Marco General */}
        <circle
          cx={250}
          cy={250}
          r={85}
          fill={selectedAreaId === "marco-general" ? "#4A4A6315" : "transparent"}
          stroke={selectedAreaId === "marco-general" ? "#4A4A63" : "transparent"}
          strokeWidth={selectedAreaId === "marco-general" ? 3 : 0}
          className="cursor-pointer hover:fill-black/5 transition-colors duration-150"
          onClick={() => onCenterClick?.()}
        >
          <title>Marco General</title>
        </circle>
      </svg>
    </div>
  );
}
