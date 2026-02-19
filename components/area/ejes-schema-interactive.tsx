"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  selectedSubarea?: string | null;
}

/* ===================================================================
   Static SVG config per area / subarea.
   - `path`: public URL of the SVG file
   - `nodeOrder`: maps each cls-3/cls-6 *node circle* (DOM order) to
     its ejesInfo index.
   - `textOrder`: maps each *axis title text* (DOM order) to ejesInfo index.
   - `titleTextClass`: CSS class used for axis title `<text>` elements
     in this SVG (varies between SVGs: cls-6, cls-1, cls-5, cls-3).
   - `nodeCircleClass`: CSS class used for clickable node `<circle>` elements.
   =================================================================== */

interface StaticSvgConfig {
  path: string;
  nodeOrder: number[];
  textOrder: number[];
  titleTextClass: string;
  nodeCircleClass: string;
  /** Font size replacement: original -> target */
  fontSizeOriginal?: string;
  fontSizeTarget?: string;
}

const STATIC_SVG_CONFIG: Record<string, StaticSvgConfig> = {
  "ciencias-sociales": {
    path: "/images/ejes/ciencias-sociales.svg",
    nodeOrder: [1, 2, 0],
    textOrder: [0, 1, 2],
    titleTextClass: "cls-6",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
  "ciencias-naturales": {
    path: "/images/ejes/ciencias-naturales.svg",
    nodeOrder: [0, 1, 2, 3],
    textOrder: [0, 1, 2, 3],
    titleTextClass: "cls-1",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
  "matematica": {
    path: "/images/ejes/matematica.svg",
    nodeOrder: [0, 1, 3, 2],
    textOrder: [3], // only 1 <text>: "Estadistica y probabilidad" = eje 3
    titleTextClass: "cls-5",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
  "lengua-y-literatura": {
    path: "/images/ejes/lengua-y-literatura.svg",
    nodeOrder: [0, 1, 4, 3, 2],
    textOrder: [0, 4, 2, 1, 3],
    titleTextClass: "cls-1",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "17px",
    fontSizeTarget: "14px",
  },
  "lenguas-extranjeras": {
    path: "/images/ejes/lenguas-extranjeras.svg",
    nodeOrder: [0, 1, 2, 3, 4],
    textOrder: [0, 1, 2, 3, 4],
    titleTextClass: "cls-1",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
  "educacion-fisica": {
    path: "/images/ejes/educacion-fisica.svg",
    nodeOrder: [0, 1, 2], // top-left=0, right=1, bottom-left=2
    textOrder: [1, 2],    // only 2 <text> elements exist; 3rd axis is vector paths
    titleTextClass: "cls-3",
    nodeCircleClass: "cls-6",
    fontSizeOriginal: "18px",
    fontSizeTarget: "15px",
  },
};

const SUBAREA_SVG_CONFIG: Record<string, StaticSvgConfig> = {
  "artes-visuales": {
    path: "/images/ejes/artes-visuales.svg",
    nodeOrder: [1, 2, 0],
    textOrder: [1], // only 1 <text>: "Apreciacion" = eje 1
    titleTextClass: "cls-5",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
  "musica": {
    path: "/images/ejes/musica.svg",
    nodeOrder: [1, 2, 0],
    textOrder: [1], // only 1 <text>: "Apreciacion" = eje 1
    titleTextClass: "cls-5",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
  "artes-audiovisuales": {
    path: "/images/ejes/artes-audiovisuales.svg",
    nodeOrder: [1, 2, 0],
    textOrder: [1], // only 1 <text>: "Apreciacion" = eje 1
    titleTextClass: "cls-5",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
  "teatro": {
    path: "/images/ejes/teatro.svg",
    nodeOrder: [1, 2, 0],
    textOrder: [1], // only 1 <text>: "Apreciacion" = eje 1
    titleTextClass: "cls-5",
    nodeCircleClass: "cls-3",
    fontSizeOriginal: "22px",
    fontSizeTarget: "17px",
  },
};

function getStaticSvgConfig(
  areaSlug: string,
  selectedSubarea?: string | null,
): StaticSvgConfig | null {
  if (
    areaSlug === "educacion-artistica" &&
    selectedSubarea &&
    SUBAREA_SVG_CONFIG[selectedSubarea]
  ) {
    return SUBAREA_SVG_CONFIG[selectedSubarea];
  }
  return STATIC_SVG_CONFIG[areaSlug] || null;
}

/* ===================================================================
   InlineSvgSchema: fetches the designer SVG, injects it inline,
   tags interactive elements with `data-eje`, and applies CSS-driven
   active/dimmed visual states.
   =================================================================== */

function InlineSvgSchema({
  config,
  area,
  ejesInfo,
  activeAxis,
  setActiveAxis,
}: {
  config: StaticSvgConfig;
  area: Area;
  ejesInfo: EjeInfo[];
  activeAxis: number | null;
  setActiveAxis: (idx: number | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const activeRef = useRef(activeAxis);
  activeRef.current = activeAxis;

  const toggle = useCallback(
    (ejeIdx: number) => {
      setActiveAxis(activeRef.current === ejeIdx ? null : ejeIdx);
    },
    [setActiveAxis],
  );

  /* ---- Fetch + inject the SVG once ---- */
  useEffect(() => {
    let cancelled = false;
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = "";
    setLoaded(false);

    fetch(config.path)
      .then((r) => r.text())
      .then((svgText) => {
        if (cancelled || !containerRef.current) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (!svg) return;

        /* Make SVG responsive */
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.style.width = "100%";
        svg.style.height = "auto";
        svg.style.display = "block";

        /* Reduce axis title font size via <style> rewrite */
        if (config.fontSizeOriginal && config.fontSizeTarget) {
          const styleEl = svg.querySelector("style");
          if (styleEl && styleEl.textContent) {
            const re = new RegExp(
              `(\\.${config.titleTextClass}\\s*\\{[^}]*font-size:\\s*)${config.fontSizeOriginal.replace(".", "\\.")}`,
              "g",
            );
            styleEl.textContent = styleEl.textContent.replace(
              re,
              `$1${config.fontSizeTarget}`,
            );
          }
        }

        /* Tag axis title <text> elements with data-eje */
        const titleTexts = svg.querySelectorAll(
          `text.${config.titleTextClass}`,
        );
        titleTexts.forEach((t, i) => {
          if (i < config.textOrder.length) {
            t.setAttribute("data-eje", String(config.textOrder[i]));
            t.setAttribute("data-eje-text", "1");
            (t as SVGElement).style.cursor = "pointer";
            (t as SVGElement).style.transition =
              "opacity 0.35s ease, filter 0.35s ease";
          }
        });

        /* Tag node <circle> elements with data-eje */
        const nodeCircles = svg.querySelectorAll(
          `circle.${config.nodeCircleClass}`,
        );
        /* The orbit dashed circle also has cls-4 / cls-6 sometimes.
           We only want the small ones (r < 20) */
        const filteredCircles = Array.from(nodeCircles).filter((c) => {
          const r = parseFloat(c.getAttribute("r") || "0");
          return r < 20;
        });
        filteredCircles.forEach((c, i) => {
          if (i < config.nodeOrder.length) {
            c.setAttribute("data-eje", String(config.nodeOrder[i]));
            c.setAttribute("data-eje-node", "1");
            (c as SVGElement).style.cursor = "pointer";
            (c as SVGElement).style.transition =
              "opacity 0.35s ease, filter 0.35s ease, stroke-width 0.35s ease, fill 0.35s ease";
          }
        });

        /* Click handler via event delegation */
        svg.addEventListener("click", (e) => {
          const target = (e.target as Element).closest("[data-eje]");
          if (target) {
            const ejeIdx = parseInt(target.getAttribute("data-eje")!, 10);
            toggle(ejeIdx);
          }
        });

        containerRef.current.appendChild(svg);
        setLoaded(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [config.path, config.nodeOrder, config.textOrder, config.titleTextClass, config.nodeCircleClass, config.fontSizeOriginal, config.fontSizeTarget, toggle]);

  /* ---- Update active/dimmed visual states ---- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !loaded) return;
    const svg = el.querySelector("svg");
    if (!svg) return;

    /* 1. Process data-eje tagged elements (nodes + text labels) */
    const allEjeEls = svg.querySelectorAll("[data-eje]");
    allEjeEls.forEach((elem) => {
      const ejeIdx = parseInt(elem.getAttribute("data-eje")!, 10);
      const s = (elem as SVGElement).style;
      const isNode = elem.hasAttribute("data-eje-node");
      const isActive = activeAxis === ejeIdx;
      const isDimmed = activeAxis !== null && !isActive;

      s.transition = "opacity 0.35s ease, filter 0.35s ease, fill 0.35s ease, stroke-width 0.35s ease";

      if (isDimmed) {
        s.opacity = "0.18";
        s.filter = "saturate(0)";
        if (isNode) {
          s.strokeWidth = "";
          s.fill = "#e0e0e0";
        }
      } else if (isActive) {
        s.opacity = "1";
        s.filter = "none";
        if (isNode) {
          s.strokeWidth = "6";
          s.fill = area.color;
        }
      } else {
        s.opacity = "1";
        s.filter = "none";
        if (isNode) {
          s.strokeWidth = "";
          s.fill = "";
        }
      }
    });

    /* 2. Find the center circle to know its bounding region.
       Center circle = largest circle (r > 50) */
    let centerCx = 0, centerCy = 0, centerR = 0;
    svg.querySelectorAll("circle").forEach((c) => {
      const r = parseFloat(c.getAttribute("r") || "0");
      if (r > centerR) {
        centerR = r;
        centerCx = parseFloat(c.getAttribute("cx") || "0");
        centerCy = parseFloat(c.getAttribute("cy") || "0");
      }
    });

    /* 3. Dim ALL non-tagged elements except center circle + center text.
       Elements whose bounding box center is inside the center circle radius
       are considered "center content" and stay visible. */
    const allShapes = svg.querySelectorAll("path, circle, text, rect");
    allShapes.forEach((elem) => {
      if (elem.hasAttribute("data-eje")) return;

      const sp = elem as SVGElement;
      sp.style.transition = "opacity 0.35s ease, filter 0.35s ease";

      /* Keep center circle itself fully visible */
      if (elem.tagName === "circle") {
        const r = parseFloat(elem.getAttribute("r") || "0");
        if (r > 50) {
          sp.style.opacity = "1";
          sp.style.filter = "none";
          return;
        }
      }

      /* Check if element is inside center circle region using getBBox */
      try {
        const bbox = (elem as SVGGraphicsElement).getBBox();
        const elCx = bbox.x + bbox.width / 2;
        const elCy = bbox.y + bbox.height / 2;
        const dist = Math.sqrt((elCx - centerCx) ** 2 + (elCy - centerCy) ** 2);
        if (dist < centerR * 0.95) {
          /* Inside center circle -- center text, keep visible */
          sp.style.opacity = "1";
          sp.style.filter = "none";
          return;
        }
      } catch {
        /* getBBox may fail for hidden elements */
      }

      /* Everything else: dim when an axis is selected */
      if (activeAxis !== null) {
        sp.style.opacity = "0.22";
        sp.style.filter = "saturate(0)";
      } else {
        sp.style.opacity = "1";
        sp.style.filter = "none";
      }
    });

    /* 4. Re-highlight active node + text above the global dim */
    if (activeAxis !== null) {
      svg.querySelectorAll(`[data-eje="${activeAxis}"]`).forEach((elem) => {
        const s = (elem as SVGElement).style;
        s.opacity = "1";
        s.filter = "none";
      });
    }
  }, [activeAxis, loaded, area.color]);

  return (
    <div
      ref={containerRef}
      className="w-full mx-auto flex items-center justify-center"
      style={{ maxWidth: 520 }}
      aria-label={`Esquema de ejes de contenido de ${area.name}`}
    />
  );
}

/* ===================================================================
   Fallback: programmatic SVG for areas without a designer SVG.
   (Uses the existing coordinate/petal math.)
   =================================================================== */

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
  const anchor = i === 1 || i === 2 ? "end" : "start";
  return { x: c.x + dx, y: c.y + dy, anchor };
}

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
  if (norm >= 315 || norm < 45)
    return { x: c.x + 20, y: c.y + 5, anchor: "start" };
  if (norm >= 45 && norm < 135)
    return { x: c.x, y: c.y + 24, anchor: "middle" };
  if (norm >= 135 && norm < 225)
    return { x: c.x - 20, y: c.y + 5, anchor: "end" };
  return { x: c.x, y: c.y - 16, anchor: "middle" };
}

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

/* ===================================================================
   Main exported component
   =================================================================== */

export function EjesSchemaInteractive({
  area,
  ejesInfo,
  activeAxis,
  setActiveAxis,
  selectedSubarea,
}: EjesSchemaInteractiveProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveAxis(null);
  }, [area.id, selectedSubarea, setActiveAxis]);

  /* Try to find a static SVG config for this area */
  const config = getStaticSvgConfig(area.slug, selectedSubarea);

  /* ---- STATIC SVG PATH ---- */
  if (config) {
    return (
      <section id="ejes" className="scroll-mt-24">
        <div
          className="w-full mx-auto flex flex-col items-center"
          style={{ maxWidth: 600 }}
        >
          {/* Inline interactive SVG */}
          <InlineSvgSchema
            config={config}
            area={area}
            ejesInfo={ejesInfo}
            activeAxis={activeAxis}
            setActiveAxis={setActiveAxis}
          />

          {/* Hint when nothing selected */}
          {activeAxis === null && (
            <div
              className="mt-4 flex items-center justify-center gap-2.5 pointer-events-none select-none"
              style={{ animation: "hintPulse 3s ease-in-out infinite" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#494963"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              >
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
            maxWidth: 600,
            maxHeight: activeAxis !== null ? 400 : 0,
            opacity: activeAxis !== null ? 1 : 0,
            padding: activeAxis !== null ? "30px 24px" : "0 24px",
            borderTop:
              activeAxis !== null
                ? `2px solid ${area.color}`
                : "2px solid transparent",
            backgroundColor: "#f4f5f7",
            borderRadius: "0 0 12px 12px",
            transition: "all 0.5s ease-in-out",
          }}
        >
          {activeAxis !== null && ejesInfo[activeAxis] && (
            <div>
              <h2
                className="text-lg md:text-xl font-bold mb-2 leading-snug"
                style={{ color: area.color }}
              >
                {ejesInfo[activeAxis].titulo}
              </h2>
              <p
                className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold"
                style={{ fontFamily: "'Inter Tight', Inter, sans-serif" }}
              >
                {ejesInfo[activeAxis].descripcion}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ---- FALLBACK: programmatic SVG for areas without a designer SVG ---- */
  const n = ejesInfo.length;
  const is5 = n === 5;
  const coords = is5 ? COORDS_5 : getCoordsN(n);
  const petals = is5 ? PETALS_5 : getPetalsN(coords, n);
  const darkColor = darken(area.color, 0.45);

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
    centerDark = ["en Educaci\u00f3n", "F\u00edsica"];
  } else if (area.slug === "educacion-artistica") {
    centerDark = ["en Educaci\u00f3n", "Art\u00edstica"];
  } else if (area.slug === "educacion-tecnologica") {
    centerDark = ["en Educaci\u00f3n", "Tecnol\u00f3gica"];
  } else if (area.slug === "saberes-vidas-y-mundos") {
    centerDark = ["en Saberes,", "Vidas y Mundos"];
  } else {
    centerDark = [`en ${area.name}`];
  }

  const toggle = (i: number) => setActiveAxis(activeAxis === i ? null : i);

  return (
    <section id="ejes" className="scroll-mt-24">
      <div
        className="w-full mx-auto flex flex-col items-center"
        style={{ maxWidth: 600 }}
      >
        {/* Mobile SVG */}
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

        {/* Desktop SVG */}
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
          <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="#494963" strokeWidth={1.2} strokeDasharray="6" />
          {petals.map((d, i) => (
            <path key={`petal-${i}`} d={d} fill="none" stroke="#494963" strokeWidth={1.2} strokeDasharray="6" markerStart={`url(#arrow-${area.slug})`} markerEnd={`url(#arrow-${area.slug})`} />
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
                  <text key={`cw-${li}`} x={CX} y={startY + li * lh} textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none">{l}</text>
                ))}
                {centerDark.map((l, li) => (
                  <text key={`cd-${li}`} x={CX} y={startY + (whiteLines.length + li) * lh} textAnchor="middle" fill={darkColor} fontSize="20" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none">{l}</text>
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
              <g key={`node-${i}`} className="cursor-pointer outline-none" onClick={() => toggle(i)} role="button" tabIndex={0} aria-label={titulo} style={{ outline: "none" }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } }}>
                <circle cx={c.x} cy={c.y} r={isActive ? NODE_R_ACTIVE : NODE_R} fill={isActive ? area.color : isDimmed ? "#e0e0e0" : "white"} stroke={isActive ? area.color : isDimmed ? "#999999" : area.color} strokeWidth={5} style={{ transition: "all 0.4s" }} />
                {lines.map((line, li) => (
                  <text key={`label-${i}-${li}`} x={lbl.x} y={lbl.y + li * (fontSize + 2)} textAnchor={lbl.anchor} fill={isDimmed ? "#777777" : area.color} fontSize={fontSize} fontWeight="700" fontFamily="Inter, system-ui, sans-serif" className="pointer-events-none select-none" style={{ transition: "fill 0.4s" }}>{line}</text>
                ))}
              </g>
            );
          })}
        </svg>

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

      <div className="h-5 sm:h-8" />

      <div
        ref={panelRef}
        className="w-full relative overflow-hidden mx-auto"
        style={{
          maxWidth: 600,
          maxHeight: activeAxis !== null ? 400 : 0,
          opacity: activeAxis !== null ? 1 : 0,
          padding: activeAxis !== null ? "30px 24px" : "0 24px",
          borderTop:
            activeAxis !== null
              ? `2px solid ${area.color}`
              : "2px solid transparent",
          backgroundColor: "#f4f5f7",
          borderRadius: "0 0 12px 12px",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <div
          className="absolute w-0 h-0"
          style={{
            top: -14,
            left: 45,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: `12px solid ${area.color}`,
          }}
        />
        <div
          className="absolute w-0 h-0"
          style={{
            top: -12,
            left: 45,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "12px solid #f4f5f7",
            zIndex: 1,
          }}
        />

        {activeAxis !== null && ejesInfo[activeAxis] && (
          <div>
            <h2
              className="text-lg md:text-xl font-bold mb-2 leading-snug"
              style={{ color: area.color }}
            >
              {ejesInfo[activeAxis].titulo}
            </h2>
            <p
              className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold"
              style={{ fontFamily: "'Inter Tight', Inter, sans-serif" }}
            >
              {ejesInfo[activeAxis].descripcion}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {"Descarg\u00e1 el documento completo para "}
              <a
                href="#descarga"
                className="font-bold hover:underline"
                style={{ color: area.color }}
              >
                ver m{"\u00e1"}s
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
