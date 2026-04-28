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

/* Sidebar navigation items with icons */
const sidebarItems = [
  { id: "presentacion", label: "PRESENTACION", sublabel: "Video de inicio", icon: Play },
  { id: "magazine", label: "MAGAZINE", sublabel: "Revista para estudiantes", icon: BookOpen },
  { id: "activity-book", label: "ACTIVITY BOOK", sublabel: "Libro de actividades", icon: Pencil },
  { id: "teachers-guide", label: "TEACHER'S GUIDE", sublabel: "Guia para docentes", icon: Apple },
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
      
      {/* MAIN LAYOUT */}
      <main className="relative mt-16 flex-1">
        {/* HERO SECTION con Background SVG */}
        <section className="relative">
          {/* Background SVG - cubre todo el hero y se superpone a la siguiente seccion */}
          <div className="absolute inset-0 w-full pointer-events-none" style={{ zIndex: 1 }}>
            <Image
              src="/images/funzine-background.svg"
              alt=""
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Contenido del Hero */}
          <div className="relative" style={{ zIndex: 2 }}>
            <div className="flex">
              {/* Sidebar - mas compacta */}
              <aside className="hidden lg:block w-52 xl:w-56 flex-shrink-0">
                <div className="sticky top-20 p-4 xl:p-5">
                  {/* Volver a Lenguas Extranjeras - en una sola linea */}
                  <Link 
                    href="/area/lenguas-extranjeras" 
                    className="inline-flex items-center gap-1.5 text-sm text-[#494963]/70 hover:text-[#494963] transition-colors mb-6 font-medium whitespace-nowrap"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Lenguas Extranjeras
                  </Link>

                  <nav className="space-y-1.5">
                    {sidebarItems.map((item) => {
                      const isActive = activeSection === item.id;
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left p-2.5 rounded-lg transition-all ${
                            isActive 
                              ? "bg-white/90 shadow-sm" 
                              : "hover:bg-white/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                isActive ? "bg-white shadow-sm" : "bg-white/60"
                              }`}
                            >
                              <IconComponent 
                                className={`w-4 h-4 transition-colors ${
                                  isActive ? "text-[#494963]" : "text-[#494963]/50"
                                }`}
                              />
                            </div>
                            <div className="min-w-0">
                              <span className={`text-xs font-bold uppercase tracking-wide block truncate ${isActive ? "text-[#494963]" : "text-[#494963]/60"}`}>
                                {item.label}
                              </span>
                              <p className={`text-[10px] leading-tight mt-0.5 truncate ${isActive ? "text-[#494963]/60" : "text-[#494963]/40"}`}>
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

              {/* Main hero content - CENTRADO */}
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-3xl px-6 sm:px-8 lg:px-10">
                  {/* Mobile back button */}
                  <div className="lg:hidden pt-6 mb-6">
                    <Link 
                      href="/area/lenguas-extranjeras" 
                      className="inline-flex items-center gap-2 text-base text-[#494963]/80 hover:text-[#494963] transition-colors font-medium"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Volver a Lenguas Extranjeras
                    </Link>
                  </div>

                  {/* Logo */}
                  <div className="pt-8 lg:pt-12 mb-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                      alt="English Funzine"
                      width={550}
                      height={150}
                      className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[550px] h-auto"
                      priority
                    />
                  </div>
                  
                  {/* Tagline - The magazine that makes English fun! - MAS GRANDE */}
                  <div className="mb-12 sm:mb-14 lg:mb-16">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-f811IynMCsQ7XvD0Q8zJl9pEbfUSCx.png"
                      alt="The magazine that makes English fun!"
                      width={500}
                      height={60}
                      className="h-12 sm:h-14 lg:h-16 w-auto"
                    />
                  </div>

                  {/* Video de presentacion */}
                  <div ref={presentacionRef} id="presentacion" className="scroll-mt-20 mb-10">
                    <p className="text-base font-semibold text-[#494963] uppercase tracking-wider mb-5">
                      Video de presentacion
                    </p>
                    <div className="rounded-xl overflow-hidden bg-[#494963] aspect-video max-w-2xl flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" style={{ color: TEXT_ON_COLOR }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intro text - MAS GRANDE */}
                  <p className="text-lg sm:text-xl lg:text-2xl text-[#494963]/80 leading-relaxed max-w-2xl mb-10">
                    Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                    Esta serie de materiales esta pensada para acompañar la implementacion de Lenguas Extranjeras 
                    en aquellas escuelas primarias de Santa Fe que elijan enseñar ingles.
                  </p>

                  {/* Issues section */}
                  <div className="mb-10">
                    {/* Issues selector - MAS GRANDE */}
                    <div className="flex items-center gap-4 mb-5">
                      <BookOpenCheck className="w-7 h-7 text-[#494963]/60" />
                      <span className="text-base font-semibold text-[#494963]/70 uppercase tracking-wider">
                        Issues
                      </span>
                    </div>
                    
                    {/* Issue buttons - Sin linea punteada, colores que contrastan */}
                    <div className="flex items-center gap-5 mb-10">
                      {funzineIssues.map((issue) => (
                        issue.available ? (
                          <button
                            key={issue.slug}
                            type="button"
                            onClick={() => scrollToSection("magazine")}
                            className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md bg-white"
                            title={issue.title}
                          >
                            <span className="text-2xl sm:text-3xl font-bold text-[#494963]">
                              {issue.number}
                            </span>
                          </button>
                        ) : (
                          <div
                            key={issue.slug}
                            className="relative group"
                            title="Proximamente"
                          >
                            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center bg-white/50">
                              <span className="text-2xl sm:text-3xl font-bold text-[#494963]/30">
                                {issue.number}
                              </span>
                            </div>
                            {/* Tooltip proximamente */}
                            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <span className="text-sm text-[#494963]/70 whitespace-nowrap bg-white px-4 py-1.5 rounded-full shadow-sm">Proximamente</span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Magazine covers - posicionado para coincidir con la punta del background */}
                  <div className="relative">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                      alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                      width={850}
                      height={500}
                      className="w-full max-w-3xl h-auto"
                    />
                    {/* Learn English banner overlay */}
                    <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-0 sm:right-4 lg:right-8 max-w-[180px] sm:max-w-[220px] lg:max-w-[280px]">
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
            </div>
          </div>
        </section>

        {/* MATERIALS SECTION */}
        <section className="relative bg-[#FDFBF7]" style={{ zIndex: 0, marginTop: "-80px", paddingTop: "120px" }}>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl px-6 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
              {/* Issue 1 Title - MAS GRANDE */}
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#494963] flex items-center gap-3">
                  It&apos;s great to be me
                  <ChevronRight className="w-7 h-7 lg:w-8 lg:h-8 text-[#494963]/30" />
                </h2>
              </div>

              {/* Materials */}
              <div className="space-y-14 lg:space-y-20">
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
    <div className="bg-[#FFF9E6] rounded-2xl overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-xl sm:text-2xl font-semibold text-[#494963]/70 mb-6">
          {number}.{title}
        </p>

        {/* PDF preview */}
        <div className="aspect-[4/3] bg-white rounded-xl mb-6 overflow-hidden border border-gray-100 shadow-sm">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title={`${title} Preview`}
          />
        </div>

        {/* Google Slides link */}
        <div className="flex justify-end mb-6">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-[#494963]/50 hover:text-[#494963]/70 transition-colors"
          >
            Google Slides
          </a>
        </div>

        {/* Download button */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-lg font-medium transition-all hover:opacity-90 rounded-lg"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-5 h-5" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex items-center gap-4 mt-10 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all ${
              activeTab === "audios" 
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/50 hover:text-[#494963]/70"
            }`}
          >
            <FileText className="w-5 h-5" />
            Audios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-white text-[#494963] shadow-sm" 
                : "text-[#494963]/50 hover:text-[#494963]/70"
            }`}
          >
            <Play className="w-5 h-5" />
            Videos
          </button>
          
          {/* Spacer */}
          <div className="flex-1" />
          
          {/* Download all button */}
          <button
            type="button"
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 text-base text-[#494963]/50 hover:text-[#494963]/70 transition-colors"
          >
            <Download className="w-5 h-5" />
            Descargar todos
          </button>
        </div>

        {/* Media list con scroll */}
        <div className="relative">
          <p className="text-sm font-medium text-[#494963]/40 uppercase tracking-wider mb-4">
            {activeTab === "audios" ? "Listado de audios" : "Listado de videos"}
          </p>
          
          {/* Lista con scroll si hay muchos items */}
          <div className="max-h-72 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
            {activeTab === "audios" ? (
              mediaData.audios.map((audio) => (
                <div
                  key={audio.id}
                  className="group flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-[#F7941D]" />
                    <span className="text-base text-[#494963]/70">{audio.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#494963]/40">{audio.duration}</span>
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(audio.url, audio.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="w-4 h-4 text-[#494963]/40 hover:text-[#494963]/70" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              mediaData.videos.map((video) => (
                <div
                  key={video.id}
                  className="group flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-white/60 transition-colors"
                >
                  {/* Video thumbnail */}
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image
                      src={video.thumbnail}
                      alt={video.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#494963] ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-base text-[#494963]/70 block truncate">{video.name}</span>
                    <span className="text-sm text-[#494963]/40">{video.duration}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(video.url, video.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <Download className="w-4 h-4 text-[#494963]/40 hover:text-[#494963]/70" />
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
