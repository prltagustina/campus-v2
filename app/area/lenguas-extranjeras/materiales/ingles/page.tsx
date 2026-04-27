"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronRight,
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

/* Audio/Video data */
const mediaData = {
  audios: [
    { id: "t1", name: "Track 01 - Welcome Song", duration: "2:34", url: "#" },
    { id: "t2", name: "Track 02 - Hello Chant", duration: "1:45", url: "#" },
    { id: "t3", name: "Track 03 - My Name Is...", duration: "2:12", url: "#" },
    { id: "t4", name: "Track 04 - Numbers Song", duration: "2:58", url: "#" },
    { id: "t5", name: "Track 05 - Colors Rhyme", duration: "1:55", url: "#" },
  ],
  videos: [
    { id: "v1", name: "Video 01 - Introduction", duration: "3:20", url: "#" },
    { id: "v2", name: "Video 02 - Hello Song", duration: "2:45", url: "#" },
    { id: "v3", name: "Video 03 - My Family", duration: "4:10", url: "#" },
  ],
};

export default function InglesMaterilesPage() {
  const [activeSection, setActiveSection] = useState("presentacion");
  const presentacionRef = useRef<HTMLDivElement>(null);
  const magazineRef = useRef<HTMLDivElement>(null);
  const activityBookRef = useRef<HTMLDivElement>(null);
  const teachersGuideRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Main content wrapper */}
      <div className="flex flex-1 mt-16 relative">
        {/* Background SVG - positioned and sized correctly */}
        <div className="absolute inset-x-0 top-0 w-full pointer-events-none z-0">
          <Image
            src="/images/funzine-background.svg"
            alt=""
            width={1920}
            height={900}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Sidebar - fixed on desktop */}
        <aside className="hidden lg:block w-52 xl:w-60 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-10">
          <div className="p-4 xl:p-5">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-[10px] text-[#494963]/50 hover:text-[#494963] transition-colors mb-6"
            >
              <ArrowLeft className="w-3 h-3" />
              Volver al inicio
            </Link>

            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = activeSection === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all ${
                      isActive 
                        ? "bg-white/80" 
                        : "hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          isActive ? "bg-white shadow-sm" : "bg-white/60"
                        }`}
                      >
                        <IconComponent 
                          className={`w-3.5 h-3.5 transition-colors ${
                            isActive ? "text-[#494963]" : "text-[#494963]/40"
                          }`}
                        />
                      </div>
                      <div>
                        <span className={`text-[9px] font-bold uppercase tracking-wide block ${isActive ? "text-[#494963]" : "text-[#494963]/40"}`}>
                          {item.label}
                        </span>
                        <p className={`text-[8px] leading-tight mt-0.5 ${isActive ? "text-[#494963]/60" : "text-[#494963]/30"}`}>
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

        {/* Main content - centered */}
        <main className="flex-1 overflow-hidden relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero section */}
            <section className="pt-6 sm:pt-8 lg:pt-10">
              {/* Mobile back button */}
              <div className="lg:hidden mb-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-[10px] text-[#494963]/70 hover:text-[#494963] transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Volver al inicio
                </Link>
              </div>

              {/* Logo and Tagline */}
              <div className="mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                  alt="English Funzine"
                  width={400}
                  height={120}
                  className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] h-auto"
                  priority
                />
                
                {/* Tagline - The magazine that makes English fun! */}
                <div className="flex items-center gap-2 sm:gap-3 mt-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-IT34i2R2KxWNrQUNqTTfmztloIwOs6.svg"
                    alt="The magazine that makes"
                    width={200}
                    height={20}
                    className="h-4 sm:h-5 lg:h-6 w-auto"
                  />
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-N1q7YSUUn0jkppVWrDW7saBJh09H1F.png"
                    alt="English fun!"
                    width={120}
                    height={30}
                    className="h-5 sm:h-6 lg:h-7 w-auto"
                  />
                </div>
              </div>
            </section>

            {/* Video de presentacion */}
            <section ref={presentacionRef} id="presentacion" className="py-4 scroll-mt-20">
              <p className="text-[9px] font-semibold text-[#494963]/40 uppercase tracking-wider mb-2">
                Video de presentacion
              </p>
              <div className="rounded-xl overflow-hidden bg-[#494963]/10 aspect-video max-w-lg flex items-center justify-center border border-[#494963]/10">
                <div className="text-center">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: AREA_COLOR }}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Intro text */}
            <section className="py-4">
              <p className="text-xs sm:text-sm text-[#494963]/70 leading-relaxed max-w-lg">
                Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
                en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
              </p>
            </section>

            {/* Issues section */}
            <section className="py-6">
              {/* Issues selector */}
              <div className="flex items-center gap-2 mb-3">
                <BookOpenCheck className="w-3.5 h-3.5 text-[#494963]/40" />
                <span className="text-[9px] font-semibold text-[#494963]/40 uppercase tracking-wider">
                  Issues
                </span>
              </div>
              
              {/* Issue buttons - MINIMALISTA Y CIRCULAR */}
              <div className="flex items-center gap-2 mb-6">
                {funzineIssues.map((issue) => (
                  issue.available ? (
                    <button
                      key={issue.slug}
                      type="button"
                      onClick={() => scrollToSection("magazine")}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                      style={{ backgroundColor: AREA_COLOR }}
                      title={issue.title}
                    >
                      <span className="text-sm sm:text-base font-bold" style={{ color: TEXT_ON_COLOR }}>
                        {issue.number}
                      </span>
                    </button>
                  ) : (
                    <div
                      key={issue.slug}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/60 border border-[#494963]/10"
                      title="Proximamente"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#494963]/30">
                        {issue.number}
                      </span>
                    </div>
                  )
                ))}
              </div>

              {/* Magazine covers banner */}
              <div className="relative mb-8 max-w-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                  alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                  width={600}
                  height={350}
                  className="w-full h-auto"
                />
                {/* Learn English banner overlay */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 max-w-[100px] sm:max-w-[140px] lg:max-w-[160px]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-english-banner-pkWwUyCjl66AxjfaNTILQNJYiR7xr4.png"
                    alt="Learn English to talk about you and your people."
                    width={160}
                    height={60}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Issue 1 Title */}
              <div className="mb-5">
                <h2 className="text-base sm:text-lg font-bold text-[#494963] flex items-center gap-2">
                  It&apos;s great to be me
                  <ChevronRight className="w-3.5 h-3.5 text-[#494963]/30" />
                </h2>
              </div>

              {/* Materials */}
              <div className="space-y-6">
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
          </div>
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

  const currentMedia = activeTab === "audios" ? mediaData.audios : mediaData.videos;

  const handleDownloadAll = () => {
    // Simular descarga de todos los archivos
    currentMedia.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.url;
      link.download = item.name;
      link.click();
    });
  };

  const handleDownloadSingle = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  return (
    <div className="bg-[#FFF9E6] rounded-xl overflow-hidden">
      <div className="p-3 sm:p-4">
        <p className="text-[9px] font-semibold text-[#494963]/40 mb-2">
          {number}.{title}
        </p>

        {/* PDF preview - tamaño reducido */}
        <div className="aspect-[4/3] bg-white rounded-lg mb-2 overflow-hidden border border-gray-100 shadow-sm max-w-sm">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title={`${title} Preview`}
          />
        </div>

        {/* Google Slides link */}
        <div className="flex justify-end mb-2">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-[#494963]/40 hover:text-[#494963]/60 transition-colors"
          >
            Google Slides
          </a>
        </div>

        {/* Download button - AMARILLO, SIN BORDES REDONDEADOS */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-3 h-3" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-4 mb-2">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-medium transition-all ${
              activeTab === "audios" 
                ? "bg-white text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <FileText className="w-2.5 h-2.5" />
            Audios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-white text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <Play className="w-2.5 h-2.5" />
            Videos
          </button>
          
          <button
            type="button"
            onClick={handleDownloadAll}
            className="ml-auto text-[8px] text-[#494963]/30 hover:text-[#494963]/50 transition-colors flex items-center gap-1"
          >
            <Download className="w-2.5 h-2.5" />
            Descargar todos
          </button>
        </div>

        {/* Content - Audios */}
        {activeTab === "audios" && (
          <div>
            <p className="text-[8px] font-semibold text-[#494963]/30 uppercase tracking-wider mb-1.5">
              Lista de audios
            </p>
            <div className="space-y-0.5">
              {mediaData.audios.map((audio) => (
                <div 
                  key={audio.id}
                  className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-white/50 transition-colors group"
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${AREA_COLOR}40` }}
                    >
                      <Play className="w-2 h-2" style={{ color: TEXT_ON_COLOR }} />
                    </div>
                    <span className="text-[9px] text-[#494963]/70 truncate">{audio.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(audio.url, audio.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="w-3 h-3 text-[#494963]/40 hover:text-[#494963]/70" />
                    </button>
                    <div 
                      className="w-0.5 h-3 rounded-full"
                      style={{ backgroundColor: ORANGE_COLOR }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content - Videos */}
        {activeTab === "videos" && (
          <div>
            <p className="text-[8px] font-semibold text-[#494963]/30 uppercase tracking-wider mb-1.5">
              Lista de videos
            </p>
            <div className="space-y-0.5">
              {mediaData.videos.map((video) => (
                <div 
                  key={video.id}
                  className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-white/50 transition-colors group"
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${AREA_COLOR}40` }}
                    >
                      <Play className="w-2 h-2" style={{ color: TEXT_ON_COLOR }} />
                    </div>
                    <span className="text-[9px] text-[#494963]/70 truncate">{video.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(video.url, video.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="w-3 h-3 text-[#494963]/40 hover:text-[#494963]/70" />
                    </button>
                    <div 
                      className="w-0.5 h-3 rounded-full"
                      style={{ backgroundColor: ORANGE_COLOR }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
