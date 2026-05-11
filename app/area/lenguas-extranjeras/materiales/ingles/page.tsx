"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowUp,
  BookOpen, 
  ChevronRight,
  Play,
  Download,
  Pencil,
  Compass,
  FileText,
} from "lucide-react";
import { Header } from "@/components/header";

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
  { id: "teachers-guide", icon: Compass, label: "Teacher's Guide" },
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
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  // Scroll spy - detectar sección visible automáticamente
  useEffect(() => {
    const sectionRefs = [
      { id: "presentacion", ref: presentacionRef },
      { id: "magazine", ref: magazineRef },
      { id: "activity-book", ref: activityBookRef },
      { id: "teachers-guide", ref: teachersGuideRef },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Mostrar/ocultar botón de scroll to top
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] overflow-x-hidden">
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
      <main className="relative mt-16 flex-1 overflow-x-hidden">
        {/* HERO SECTION con Background amarillo con alto contraste */}
        <section className="relative">
          {/* Background amarillo saturado */}
          <div 
            className="absolute inset-x-0 top-0 w-full h-full pointer-events-none" 
            style={{ 
              zIndex: 1,
              background: "linear-gradient(180deg, #FFCA28 0%, #FFD54F 30%, #FFE082 60%, #FFF8E1 85%, #FDFBF7 100%)",
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
                      className="h-12 sm:h-12 lg:h-14 xl:h-16 w-auto"
                    />
                  </div>

                  {/* Video de presentación - mockup minimalista */}
                  <div ref={presentacionRef} id="presentacion" className="scroll-mt-20 mb-10 sm:mb-12">
                    <p className="text-xs sm:text-sm font-medium text-[#494963]/50 uppercase tracking-wider mb-3">
                      Video de presentación
                    </p>
                    <div className="relative rounded-xl overflow-hidden bg-[#494963]/5 aspect-video max-w-md cursor-pointer group">
                      {/* Placeholder para embed de YouTube */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#494963]/10 group-hover:bg-[#494963]/20 flex items-center justify-center transition-colors">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 text-[#494963]/60 ml-0.5" />
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

                  {/* Issues section - integrado con el diseño */}
                  <div className="mb-8 sm:mb-10 lg:mb-12">
                    <p className="text-xs sm:text-sm lg:text-base font-medium text-[#494963]/50 uppercase tracking-wider mb-3 sm:mb-4">
                      Ediciones disponibles
                    </p>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                      {funzineIssues.map((issue) => (
                        issue.available ? (
                          <button
                            key={issue.slug}
                            type="button"
                            onClick={() => scrollToSection("magazine")}
                            className="px-5 sm:px-5 lg:px-6 py-3 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base font-bold transition-all hover:scale-105 bg-[#494963] text-white shadow-lg"
                          >
                            Issue {issue.number}
                          </button>
                        ) : (
                          <span
                            key={issue.slug}
                            className="px-5 sm:px-5 lg:px-6 py-3 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base font-normal bg-white/30 text-[#494963]/20"
                          >
                            Issue {issue.number}
                          </span>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Magazine covers - Banner con personajes - MÁS GRANDE */}
                  <div className="relative mt-8 sm:mt-12 lg:mt-16 pb-10 sm:pb-14 lg:pb-20 -mx-6 sm:-mx-10 lg:-mx-28 xl:-mx-40">
                    <Image
                      src="/images/funzine-banner.png"
                      alt="English Funzine - Magazine, Activity Book y Teacher's Guide"
                      width={1920}
                      height={768}
                      className="w-full h-auto"
                      priority
                      loading="eager"
                      placeholder="empty"
                      unoptimized={false}
                    />
                    {/* Learn English banner overlay */}
                    <div className="absolute bottom-6 sm:bottom-10 lg:bottom-16 right-[15%] sm:right-[18%] lg:right-[22%] w-[45%] sm:w-[40%] lg:w-[35%] max-w-md">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-engluish-dGNMTPLgOkQasJEvo2XGptaLH4hpoT.png"
                        alt="Learn English to talk about you and your people."
                        width={500}
                        height={200}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
            </div>
        </section>

        {/* MATERIALS SECTION - fondo con contraste */}
        <section className="relative bg-[#F5F3EE]" style={{ zIndex: 0, marginTop: "-40px", paddingTop: "60px" }}>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
              {/* Issue 1 Title */}
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#494963] flex items-center gap-2 sm:gap-3">
                  <span>It&apos;s great to be me!</span>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#494963]/30 flex-shrink-0" />
                </h2>
              </div>

              {/* Materials */}
              <div className="space-y-8 sm:space-y-12 lg:space-y-16">
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

                {/* 03. Teacher's Guide */}
                <div ref={teachersGuideRef} id="teachers-guide" className="scroll-mt-20">
                  <MaterialCard
                    number="03"
                    title="Teacher's Guide"
                    pdfUrl={pdfUrls.teachersGuide}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Botón scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-24 lg:bottom-10 right-4 lg:right-8 flex items-center justify-center transition-all hover:scale-110 z-50"
          style={{ color: AREA_COLOR }}
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-8 h-8 lg:w-9 lg:h-9" strokeWidth={2.5} />
        </button>
      )}
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

  const handleDownloadAllMagazine = () => {
    // Descargar PDF
    const pdfLink = document.createElement("a");
    pdfLink.href = pdfUrl;
    pdfLink.download = `${title}.pdf`;
    pdfLink.click();
    
    // Descargar todos los audios y videos
    [...mediaData.audios, ...mediaData.videos].forEach((item) => {
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
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Título */}
      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#494963] mb-4 sm:mb-5">
        {number}. {title}
      </p>

      {/* PDF viewer - centrado y responsive */}
      <div className="relative w-full mb-4 sm:mb-5 flex justify-center">
        <div 
          className="relative w-full max-w-md bg-gray-50 rounded-lg overflow-hidden mx-auto"
          style={{ aspectRatio: "3/4", minHeight: "400px" }}
        >
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full absolute inset-0"
            title={`${title} Preview`}
            style={{ border: "none" }}
            allowFullScreen
          />
        </div>
      </div>

      {/* Download button - full width en mobile */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 text-sm sm:text-base font-semibold transition-all hover:opacity-90 rounded-lg sm:rounded-full"
        style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
      >
        <Download className="w-4 h-4" />
        Descargar PDF
      </a>

        {/* Tabs */}
        <div className="mt-8 sm:mt-10 mb-4">
          <div className="flex items-center gap-4 sm:gap-6 pb-3 border-b border-[#494963]/10">
            <button
              type="button"
              onClick={() => setActiveTab("audios")}
              className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-all ${
                activeTab === "audios" 
                  ? "text-[#494963]" 
                  : "text-[#494963]/40 hover:text-[#494963]/60"
              }`}
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
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
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Videos
            </button>
          </div>
        </div>

        {/* Media list */}
        <div className="space-y-0">
          {activeTab === "audios" ? (
            mediaData.audios.map((audio) => (
              <div 
                key={audio.id}
                className="flex items-center gap-3 py-3.5 border-b border-[#494963]/5"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-[#494963] leading-tight">{audio.name}</p>
                  <p className="text-xs sm:text-sm text-[#494963]/40 mt-0.5">{audio.duration}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(audio.url, audio.name)}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#494963]/5 transition-colors"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#494963]/40" />
                </button>
              </div>
            ))
          ) : (
            mediaData.videos.map((video) => (
              <div 
                key={video.id}
                className="flex items-center gap-3 py-3.5 border-b border-[#494963]/5"
              >
                <div className="relative w-20 sm:w-24 aspect-video rounded overflow-hidden flex-shrink-0 bg-[#494963]/10">
                  <Image
                    src={video.thumbnail}
                    alt={video.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-3 h-3 text-[#494963] ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-[#494963] leading-tight">{video.name}</p>
                  <p className="text-xs sm:text-sm text-[#494963]/40 mt-0.5">{video.duration}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(video.url, video.name)}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#494963]/5 transition-colors"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#494963]/40" />
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Descargar todo - al final, siempre visible */}
        <div className="pt-5 mt-3 border-t border-[#494963]/5">
          <button
            type="button"
            onClick={handleDownloadAllMagazine}
            className="w-full flex items-center justify-center gap-2 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#494963] hover:bg-[#494963]/90 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Descargar todo
          </button>
          <p className="text-xs sm:text-sm text-[#494963]/40 text-center mt-2">
            Incluye PDF, audios y videos
          </p>
        </div>
    </div>
  );
}
