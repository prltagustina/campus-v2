"use client";

import React, { useRef, useState, useEffect } from "react";

/**
 * ScrollReveal -- section reveal wrapper using IntersectionObserver.
 * Each section fades + slides in when it enters the viewport.
 */
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
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dirMap = {
    up: { x: "0px", y: `${distance}px` },
    down: { x: "0px", y: `-${distance}px` },
    left: { x: `${distance}px`, y: "0px" },
    right: { x: `-${distance}px`, y: "0px" },
  };

  const dir = dirMap[direction];

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? "translate(0px, 0px)"
          : `translate(${dir.x}, ${dir.y})`,
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/**
 * ParallaxSection -- a simple wrapper for visual grouping.
 * Parallax disabled to avoid scroll calculation issues and heavy re-renders.
 */
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

/**
 * SectionDivider -- a decorative horizontal line.
 */
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
        style={{
          backgroundColor: color,
          opacity: 0.12,
          width,
        }}
      />
    </div>
  );
}

/**
 * StaggerChildren -- animates children in sequence using CSS.
 */
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
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * staggerDelay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * staggerDelay}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
