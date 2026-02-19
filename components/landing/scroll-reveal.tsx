"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/**
 * ScrollReveal -- GSAP-inspired section reveal wrapper.
 * Each section fades + slides in when it enters the viewport,
 * with optional parallax offset for depth.
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const dirMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const initial = { opacity: 0, ...dirMap[direction] };
  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial;

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxSection -- a wrapper that moves at a different speed
 * relative to scroll, creating depth/layering.
 */
export function ParallaxSection({
  children,
  className = "",
  speed = 0.15,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);

  return (
    <motion.div
      id={id}
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionDivider -- a decorative horizontal line that moves
 * at a different speed, separating sections visually.
 */
export function SectionDivider({
  color = "#494963",
  width = "40%",
  speed = 0.2,
}: {
  color?: string;
  width?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const x = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);

  return (
    <motion.div
      ref={ref}
      style={{ x }}
      className="flex items-center justify-center py-4 md:py-8"
    >
      <div
        className="h-px rounded-full"
        style={{
          backgroundColor: color,
          opacity: 0.12,
          width,
        }}
      />
    </motion.div>
  );
}

/**
 * StaggerChildren -- animates children in sequence.
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
        },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
