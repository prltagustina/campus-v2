"use client";

import React, { useState, useEffect, useRef } from "react";
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
 * into view using CSS transitions + IntersectionObserver.
 * ───────────────────────────────────────────── */
function RevealSection({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  style?: string;
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

  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────────
 * FadingHeader -- the media-rueda area header.
 * Uses a simple CSS-based approach.
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
  return (
    <div className="relative">
      <AreaHeader
        area={area}
        activeAxis={activeAxis}
        onAxisClick={(idx) =>
          setActiveAxis(activeAxis === idx ? null : idx)
        }
      />
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
    <div className="relative min-h-screen bg-white overflow-x-hidden">
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
                selectedSubarea={selectedSubarea}
              />
            </div>
          </RevealSection>

          {/* Descarga Documento -- light gray bg */}
          <RevealSection delay={0.08} className="scroll-mt-24 bg-[#EDEDF0]">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36 lg:py-44">
              <DescargaDocumentoSection area={area} />
            </div>
          </RevealSection>

          {/* Video de Presentacion -- white bg */}
          <RevealSection delay={0.06} className="scroll-mt-24 bg-white">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36 lg:py-44">
              <VideoSection area={area} />
            </div>
          </RevealSection>

          {/* Materiales de Descarga -- light gray bg */}
          <RevealSection
            delay={0.06}
            className="scroll-mt-24 bg-[#EDEDF0]"
          >
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36 lg:py-44">
              <MaterialesSection area={area} />
            </div>
          </RevealSection>

          {/* Formaciones Docentes -- white bg */}
          <RevealSection delay={0.06} className="scroll-mt-24 bg-white">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-24">
              <FormacionesSection
                area={area}
                prevArea={prevArea}
                nextArea={nextArea}
              />
            </div>
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
