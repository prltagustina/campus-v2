"use client";

import { useEffect, useRef } from "react";
import type { Area } from "@/lib/areas-data";

export interface EjeInfo {
  titulo: string;
  descripcion: string;
}

interface EjesSchemaInteractiveProps {
  area: Area;
  ejesInfo: EjeInfo[];
  activeAxis: number | null;
  setActiveAxis: (idx: number | null) => void;
}

/* === SVG Constants from the original reference design === */
const VB_W = 765.09;
const VB_H = 480;
const CX = 293.18;
const CY = 240;
const ORBIT_R = 160.83;
const CENTER_R = 112.51;
const NODE_R = 12;
const NODE_R_ACTIVE = 14;

/* === Exact 5-node coordinates from reference SVG === */
const COORDS_5 = [
  { x: 342.94, y: 87.01 },   // 0: Oralidad (top-right)
  { x: 163.08, y: 145.45 },  // 1: Literatura (left-upper)
  { x: 163.08, y: 334.55 },  // 2: Escritura (left-lower)
  { x: 342.94, y: 392.99 },  // 3: Lectura (bottom-right)
  { x: 454.03, y: 240 },     // 4: Reflexion (right-center)
];

/* === Exact petal arc paths from reference SVG === */
const PETALS_5 = [
  "M341.81,87.96c-18.41-22.89-46.64-37.54-78.3-37.54-53.58,0-97.35,41.96-100.27,94.81",
  "M454.12,239.88c10.63-15.93,16.84-35.08,16.84-55.67,0-55.46-44.96-100.43-100.43-100.43-9.98,0-19.62,1.46-28.72,4.18",
  "M341.96,391.85c9.06,2.68,18.64,4.13,28.57,4.13,55.46,0,100.43-44.96,100.43-100.43,0-20.59-6.2-39.74-16.84-55.67",
  "M163.24,334.78c2.91,52.85,46.69,94.81,100.27,94.81,31.75,0,60.05-14.74,78.45-37.74",
  "M163.24,145.22c-39.12,13.73-67.16,50.97-67.16,94.78s28.05,81.05,67.16,94.78",
];

/* === Exact label positions from user's reference code === */
function getLabel5(i: number, c: { x: number; y: number }) {
  // From the original: x offset, y offset, textAnchor
  const dx = i === 4 ? 20 : i === 0 ? 22 : i === 3 ? 22 : -20;
  const dy = i === 4 ? 0 : i === 1 ? 5 : i === 2 ? 10 : i === 3 ? 15 : -7;
  const anchor = i === 1 || i === 2 ? "end" : "start";
  return { x: c.x + dx, y: c.y + dy, anchor };
}

/* === Dynamic N-node support for 3 and 4 node areas === */
function polarToXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function getCoordsN(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const angle = -90 + (360 / n) * i;
    return polarToXY(angle, ORBIT_R);
  });
}

function getPetalsN(coords: { x: number; y: number }[], n: number) {
  return coords.map((p1, i) => {
    const p2 = coords[(i + 1) % n];
    const arcR = ORBIT_R + (i % 2 === 0 ? 40 : -20);
    const angle1 = Math.atan2(p1.y - CY, p1.x - CX);
    const angle2 = Math.atan2(p2.y - CY, p2.x - CX);
    let diff = angle2 - angle1;
    if (diff < 0) diff += 2 * Math.PI;
    const largeArc = diff > Math.PI ? 1 : 0;
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${arcR.toFixed(2)} ${arcR.toFixed(2)} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  });
}

function getLabelN(i: number, c: { x: number; y: number }) {
  const angle = Math.atan2(c.y - CY, c.x - CX) * (180 / Math.PI);
  const norm = ((angle % 360) + 360) % 360;
  if (norm >= 315 || norm < 45) return { x: c.x + 20, y: c.y + 5, anchor: "start" };
  if (norm >= 45 && norm < 135) return { x: c.x, y: c.y + 24, anchor: "middle" };
  if (norm >= 135 && norm < 225) return { x: c.x - 20, y: c.y + 5, anchor: "end" };
  return { x: c.x, y: c.y - 16, anchor: "middle" };
}

