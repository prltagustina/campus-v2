"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronRight,
  Clock,
  Play,
  Download,
  Pencil,
  Apple,
  FileText,
  BookOpenCheck,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";
const ORANGE_COLOR = "#F7941D";

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

/* Sidebar navigation items with icons */
const sidebarItems = [
  { id: "presentacion", label: "PRESENTACION", sublabel: "Video de inicio", icon: Play },
  { id: "magazine", label: "MAGAZINE", sublabel: "Revista para estudiantes", icon: BookOpen },
  { id: "activity-book", label: "ACTIVITY BOOK", sublabel: "Libro de actividades de Funzine", icon: Pencil },
  { id: "teachers-guide", label: "TEACHER'S GUIDE", sublabel: "Guia para docentes de Funzine en el aula", icon: Apple },
];

/* PDF URLs */
const pdfUrls = {
  magazine: "https://blobs.vusercontent.net/blob/Funzine_Revista_10.04%20%28Con%20correcciones%29_compressed-p1OLrmR5WiVqkGLnCsSwdfWGcr146s.pdf",
  activityBook: "https://blobs.vusercontent.net/blob/Funzine_ActivityBook%2008.04.2026%20%28Con%20correcciones%29_compressed-uzr1tIOQJRw8M8kvs1yL61iq4X2tt6.pdf",
  teachersGuide: "https://blobs.vusercontent.net/blob/Teacher%27s%20Guide%2010.04-%20U%CC%81ltima%20versio%CC%81n%20%28con%20correcciones%29_compressed-uoUpZxcEDQ5wMwaWnaUIUy6A2hXmr9.pdf",
};

