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

      {/* 3) Qu\u00e9 ense\u00f1ar -- white bg */}
      <ParallaxSection speed={0.04}>
        <ScrollReveal delay={0.05}>
          <WhatWhyHowSection />
        </ScrollReveal>
      </ParallaxSection>

      {/* 4) Marco General -- grayish bg */}
      <ScrollReveal delay={0.05}>
        <div className="bg-[#EDEDF0]">
          <MarcoGeneralSection />
        </div>
      </ScrollReveal>

      {/* 5) Main Wheel Section -- Rueda Curricular -- white bg */}
      <section id="areas" className="pt-16 md:pt-24 pb-16 md:pb-24 bg-white flex-1">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          {/* Section title */}
          <ScrollReveal delay={0.05} distance={50}>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#494963] leading-tight font-display">
                {"Un marco com\u00fan"}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-[#494963]/70 mt-5 max-w-3xl mx-auto leading-relaxed">
                {"El dise\u00f1o desarrolla las siguientes \u00e1reas: Matem\u00e1tica, Lengua y Literatura, Ciencias Naturales, Ciencias Sociales, Educaci\u00f3n F\u00edsica, Educaci\u00f3n Art\u00edstica, Lenguas Extranjeras, Educaci\u00f3n Tecnol\u00f3gica y "}
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
                          : `${area?.color}40`,
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
                        : `${MARCO_GENERAL_COLOR}40`,
                  }}
                />
              </button>
            </div>

            {/* Mobile Area Info */}
            <div className="w-full max-w-sm mx-auto text-left">
              <h2
                className="text-2xl font-black mb-4 transition-all duration-300 font-display"
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
                className="inline-block px-8 h-12 leading-[3rem] rounded-full font-semibold text-base transition-all duration-300 hover:brightness-110"
                style={{
                  backgroundColor:
                    selectedAreaId === "marco-general"
                      ? MARCO_GENERAL_COLOR
                      : selectedArea?.color,
                  color:
                    selectedAreaId === "marco-general"
                      ? "#ffffff"
                      : selectedArea?.textOnColor || "#ffffff",
                }}
              >
                {"Ver m\u00e1s"}
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start justify-center gap-12 xl:gap-20">
            <div className="flex-shrink-0 w-[200px] xl:w-[220px]">
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

            <div className="flex-shrink-0 w-[360px] xl:w-[420px]">
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
