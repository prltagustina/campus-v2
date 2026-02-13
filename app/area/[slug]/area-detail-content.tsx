"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { areasData, type Area } from "@/lib/areas-data";
import { contenidosPorArea } from "@/lib/area-content";
import { areasOrder, subAreasPorArea } from "@/lib/constants";
import { MobileNav } from "@/components/area/mobile-nav";
import { Sidebar } from "@/components/area/sidebar";
import { AreaHeader } from "@/components/area/area-header";
import { DescargaDocumentoSection } from "@/components/area/descarga-documento-section";
import { SubareasPills } from "@/components/area/subareas-pills";
import { EjesSection } from "@/components/area/ejes-section";
import { VideoSection } from "@/components/area/video-section";
import { MaterialesSection } from "@/components/area/materiales-section";
import { FormacionesSection } from "@/components/area/formaciones-section";
import { AreaFooter } from "@/components/area/area-footer";


/* ─────────────────────────────────────────────
 * RevealSection -- each content section fades/slides
 * into view as the user scrolls down. Multiple styles.
 * ───────────────────────────────────────────── */
type RevealStyle = "slide-up" | "slide-left" | "scale" | "clip" | "blur";

function RevealSection({
  children,
  className = "",
  delay = 0,
  id,
  style = "slide-up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  style?: RevealStyle;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants: Record<RevealStyle, { initial: object; animate: object }> = {
    "slide-up": {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
    },
    "slide-left": {
      initial: { opacity: 0, x: 80 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.88 },
      animate: { opacity: 1, scale: 1 },
    },
    clip: {
      initial: { opacity: 0, clipPath: "inset(20% 0% 20% 0%)" },
      animate: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(16px)", y: 60 },
      animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
  };

  const v = variants[style];

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={v.initial}
      animate={isInView ? v.animate : v.initial}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
 * ParallaxLayer -- a container that moves at a different
 * scroll speed than the rest of the page content.
 * ───────────────────────────────────────────── */
function ParallaxLayer({
  children,
  speed = 0.15,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -120, speed * 120]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ position: "relative" }}
    >
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * FadingHeader -- the media-rueda fades + shrinks
 * as the user scrolls past it.
 * ───────────────────────────────────────────── */
function FadingHeader({
  area,
  activeAxis,
  setActiveAxis,
}: {
  area: Area;
  activeAxis: number | null;
  setActiveAxis: (v: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.92]);
  const translateY = useTransform(scrollYProgress, [0, 0.55], [0, -30]);

  return (
    <div ref={ref} className="relative" style={{ position: "relative" }}>
      <motion.div
        style={{ opacity, scale, y: translateY, transformOrigin: "top center" }}
      >
        <AreaHeader
          area={area}
          activeAxis={activeAxis}
          onAxisClick={(idx) =>
            setActiveAxis(activeAxis === idx ? null : idx)
          }
        />
      </motion.div>
    </div>
  );
}

/* ───────────── Main Component ───────────── */
interface AreaDetailContentProps {
  area: Area;
}

export function AreaDetailContent({ area }: AreaDetailContentProps) {
  const [selectedSubarea, setSelectedSubarea] = useState<string | null>(null);
  const [selectedEje, setSelectedEje] = useState<number>(0);
  const [expandedGrados, setExpandedGrados] = useState<string[]>([
    "presentacion",
  ]);
  const [activeSection, setActiveSection] = useState<string>("ejes");
  const [showAreasNav, setShowAreasNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAxis, setActiveAxis] = useState<number | null>(null);
  const hasAutoOpened = useRef(false);

  useEffect(() => {
    if (!hasAutoOpened.current) {
      hasAutoOpened.current = true;
      const t = setTimeout(() => setShowAreasNav(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    setSelectedSubarea(null);
    setSelectedEje(0);
    setExpandedGrados(["presentacion"]);
    setActiveAxis(null);
  }, [area.slug]);

  useEffect(() => {
    const ids = ["ejes", "video", "materiales", "formacion"];
    const onScroll = () => {
      let cur = "ejes";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) cur = id;
      }
      setActiveSection(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const pos = el.getBoundingClientRect().top + window.pageYOffset - 40;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  const toggleGrado = (gradoId: string) =>
    setExpandedGrados((p) => (p.includes(gradoId) ? [] : [gradoId]));

  const areaContent =
    contenidosPorArea[area.slug] || contenidosPorArea["matematica"];
  const subAreas = subAreasPorArea[area.slug] || [];
  const currentIdx = areasOrder.indexOf(area.id);
  const prevArea =
    currentIdx > 0
      ? areasData.find((a) => a.id === areasOrder[currentIdx - 1]) || null
      : null;
  const nextArea =
    currentIdx < areasOrder.length - 1
      ? areasData.find((a) => a.id === areasOrder[currentIdx + 1]) || null
      : null;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MobileNav
        area={area}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      <Sidebar
        area={area}
        activeSection={activeSection}
        showAreasNav={showAreasNav}
        setShowAreasNav={setShowAreasNav}
        scrollToSection={scrollToSection}
      />

      <main>
        {/* HERO: media rueda with parallax fade */}
        <FadingHeader
          area={area}
          activeAxis={activeAxis}
          setActiveAxis={setActiveAxis}
        />

        {/* CONTENT SECTIONS -- no divider lines, generous spacing */}
        <div className="relative">
          {/* Ejes Interactive Schema -- white bg */}
          <RevealSection delay={0.05} style="blur" className="scroll-mt-24 bg-white">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 pt-10 md:pt-16 pb-16 md:pb-24">
              <SubareasPills
                area={area}
                subAreas={subAreas}
                selectedSubarea={selectedSubarea}
                setSelectedSubarea={setSelectedSubarea}
              />
              <EjesSection
                area={area}
                areaContent={areaContent}
                selectedEje={selectedEje}
                setSelectedEje={setSelectedEje}
                expandedGrados={expandedGrados}
                toggleGrado={toggleGrado}
                activeAxis={activeAxis}
                setActiveAxis={setActiveAxis}
              />
            </div>
          </RevealSection>

          {/* Descarga Documento -- light gray bg */}
          <RevealSection delay={0.08} style="scale" className="scroll-mt-24 bg-[#EDEDF0]">
            <ParallaxLayer speed={0.1}>
              <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36 lg:py-44">
                <DescargaDocumentoSection area={area} />
              </div>
            </ParallaxLayer>
          </RevealSection>

          {/* Video de Presentacion -- white bg */}
          <RevealSection delay={0.06} style="clip" className="scroll-mt-24 bg-white">
            <ParallaxLayer speed={0.06}>
              <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36 lg:py-44">
                <VideoSection area={area} />
              </div>
            </ParallaxLayer>
          </RevealSection>

          {/* Materiales de Descarga -- light gray bg */}
          <RevealSection
            delay={0.06}
            style="slide-left"
            className="scroll-mt-24 bg-[#EDEDF0]"
          >
            <ParallaxLayer speed={0.08}>
              <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36 lg:py-44">
                <MaterialesSection area={area} />
              </div>
            </ParallaxLayer>
          </RevealSection>

          {/* Formaciones Docentes -- white bg */}
          <RevealSection delay={0.06} style="slide-up" className="scroll-mt-24 bg-white">
            <ParallaxLayer speed={0.05}>
              <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-24">
                <FormacionesSection
                  area={area}
                  prevArea={prevArea}
                  nextArea={nextArea}
                />
              </div>
            </ParallaxLayer>
          </RevealSection>
        </div>
      </main>

      {/* Footer -- full-width, non-fixed, desktop only */}
      <div className="hidden lg:block w-full">
        <AreaFooter
          area={area}
          prevArea={prevArea}
          nextArea={nextArea}
          scrollToSection={scrollToSection}
        />
      </div>
    </div>
  );
}
