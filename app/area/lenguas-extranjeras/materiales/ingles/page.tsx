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

/* Sidebar navigation items with icons and labels */
const sidebarItems = [
  { id: "presentacion", icon: Play, label: "Presentación" },
  { id: "magazine", icon: BookOpen, label: "Magazine" },
  { id: "activity-book", icon: Pencil, label: "Activity Book" },
  { id: "teachers-guide", icon: Apple, label: "Teacher Guide" },
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
      
      {/* SIDEBAR GLOBAL FIJO - visible en toda la página, posicionado arriba */}
      <aside className="hidden lg:block fixed left-0 top-24 z-50 p-3">
        {/* Volver */}
        <Link 
          href="/area/lenguas-extranjeras" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors mb-6 mx-auto"
          title="Volver a Lenguas Extranjeras"
        >
          <ArrowLeft className="w-4 h-4 text-[#494963]/70" />
        </Link>

        <nav className="flex flex-col items-center gap-2">
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.id;
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="relative group">
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    isActive 
                      ? "bg-white" 
                      : "bg-white/80 hover:bg-white"
                  }`}
                >
                  <IconComponent 
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[#494963]" : "text-[#494963]/40"
                    }`}
                  />
                </button>
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <span className="text-xs font-medium text-[#494963] whitespace-nowrap bg-white px-3 py-1.5 rounded-lg shadow-md">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
      
      {/* MAIN LAYOUT */}
      <main className="relative mt-16 flex-1">
        {/* HERO SECTION con Background SVG */}
        <section className="relative" style={{ minHeight: "max(100vh, 900px)" }}>
          {/* Background SVG - altura dinámica que escala con el contenido */}
          <div 
            className="absolute inset-x-0 top-0 w-full pointer-events-none" 
            style={{ 
              zIndex: 1,
              height: "100%",
              minHeight: "max(100vh, 900px)",
            }}
          >
            <Image
              src="/images/funzine-background.svg"
              alt=""
              fill
              className="object-cover object-top"
              style={{ objectPosition: "center top" }}
              priority
            />
          </div>

          {/* Contenido del Hero */}
          <div className="relative flex justify-center" style={{ zIndex: 2 }}>
            <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-0">
                  {/* Mobile back button */}
                  <div className="lg:hidden pt-4 mb-4">
                    <Link 
                      href="/area/lenguas-extranjeras" 
                      className="inline-flex items-center gap-1.5 text-sm text-[#494963]/70 hover:text-[#494963] transition-colors font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver a Lenguas Extranjeras
                    </Link>
                  </div>

                  {/* Logo - más pequeño en mobile */}
                  <div className="pt-4 sm:pt-6 lg:pt-10 mb-4 sm:mb-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                      alt="English Funzine"
                      width={550}
                      height={150}
                      className="w-full max-w-[260px] sm:max-w-[380px] lg:max-w-[480px] xl:max-w-[550px] h-auto"
                      priority
                    />
                  </div>
                  
                  {/* Tagline - más pequeño en mobile */}
                  <div className="mb-8 sm:mb-10 lg:mb-12">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-f811IynMCsQ7XvD0Q8zJl9pEbfUSCx.png"
                      alt="The magazine that makes English fun!"
                      width={500}
                      height={60}
                      className="h-8 sm:h-10 lg:h-14 xl:h-16 w-auto"
                    />
                  </div>

                  {/* Video de presentacion - más pequeño en mobile */}
                  <div ref={presentacionRef} id="presentacion" className="scroll-mt-20 mb-6 sm:mb-8">
                    <p className="text-xs sm:text-sm font-semibold text-[#494963] uppercase tracking-wider mb-3 sm:mb-4">
                      Video de presentacion
                    </p>
                    <div className="rounded-lg sm:rounded-xl overflow-hidden bg-[#494963] aspect-video max-w-xl flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div 
                          className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intro text - más pequeño en mobile */}
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#494963]/80 leading-relaxed max-w-xl mb-6 sm:mb-8">
                    Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                    Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
                    en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
                  </p>

                  {/* Issues section */}
                  <div className="mb-6 sm:mb-8">
                    {/* Issues selector */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <BookOpenCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#494963]/50" />
                      <span className="text-xs sm:text-sm font-semibold text-[#494963]/60 uppercase tracking-wider">
                        Issues
                      </span>
                    </div>
                    
                    {/* Issue buttons - más pequeños */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                      {funzineIssues.map((issue) => (
                        issue.available ? (
                          <button
                            key={issue.slug}
                            type="button"
                            onClick={() => scrollToSection("magazine")}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md bg-white"
                            title={issue.title}
                          >
                            <span className="text-sm sm:text-base font-bold text-[#494963]">
                              {issue.number}
                            </span>
                          </button>
                        ) : (
                          <div
                            key={issue.slug}
                            className="relative group"
                            title="Proximamente"
                          >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/50">
                              <span className="text-sm sm:text-base font-bold text-[#494963]/30">
                                {issue.number}
                              </span>
                            </div>
                            {/* Tooltip proximamente */}
                            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <span className="text-[10px] sm:text-xs text-[#494963]/60 whitespace-nowrap bg-white px-2 py-0.5 rounded-full shadow-sm">Proximamente</span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Magazine covers - RESPONSIVE PROPORCIONAL */}
                  <div className="relative pb-8 sm:pb-12 lg:pb-16">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                      alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                      width={1000}
                      height={600}
                      className="w-full h-auto mx-auto"
                      style={{ maxWidth: "min(100%, 800px)" }}
                    />
                    {/* Learn English banner overlay */}
                    <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 right-0 sm:right-2 lg:right-4 xl:right-8 max-w-[140px] sm:max-w-[180px] lg:max-w-[240px] xl:max-w-[280px]">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-english-banner-pkWwUyCjl66AxjfaNTILQNJYiR7xr4.png"
                        alt="Learn English to talk about you and your people."
                        width={280}
                        height={110}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
            </div>
        </section>

        {/* MATERIALS SECTION */}
        <section className="relative bg-[#FDFBF7]" style={{ zIndex: 0, marginTop: "-60px", paddingTop: "100px" }}>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-0 py-8 sm:py-12 lg:py-16">
              {/* Issue 1 Title */}
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#494963] flex items-center gap-2 sm:gap-3">
                  It&apos;s great to be me
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#494963]/30" />
                </h2>
              </div>

              {/* Materials */}
              <div className="space-y-10 sm:space-y-14 lg:space-y-16">
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
        </section>
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
    <div className="bg-[#FFF9E6] rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#494963]/70 mb-4 sm:mb-6">
          {number}.{title}
        </p>

        {/* PDF preview */}
        <div className="aspect-[4/3] bg-white rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden border border-gray-100 shadow-sm">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title={`${title} Preview`}
          />
        </div>

        {/* Google Slides link */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base text-[#494963]/50 hover:text-[#494963]/70 transition-colors"
          >
            Google Slides
          </a>
        </div>

        {/* Download button */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-medium transition-all hover:opacity-90 rounded-lg"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-8 sm:mt-10 mb-4 sm:mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
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
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/50 hover:text-[#494963]/70"
            }`}
          >
            <Play className="w-4 h-4" />
            Videos
          </button>
          
          {/* Spacer */}
          <div className="flex-1" />
          
          {/* Download all button */}
          <button
            type="button"
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963]/70 transition-colors"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Descargar todos</span>
          </button>
        </div>

        {/* Media list con scroll */}
        <div className="relative">
          <p className="text-xs font-medium text-[#494963]/40 uppercase tracking-wider mb-3">
            {activeTab === "audios" ? "Listado de audios" : "Listado de videos"}
          </p>
          
          <div className="max-h-56 sm:max-h-64 overflow-y-auto pr-2 space-y-1.5 sm:space-y-2">
            {activeTab === "audios" ? (
              /* Audios list */
              mediaData.audios.map((audio) => (
                <div 
                  key={audio.id}
                  className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-white/60 transition-colors"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-[#494963]/80 truncate">{audio.name}</p>
                    <p className="text-[10px] sm:text-xs text-[#494963]/40">MP3 - {audio.duration}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(audio.url, audio.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 sm:p-2 rounded-full hover:bg-white"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/50" />
                  </button>
                </div>
              ))
            ) : (
              /* Videos list con miniaturas */
              mediaData.videos.map((video) => (
                <div 
                  key={video.id}
                  className="group flex items-center gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/60 transition-colors"
                >
                  {/* Miniatura del video */}
                  <div className="relative w-16 h-10 sm:w-20 sm:h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image
                      src={video.thumbnail}
                      alt={video.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-[#494963]/80 truncate">{video.name}</p>
                    <p className="text-[10px] sm:text-xs text-[#494963]/40">MP4 - {video.duration}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(video.url, video.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 sm:p-2 rounded-full hover:bg-white"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/50" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
