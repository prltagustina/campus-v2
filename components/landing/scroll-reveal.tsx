"use client";

import React, { useRef, useState, useEffect } from "react";

/* ── ScrollReveal ─────────────────────────────────────── */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 60,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offsets: Record<string, { x: string; y: string }> = {
    up: { x: "0px", y: `${distance}px` },
    down: { x: "0px", y: `-${distance}px` },
    left: { x: `${distance}px`, y: "0px" },
    right: { x: `-${distance}px`, y: "0px" },
  };
  const d = offsets[direction];

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : `translate(${d.x},${d.y})`,
        transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ── ParallaxSection (lightweight wrapper) ────────────── */
export function ParallaxSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  id?: string;
}) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}

/* ── SectionDivider ───────────────────────────────────── */
export function SectionDivider({
  color = "#494963",
  width = "40%",
}: {
  color?: string;
  width?: string;
  speed?: number;
}) {
  return (
    <div className="flex items-center justify-center py-4 md:py-8">
      <div
        className="h-px rounded-full"
        style={{ backgroundColor: color, opacity: 0.12, width }}
      />
    </div>
  );
}

/* ── StaggerChildren ──────────────────────────────────── */
export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${0.1 + i * staggerDelay}s, transform .6s cubic-bezier(.16,1,.3,1) ${0.1 + i * staggerDelay}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
