"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
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
import { ScrollToTop } from "@/components/area/scroll-to-top";

/* ─────────────────────────────────────────────
 * GSAP-inspired scroll reveal with multiple animation styles.
 * Each section can have a different entrance effect.
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const variants: Record<RevealStyle, { initial: object; animate: object }> = {
    "slide-up": {
      initial: { opacity: 0, y: 80 },
      animate: { opacity: 1, y: 0 },
    },
    "slide-left": {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
    },
    clip: {
      initial: { opacity: 0, clipPath: "inset(20% 0% 20% 0%)" },
      animate: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(12px)", y: 40 },
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
        duration: 1,
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
 * ParallaxStripe -- a full-width decorative element
 * that drifts at a different scroll speed.
 * ───────────────────────────────────────────── */
function ParallaxStripe({
  color,
  speed = 0.25,
  opacity = 0.08,
}: {
  color: string;
  speed?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <motion.div ref={ref} style={{ x }} className="py-6 md:py-10">
      <div
        className="mx-auto h-[2px] rounded-full"
        style={{ backgroundColor: color, opacity, width: "50%" }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
 * FadingHeader -- wraps AreaHeader so that the
 * media-rueda fades out + shrinks as the user scrolls.
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
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale, transformOrigin: "top center" }}>
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
    <div className="min-h-screen bg-[#fafafa] overflow-x-hidden">


      <MobileNav
        area={area}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
      <ScrollToTop area={area} />
      <Sidebar
        area={area}
        activeSection={activeSection}
        showAreasNav={showAreasNav}
        setShowAreasNav={setShowAreasNav}
        scrollToSection={scrollToSection}
      />

      <main className="lg:ml-16">
        {/* HERO: media rueda -- fades out on scroll */}
        <FadingHeader
          area={area}
          activeAxis={activeAxis}
          setActiveAxis={setActiveAxis}
        />

        {/* CONTENT SECTIONS */}
        <div className="relative">
          {/* -- Ejes Section -- */}
          <RevealSection
            delay={0.05}
            style="blur"
            className="px-4 sm:px-6 md:px-10 lg:px-16 pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10 md:pb-14 scroll-mt-24"
          >
            <div className="max-w-4xl mx-auto">
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

          <ParallaxStripe color={area.color} speed={0.3} opacity={0.1} />

          {/* -- Descarga -- */}
          <RevealSection
            delay={0.08}
            style="scale"
            className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-28"
          >
            <div className="max-w-4xl mx-auto">
              <DescargaDocumentoSection area={area} />
            </div>
          </RevealSection>

          <ParallaxStripe color={area.color} speed={-0.2} opacity={0.06} />

          {/* -- Video -- */}
          <RevealSection
            delay={0.06}
            style="clip"
            className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-28 scroll-mt-24"
          >
            <div className="max-w-4xl mx-auto">
              <VideoSection area={area} />
            </div>
          </RevealSection>

          <ParallaxStripe color={area.color} speed={0.25} opacity={0.08} />

          {/* -- Materiales -- */}
          <RevealSection
            delay={0.06}
            style="slide-left"
            className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-28 scroll-mt-24"
          >
            <div className="max-w-4xl mx-auto">
              <MaterialesSection area={area} />
            </div>
          </RevealSection>

          <ParallaxStripe color={area.color} speed={-0.15} opacity={0.05} />

          {/* -- Formaciones -- */}
          <RevealSection
            delay={0.06}
            style="slide-up"
            className="px-4 sm:px-6 md:px-10 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-24 md:pb-32 scroll-mt-24"
          >
            <div className="max-w-4xl mx-auto">
              <FormacionesSection
                area={area}
                prevArea={prevArea}
                nextArea={nextArea}
              />
            </div>
          </RevealSection>
        </div>
      </main>

      {/* Footer -- only desktop, mobile uses MobileNav */}
      <div className="hidden lg:block relative z-[70]">
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
