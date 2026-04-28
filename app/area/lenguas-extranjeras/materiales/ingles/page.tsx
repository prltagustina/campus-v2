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
      
      {/* HERO SECTION CON BACKGROUND - El fondo amarillo cubre esta seccion */}
      <section className="relative mt-16 overflow-hidden">
        {/* Background SVG - posicionado absolutamente */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-KVYM585uepR1UTboJyPKWxpx5b9iR5.svg"
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Hero content - por encima del background */}
        <div className="relative z-10 flex">
          {/* Sidebar - dentro del hero para desktop */}
          <aside className="hidden lg:block w-52 xl:w-60 flex-shrink-0">
            <div className="sticky top-20 p-4 xl:p-5">
              <Link 
                href="/area/lenguas-extranjeras" 
                className="inline-flex items-center gap-2 text-[10px] text-[#494963]/70 hover:text-[#494963] transition-colors mb-6"
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

          {/* Main hero content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
            <div className="max-w-3xl mx-auto lg:mx-0">
              {/* Mobile back button */}
              <div className="lg:hidden pt-4 mb-4">
                <Link 
                  href="/area/lenguas-extranjeras" 
                  className="inline-flex items-center gap-2 text-[10px] text-[#494963]/70 hover:text-[#494963] transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Volver a Lenguas Extranjeras
                </Link>
              </div>

              {/* Logo */}
              <div className="pt-4 lg:pt-8 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                  alt="English Funzine"
                  width={450}
                  height={130}
                  className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[450px] h-auto"
                  priority
                />
              </div>
              
              {/* Tagline - The magazine that makes English fun! */}
              <div className="mb-8 sm:mb-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-f811IynMCsQ7XvD0Q8zJl9pEbfUSCx.png"
                  alt="The magazine that makes English fun!"
                  width={400}
                  height={50}
                  className="h-8 sm:h-10 lg:h-12 w-auto"
                />
              </div>

              {/* Video de presentacion */}
              <div ref={presentacionRef} id="presentacion" className="scroll-mt-20 mb-6">
                <p className="text-[10px] font-semibold text-[#494963] uppercase tracking-wider mb-3">
                  Video de presentacion
                </p>
                <div className="rounded-xl overflow-hidden bg-[#3a3a4a] aspect-video max-w-xl flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-110"
                      style={{ backgroundColor: AREA_COLOR }}
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Intro text */}
              <p className="text-sm sm:text-base text-[#494963]/80 leading-relaxed max-w-xl mb-6">
                Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
                en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
              </p>

              {/* Issues section */}
              <div className="mb-6">
                {/* Issues selector */}
                <div className="flex items-center gap-2 mb-3">
                  <BookOpenCheck className="w-4 h-4 text-[#494963]/50" />
                  <span className="text-[10px] font-semibold text-[#494963]/60 uppercase tracking-wider">
                    Issues
                  </span>
                </div>
                
                {/* Issue buttons */}
                <div className="flex items-center gap-3 mb-6">
                  {funzineIssues.map((issue) => (
                    issue.available ? (
                      <button
                        key={issue.slug}
                        type="button"
                        onClick={() => scrollToSection("magazine")}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md"
                        style={{ backgroundColor: AREA_COLOR }}
                        title={issue.title}
                      >
                        <span className="text-lg sm:text-xl font-bold" style={{ color: TEXT_ON_COLOR }}>
                          {issue.number}
                        </span>
                      </button>
                    ) : (
                      <div
                        key={issue.slug}
                        className="relative group"
                        title="Proximamente"
                      >
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/60 border-2 border-dashed border-[#494963]/20">
                          <span className="text-lg sm:text-xl font-bold text-[#494963]/30">
                            {issue.number}
                          </span>
                        </div>
                        {/* Tooltip proximamente */}
                        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <span className="text-[9px] text-[#494963]/50 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded">Proximamente</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Magazine covers banner */}
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                  alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                  width={700}
                  height={400}
                  className="w-full max-w-2xl h-auto"
                />
                {/* Learn English banner overlay */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-[140px] sm:max-w-[180px] lg:max-w-[220px]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-english-banner-pkWwUyCjl66AxjfaNTILQNJYiR7xr4.png"
                    alt="Learn English to talk about you and your people."
                    width={220}
                    height={85}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS SECTION - Fondo blanco/crema */}
      <section className="flex-1 bg-[#FDFBF7]">
        <div className="flex">
          {/* Sidebar placeholder for layout alignment on desktop */}
          <div className="hidden lg:block w-52 xl:w-60 flex-shrink-0" />
          
          {/* Materials content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            <div className="max-w-3xl mx-auto lg:mx-0">
              {/* Issue 1 Title */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#494963] flex items-center gap-2">
                  It&apos;s great to be me
                  <ChevronRight className="w-5 h-5 text-[#494963]/30" />
                </h2>
              </div>

              {/* Materials */}
              <div className="space-y-10">
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
      <div className="p-5 sm:p-6 lg:p-8">
        <p className="text-sm sm:text-base font-semibold text-[#494963]/60 mb-4">
          {number}.{title}
        </p>

        {/* PDF preview */}
        <div className="aspect-[4/3] bg-white rounded-lg mb-4 overflow-hidden border border-gray-100 shadow-sm max-w-lg">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title={`${title} Preview`}
          />
        </div>

        {/* Google Slides link */}
        <div className="flex justify-end mb-4">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#494963]/40 hover:text-[#494963]/60 transition-colors"
          >
            Google Slides
          </a>
        </div>

        {/* Download button */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all hover:opacity-90 rounded-lg"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-4 h-4" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-6 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "audios" 
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Audios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Videos
          </button>
          
          <button
            type="button"
            onClick={handleDownloadAll}
            className="ml-auto text-[11px] text-[#494963]/40 hover:text-[#494963]/60 transition-colors flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar todos
          </button>
        </div>

        {/* Content - Audios */}
        {activeTab === "audios" && (
          <div>
            <p className="text-[11px] font-semibold text-[#494963]/40 uppercase tracking-wider mb-3">
              Lista de audios
            </p>
            {/* Contenedor con scroll y borde continuo */}
            <div className="relative">
              <div 
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                style={{ backgroundColor: ORANGE_COLOR }}
              />
              <div className="max-h-56 overflow-y-auto pl-4 pr-1">
                <div className="space-y-1">
                  {mediaData.audios.map((audio) => (
                    <div 
                      key={audio.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${AREA_COLOR}40` }}
                        >
                          <Play className="w-3 h-3" style={{ color: TEXT_ON_COLOR }} />
                        </div>
                        <span className="text-sm text-[#494963]/70 truncate">{audio.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#494963]/40">{audio.duration}</span>
                        <button
                          type="button"
                          onClick={() => handleDownloadSingle(audio.url, audio.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white rounded-lg"
                          title="Descargar"
                        >
                          <Download className="w-3.5 h-3.5 text-[#494963]/50" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content - Videos */}
        {activeTab === "videos" && (
          <div>
            <p className="text-[11px] font-semibold text-[#494963]/40 uppercase tracking-wider mb-3">
              Lista de videos
            </p>
            {/* Contenedor con scroll y borde continuo */}
            <div className="relative">
              <div 
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                style={{ backgroundColor: ORANGE_COLOR }}
              />
              <div className="max-h-72 overflow-y-auto pl-4 pr-1">
                <div className="space-y-3">
                  {mediaData.videos.map((video) => (
                    <div 
                      key={video.id}
                      className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-white/50 transition-colors group"
                    >
                      {/* Video thumbnail */}
                      <div className="relative w-28 sm:w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image
                          src={video.thumbnail}
                          alt={video.name}
                          fill
                          className="object-cover"
                        />
                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                          >
                            <Play className="w-4 h-4 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                          </div>
                        </div>
                        {/* Duration badge */}
                        <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white">
                          {video.duration}
                        </div>
                      </div>
                      
                      {/* Video info */}
                      <div className="flex-1 min-w-0 pt-1">
                        <span className="text-sm text-[#494963]/70 block truncate">{video.name}</span>
                        <button
                          type="button"
                          onClick={() => handleDownloadSingle(video.url, video.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-[11px] text-[#494963]/50 flex items-center gap-1 hover:text-[#494963]/70"
                        >
                          <Download className="w-3 h-3" />
                          Descargar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
