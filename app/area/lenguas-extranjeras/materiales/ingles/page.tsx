"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  ChevronRight,
  Clock,
  Play,
  GraduationCap
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";
const MAGENTA_COLOR = "#E91E8C";

/* Issues de English Funzine */
const funzineIssues = [
  {
    number: 1,
    slug: "issue-1",
    title: "It's great to be me!",
    available: true,
  },
  {
    number: 2,
    slug: "issue-2", 
    title: "Proximamente",
    available: false,
  },
  {
    number: 3,
    slug: "issue-3",
    title: "Proximamente", 
    available: false,
  },
];

/* Sidebar navigation items */
const sidebarItems = [
  { id: "presentacion", label: "PRESENTACION", sublabel: "Video de inicio" },
  { id: "magazine", label: "MAGAZINE", sublabel: "Revista para estudiantes" },
  { id: "activity-book", label: "ACTIVITY BOOK", sublabel: "Libro de actividades de Funzine" },
  { id: "teachers-guide", label: "TEACHER'S GUIDE", sublabel: "Guía para docentes de Funzine en el aula" },
];

export default function InglesMaterilesPage() {
  const [activeSection, setActiveSection] = useState("presentacion");
  const presentacionRef = useRef<HTMLDivElement>(null);
  const issueRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Scroll to section when clicking sidebar
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "presentacion" && presentacionRef.current) {
      presentacionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to issue
  const scrollToIssue = (issueSlug: string) => {
    const ref = issueRefs.current[issueSlug];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFF9E6" }}>
      <Header />
      
      {/* Main content with sidebar */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar - fixed on desktop */}
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 border-r border-[#FFCB02]/20 bg-[#FFF9E6] sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            <Link 
              href="/area/lenguas-extranjeras#materiales" 
              className="inline-flex items-center gap-2 text-xs text-[#494963]/50 hover:text-[#494963] transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver a Inglés
            </Link>

            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      isActive 
                        ? "bg-white shadow-sm" 
                        : "hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isActive ? MAGENTA_COLOR : "#494963", opacity: isActive ? 1 : 0.2 }}
                      />
                      <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? "text-[#494963]" : "text-[#494963]/40"}`}>
                        {item.label}
                      </span>
                    </div>
                    <p className={`text-[10px] mt-1 ml-4 ${isActive ? "text-[#494963]/60" : "text-[#494963]/30"}`}>
                      {item.sublabel}
                    </p>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {/* Hero section with decorative elements */}
          <section className="relative py-8 sm:py-12 px-4 sm:px-8 lg:px-12 overflow-hidden">
            {/* Decorative elements - bananas and stars */}
            <div className="absolute top-4 right-4 w-16 h-16 sm:w-24 sm:h-24 opacity-60 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 5 L55 35 L85 35 L60 55 L70 85 L50 65 L30 85 L40 55 L15 35 L45 35 Z" fill="#FFCB02" opacity="0.3"/>
              </svg>
            </div>
            <div className="absolute bottom-8 left-8 w-20 h-20 opacity-50 pointer-events-none hidden sm:block">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <path d="M10 50 Q30 10 70 20 Q90 25 95 45 Q70 35 40 40 Q20 45 10 50" fill="#FFCB02" stroke="#E0B000" strokeWidth="2"/>
              </svg>
            </div>

            {/* Mobile back button */}
            <div className="lg:hidden mb-6">
              <Link 
                href="/area/lenguas-extranjeras#materiales" 
                className="inline-flex items-center gap-2 text-xs text-[#494963]/50 hover:text-[#494963] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a Inglés
              </Link>
            </div>

            {/* Logo and title */}
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#494963]/40 mb-2">
                ENGLISH
              </p>
              {/* Funzine Logo */}
              <div className="mb-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#494963] leading-none">
                  <span className="text-[#494963]">Fun</span>
                  <span style={{ color: MAGENTA_COLOR }}>zine</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm sm:text-base text-[#494963]/70 italic">
                    The magazine that makes
                  </span>
                  <span 
                    className="text-sm sm:text-base font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: MAGENTA_COLOR, color: "white" }}
                  >
                    English fun!
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Video de presentacion */}
          <section ref={presentacionRef} className="px-4 sm:px-8 lg:px-12 pb-8">
            <p className="text-xs font-semibold text-[#494963]/40 uppercase tracking-wider mb-3">
              Video de presentacion
            </p>
            <div className="rounded-xl overflow-hidden bg-[#494963]/10 aspect-video max-w-2xl flex items-center justify-center border border-[#494963]/10">
              <div className="text-center">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: AREA_COLOR }}
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" style={{ color: TEXT_ON_COLOR }} />
                </div>
              </div>
            </div>
          </section>

          {/* Intro text */}
          <section className="px-4 sm:px-8 lg:px-12 pb-10">
            <p className="text-sm sm:text-base text-[#494963]/70 leading-relaxed max-w-2xl">
              Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
              Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
              en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
            </p>
          </section>

          {/* Issues section */}
          <section className="px-4 sm:px-8 lg:px-12 pb-12">
            {/* Issues selector - circular badges */}
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-4 h-4 text-[#494963]/40" />
              <span className="text-xs font-semibold text-[#494963]/40 uppercase tracking-wider">
                Issues
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {funzineIssues.map((issue) => (
                issue.available ? (
                  <button
                    key={issue.slug}
                    type="button"
                    onClick={() => scrollToIssue(issue.slug)}
                    className="group flex items-center gap-3 pr-4 rounded-full transition-all hover:shadow-md"
                    style={{ backgroundColor: "white", border: `2px solid ${AREA_COLOR}` }}
                  >
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: AREA_COLOR }}
                    >
                      <span className="text-base sm:text-lg font-bold" style={{ color: TEXT_ON_COLOR }}>
                        {issue.number}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-[#494963]">
                      {issue.title}
                    </span>
                  </button>
                ) : (
                  <div
                    key={issue.slug}
                    className="flex items-center gap-3 pr-4 rounded-full bg-gray-100/50 border-2 border-gray-200/50"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200/50">
                      <span className="text-base sm:text-lg font-bold text-[#494963]/30">
                        {issue.number}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-[#494963]/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Proximamente
                    </span>
                  </div>
                )
              ))}
            </div>

            {/* Banner image placeholder */}
            <div className="relative rounded-2xl overflow-hidden mb-12 max-w-3xl">
              <div 
                className="aspect-[16/9] flex items-center justify-center"
                style={{ backgroundColor: `${AREA_COLOR}30` }}
              >
                {/* Placeholder for magazine covers image */}
                <div className="text-center p-8">
                  <div className="flex justify-center gap-4 mb-4">
                    {/* Magazine placeholder */}
                    <div className="w-24 h-32 sm:w-32 sm:h-40 bg-white rounded-lg shadow-lg flex items-center justify-center transform -rotate-6">
                      <div className="text-center">
                        <p className="text-xs font-bold" style={{ color: MAGENTA_COLOR }}>Magazine</p>
                        <div 
                          className="w-8 h-8 rounded-full mx-auto mt-2 flex items-center justify-center"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <span className="font-bold text-sm" style={{ color: TEXT_ON_COLOR }}>1</span>
                        </div>
                      </div>
                    </div>
                    {/* Activity book placeholder */}
                    <div className="w-24 h-32 sm:w-32 sm:h-40 bg-white rounded-lg shadow-lg flex items-center justify-center transform rotate-3">
                      <div className="text-center">
                        <p className="text-xs font-bold" style={{ color: MAGENTA_COLOR }}>Activity</p>
                        <div 
                          className="w-8 h-8 rounded-full mx-auto mt-2 flex items-center justify-center"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <span className="font-bold text-sm" style={{ color: TEXT_ON_COLOR }}>1</span>
                        </div>
                      </div>
                    </div>
                    {/* Teacher guide placeholder */}
                    <div className="w-24 h-32 sm:w-32 sm:h-40 bg-white rounded-lg shadow-lg flex items-center justify-center transform rotate-6">
                      <div className="text-center">
                        <GraduationCap className="w-6 h-6 mx-auto mb-1" style={{ color: MAGENTA_COLOR }} />
                        <p className="text-xs font-bold" style={{ color: MAGENTA_COLOR }}>Guide</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="inline-block px-4 py-2 rounded-lg"
                    style={{ backgroundColor: MAGENTA_COLOR }}
                  >
                    <p className="text-white text-xs sm:text-sm font-medium">
                      Learn English to talk about you and your people.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Issue 1 Content */}
            {funzineIssues.filter(i => i.available).map((issue) => (
              <div 
                key={issue.slug}
                ref={(el) => { issueRefs.current[issue.slug] = el; }}
                className="mb-16 scroll-mt-24"
              >
                <Link
                  href={`/area/lenguas-extranjeras/materiales/ingles/${issue.slug}`}
                  className="group block"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-[#494963] mb-8 flex items-center gap-3 hover:text-[#494963]/80 transition-colors">
                    {issue.title}
                    <ChevronRight className="w-5 h-5 text-[#494963]/30 group-hover:text-[#494963]/60 group-hover:translate-x-1 transition-all" />
                  </h2>
                </Link>

                {/* Materials grid */}
                <div className="space-y-8">
                  {/* 01. Magazine */}
                  <MaterialCard
                    number="01"
                    title="Magazine"
                    issueSlug={issue.slug}
                  />

                  {/* 02. Activity Book */}
                  <MaterialCard
                    number="02"
                    title="Activity Book"
                    issueSlug={issue.slug}
                  />

                  {/* 03. Teacher Guide */}
                  <MaterialCard
                    number="03"
                    title="Teacher Guide"
                    issueSlug={issue.slug}
                  />
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

/* Material Card Component */
function MaterialCard({ 
  number, 
  title, 
  issueSlug 
}: { 
  number: string; 
  title: string; 
  issueSlug: string;
}) {
  const [activeTab, setActiveTab] = useState<"audios" | "videos">("audios");

  const audios = [
    { id: "t1", name: `Track 01 - Welcome Song`, duration: "2:34" },
    { id: "t2", name: `Track 02 - Hello Chant`, duration: "1:45" },
    { id: "t3", name: `Track 03 - My Name Is...`, duration: "2:12" },
    { id: "t4", name: `Track 04 - Numbers Song`, duration: "2:58" },
    { id: "t5", name: `Track 05 - Colors Rhyme`, duration: "1:55" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold text-[#494963]/40 mb-2">
          {number}.{title}
        </p>

        {/* Google Slides embed placeholder */}
        <div className="aspect-[4/3] bg-gray-50 rounded-xl mb-4 flex items-center justify-center border border-gray-100">
          <div className="text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-[#494963]/20" />
            <p className="text-xs text-[#494963]/40">Vista previa del documento</p>
            <p className="text-[10px] text-[#494963]/30 mt-1">Google Slides</p>
          </div>
        </div>

        {/* Download button */}
        <Link
          href={`/area/lenguas-extranjeras/materiales/ingles/${issueSlug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md"
          style={{ backgroundColor: MAGENTA_COLOR, color: "white" }}
        >
          <FileText className="w-4 h-4" />
          Descargar PDF
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-4 mt-6 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === "audios" 
                ? "bg-gray-100 text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <FileText className="w-3 h-3" />
            Audios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-gray-100 text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <Play className="w-3 h-3" />
            Videos
          </button>
          
          <span className="ml-auto text-[10px] text-[#494963]/30">
            Descargar todos
          </span>
        </div>

        {/* Content */}
        {activeTab === "audios" && (
          <div>
            <p className="text-[10px] font-semibold text-[#494963]/30 uppercase tracking-wider mb-2">
              Lista de audios
            </p>
            <div className="space-y-1">
              {audios.map((audio) => (
                <div 
                  key={audio.id}
                  className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${AREA_COLOR}20` }}
                    >
                      <Play className="w-3 h-3" style={{ color: TEXT_ON_COLOR }} />
                    </div>
                    <span className="text-xs text-[#494963]/70">{audio.name}</span>
                  </div>
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: MAGENTA_COLOR }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "videos" && (
          <div className="py-4 text-center">
            <p className="text-xs text-[#494963]/40">Videos no disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}