export default function InglesMaterilesPage() {
  const [activeSection, setActiveSection] = useState("presentacion");
  const presentacionRef = useRef<HTMLDivElement>(null);
  const magazineRef = useRef<HTMLDivElement>(null);
  const activityBookRef = useRef<HTMLDivElement>(null);
  const teachersGuideRef = useRef<HTMLDivElement>(null);

  // Scroll to section when clicking sidebar
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
      presentacion: presentacionRef,
      magazine: magazineRef,
      "activity-book": activityBookRef,
      "teachers-guide": teachersGuideRef,
    };
    const ref = refs[sectionId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main content wrapper with background */}
      <div className="flex flex-1 mt-16 relative">
        {/* Background SVG - covers the entire content area */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage: "url('/images/funzine-background.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            minHeight: "100%",
          }}
        />

        {/* Sidebar - fixed on desktop, above background */}
        <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-10">
          <div className="p-4 xl:p-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs text-[#494963]/50 hover:text-[#494963] transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al inicio
            </Link>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = activeSection === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      isActive 
                        ? "bg-white/80" 
                        : "hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          isActive ? "bg-white shadow-sm" : "bg-white/60"
                        }`}
                      >
                        <IconComponent 
                          className={`w-4 h-4 transition-colors ${
                            isActive ? "text-[#494963]" : "text-[#494963]/40"
                          }`}
                        />
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wide block ${isActive ? "text-[#494963]" : "text-[#494963]/40"}`}>
                          {item.label}
                        </span>
                        <p className={`text-[9px] leading-tight mt-0.5 ${isActive ? "text-[#494963]/60" : "text-[#494963]/30"}`}>
                          {item.sublabel}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main content - above background */}
        <main className="flex-1 overflow-hidden relative z-10">
          {/* Hero section */}
          <section className="relative pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8">
            {/* Mobile back button */}
            <div className="lg:hidden mb-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs text-[#494963]/70 hover:text-[#494963] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver al inicio
              </Link>
            </div>

            {/* Logo and Tagline */}
            <div className="max-w-lg mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                alt="English Funzine"
                width={400}
                height={120}
                className="w-full max-w-[300px] sm:max-w-[380px] h-auto"
                priority
              />
              
              {/* Tagline - The magazine that makes English fun! - SOLO UNO, MAS GRANDE */}
              <div className="flex items-center gap-3 mt-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-IT34i2R2KxWNrQUNqTTfmztloIwOs6.svg"
                  alt="The magazine that makes"
                  width={240}
                  height={24}
                  className="h-5 sm:h-6 w-auto"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-N1q7YSUUn0jkppVWrDW7saBJh09H1F.png"
                  alt="English fun!"
                  width={140}
                  height={36}
                  className="h-6 sm:h-8 w-auto"
                />
              </div>
            </div>
          </section>

          {/* Video de presentacion */}
          <section ref={presentacionRef} id="presentacion" className="px-4 sm:px-6 lg:px-8 py-6 scroll-mt-20">
            <p className="text-[10px] font-semibold text-[#494963]/40 uppercase tracking-wider mb-2">
              Video de presentacion
            </p>
            <div className="rounded-xl overflow-hidden bg-[#494963]/10 aspect-video max-w-xl flex items-center justify-center border border-[#494963]/10">
              <div className="text-center">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: AREA_COLOR }}
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                </div>
              </div>
            </div>
          </section>

          {/* Intro text */}
          <section className="px-4 sm:px-6 lg:px-8 pb-8">
            <p className="text-sm text-[#494963]/70 leading-relaxed max-w-xl">
              Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
              Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
              en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
            </p>
          </section>

          {/* Issues section */}
          <section className="px-4 sm:px-6 lg:px-8 pb-10">
            {/* Issues selector - minimalista */}
            <div className="flex items-center gap-2 mb-4">
              <BookOpenCheck className="w-4 h-4 text-[#494963]/40" />
              <span className="text-[10px] font-semibold text-[#494963]/40 uppercase tracking-wider">
                Issues
              </span>
            </div>
            
            {/* Issue buttons - MINIMALISTA Y CIRCULAR */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {funzineIssues.map((issue) => (
                issue.available ? (
                  <button
                    key={issue.slug}
                    type="button"
                    onClick={() => scrollToSection("magazine")}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                    style={{ backgroundColor: AREA_COLOR, border: `2px solid ${AREA_COLOR}` }}
                    title={issue.title}
                  >
                    <span className="text-base sm:text-lg font-bold" style={{ color: TEXT_ON_COLOR }}>
                      {issue.number}
                    </span>
                  </button>
                ) : (
                  <div
                    key={issue.slug}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/60 border-2 border-[#494963]/10"
                    title="Proximamente"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#494963]/30">
                      {issue.number}
                    </span>
                  </div>
                )
              ))}
            </div>

            {/* Magazine covers banner */}
            <div className="relative mb-10 max-w-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                width={700}
                height={400}
                className="w-full h-auto"
              />
              {/* Learn English banner overlay */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 max-w-[140px] sm:max-w-[200px]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-english-banner-pkWwUyCjl66AxjfaNTILQNJYiR7xr4.png"
                  alt="Learn English to talk about you and your people."
                  width={200}
                  height={80}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Issue 1 Title */}
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#494963] flex items-center gap-2">
                It&apos;s great to be me
                <ChevronRight className="w-4 h-4 text-[#494963]/30" />
              </h2>
            </div>

            {/* Materials */}
            <div className="space-y-8 max-w-2xl">
              {/* 01. Magazine */}
              <div ref={magazineRef} id="magazine" className="scroll-mt-20">
                <MaterialCard
                  number="01"
                  title="Magazine"
                  pdfUrl={pdfUrls.magazine}
                />
              </div>

              {/* 02. Activity Book */}
              <div ref={activityBookRef} id="activity-book" className="scroll-mt-20">
                <MaterialCard
                  number="02"
                  title="Activity Book"
                  pdfUrl={pdfUrls.activityBook}
                />
              </div>

              {/* 03. Teacher Guide */}
              <div ref={teachersGuideRef} id="teachers-guide" className="scroll-mt-20">
                <MaterialCard
                  number="03"
                  title="Teacher Guide"
                  pdfUrl={pdfUrls.teachersGuide}
                />
              </div>
            </div>
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
  pdfUrl,
}: { 
  number: string; 
  title: string; 
  pdfUrl: string;
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
    <div className="bg-[#FFF9E6] rounded-xl overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-semibold text-[#494963]/40 mb-2">
          {number}.{title}
        </p>

        {/* PDF preview - MAS CHICO */}
        <div className="aspect-[4/3] bg-white rounded-lg mb-3 overflow-hidden border border-gray-100 shadow-sm max-w-md">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title={`${title} Preview`}
          />
        </div>

        {/* Google Slides link */}
        <div className="flex justify-end mb-3">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#494963]/40 hover:text-[#494963]/60 transition-colors"
          >
            Google Slides
          </a>
        </div>

        {/* Download button - AMARILLO, SIN BORDES REDONDEADOS */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-3.5 h-3.5" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex items-center gap-3 mt-5 mb-3">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
              activeTab === "audios" 
                ? "bg-white text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <FileText className="w-3 h-3" />
            Audios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-white text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <Play className="w-3 h-3" />
            Videos
          </button>
          
          <span className="ml-auto text-[9px] text-[#494963]/30 hover:text-[#494963]/50 cursor-pointer transition-colors">
            Descargar todos
          </span>
        </div>

        {/* Content */}
        {activeTab === "audios" && (
          <div>
            <p className="text-[9px] font-semibold text-[#494963]/30 uppercase tracking-wider mb-2">
              Lista de audios
            </p>
            <div className="space-y-0.5">
              {audios.map((audio) => (
                <div 
                  key={audio.id}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${AREA_COLOR}40` }}
                    >
                      <Play className="w-2.5 h-2.5" style={{ color: TEXT_ON_COLOR }} />
                    </div>
                    <span className="text-[10px] text-[#494963]/70">{audio.name}</span>
                  </div>
                  <div 
                    className="w-0.5 h-4 rounded-full"
                    style={{ backgroundColor: ORANGE_COLOR }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "videos" && (
          <div className="py-3 text-center">
            <p className="text-[10px] text-[#494963]/40">Videos no disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}