/* === Color helpers === */
function darken(hex: string, f: number) {
  const c = hex.replace("#", "");
  const r = Math.max(0, Math.floor(parseInt(c.substring(0, 2), 16) * f));
  const g = Math.max(0, Math.floor(parseInt(c.substring(2, 4), 16) * f));
  const b = Math.max(0, Math.floor(parseInt(c.substring(4, 6), 16) * f));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function splitText(text: string, max: number): string[] {
  if (text.length <= max) return [text];
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur && cur.length + w.length + 1 > max) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? `${cur} ${w}` : w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

export function EjesSchemaInteractive({
  area,
  ejesInfo,
  activeAxis,
  setActiveAxis,
}: EjesSchemaInteractiveProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveAxis(null);
  }, [area.id, setActiveAxis]);

  const n = ejesInfo.length;
  const is5 = n === 5;
  const coords = is5 ? COORDS_5 : getCoordsN(n);
  const petals = is5 ? PETALS_5 : getPetalsN(coords, n);
  const darkColor = darken(area.color, 0.45);

  // Center text lines -- special case for multi-word area names
  let centerDark: string[] = [];
  if (area.slug === "lenguas-extranjeras") {
    centerDark = ["en Lenguas", "Extranjeras"];
  } else if (area.slug === "lengua-y-literatura") {
    centerDark = ["en Lengua y", "Literatura"];
  } else if (area.slug === "ciencias-naturales") {
    centerDark = ["en Ciencias", "Naturales"];
  } else if (area.slug === "ciencias-sociales") {
    centerDark = ["en Ciencias", "Sociales"];
  } else if (area.slug === "educacion-fisica") {
    centerDark = ["en Educación", "Física"];
  } else if (area.slug === "educacion-artistica") {
    centerDark = ["en Educación", "Artística"];
  } else if (area.slug === "educacion-tecnologica") {
    centerDark = ["en Educación", "Tecnológica"];
  } else if (area.slug === "saberes-vidas-y-mundos") {
    centerDark = ["en Saberes,", "Vidas y Mundos"];
  } else {
    centerDark = [`en ${area.name}`];
  }

  const toggle = (i: number) => setActiveAxis(activeAxis === i ? null : i);

  return (
    <section id="ejes" className="scroll-mt-24">
      {/* SVG diagram -- centered on screen */}
      <div className="w-full mx-auto flex flex-col items-center" style={{ maxWidth: 740 }}>
        <svg
          viewBox="60 30 660 420"
          className="w-full h-auto block sm:hidden"
          style={{ overflow: "visible" }}
          role="img"
          aria-label={`Esquema de ejes de contenido de ${area.name}`}
        >
          <defs>
            <marker
              id={`arrow-${area.slug}-m`}
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#494963" />
            </marker>
          </defs>
          <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="#494963" strokeWidth={1.2} strokeDasharray="6" />
          {petals.map((d, i) => (
            <path key={`petal-m-${i}`} d={d} fill="none" stroke="#494963" strokeWidth={1.2} strokeDasharray="6" markerStart={`url(#arrow-${area.slug}-m)`} markerEnd={`url(#arrow-${area.slug}-m)`} />
          ))}
          <circle cx={CX} cy={CY} r={CENTER_R} fill={area.color} />
          {(() => {
            const whiteLines = ["Ejes de", "contenido"];
            const allLines = [...whiteLines, ...centerDark];
            const lh = 24;
            const startY = CY - ((allLines.length - 1) * lh) / 2;
            return (
              <>
                {whiteLines.map((l, li) => (
                  <text key={`cwm-${li}`} x={CX} y={startY + li * lh} textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none">{l}</text>
                ))}
                {centerDark.map((l, li) => (
                  <text key={`cdm-${li}`} x={CX} y={startY + (whiteLines.length + li) * lh} textAnchor="middle" fill={darkColor} fontSize="20" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none">{l}</text>
                ))}
              </>
            );
          })()}
          {coords.map((c, i) => {
            const isActive = activeAxis === i;
            const isDimmed = activeAxis !== null && activeAxis !== i;
            const titulo = ejesInfo[i]?.titulo || `Eje ${i + 1}`;
            const lbl = is5 ? getLabel5(i, c) : getLabelN(i, c);
            const isMulti = titulo.length > 18;
            const lines = isMulti ? splitText(titulo, 18) : [titulo];
            const fontSize = isMulti ? 18 : 24;
            return (
              <g key={`node-m-${i}`} className="cursor-pointer outline-none" onClick={() => toggle(i)} role="button" tabIndex={0} aria-label={titulo} style={{ outline: "none" }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } }}>
                <circle cx={c.x} cy={c.y} r={isActive ? NODE_R_ACTIVE : NODE_R} fill={isActive ? area.color : isDimmed ? "#e0e0e0" : "white"} stroke={isActive ? area.color : isDimmed ? "#999999" : area.color} strokeWidth={5} style={{ transition: "all 0.4s" }} />
                {lines.map((line, li) => (
                  <text key={`label-m-${i}-${li}`} x={lbl.x} y={lbl.y + li * (fontSize + 2)} textAnchor={lbl.anchor} fill={isDimmed ? "#777777" : area.color} fontSize={fontSize} fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none" style={{ transition: "fill 0.4s" }}>{line}</text>
                ))}
              </g>
            );
          })}
        </svg>

        {/* Desktop SVG -- wider viewBox */}
        <svg
          viewBox="0 0 780 480"
          className="w-full h-auto hidden sm:block"
          style={{ overflow: "visible" }}
          role="img"
          aria-label={`Esquema de ejes de contenido de ${area.name}`}
        >
          <defs>
            <marker
              id={`arrow-${area.slug}`}
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#494963" />
            </marker>
          </defs>

          {/* Dashed orbit circle */}
          <circle
            cx={CX} cy={CY} r={ORBIT_R}
            fill="none" stroke="#494963"
            strokeWidth={1.2} strokeDasharray="6"
          />

          {/* Petal arcs with arrow markers */}
          {petals.map((d, i) => (
            <path
              key={`petal-${i}`}
              d={d}
              fill="none" stroke="#494963"
              strokeWidth={1.2} strokeDasharray="6"
              markerStart={`url(#arrow-${area.slug})`}
              markerEnd={`url(#arrow-${area.slug})`}
            />
          ))}

          {/* Center filled circle */}
          <circle cx={CX} cy={CY} r={CENTER_R} fill={area.color} />

          {/* Center text */}
          {(() => {
            const whiteLines = ["Ejes de", "contenido"]; // displayed in white on the colored circle
            const allLines = [...whiteLines, ...centerDark];
            const lh = 24;
            const startY = CY - ((allLines.length - 1) * lh) / 2;
            return (
              <>
                {whiteLines.map((l, li) => (
                  <text
                    key={`cw-${li}`}
                    x={CX} y={startY + li * lh}
                    textAnchor="middle" fill="#ffffff"
                    fontSize="20" fontWeight="700"
                    fontFamily="Inter, system-ui, sans-serif"
                    className="pointer-events-none select-none"
                  >{l}</text>
                ))}
                {centerDark.map((l, li) => (
                  <text
                    key={`cd-${li}`}
                    x={CX} y={startY + (whiteLines.length + li) * lh}
                    textAnchor="middle" fill={darkColor}
                    fontSize="20" fontWeight="700"
                    fontFamily="Inter, system-ui, sans-serif"
                    className="pointer-events-none select-none"
                  >{l}</text>
                ))}
              </>
            );
          })()}

          {/* Interactive nodes + labels */}
          {coords.map((c, i) => {
            const isActive = activeAxis === i;
            const isDimmed = activeAxis !== null && activeAxis !== i;
            const titulo = ejesInfo[i]?.titulo || `Eje ${i + 1}`;
            const lbl = is5 ? getLabel5(i, c) : getLabelN(i, c);
            const isMulti = titulo.length > 18;
            const lines = isMulti ? splitText(titulo, 18) : [titulo];
            const fontSize = isMulti ? 18 : 24;

            return (
              <g
                key={`node-${i}`}
                className="cursor-pointer outline-none"
                onClick={() => toggle(i)}
                role="button"
                tabIndex={0}
                aria-label={titulo}
                style={{ outline: "none" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
              >
                <circle
                  cx={c.x} cy={c.y}
                  r={isActive ? NODE_R_ACTIVE : NODE_R}
                  fill={isActive ? area.color : isDimmed ? "#e0e0e0" : "white"}
                  stroke={isActive ? area.color : isDimmed ? "#999999" : area.color}
                  strokeWidth={5}
                  style={{ transition: "all 0.4s" }}
                />
                {lines.map((line, li) => (
                  <text
                    key={`label-${i}-${li}`}
                    x={lbl.x}
                    y={lbl.y + li * (fontSize + 2)}
                    textAnchor={lbl.anchor}
                    fill={isDimmed ? "#777777" : area.color}
                    fontSize={fontSize}
                    fontWeight="700"
                    fontFamily="Inter, system-ui, sans-serif"
                    className="pointer-events-none select-none"
                    style={{ transition: "fill 0.4s" }}
                  >{line}</text>
                ))}
              </g>
            );
          })}
        </svg>

        {/* Subtle hint below diagram */}
        {activeAxis === null && (
          <p
            className="mt-4 text-sm font-medium text-[#494963]/70 text-center pointer-events-none select-none"
            style={{ animation: "hintPulse 3s ease-in-out infinite" }}
          >
            {"Toc\u00e1 un eje para ver su descripci\u00f3n"}
          </p>
        )}
      </div>

      {/* Spacer between SVG and info panel */}
      <div className="h-5 sm:h-8" />

      {/* Info panel -- slides open/closed with max-height */}
      <div
        ref={panelRef}
        className="w-full relative overflow-hidden mx-auto"
        style={{
          maxWidth: 740,
          maxHeight: activeAxis !== null ? 350 : 0,
          opacity: activeAxis !== null ? 1 : 0,
          padding: activeAxis !== null ? "30px 24px" : "0 24px",
          borderTop: activeAxis !== null ? `2px solid ${area.color}` : "2px solid transparent",
          backgroundColor: "#f4f5f7",
          transition: "all 0.5s ease-in-out",
        }}
      >
        {/* Arrow-up caret with colored border */}
        <div
          className="absolute w-0 h-0"
          style={{
            top: -14, left: 45,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: `12px solid ${area.color}`,
          }}
        />
        <div
          className="absolute w-0 h-0"
          style={{
            top: -12, left: 45,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "12px solid #f4f5f7",
            zIndex: 1,
          }}
        />

        {activeAxis !== null && ejesInfo[activeAxis] && (
          <div>
            <h2
              className="text-xl md:text-2xl font-bold mb-2 leading-snug"
              style={{ color: area.color }}
            >
              {ejesInfo[activeAxis].titulo}
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold" style={{ fontFamily: "'Inter Tight', Inter, sans-serif" }}>
              {ejesInfo[activeAxis].descripcion}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {"Descarg\u00e1 el documento completo para "}
              <a href="#descarga" className="font-bold hover:underline" style={{ color: area.color }}>
                ver m{"\u00e1"}s
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
