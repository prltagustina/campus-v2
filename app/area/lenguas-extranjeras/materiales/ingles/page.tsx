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
    title: "Próximamente",
    available: false,
  },
  {
    number: 3,
    slug: "issue-3",
    title: "Próximamente", 
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
        {/* HERO SECTION con Background amarillo con alto contraste */}
        <section className="relative">
          {/* Background amarillo saturado */}
          <div 
            className="absolute inset-x-0 top-0 w-full h-full pointer-events-none" 
            style={{ 
              zIndex: 1,
              background: "linear-gradient(180deg, #FFE082 0%, #FFCA28 20%, #FFD54F 50%, #FFF8E1 85%, #FDFBF7 100%)",
            }}
          />

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

                  {/* Logo - más grande en mobile */}
                  <div className="pt-6 sm:pt-8 lg:pt-10 mb-5 sm:mb-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                      alt="English Funzine"
                      width={550}
                      height={150}
                      className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[550px] h-auto"
                      priority
                    />
                  </div>
                  
                  {/* Tagline - más grande en mobile */}
                  <div className="mb-10 sm:mb-12 lg:mb-14">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-f811IynMCsQ7XvD0Q8zJl9pEbfUSCx.png"
                      alt="The magazine that makes English fun!"
                      width={500}
                      height={60}
                      className="h-10 sm:h-12 lg:h-14 xl:h-16 w-auto"
                    />
                  </div>

                  {/* Video de presentación - más grande en mobile */}
                  <div ref={presentacionRef} id="presentacion" className="scroll-mt-20 mb-8 sm:mb-10">
                    <p className="text-sm sm:text-base font-semibold text-[#494963] uppercase tracking-wider mb-4 sm:mb-5">
                      Video de presentación
                    </p>
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-[#494963] aspect-video max-w-xl flex items-center justify-center shadow-xl">
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-110 shadow-lg"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intro text - más grande en mobile */}
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#494963]/80 leading-relaxed max-w-xl mb-8 sm:mb-10">
                    Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                    Esta serie de materiales está pensada para acompañar la implementación de Lenguas Extranjeras 
                    en aquellas escuelas primarias de Santa Fe que elijan enseñar inglés.
                  </p>

                  {/* Issues section - MÁS GRANDE EN MOBILE */}
                  <div className="mb-8 sm:mb-10">
                    {/* Issues selector */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <BookOpenCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#494963]/50" />
                      <span className="text-sm sm:text-base font-semibold text-[#494963]/60 uppercase tracking-wider">
                        Issues
                      </span>
                    </div>
                    
                    {/* Issue buttons - más grandes en mobile */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                      {funzineIssues.map((issue) => (
                        issue.available ? (
                          <button
                            key={issue.slug}
                            type="button"
                            onClick={() => scrollToSection("magazine")}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg bg-white"
                            title={issue.title}
                          >
                            <span className="text-base sm:text-lg font-bold text-[#494963]">
                              {issue.number}
                            </span>
                          </button>
                        ) : (
                          <div
                            key={issue.slug}
                            className="relative group"
                            title="Próximamente"
                          >
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/50">
                              <span className="text-base sm:text-lg font-bold text-[#494963]/30">
                                {issue.number}
                              </span>
                            </div>
                            {/* Tooltip próximamente */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <span className="text-xs sm:text-sm text-[#494963]/60 whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md">Próximamente</span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Magazine covers - Banner nuevo con personajes - MÁS GRANDE */}
                  <div className="relative mt-8 sm:mt-12 lg:mt-16 pb-10 sm:pb-14 lg:pb-20 -mx-4 sm:-mx-6 lg:-mx-20 xl:-mx-32">
                    <Image
                      src="/images/funzine-banner.png"
                      alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                      width={1600}
                      height={640}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
            </div>
        </section>

        {/* MATERIALS SECTION - fondo con contraste */}
        <section className="relative bg-[#F5F3EE]" style={{ zIndex: 0, marginTop: "-40px", paddingTop: "80px" }}>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
              {/* Issue 1 Title - MÁS GRANDE EN MOBILE */}
              <div className="mb-10 sm:mb-12 lg:mb-14">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#494963] flex items-center gap-3 sm:gap-4">
                  It&apos;s great to be me
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#494963]/30" />
                </h2>
              </div>

              {/* Materials - MÁS ESPACIADO */}
              <div className="space-y-12 sm:space-y-16 lg:space-y-20">
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

/* Material Card Component con visor tipo flipbook */
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
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"left" | "right" | null>(null);

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

  const handleFlip = (direction: "left" | "right") => {
    if (isFlipping) return;
    setFlipDirection(direction);
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10">
      {/* Título */}
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#494963] mb-6 sm:mb-8">
        {number}. {title}
      </p>

      {/* PDF Flipbook viewer */}
      <div className="relative w-full mb-6 sm:mb-8">
        {/* Contenedor del libro con perspectiva */}
        <div 
          className="relative mx-auto"
          style={{ 
            perspective: "2000px",
            maxWidth: "600px"
          }}
        >
          {/* Página del libro */}
          <div 
            className={`relative bg-white shadow-2xl transition-transform duration-500 ease-in-out ${
              isFlipping && flipDirection === "right" ? "animate-flip-right" : ""
            } ${
              isFlipping && flipDirection === "left" ? "animate-flip-left" : ""
            }`}
            style={{
              aspectRatio: "3/4",
              transformStyle: "preserve-3d",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Efecto de páginas apiladas */}
            <div className="absolute -right-1 top-2 bottom-2 w-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-r-sm" />
            <div className="absolute -right-2 top-4 bottom-4 w-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-r-sm" />
            
            {/* Iframe del PDF */}
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
              className="w-full h-full absolute inset-0 rounded-sm"
              title={`${title} Preview`}
              style={{ border: "none" }}
            />
            
            {/* Efecto de brillo en el borde */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
          </div>
          
          {/* Controles de navegación flipbook */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 sm:px-0 sm:-mx-16">
            {/* Botón anterior - efecto flip */}
            <button
              type="button"
              onClick={() => handleFlip("left")}
              className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 text-[#494963] rotate-180" />
            </button>
            
            {/* Botón siguiente - efecto flip */}
            <button
              type="button"
              onClick={() => handleFlip("right")}
              className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 text-[#494963]" />
            </button>
          </div>
        </div>
        
        {/* Indicador visual */}
        <p className="text-center text-sm text-[#494963]/50 mt-4">
          Usa las flechas o desplázate dentro del documento
        </p>
      </div>

      {/* Download button */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3 text-base sm:text-lg font-semibold transition-all hover:opacity-90 rounded-full"
        style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
      >
        <Download className="w-5 h-5" />
        Descargar PDF
      </a>

        {/* Tabs - minimalistas */}
        <div className="flex items-center gap-6 mt-10 sm:mt-12 mb-6 border-b border-[#494963]/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-all ${
              activeTab === "audios" 
                ? "text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <FileText className="w-4 h-4" />
            Audios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-all ${
              activeTab === "videos" 
                ? "text-[#494963]" 
                : "text-[#494963]/40 hover:text-[#494963]/60"
            }`}
          >
            <Play className="w-4 h-4" />
            Videos
          </button>
          
          <div className="flex-1" />
          
          <button
            type="button"
            onClick={handleDownloadAll}
            className="text-sm text-[#494963]/40 hover:text-[#494963]/60 transition-colors"
          >
            Descargar todos
          </button>
        </div>

        {/* Media list - minimalista */}
        <div className="space-y-1">
          {activeTab === "audios" ? (
            mediaData.audios.map((audio) => (
              <div 
                key={audio.id}
                className="group flex items-center gap-4 py-3 border-b border-[#494963]/5 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-[#494963] truncate">{audio.name}</p>
                  <p className="text-xs text-[#494963]/40">{audio.duration}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(audio.url, audio.name)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#494963]/5 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#494963]/40" />
                </button>
              </div>
            ))
          ) : (
            mediaData.videos.map((video) => (
              <div 
                key={video.id}
                className="group flex items-center gap-4 py-3 border-b border-[#494963]/5 last:border-0"
              >
                <div className="relative w-24 sm:w-28 aspect-video rounded overflow-hidden flex-shrink-0 bg-[#494963]/10">
                  <Image
                    src={video.thumbnail}
                    alt={video.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-3 h-3 text-[#494963] ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-[#494963] truncate">{video.name}</p>
                  <p className="text-xs text-[#494963]/40">{video.duration}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(video.url, video.name)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#494963]/5 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#494963]/40" />
                </button>
              </div>
            ))
          )}
        </div>
    </div>
  );
}
