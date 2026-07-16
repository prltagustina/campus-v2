"use client";

import { useEffect, useRef } from "react";
import type { Area } from "@/lib/areas-data";
import { ejesSvgConfigs, type EjeSvgConfig } from "@/lib/ejes-svg-data";

export interface EjeInfo {
  titulo: string;
  descripcion: string;
}

interface EjesSchemaInteractiveProps {
  area: Area;
  ejesInfo: EjeInfo[];
  activeAxis: number | null;
  setActiveAxis: (idx: number | null) => void;
  /** Optional override for the SVG config key (used for subareas) */
  svgConfigKey?: string;
}

/* ====================================================================
 * Fallback constants for 5-node areas (Lengua, Lenguas Extranjeras)
 * that don't have extracted SVG data yet
 * ==================================================================== */
const VB_W = 765.09;
const VB_H = 480;
const CX = 293.18;
const CY = 240;
const ORBIT_R = 160.83;
const CENTER_R = 112.51;
const NODE_R = 12;
const NODE_R_ACTIVE = 14;

const COORDS_5 = [
  { x: 342.94, y: 87.01 },
  { x: 163.08, y: 145.45 },
  { x: 163.08, y: 334.55 },
  { x: 342.94, y: 392.99 },
  { x: 454.03, y: 240 },
];

const PETALS_5 = [
  "M341.81,87.96c-18.41-22.89-46.64-37.54-78.3-37.54-53.58,0-97.35,41.96-100.27,94.81",
  "M454.12,239.88c10.63-15.93,16.84-35.08,16.84-55.67,0-55.46-44.96-100.43-100.43-100.43-9.98,0-19.62,1.46-28.72,4.18",
  "M341.96,391.85c9.06,2.68,18.64,4.13,28.57,4.13,55.46,0,100.43-44.96,100.43-100.43,0-20.59-6.2-39.74-16.84-55.67",
  "M163.24,334.78c2.91,52.85,46.69,94.81,100.27,94.81,31.75,0,60.05-14.74,78.45-37.74",
  "M163.24,145.22c-39.12,13.73-67.16,50.97-67.16,94.78s28.05,81.05,67.16,94.78",
];

function getLabel5(i: number, c: { x: number; y: number }) {
  const dx = i === 4 ? 20 : i === 0 ? 22 : i === 3 ? 22 : -20;
  const dy = i === 4 ? 0 : i === 1 ? 5 : i === 2 ? 10 : i === 3 ? 15 : -7;
  const anchor: "end" | "start" = i === 1 || i === 2 ? "end" : "start";
  return { x: c.x + dx, y: c.y + dy, anchor };
}

/* ====================================================================
 * Color helpers
 * ==================================================================== */
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

function getCenterDarkLines(slug: string, name: string): string[] {
  const map: Record<string, string[]> = {
    "lenguas-extranjeras": ["en Lenguas", "Extranjeras"],
    "lengua-y-literatura": ["en Lengua y", "Literatura"],
    "ciencias-naturales": ["en Ciencias", "Naturales"],
    "ciencias-sociales": ["en Ciencias", "Sociales"],
    "educacion-fisica": ["en Educaci\u00f3n", "F\u00edsica"],
    "educacion-artistica": ["en Educaci\u00f3n", "Art\u00edstica"],
    "educacion-tecnologica": ["en Educaci\u00f3n", "Tecnol\u00f3gica"],
    "saberes-vidas-y-mundos": ["en Saberes,", "Vidas y Mundos"],
    "artes-visuales": ["en Artes", "Visuales"],
    "musica": ["en", "M\u00fasica"],
    "artes-audiovisuales": ["en Artes", "Audiovisuales"],
    "teatro": ["en", "Teatro"],
    "danza": ["en", "Danza"],
  };
  return map[slug] || [`en ${name}`];
}

/* ====================================================================
 * SVG-config based renderer (for areas with extracted SVG data)
 * ==================================================================== */
