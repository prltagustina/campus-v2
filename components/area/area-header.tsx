"use client";

import Image from "next/image";
import type { Area } from "@/lib/areas-data";
import { ejesInfoPorArea } from "@/lib/ejes-info-data";

interface AreaHeaderProps {
  area: Area;
  activeAxis?: number | null;
  onAxisClick?: (index: number) => void;
}

/**
 * Node positions INSIDE the white inner area of the half-wheel.
 *
 * The half-wheel opens upward. The white inner area is the concave
 * region below the colored band. Nodes follow a DOWNWARD arc
 * (higher on edges, lower in center) matching the inner edge.
 *
 * Center ABOVE the image (negative cy) + angles 50-130 degrees
 * = points curving downward through the bottom of the circle.
 * At 90deg: y = -90 + 160 = 70 (lowest point = center)
 * At 50/130deg: y = -90 + 160*sin(50) = 32 (higher = edges)
 */
function getNodePositions(count: number) {
  const cx = 286;
  const cy = -90;
  const radius = 160;
  const startAngle = 50;
  const endAngle = 130;
  const step = count > 1 ? (endAngle - startAngle) / (count - 1) : 0;

  return Array.from({ length: count }, (_, i) => {
    const angleDeg =
      count === 1 ? (startAngle + endAngle) / 2 : startAngle + step * i;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angleRad),
      y: cy + radius * Math.sin(angleRad),
    };
  });
}

export function AreaHeader({ area, activeAxis, onAxisClick }: AreaHeaderProps) {
  const mediaRuedaSrc = `/images/media-ruedas/${area.slug}.png`;
  const ejesInfo = ejesInfoPorArea[area.slug];
  const numAxes = ejesInfo?.length || area.axes?.length || 0;
  const nodes = numAxes > 0 ? getNodePositions(numAxes) : [];

  return (
    <div>
      {/* Image: constrained to ~75% width, centered, flush to top */}
      <div
        className="relative mx-auto"
        style={{ lineHeight: 0, maxWidth: 900, marginTop: -4 }}
      >
        <Image
          src={mediaRuedaSrc || "/placeholder.svg"}
          alt={`Media rueda - ${area.name}`}
          width={1200}
          height={411}
          className="w-full h-auto block"
          priority
        />

        {/* SVG overlay with ejes node circles */}
        {nodes.length > 0 && (
          <svg
            viewBox="0 0 572.33 195.84"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            {nodes.map((node, i) => {
              const isActive = activeAxis === i;
              const isDimmed = activeAxis !== null && activeAxis !== i;
              return (
                <circle
                  key={i}
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 9 : 6.5}
                  fill={isActive ? area.color : isDimmed ? "#e0e0e0" : "white"}
                  stroke={isActive ? area.color : isDimmed ? "#999" : area.color}
                  strokeWidth={3}
                  className="cursor-pointer"
                  style={{
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onClick={() => onAxisClick?.(i)}
                />
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
