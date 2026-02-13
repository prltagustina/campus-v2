"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { areasData } from "@/lib/areas-data";
import { areasOrder, MARCO_GENERAL_COLOR } from "@/lib/constants";
import { AreaDotsNav } from "@/components/home/area-dots-nav";
import { AreaWheel } from "@/components/home/area-wheel";
import { AreaPicker } from "@/components/home/area-picker";
import { CurriculumIntro } from "@/components/landing/curriculum-intro";
import { WhatWhyHowSection } from "@/components/landing/what-why-how-section";
import { MarcoGeneralSection } from "@/components/landing/marco-general-section";

import { AreaOrganizationSection } from "@/components/landing/area-organization-section";
import { TimelineSection } from "@/components/landing/timeline-section";
import { QuickAccessBar } from "@/components/landing/quick-access-bar";
import { FloatingNav } from "@/components/landing/floating-nav";
import { Footer } from "@/components/landing/landing-footer";
import {
  ScrollReveal,
  ParallaxSection,
} from "@/components/landing/scroll-reveal";

export default function HomePage() {
  const router = useRouter();
  const [selectedAreaId, setSelectedAreaId] = useState<number | "marco-general">(
    areasOrder[0]
  );
  const selectedArea =
    typeof selectedAreaId === "number"
      ? areasData.find((a) => a.id === selectedAreaId) || null
      : null;

  const handleAreaClick = (areaId: number | "marco-general") => {
    setSelectedAreaId(areaId);
  };

  const handleAreaDoubleClick = (areaId: number | "marco-general") => {
    if (areaId === "marco-general") {
      router.push("/marco-general");
      return;
    }
    const area = areasData.find((a) => a.id === areaId);
    if (area) {
      router.push(`/area/${area.slug}`);
    }
  };

  const handleCenterClick = () => {
    setSelectedAreaId("marco-general");
  };

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col overflow-x-hidden" role="main">
      <Header />
      <FloatingNav />

      {/* 1) Hero -- Diseno Curricular */}
      <CurriculumIntro />

      {/* 2) Quick Access Buttons */}
      <ScrollReveal delay={0.1}>
        <QuickAccessBar />
      </ScrollReveal>

      {/* 3) Que ensenar -- white bg */}
      <ParallaxSection speed={0.04}>
        <ScrollReveal delay={0.05}>
          <WhatWhyHowSection />
        </ScrollReveal>
      </ParallaxSection>

      {/* 4) Marco General -- institutional dark */}
      <ScrollReveal delay={0.05}>
        <div className="bg-[#494963]">
          <MarcoGeneralSection />
        </div>
      </ScrollReveal>

      {/* 5) Main Wheel Section -- Rueda Curricular -- light bg */}
      <section id="areas" className="pt-16 md:pt-24 pb-16 md:pb-24 bg-[#EDEDF0] flex-1">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section title */}
          <ScrollReveal delay={0.05} distance={50}>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight">
                {"Un marco comun"}
              </h2>
              <p className="text-lg md:text-xl text-[#494963]/70 mt-5 max-w-3xl mx-auto leading-relaxed">
                {"El diseno desarrolla las siguientes areas: Matematica, Lengua y Literatura, Ciencias Naturales, Ciencias Sociales, Educacion Fisica, Educacion Artistica, Lenguas Extranjeras, Educacion Tecnologica y "}
                <strong className="text-[#494963] font-bold">
                  {"Saberes, Vidas y Mundos"}
                </strong>
                {", un espacio curricular innovador."}
              </p>
            </div>
          </ScrollReveal>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center gap-6">
            <AreaWheel
              selectedAreaId={selectedAreaId}
              onAreaClick={handleAreaClick}
              onCenterClick={handleCenterClick}
            />

            {/* Navigation dots ordered by areasOrder */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {areasOrder.map((areaId) => {
                const area = areasData.find((a) => a.id === areaId);
                const isSelected = selectedAreaId === areaId;
                return (
                  <button
                    key={areaId}
                    type="button"
                    onClick={() => handleAreaClick(areaId)}
                    className="p-1"
                    aria-label={area?.name}
                  >
                    <div
                      className={`rounded-full transition-all duration-200 ${
                        isSelected ? "w-4 h-4" : "w-3 h-3"
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? area?.color
                          : "#D1D5DB",
                      }}
                    />
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => handleAreaClick("marco-general")}
                className="p-1"
                aria-label="Marco General"
              >
                <div
                  className={`rounded-full transition-all duration-200 ${
                    selectedAreaId === "marco-general" ? "w-4 h-4" : "w-3 h-3"
                  }`}
                  style={{
                    backgroundColor:
                      selectedAreaId === "marco-general"
                        ? MARCO_GENERAL_COLOR
                        : "#D1D5DB",
                  }}
                />
              </button>
            </div>

            {/* Mobile Area Info */}
            <div className="w-full max-w-sm mx-auto text-center">
              <h2
                className="text-2xl font-black mb-4 transition-all duration-300"
                style={{
                  color:
                    selectedAreaId === "marco-general"
                      ? MARCO_GENERAL_COLOR
                      : selectedArea?.color,
                }}
              >
                {selectedAreaId === "marco-general"
                  ? "Marco General"
                  : selectedArea?.name}
              </h2>

              {selectedAreaId !== "marco-general" &&
                selectedArea?.axes &&
                selectedArea.axes.length > 0 && (
                  <>
                    <h3
                      className="text-sm font-semibold mb-3"
                      style={{ color: "#494963" }}
                    >
                      {"Ejes de contenidos:"}
                    </h3>
                    <div className="space-y-2.5 mb-6 text-left">
                      {selectedArea.axes.map((eje, ejeIndex) => (
                        <div key={ejeIndex} className="flex items-start gap-3">
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                            style={{
                              border: `3px solid ${selectedArea?.color}`,
                              backgroundColor: "transparent",
                            }}
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: selectedArea?.color }}
                          >
                            {eje}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

              <Link
                href={
                  selectedAreaId === "marco-general"
                    ? "/marco-general"
                    : `/area/${selectedArea?.slug}`
                }
                className="inline-block px-8 py-2.5 rounded-full font-semibold text-white text-base transition-all duration-300 hover:brightness-110"
                style={{
                  backgroundColor:
                    selectedAreaId === "marco-general"
                      ? MARCO_GENERAL_COLOR
                      : selectedArea?.color,
                }}
              >
                {"Ver mas"}
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start justify-center gap-16 xl:gap-24">
            <div className="flex-shrink-0 w-[160px]">
              <AreaDotsNav
                areasOrder={areasOrder}
                selectedAreaId={selectedAreaId}
                onAreaClick={handleAreaClick}
                onAreaDoubleClick={handleAreaDoubleClick}
              />
            </div>

            <div className="flex-shrink-0">
              <AreaWheel
                selectedAreaId={selectedAreaId}
                onAreaClick={handleAreaClick}
                onCenterClick={handleCenterClick}
              />
            </div>

            <div className="flex-shrink-0 w-[320px] xl:w-[380px]">
              <AreaPicker
                areasOrder={areasOrder}
                selectedAreaId={selectedAreaId}
                selectedArea={selectedArea}
                onAreaClick={handleAreaClick}
                onAreaDoubleClick={handleAreaDoubleClick}
              />
            </div>
          </div>
        </div>

        {/* EIB access -- near the wheel */}
        <div className="max-w-lg mx-auto mt-10 mb-4 px-4">
          <Link
            href="/eib"
            className="group flex items-center gap-4 px-6 py-4 rounded-xl bg-white/80 backdrop-blur border border-[#494963]/8 hover:border-[#494963]/20 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#494963]/6 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#494963" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-[#494963] block leading-tight">
                {"Educacion Intercultural Bilingue"}
              </span>
              <span className="text-xs text-[#494963]/45 block mt-0.5">
                {"Enfoque intercultural y bilingue del diseno"}
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#494963" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* 6) Organizacion de areas -- white bg for contrast */}
      <ParallaxSection speed={0.05}>
        <ScrollReveal delay={0.05}>
          <AreaOrganizationSection />
        </ScrollReveal>
      </ParallaxSection>

      {/* 7) Linea de Tiempo -- light bg */}
      <ParallaxSection speed={0.03}>
        <ScrollReveal delay={0.05} distance={60}>
          <div className="bg-[#EDEDF0]">
            <TimelineSection />
          </div>
        </ScrollReveal>
      </ParallaxSection>

      <Footer />
    </main>
  );
}