function SvgConfigRenderer({
  cfg,
  ejesInfo,
  activeAxis,
  toggle,
  area,
  centerDark,
  configKey,
}: {
  cfg: EjeSvgConfig;
  ejesInfo: EjeInfo[];
  activeAxis: number | null;
  toggle: (i: number) => void;
  area: Area;
  centerDark: string[];
  configKey: string;
}) {
  const darkColor = cfg.darkTextColor;
  const whiteLines = ["Ejes de", "contenido"];

  // Calculate center text positioning
  const allCenterLines = [...whiteLines, ...centerDark];
  const centerLh = 18;
  const centerStartY = cfg.center.cy - ((allCenterLines.length - 1) * centerLh) / 2;

  // Font size for center text scales with center radius
  const centerFontSize = Math.min(14.5, cfg.center.r * 0.18);

  return (
    <svg
      viewBox={cfg.viewBox}
      className="w-full h-auto block"
      style={{ overflow: "visible" }}
      role="img"
      aria-label={`Esquema de ejes de contenido de ${area.name}`}
    >
      <defs>
        <marker
          id={`arrow-${configKey}`}
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
        cx={cfg.orbit.cx}
        cy={cfg.orbit.cy}
        r={cfg.orbit.r}
        fill="none"
        stroke="#4b4a63"
        strokeWidth={0.65}
        strokeDasharray="4.5"
        strokeMiterlimit={10}
      />

      {/* Arc paths (dashed connectors between nodes) */}
      {cfg.arcs.map((d, i) => (
        <path
          key={`arc-${i}`}
          d={d}
          fill="none"
          stroke="#4b4a63"
          strokeWidth={0.65}
          strokeDasharray="4.5"
          strokeMiterlimit={10}
        />
      ))}

      {/* Center filled circle */}
      <circle
        cx={cfg.center.cx}
        cy={cfg.center.cy}
        r={cfg.center.r}
        fill={cfg.centerFill}
      />

      {/* Center text */}
      {whiteLines.map((l, li) => (
        <text
          key={`cw-${li}`}
          x={cfg.center.cx}
          y={centerStartY + li * centerLh}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={centerFontSize}
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
          className="pointer-events-none select-none"
        >
          {l}
        </text>
      ))}
      {centerDark.map((l, li) => (
        <text
          key={`cd-${li}`}
          x={cfg.center.cx}
          y={centerStartY + (whiteLines.length + li) * centerLh}
          textAnchor="middle"
          fill={darkColor}
          fontSize={centerFontSize}
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
          className="pointer-events-none select-none"
        >
          {l}
        </text>
      ))}

      {/* Eje label texts (positioned from original SVG) */}
      {cfg.labels.map((label, i) => {
        const isDimmed = activeAxis !== null && activeAxis !== i;
        // Use a font size proportional to the lineHeight from the original SVG
        // Original SVGs use ~17px for tight labels and ~22px for spacious ones
        const labelFontSize = Math.min(label.lineHeight * 0.82, 17);
        return (
          <text
            key={`label-${i}`}
            transform={`translate(${label.x} ${label.y})`}
            fill={isDimmed ? "#aaaaaa" : cfg.labelColor}
            fontSize={labelFontSize}
            fontFamily="'Inter Tight', Inter, sans-serif"
            fontWeight="400"
            className="pointer-events-none select-none"
            style={{ transition: "fill 0.4s, opacity 0.4s", opacity: isDimmed ? 0.4 : 1 }}
          >
            {label.lines.map((line, li) => (
              <tspan key={li} x="0" y={li * label.lineHeight}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}

      {/* Interactive node circles */}
      {cfg.nodes.map((node, i) => {
        const isActive = activeAxis === i;
        const isDimmed = activeAxis !== null && activeAxis !== i;

        return (
          <g
            key={`node-${i}`}
            className="cursor-pointer outline-none"
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
            aria-label={ejesInfo[i]?.titulo || `Eje ${i + 1}`}
            style={{ outline: "none" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(i);
              }
            }}
          >
            <circle
              cx={node.cx}
              cy={node.cy}
              r={isActive ? node.r * 1.3 : node.r}
              fill={isActive ? cfg.nodeStroke : isDimmed ? "#e0e0e0" : "white"}
              stroke={isActive ? cfg.nodeStroke : isDimmed ? "#999999" : cfg.nodeStroke}
              strokeWidth={cfg.nodeStrokeWidth}
              strokeMiterlimit={10}
              style={{ transition: "all 0.4s" }}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ====================================================================
 * Fallback renderer (for 5-node areas like Lengua, Lenguas Extranjeras)
 * ==================================================================== */
function FallbackRenderer({
  area,
  ejesInfo,
  activeAxis,
  toggle,
  centerDark,
}: {
  area: Area;
  ejesInfo: EjeInfo[];
  activeAxis: number | null;
  toggle: (i: number) => void;
  centerDark: string[];
}) {
  const n = ejesInfo.length;
  const coords = COORDS_5;
  const petals = PETALS_5;
  const darkColor = darken(area.color, 0.45);
  const whiteLines = ["Ejes de", "contenido"];
  const allLines = [...whiteLines, ...centerDark];
  const lh = 24;
  const startY = CY - ((allLines.length - 1) * lh) / 2;

  return (
    <svg
      viewBox="0 0 780 480"
      className="w-full h-auto block"
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

      <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="#494963" strokeWidth={1.2} strokeDasharray="6" />
      {petals.map((d, i) => (
        <path key={`petal-${i}`} d={d} fill="none" stroke="#494963" strokeWidth={1.2} strokeDasharray="6" markerStart={`url(#arrow-${area.slug})`} markerEnd={`url(#arrow-${area.slug})`} />
      ))}

      <circle cx={CX} cy={CY} r={CENTER_R} fill={area.color} />

      {whiteLines.map((l, li) => (
        <text key={`cw-${li}`} x={CX} y={startY + li * lh} textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none">{l}</text>
      ))}
      {centerDark.map((l, li) => (
        <text key={`cd-${li}`} x={CX} y={startY + (whiteLines.length + li) * lh} textAnchor="middle" fill={darkColor} fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none">{l}</text>
      ))}

      {coords.map((c, i) => {
        const isActive = activeAxis === i;
        const isDimmed = activeAxis !== null && activeAxis !== i;
        const titulo = ejesInfo[i]?.titulo || `Eje ${i + 1}`;
        const lbl = getLabel5(i, c);
        const isMulti = titulo.length > 18;
        const lines = isMulti ? splitText(titulo, 18) : [titulo];
        const fontSize = isMulti ? 14 : 17;

        return (
          <g key={`node-${i}`} className="cursor-pointer outline-none" onClick={() => toggle(i)} role="button" tabIndex={0} aria-label={titulo} style={{ outline: "none" }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } }}>
            <circle cx={c.x} cy={c.y} r={isActive ? NODE_R_ACTIVE : NODE_R} fill={isActive ? area.color : isDimmed ? "#e0e0e0" : "white"} stroke={isActive ? area.color : isDimmed ? "#999999" : area.color} strokeWidth={5} style={{ transition: "all 0.4s" }} />
            {lines.map((line, li) => (
              <text key={`label-${i}-${li}`} x={lbl.x} y={lbl.y + li * (fontSize + 2)} textAnchor={lbl.anchor} fill={isDimmed ? "#777777" : area.color} fontSize={fontSize} fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none" style={{ transition: "fill 0.4s" }}>{line}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ====================================================================
 * Main component
 * ==================================================================== */
export function EjesSchemaInteractive({
  area,
  ejesInfo,
  activeAxis,
  setActiveAxis,
  svgConfigKey,
}: EjesSchemaInteractiveProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveAxis(null);
  }, [area.id, svgConfigKey, setActiveAxis]);

  const toggle = (i: number) => setActiveAxis(activeAxis === i ? null : i);

  // Determine which SVG config to use
  const configKey = svgConfigKey || area.slug;
  const svgConfig = ejesSvgConfigs[configKey];
  const centerDark = getCenterDarkLines(configKey, area.name);

  return (
    <section id="ejes" className="scroll-mt-24">
      <div className="w-full mx-auto flex flex-col items-center" style={{ maxWidth: svgConfig ? 520 : 740 }}>
        {svgConfig ? (
          <SvgConfigRenderer
            cfg={svgConfig}
            ejesInfo={ejesInfo}
            activeAxis={activeAxis}
            toggle={toggle}
            area={area}
            centerDark={centerDark}
            configKey={configKey}
          />
        ) : (
          <FallbackRenderer
            area={area}
            ejesInfo={ejesInfo}
            activeAxis={activeAxis}
            toggle={toggle}
            centerDark={centerDark}
          />
        )}

        {/* Hint below diagram */}
        {activeAxis === null && (
          <div
            className="mt-4 flex items-center justify-center gap-2.5 pointer-events-none select-none"
            style={{ animation: "hintPulse 3s ease-in-out infinite" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#494963" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
              <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
            <span className="text-sm font-medium text-[#494963]/50 tracking-wide">
              {"Seleccion\u00e1 un eje para explorar"}
            </span>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-5 sm:h-8" />

      {/* Info panel */}
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
