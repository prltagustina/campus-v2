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
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header />
      
      {/* MAIN LAYOUT con background superpuesto */}
      <main className="relative mt-16 flex-1">
        {/* Background PNG - posicionado absolutamente y por DELANTE de la seccion de materiales */}
        <div 
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{ 
            height: 'clamp(600px, 85vh, 1000px)',
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-BXmAFTAagUeCfrTZzpxxVgjvDezd4c.png"
            alt=""
            fill
            className="object-cover object-top"
            style={{ objectPosition: 'center top' }}
            priority
          />
        </div>

        {/* Contenido - dividido en dos secciones */}
        <div className="relative">
          {/* HERO SECTION - Contenido sobre el background amarillo */}
          <section className="relative z-20 pointer-events-auto">
            <div className="flex">
              {/* Sidebar - dentro del hero para desktop */}
              <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
                <div className="sticky top-20 p-5 xl:p-6">
                  <Link 
                    href="/area/lenguas-extranjeras" 
                    className="inline-flex items-center gap-2 text-sm text-[#494963]/80 hover:text-[#494963] transition-colors mb-8 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Lenguas Extranjeras
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
                              ? "bg-white/90 shadow-sm" 
                              : "hover:bg-white/60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                isActive ? "bg-white shadow-sm" : "bg-white/70"
                              }`}
                            >
                              <IconComponent 
                                className={`w-5 h-5 transition-colors ${
                                  isActive ? "text-[#494963]" : "text-[#494963]/50"
                                }`}
                              />
                            </div>
                            <div>
                              <span className={`text-xs font-bold uppercase tracking-wide block ${isActive ? "text-[#494963]" : "text-[#494963]/50"}`}>
                                {item.label}
                              </span>
                              <p className={`text-[11px] leading-tight mt-1 ${isActive ? "text-[#494963]/70" : "text-[#494963]/40"}`}>
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

              {/* Main hero content */}
              <div className="flex-1 px-5 sm:px-8 lg:px-10 pb-0">
                <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-4 xl:ml-8">
                  {/* Mobile back button */}
                  <div className="lg:hidden pt-5 mb-5">
                    <Link 
                      href="/area/lenguas-extranjeras" 
                      className="inline-flex items-center gap-2 text-sm text-[#494963]/80 hover:text-[#494963] transition-colors font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver a Lenguas Extranjeras
                    </Link>
                  </div>

                  {/* Logo */}
                  <div className="pt-6 lg:pt-10 mb-5">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                      alt="English Funzine"
                      width={500}
                      height={140}
                      className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] h-auto"
                      priority
                    />
                  </div>
                  
                  {/* Tagline - The magazine that makes English fun! */}
                  <div className="mb-10 sm:mb-12">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-f811IynMCsQ7XvD0Q8zJl9pEbfUSCx.png"
                      alt="The magazine that makes English fun!"
                      width={450}
                      height={55}
                      className="h-10 sm:h-12 lg:h-14 w-auto"
                    />
                  </div>

                  {/* Video de presentacion */}
                  <div ref={presentacionRef} id="presentacion" className="scroll-mt-20 mb-8">
                    <p className="text-sm font-semibold text-[#494963] uppercase tracking-wider mb-4">
                      Video de presentacion
                    </p>
                    <div className="rounded-xl overflow-hidden bg-[#3a3a4a] aspect-video max-w-xl flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1" style={{ color: TEXT_ON_COLOR }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intro text */}
                  <p className="text-base sm:text-lg lg:text-xl text-[#494963]/80 leading-relaxed max-w-xl mb-8">
                    Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                    Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
                    en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
                  </p>

                  {/* Issues section */}
                  <div className="mb-8">
                    {/* Issues selector */}
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpenCheck className="w-6 h-6 text-[#494963]/60" />
                      <span className="text-sm font-semibold text-[#494963]/70 uppercase tracking-wider">
                        Issues
                      </span>
                    </div>
                    
                    {/* Issue buttons - SIN linea punteada, colores que contrastan */}
                    <div className="flex items-center gap-4 mb-8">
                      {funzineIssues.map((issue) => (
                        issue.available ? (
                          <button
                            key={issue.slug}
                            type="button"
                            onClick={() => scrollToSection("magazine")}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md bg-white"
                            title={issue.title}
                          >
                            <span className="text-xl sm:text-2xl font-bold text-[#494963]">
                              {issue.number}
                            </span>
                          </button>
                        ) : (
                          <div
                            key={issue.slug}
                            className="relative group"
                            title="Proximamente"
                          >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white/40 backdrop-blur-sm">
                              <span className="text-xl sm:text-2xl font-bold text-[#494963]/40">
                                {issue.number}
                              </span>
                            </div>
                            {/* Tooltip proximamente */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <span className="text-xs text-[#494963]/60 whitespace-nowrap bg-white/90 px-3 py-1 rounded-full shadow-sm">Proximamente</span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Magazine covers banner - posicionado para coincidir con la punta del background */}
                  <div className="relative pb-16 sm:pb-20 lg:pb-24">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                      alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                      width={750}
                      height={450}
                      className="w-full max-w-2xl lg:max-w-3xl h-auto"
                    />
                    {/* Learn English banner overlay */}
                    <div className="absolute bottom-20 sm:bottom-24 lg:bottom-28 right-0 sm:right-4 lg:right-8 max-w-[160px] sm:max-w-[200px] lg:max-w-[260px]">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-english-banner-pkWwUyCjl66AxjfaNTILQNJYiR7xr4.png"
                        alt="Learn English to talk about you and your people."
                        width={260}
                        height={100}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MATERIALS SECTION - Por debajo del background (z-index menor) */}
          <section className="relative z-0 bg-[#FDFBF7]">
            <div className="flex">
              {/* Sidebar placeholder for layout alignment on desktop */}
              <div className="hidden lg:block w-56 xl:w-64 flex-shrink-0" />
              
              {/* Materials content */}
              <div className="flex-1 px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
                <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-4 xl:ml-8">
                  {/* Issue 1 Title */}
                  <div className="mb-10">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#494963] flex items-center gap-3">
                      It&apos;s great to be me
                      <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-[#494963]/30" />
                    </h2>
                  </div>

                  {/* Materials */}
                  <div className="space-y-12 lg:space-y-16">
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

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
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-lg sm:text-xl font-semibold text-[#494963]/70 mb-6">
          {number}.{title}
        </p>

        {/* PDF preview - MAS GRANDE */}
        <div className="aspect-[4/3] bg-white rounded-xl mb-5 overflow-hidden border border-gray-100 shadow-sm max-w-xl lg:max-w-2xl">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title={`${title} Preview`}
          />
        </div>

        {/* Google Slides link */}
        <div className="flex justify-end mb-5">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#494963]/50 hover:text-[#494963]/70 transition-colors"
          >
            Google Slides
          </a>
        </div>

        {/* Download button - CON BORDER RADIUS */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium transition-all hover:opacity-90 rounded-lg"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-5 h-5" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex items-center gap-3 mt-8 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-medium transition-all ${
              activeTab === "audios" 
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/50 hover:text-[#494963]/70"
            }`}
          >
            <FileText className="w-4 h-4" />
            Audios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/50 hover:text-[#494963]/70"
            }`}
          >
            <Play className="w-4 h-4" />
            Videos
          </button>
          
          <button
            type="button"
            onClick={handleDownloadAll}
            className="ml-auto text-sm text-[#494963]/50 hover:text-[#494963]/70 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Descargar todos
          </button>
        </div>

        {/* Content - Audios (SIN linea lateral) */}
        {activeTab === "audios" && (
          <div>
            <p className="text-sm font-semibold text-[#494963]/50 uppercase tracking-wider mb-4">
              Lista de audios
            </p>
            {/* Contenedor con scroll continuo - SIN borde lateral */}
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin">
              <div className="space-y-1">
                {mediaData.audios.map((audio) => (
                  <div 
                    key={audio.id}
                    className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/60 transition-colors group"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${AREA_COLOR}40` }}
                      >
                        <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                      </div>
                      <span className="text-sm text-[#494963]/70 truncate">{audio.name}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-[#494963]/40">{audio.duration}</span>
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(audio.url, audio.name)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-white"
                      >
                        <Download className="w-4 h-4 text-[#494963]/50" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content - Videos con thumbnails (SIN linea lateral) */}
        {activeTab === "videos" && (
          <div>
            <p className="text-sm font-semibold text-[#494963]/50 uppercase tracking-wider mb-4">
              Lista de videos
            </p>
            {/* Contenedor con scroll continuo - SIN borde lateral */}
            <div className="max-h-72 overflow-y-auto pr-2 scrollbar-thin">
              <div className="space-y-3">
                {mediaData.videos.map((video) => (
                  <div 
                    key={video.id}
                    className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-white/60 transition-colors group"
                  >
                    {/* Video thumbnail */}
                    <div className="relative w-28 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image
                        src={video.thumbnail}
                        alt={video.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-4 h-4 ml-0.5 text-[#494963]" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-[#494963]/80 block truncate">{video.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(video.url, video.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white flex-shrink-0"
                    >
                      <Download className="w-4 h-4 text-[#494963]/50" />
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
