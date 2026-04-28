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
    { id: "v1", name: "Video 01 - Introduction", duration: "3:20", url: "#", thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop" },
    { id: "v2", name: "Video 02 - Hello Song", duration: "2:45", url: "#", thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=200&fit=crop" },
    { id: "v3", name: "Video 03 - My Family", duration: "4:10", url: "#", thumbnail: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=300&h=200&fit=crop" },
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
        {/* Background SVG - positioned correctly to align with content */}
        <div className="absolute inset-x-0 top-0 w-full pointer-events-none z-0">
          <div className="relative w-full" style={{ maxHeight: "clamp(400px, 60vw, 700px)" }}>
            <Image
              src="/images/funzine-background.svg"
              alt=""
              width={1920}
              height={700}
              className="w-full h-auto object-cover object-top"
              style={{ maxHeight: "clamp(400px, 60vw, 700px)" }}
              priority
            />
          </div>
        </div>

        {/* Sidebar - fixed on desktop */}
        <aside className="hidden lg:block w-52 xl:w-60 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-10">
          <div className="p-4 xl:p-5">
            <Link 
              href="/area/lenguas-extranjeras" 
              className="inline-flex items-center gap-2 text-[10px] text-[#494963]/50 hover:text-[#494963] transition-colors mb-6"
            >
              <ArrowLeft className="w-3 h-3" />
              Volver a Lenguas Extranjeras
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero section */}
            <section className="pt-6 sm:pt-8 lg:pt-10">
              {/* Mobile back button */}
              <div className="lg:hidden mb-4">
                <Link 
                  href="/area/lenguas-extranjeras" 
                  className="inline-flex items-center gap-2 text-[10px] text-[#494963]/70 hover:text-[#494963] transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Volver a Lenguas Extranjeras
                </Link>
              </div>

              {/* Logo and Tagline */}
              <div className="mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                  alt="English Funzine"
                  width={450}
                  height={130}
                  className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] h-auto"
                  priority
                />
                
                {/* Tagline - The magazine that makes English fun! - MAS GRANDE */}
                <div className="flex items-center gap-3 sm:gap-4 mt-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-IT34i2R2KxWNrQUNqTTfmztloIwOs6.svg"
                    alt="The magazine that makes"
                    width={220}
                    height={24}
                    className="h-5 sm:h-6 lg:h-7 w-auto"
                  />
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-N1q7YSUUn0jkppVWrDW7saBJh09H1F.png"
                    alt="English fun!"
                    width={140}
                    height={36}
                    className="h-6 sm:h-7 lg:h-8 w-auto"
                  />
                </div>
              </div>
            </section>

            {/* Video de presentacion - CON Z-INDEX ALTO PARA ESTAR POR DELANTE */}
            <section ref={presentacionRef} id="presentacion" className="py-4 scroll-mt-20 relative z-20">
              <p className="text-[10px] font-semibold text-[#494963]/50 uppercase tracking-wider mb-3">
                Video de presentacion
              </p>
              <div className="rounded-xl overflow-hidden bg-[#3a3a4a] aspect-video max-w-xl flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: AREA_COLOR }}
                  >
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Intro text */}
            <section className="py-4 relative z-20">
              <p className="text-sm sm:text-base text-[#494963]/70 leading-relaxed max-w-xl">
                Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
                en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
              </p>
            </section>

            {/* Issues section */}
            <section className="py-6 relative z-20">
              {/* Issues selector */}
              <div className="flex items-center gap-2 mb-3">
                <BookOpenCheck className="w-4 h-4 text-[#494963]/40" />
                <span className="text-[10px] font-semibold text-[#494963]/50 uppercase tracking-wider">
                  Issues
                </span>
              </div>
              
              {/* Issue buttons - MINIMALISTA CON PROXIMAMENTE */}
              <div className="flex items-center gap-3 mb-8">
                {funzineIssues.map((issue) => (
                  issue.available ? (
                    <button
                      key={issue.slug}
                      type="button"
                      onClick={() => scrollToSection("magazine")}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md"
                      style={{ backgroundColor: AREA_COLOR }}
                      title={issue.title}
                    >
                      <span className="text-base sm:text-lg font-bold" style={{ color: TEXT_ON_COLOR }}>
                        {issue.number}
                      </span>
                    </button>
                  ) : (
                    <div
                      key={issue.slug}
                      className="relative group"
                      title="Proximamente"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/80 border-2 border-dashed border-[#494963]/15">
                        <span className="text-base sm:text-lg font-bold text-[#494963]/25">
                          {issue.number}
                        </span>
                      </div>
                      {/* Tooltip proximamente */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] text-[#494963]/40 whitespace-nowrap">Proximamente</span>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Magazine covers banner - RESPONSIVE PARA ALINEAR CON BACKGROUND */}
              <div className="relative mb-10 max-w-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                  alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                  width={700}
                  height={400}
                  className="w-full h-auto"
                />
                {/* Learn English banner overlay */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 max-w-[120px] sm:max-w-[160px] lg:max-w-[180px]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-english-banner-pkWwUyCjl66AxjfaNTILQNJYiR7xr4.png"
                    alt="Learn English to talk about you and your people."
                    width={180}
                    height={70}
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

              {/* Materials - MAS GRANDES Y LEGIBLES */}
              <div className="space-y-8">
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

/* Material Card Component - MAS GRANDE Y LEGIBLE */
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
    <div className="bg-[#FFF9E6] rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-5 lg:p-6">
        <p className="text-xs sm:text-sm font-semibold text-[#494963]/50 mb-3">
          {number}.{title}
        </p>

        {/* PDF preview - TAMAÑO MEDIANO LEGIBLE */}
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

        {/* Download button - AMARILLO CON BORDER RADIUS */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium transition-all hover:opacity-90 rounded-lg"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-3.5 h-3.5" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-5 mb-3">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === "audios" 
                ? "bg-white text-[#494963] shadow-sm" 
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
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <Play className="w-3 h-3" />
            Videos
          </button>
          
          <button
            type="button"
            onClick={handleDownloadAll}
            className="ml-auto text-[10px] text-[#494963]/40 hover:text-[#494963]/60 transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Descargar todos
          </button>
        </div>

        {/* Content - Audios con SCROLL */}
        {activeTab === "audios" && (
          <div>
            <p className="text-[10px] font-semibold text-[#494963]/40 uppercase tracking-wider mb-2">
              Lista de audios
            </p>
            {/* Contenedor con scroll */}
            <div className="max-h-48 overflow-y-auto pr-2 border-l-2 pl-3" style={{ borderColor: ORANGE_COLOR }}>
              <div className="space-y-1">
                {mediaData.audios.map((audio) => (
                  <div 
                    key={audio.id}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${AREA_COLOR}40` }}
                      >
                        <Play className="w-2.5 h-2.5" style={{ color: TEXT_ON_COLOR }} />
                      </div>
                      <span className="text-xs text-[#494963]/70 truncate">{audio.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(audio.url, audio.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      <Download className="w-3.5 h-3.5 text-[#494963]/40 hover:text-[#494963]/70" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content - Videos con PREVIEWS y SCROLL */}
        {activeTab === "videos" && (
          <div>
            <p className="text-[10px] font-semibold text-[#494963]/40 uppercase tracking-wider mb-2">
              Lista de videos
            </p>
            {/* Contenedor con scroll */}
            <div className="max-h-64 overflow-y-auto pr-2 border-l-2 pl-3" style={{ borderColor: ORANGE_COLOR }}>
              <div className="space-y-3">
                {mediaData.videos.map((video) => (
                  <div 
                    key={video.id}
                    className="flex items-start gap-3 py-2 px-2 rounded-lg hover:bg-white/50 transition-colors group"
                  >
                    {/* Video thumbnail preview */}
                    <div className="relative w-24 sm:w-28 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image
                        src={video.thumbnail}
                        alt={video.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <Play className="w-3 h-3 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 text-[8px] text-white bg-black/60 px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0 pt-1">
                      <span className="text-xs text-[#494963]/70 block truncate">{video.name}</span>
                      <span className="text-[10px] text-[#494963]/40">{video.duration}</span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(video.url, video.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 mt-1"
                    >
                      <Download className="w-3.5 h-3.5 text-[#494963]/40 hover:text-[#494963]/70" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
