"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  ChevronRight,
  Clock,
  Play,
  Download,
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

/* Sidebar navigation items */
const sidebarItems = [
  { id: "presentacion", label: "PRESENTACION", sublabel: "Video de inicio" },
  { id: "magazine", label: "MAGAZINE", sublabel: "Revista para estudiantes" },
  { id: "activity-book", label: "ACTIVITY BOOK", sublabel: "Libro de actividades de Funzine" },
  { id: "teachers-guide", label: "TEACHER'S GUIDE", sublabel: "Guia para docentes de Funzine en el aula" },
];

/* PDF URLs */
const pdfUrls = {
  magazine: "https://blobs.vusercontent.net/blob/Funzine_Revista_10.04-(Con-correcciones)_compressed-HL3NHokCpytEhLuoWHdwD2yiTn4nol.pdf",
  activityBook: "https://blobs.vusercontent.net/blob/Funzine_ActivityBook%2008.04.2026%20%28Con%20correcciones%29_compressed-uzr1tIOQJRw8M8kvs1yL61iq4X2tt6.pdf",
  teachersGuide: "https://blobs.vusercontent.net/blob/Teacher%27s%20Guide%2010.04-%20U%CC%81ltima%20versio%CC%81n%20%28con%20correcciones%29_compressed-uoUpZxcEDQ5wMwaWnaUIUy6A2hXmr9.pdf",
};

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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Main content wrapper with background */}
      <div className="flex flex-1 mt-16 relative">
        {/* Background SVG - covers the entire content area */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage: "url('/images/funzine-background.svg')",
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />

        {/* Sidebar - fixed on desktop, above background */}
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-10">
          <div className="p-6">
            <Link 
              href="/area/lenguas-extranjeras#materiales" 
              className="inline-flex items-center gap-2 text-xs text-[#494963]/50 hover:text-[#494963] transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver a Ingles
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
                        ? "bg-white/80" 
                        : "hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isActive ? ORANGE_COLOR : "#494963", opacity: isActive ? 1 : 0.2 }}
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

        {/* Main content - above background */}
        <main className="flex-1 overflow-hidden relative z-10">
          {/* Hero section */}
          <section className="relative pt-8 sm:pt-12 px-4 sm:px-8 lg:px-12">
            {/* Mobile back button */}
            <div className="lg:hidden mb-6">
              <Link 
                href="/area/lenguas-extranjeras#materiales" 
                className="inline-flex items-center gap-2 text-xs text-[#494963]/70 hover:text-[#494963] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a Ingles
              </Link>
            </div>

            {/* Logo */}
            <div className="max-w-md mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                alt="English Funzine"
                width={350}
                height={100}
                className="w-full max-w-[280px] sm:max-w-[350px] h-auto"
                priority
              />
              
              {/* Tagline - The magazine that makes English fun! */}
              <div className="flex items-center gap-2 mt-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-IT34i2R2KxWNrQUNqTTfmztloIwOs6.svg"
                  alt="The magazine that makes"
                  width={200}
                  height={20}
                  className="h-4 sm:h-5 w-auto"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-N1q7YSUUn0jkppVWrDW7saBJh09H1F.png"
                  alt="English fun!"
                  width={120}
                  height={30}
                  className="h-5 sm:h-6 w-auto"
                />
              </div>
            </div>
          </section>

          {/* Video de presentacion */}
          <section ref={presentacionRef} className="px-4 sm:px-8 lg:px-12 py-8">
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
                    className="group flex items-center gap-3 pr-4 rounded-full transition-all hover:shadow-md bg-white"
                    style={{ border: `3px solid ${AREA_COLOR}` }}
                  >
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: AREA_COLOR }}
                    >
                      <span className="text-lg sm:text-xl font-bold" style={{ color: TEXT_ON_COLOR }}>
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
                    className="flex items-center gap-3 pr-4 rounded-full bg-gray-100/50"
                    style={{ border: "3px solid #e5e5e5" }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200/50">
                      <span className="text-lg sm:text-xl font-bold text-[#494963]/30">
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

            {/* Magazine covers banner */}
            <div className="relative mb-12 max-w-4xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portadas-funzines-NRB0hU1hxEUk3gqJ8vjhxq5flrbhNE.png"
                alt="English Funzine - Magazine, Activity Book y Teacher Guide"
                width={900}
                height={500}
                className="w-full h-auto"
              />
              {/* Learn English banner overlay */}
              <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 max-w-[200px] sm:max-w-[280px]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/learn-english-banner-pkWwUyCjl66AxjfaNTILQNJYiR7xr4.png"
                  alt="Learn English to talk about you and your people."
                  width={280}
                  height={100}
                  className="w-full h-auto"
                />
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
                    pdfUrl={pdfUrls.magazine}
                  />

                  {/* 02. Activity Book */}
                  <MaterialCard
                    number="02"
                    title="Activity Book"
                    pdfUrl={pdfUrls.activityBook}
                  />

                  {/* 03. Teacher Guide */}
                  <MaterialCard
                    number="03"
                    title="Teacher Guide"
                    pdfUrl={pdfUrls.teachersGuide}
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
    <div className="bg-[#FFF9E6] rounded-2xl overflow-hidden">
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold text-[#494963]/40 mb-2">
          {number}.{title}
        </p>

        {/* Google Slides embed - PDF preview */}
        <div className="aspect-[4/3] bg-white rounded-xl mb-4 overflow-hidden border border-gray-100 shadow-sm">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title={`${title} Preview`}
          />
        </div>

        {/* Download button - Yellow, no rounded corners */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-4 h-4" />
          Descargar PDF
        </a>

        {/* Tabs */}
        <div className="flex items-center gap-4 mt-6 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("audios")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === "videos" 
                ? "bg-white text-[#494963]" 
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
                  className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${AREA_COLOR}40` }}
                    >
                      <Play className="w-3 h-3" style={{ color: TEXT_ON_COLOR }} />
                    </div>
                    <span className="text-xs text-[#494963]/70">{audio.name}</span>
                  </div>
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: ORANGE_COLOR }}
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
