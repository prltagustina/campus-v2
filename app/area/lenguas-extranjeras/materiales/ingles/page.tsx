"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowUp,
  BookOpen, 
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  Download,
  Pencil,
  Compass,
  FileText,
  Share2,
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

/* Helpers para construir URLs reales (Google Drive / YouTube) */
const drive = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/* Estilos por secuencia: escala de celeste (clarito → petróleo) */
const SEQUENCE_STYLES: Record<number, { label: string; tint: string; bar: string; badgeBg: string; badgeText: string }> = {
  1: { label: "Secuencia 1", tint: "#EAF6FC", bar: "#9BD3EC", badgeBg: "#9BD3EC", badgeText: "#1B4654" }, // celeste clarito
  2: { label: "Secuencia 2", tint: "#DCEEF8", bar: "#3DA0CE", badgeBg: "#3DA0CE", badgeText: "#FFFFFF" }, // celeste más fuerte
  3: { label: "Secuencia 3", tint: "#E0EBEE", bar: "#1B6B7E", badgeBg: "#1B6B7E", badgeText: "#FFFFFF" }, // petróleo
  4: { label: "Secuencia 4", tint: "#DDE8EA", bar: "#0E4A57", badgeBg: "#0E4A57", badgeText: "#FFFFFF" }, // petróleo oscuro
};

/* Tipos de media */
type AudioItem = { id: string; name: string; duration: string; url: string };
type VideoItem = { id: string; name: string; duration: string; url: string; thumbnail: string };
type MediaSequence = { seq: number; items: AudioItem[] };
type MaterialMedia = { audios: MediaSequence[]; videos: VideoItem[] };

/*
 * Audios y videos REALES de English Funzine - Issue 1 ("It's great to be me!")
 * Fuente: https://campuseducativo.santafe.edu.ar/diseno-curricular/lenguas-extranjeras/funzine/
 * La secuencia de cada audio surge del nombre del archivo: AudioN.x → Secuencia N.
 */
const funzineMedia: Record<"magazine" | "activityBook" | "teachersGuide", MaterialMedia> = {
  magazine: {
    audios: [
      {
        seq: 1,
        items: [
          { id: "mag-carta", name: "00 Carta", duration: "1:06", url: drive("1KtoELCMpNoJf9c1DgYcGPF_c-4HV8zRC") },
          { id: "mag-1.1", name: "EF1_Audio1.1", duration: "0:55", url: drive("1JuXVw6HCeU3yzJQ0aWb4fUtDR_QArvIF") },
          { id: "mag-1.2", name: "EF1_Audio1.2", duration: "0:55", url: drive("1e0F7qOXyyao-aiedegYnbCLDTD8kKnYn") },
          { id: "mag-1.3", name: "EF1_Audio1.3", duration: "0:14", url: drive("1BvDphSdCYMVd3bgNWof4Ta0oBWVdWKbL") },
          { id: "mag-1.4", name: "EF1_Audio1.4", duration: "1:11", url: drive("1LnYSlCnC613Pgob3tGBMsUzJojlg-Zkj") },
          { id: "mag-1.6", name: "EF1_Audio1.6", duration: "2:05", url: drive("1NFbWcQiiEyIz7tc7osqww8NztP2Ikr53") },
          { id: "mag-1.7", name: "EF1_Audio1.7", duration: "0:36", url: drive("1WJfefD8DwXJ3ajnuMpFxXhAMiwtf9516") },
          { id: "mag-1.8", name: "EF1_Audio1.8", duration: "0:26", url: drive("1U7J66Xu5VuLOm8UJrMArcKI-JPDqhFtH") },
        ],
      },
      {
        seq: 2,
        items: [
          { id: "mag-2.1", name: "EF1_Audio2.1", duration: "0:38", url: drive("1MUIN2SEvZGiJ-CKx-Khj6pygNQqPPVIt") },
          { id: "mag-2.2", name: "EF1_Audio2.2", duration: "1:02", url: drive("1M5yEIRqU3otRf5Mp82i3Ay2Qy84gALBm") },
          { id: "mag-2.3", name: "EF1_Audio2.3", duration: "0:42", url: drive("1ApT2uFBaLKap7Uo0OuPuR2PBaaR8I6lx") },
          { id: "mag-2.4", name: "EF1_Audio2.4", duration: "1:44", url: drive("1_NOeA7MF81FMFQzO56nCX9JejYZANFuO") },
          { id: "mag-2.5", name: "EF1_Audio2.5", duration: "0:54", url: drive("1n3sSzIadb87IdlOwALV8kKjcoOI_p-5K") },
          { id: "mag-2.6", name: "EF1_Audio2.6", duration: "1:02", url: drive("1f53QI2_CRzEcPdpAZriPrqOsfKT9S5WQ") },
          { id: "mag-2.7", name: "EF1_Audio2.7", duration: "0:25", url: drive("1aMxILTGp1Jx3fkHcn_pxP0BbVwYvPSYO") },
          { id: "mag-2.8", name: "EF1_Audio2.8", duration: "0:57", url: drive("199Kr3e11ehgfME-kWSwfRKkyuwnE_Ag7") },
        ],
      },
      {
        seq: 3,
        items: [
          { id: "mag-3.1", name: "EF1_Audio3.1", duration: "1:44", url: drive("1xLhN-a419qqUlwmwdCXMXR4X1rLMIofb") },
          { id: "mag-3.2", name: "EF1_Audio3.2", duration: "1:24", url: drive("1UYq8RF5helw623TOK2kxjO1FlHpg-Rk9") },
          { id: "mag-3.3", name: "EF1_Audio3.3", duration: "0:52", url: drive("1uthp52rdTA3cgKSaKJGyDtuGtZVTTwVb") },
          { id: "mag-3.4", name: "EF1_Audio3.4", duration: "0:54", url: drive("1GeauF_q7SS0HW22_mvH9VWFN7huRFgty") },
        ],
      },
    ],
    videos: [
      { id: "mag-v01", name: "Video 01 - Hello, everyone!", duration: "1:53", url: "https://youtu.be/9ECTWSZEoPw", thumbnail: ytThumb("9ECTWSZEoPw") },
      { id: "mag-v05", name: "Video 05 - Recap - Hello, everyone!", duration: "0:57", url: drive("1XlS4Uc6V8z43mGq08tPOpd5yY7j_dK4p"), thumbnail: "" },
      { id: "mag-v06", name: "Video 06 - Make a Fanzine", duration: "1:44", url: "https://youtu.be/nvbYsV_CdG4", thumbnail: ytThumb("nvbYsV_CdG4") },
      { id: "mag-v07", name: "Video 07 - Make a Collage", duration: "1:47", url: "https://youtu.be/5d8GVryIKfQ", thumbnail: ytThumb("5d8GVryIKfQ") },
      { id: "mag-v08", name: "Video 08 - Fairy Tale Families", duration: "1:57", url: "https://youtu.be/S8RXpcbH4_g", thumbnail: ytThumb("S8RXpcbH4_g") },
    ],
  },
  activityBook: {
    audios: [
      {
        seq: 1,
        items: [
          { id: "ab-1.1", name: "AB1_Audio1.1", duration: "0:42", url: drive("10cJZ7B2prL3qDc0I90s5AnXQep4DRi98") },
          { id: "ab-1.2", name: "AB1_Audio1.2", duration: "0:33", url: drive("17xOt5-wPrs5goqEkh5d0oITAKXPW3znY") },
          { id: "ab-1.3", name: "AB1_Audio1.3", duration: "0:27", url: drive("17NKn-X0gY1DcVIsS7kzoUtgnEupkLsud") },
          { id: "ab-1.4", name: "AB1_Audio1.4", duration: "2:14", url: drive("1o0TeXENcEiyFsdgxlk_qrSFPNt7TqAX3") },
          { id: "ab-1.5", name: "AB1_Audio1.5", duration: "0:55", url: drive("1qlCkTQtYFZ7T4p-6hDJ7xWLnmjHHGXiC") },
          { id: "ab-1.6", name: "AB1_Audio1.6", duration: "0:31", url: drive("1HPQgm6ZsYU0uj0C6DfEw266vA-Fo00We") },
          { id: "ab-1.7", name: "AB1_Audio1.7", duration: "0:52", url: drive("1noJbyMEV_qQ-bmyJ7hNsFVtnUQEfwzCv") },
          { id: "ab-1.8", name: "AB1_Audio1.8", duration: "0:33", url: drive("14Ot5lnEnxQwTYQPKBPNYiqJ91OmwpdcK") },
          { id: "ab-1.9", name: "AB1_Audio1.9", duration: "0:53", url: drive("1sd10bGUgoD2QDf2WN64QnoAzuqskWeX7") },
          { id: "ab-1.10", name: "AB1_Audio1.10", duration: "0:39", url: drive("1YSJU_94skWBF-5N8odG6eaI4eUaH0FXL") },
          { id: "ab-1.11", name: "AB1_Audio1.11", duration: "0:50", url: drive("1-f0m-mTm-Lsyycd67IKHhRvATUxWHBJA") },
          { id: "ab-1.12", name: "AB1_Audio1.12", duration: "0:35", url: drive("12bOG3BmmDJYt3eCCaCkZjPxwSzJkw_PU") },
        ],
      },
      {
        seq: 2,
        items: [
          { id: "ab-2.1", name: "AB1_Audio2.1", duration: "0:42", url: drive("1yCFfniQVbVMq_xsrQCM0vpGh-cFnSsd5") },
          { id: "ab-2.2", name: "AB1_Audio2.2", duration: "1:54", url: drive("1gpAjnUcG498rhLNkYWgFLomHULCsCmcV") },
        ],
      },
      {
        seq: 3,
        items: [
          { id: "ab-3.1", name: "AB1_Audio3.1", duration: "0:57", url: drive("1b1YoNkC42EibcLwLfszVvcIQLA2eKk7-") },
          { id: "ab-3.2", name: "AB1_Audio3.2", duration: "0:59", url: drive("1n9fCnmpobhpgZWeF0fPf9eVU5x5SM-Fx") },
          { id: "ab-3.3", name: "AB1_Audio3.3", duration: "0:41", url: drive("1ivY8Vs-oNX3F1ij4fhBxvKXeYV1h2UXL") },
          { id: "ab-3.4", name: "AB1_Audio3.4", duration: "0:55", url: drive("1U1WoVz21rQhSLMBY8vAEaUj7uNiAnlAU") },
          { id: "ab-3.5", name: "AB1_Audio3.5", duration: "0:53", url: drive("1957SDOJ-jgMH2rvMGplBNR3oRhCCJRiK") },
          { id: "ab-3.6", name: "AB1_Audio3.6", duration: "0:40", url: drive("10wlt_lPkIWlBBOWeUa9AWX_BC9u1niYD") },
        ],
      },
      {
        seq: 4,
        items: [
          { id: "ab-4.1", name: "AB1_Audio4.1", duration: "1:22", url: drive("1VMSWIxiVaUmF8ZQy-Gm6u6-OhKt9vaej") },
        ],
      },
    ],
    videos: [
      { id: "ab-v02", name: "Video 02 - Hello Song", duration: "2:17", url: "https://youtu.be/9ECTWSZEoPw", thumbnail: ytThumb("9ECTWSZEoPw") },
      { id: "ab-v03", name: "Video 03 - Name Chant", duration: "1:20", url: "https://youtu.be/cclzNLWuMXk", thumbnail: ytThumb("cclzNLWuMXk") },
    ],
  },
  teachersGuide: {
    audios: [
      {
        seq: 1,
        items: [
          { id: "tg-1.5", name: "EF1_Audio1.5", duration: "0:50", url: drive("1Fi6RDL0qNSsWIOfPfTlbZ_o7jFh6Sfs5") },
        ],
      },
    ],
    videos: [
      { id: "tg-v04", name: "Video 04 - Hello in LSA", duration: "1:12", url: "https://youtu.be/7GIZGvh7Q90", thumbnail: ytThumb("7GIZGvh7Q90") },
      { id: "tg-v05", name: "Video 05 - Recap - Hello, everyone!", duration: "0:57", url: "https://youtu.be/j6gGcJ6WX1s", thumbnail: ytThumb("j6gGcJ6WX1s") },
    ],
  },
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

  // Mostrar botón de scroll to top solo cuando se llega abajo
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Mostrar cuando faltan menos de 200px para llegar al final
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;
      
      setShowScrollTop(isNearBottom);
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
      {/* Header Institucional Simulado */}
      <header className="w-full bg-white fixed top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
          {/* Logo Campus Educativo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/recurso-3.png"
              alt="Campus Educativo"
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
            <span className="text-sm sm:text-base font-medium text-[#494963] hidden sm:inline">
              <span className="font-bold">Campus</span> Educativo
            </span>
          </Link>

          {/* Navegación central - solo desktop */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <span className="text-sm text-[#494963]/70 hover:text-[#494963] cursor-pointer transition-colors">
              Formación Continua
            </span>
            <span className="text-sm text-[#494963]/70 hover:text-[#494963] cursor-pointer transition-colors flex items-center gap-1">
              Programas
              <ChevronRight className="w-3 h-3 rotate-90" />
            </span>
            <span className="text-sm text-[#494963]/70 hover:text-[#494963] cursor-pointer transition-colors">
              Recursos
            </span>
            <span className="text-sm text-[#494963]/70 hover:text-[#494963] cursor-pointer transition-colors">
              Blog
            </span>
          </nav>

          {/* Logo Santa Fe */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2024/08/sf_provincia.png"
              alt="Santa Fe Provincia"
              className="h-6 sm:h-8 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Header de navegación que aparece al hacer scroll */}
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
              background: "linear-gradient(180deg, #FFCA28 0%, #FFD54F 30%, #FFE082 55%, #FFF8E1 75%, #F5F3EE 100%)",
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
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen_web_ingles_mockupypersonajes-HLAuGaOy5Pa7aaMDJAJLLqqWWi8L0g.png"
                      alt="English Funzine - Magazine, Activity Book y Teacher's Guide con personajes"
                      className="w-full h-auto"
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
                    title="Magazine"
                    pdfUrl={pdfUrls.magazine}
                  />
                </div>

                {/* Activity Book */}
                <div ref={activityBookRef} id="activity-book" className="scroll-mt-20">
                  <MaterialCard
                    title="Activity Book"
                    pdfUrl={pdfUrls.activityBook}
                  />
                </div>

                {/* Teacher's Guide */}
                <div ref={teachersGuideRef} id="teachers-guide" className="scroll-mt-20">
                  <MaterialCard
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
  title, 
  pdfUrl,
  media,
}: { 
  title: string; 
  pdfUrl: string;
  media: MaterialMedia;
}) {
  const [activeTab, setActiveTab] = useState<"audios" | "videos">("audios");
  const [playingAudioId, setPlayingAudioId] = useState<string | number | null>(null);
  const [openSeqs, setOpenSeqs] = useState<number[]>(() => media.audios.map((s) => s.seq));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const allAudios = media.audios.flatMap((s) => s.items);
  const allVideos = media.videos;

  const toggleSeq = (seq: number) => {
    setOpenSeqs((prev) =>
      prev.includes(seq) ? prev.filter((s) => s !== seq) : [...prev, seq]
    );
  };

  const handleTogglePlay = (id: string | number, url: string) => {
    // Si ya hay un audio sonando, lo detenemos
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    // Si se clickeó el que estaba sonando, solo pausamos
    if (playingAudioId === id) {
      setPlayingAudioId(null);
      return;
    }
    // Reproducir el nuevo audio
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => setPlayingAudioId(null);
    setPlayingAudioId(id);
  };

  const handleDownloadAudios = () => {
    // Descargar todos los audios en un paquete separado
    allAudios.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.url;
      link.download = item.name;
      link.click();
    });
  };

  const handleDownloadVideos = () => {
    // Descargar todos los videos en un paquete separado
    allVideos.forEach((item) => {
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
        {title}
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

      {/* Download + Share buttons */}
      <div className="flex items-center gap-3">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial px-5 py-3 text-sm sm:text-base font-semibold transition-all hover:opacity-90 rounded-lg sm:rounded-full"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="w-4 h-4" />
          Descargar PDF
        </a>
        <button
          type="button"
          onClick={async (e) => {
            const btn = e.currentTarget;
            const shareData = {
              title: `English Funzine - ${title}`,
              text: `English Funzine - ${title} - Campus Educativo Santa Fe`,
              url: window.location.href,
            };
            
            const showFeedback = () => {
              btn.classList.add("scale-95");
              setTimeout(() => btn.classList.remove("scale-95"), 150);
              const originalHTML = btn.innerHTML;
              btn.innerHTML = '<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
              setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
            };
            
            try {
              if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
              } else if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(window.location.href);
                showFeedback();
              } else {
                // Fallback: crear input temporal para copiar
                const input = document.createElement('input');
                input.value = window.location.href;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                showFeedback();
              }
            } catch (err) {
              // Si hay error, intentar fallback
              if ((err as Error).name !== 'AbortError') {
                try {
                  const input = document.createElement('input');
                  input.value = window.location.href;
                  document.body.appendChild(input);
                  input.select();
                  document.execCommand('copy');
                  document.body.removeChild(input);
                  showFeedback();
                } catch {
                  // Silenciar error si todo falla
                }
              }
            }
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all border-2 hover:scale-105"
          style={{ 
            backgroundColor: "transparent", 
            borderColor: AREA_COLOR, 
            color: AREA_COLOR,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = AREA_COLOR;
            e.currentTarget.style.color = TEXT_ON_COLOR;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = AREA_COLOR;
          }}
          aria-label="Compartir"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

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

        {/* Media list agrupada por unidades */}
        <div className="space-y-3">
          {mediaUnits.map((unit) => {
            const items = activeTab === "audios" ? unit.audios : unit.videos;
            if (items.length === 0) return null;
            const isOpen = openUnits.includes(unit.id);
            return (
              <div key={unit.id} className="border border-[#494963]/10 rounded-xl overflow-hidden">
                {/* Cabecera de unidad */}
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-[#494963]/[0.03] transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm sm:text-base font-semibold text-[#494963] truncate">{unit.title}</span>
                    <span className="text-xs text-[#494963]/40 flex-shrink-0">
                      {items.length} {activeTab === "audios" ? (items.length === 1 ? "audio" : "audios") : (items.length === 1 ? "video" : "videos")}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#494963]/40 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Contenido de la unidad */}
                {isOpen && (
                  <div className="px-4 pb-2 border-t border-[#494963]/5">
                    {activeTab === "audios"
                      ? unit.audios.map((audio) => (
                          <div
                            key={audio.id}
                            className="flex items-center gap-3 py-3 border-b border-[#494963]/5 last:border-b-0"
                          >
                            <button
                              type="button"
                              onClick={() => handleTogglePlay(audio.id, audio.url)}
                              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#494963]/5 transition-colors"
                              style={{ color: playingAudioId === audio.id ? AREA_COLOR : "rgba(73,73,99,0.4)" }}
                              aria-label={playingAudioId === audio.id ? "Pausar" : "Reproducir"}
                            >
                              {playingAudioId === audio.id ? (
                                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : (
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-base text-[#494963] leading-tight">{audio.name}</p>
                              <p className="text-xs sm:text-sm text-[#494963]/40 mt-0.5">{audio.duration}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDownloadSingle(audio.url, audio.name)}
                              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#494963]/5 transition-colors"
                              aria-label={`Descargar ${audio.name}`}
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#494963]/40" />
                            </button>
                          </div>
                        ))
                      : unit.videos.map((video) => (
                          <div
                            key={video.id}
                            className="flex items-center gap-3 py-3 border-b border-[#494963]/5 last:border-b-0"
                          >
                            <div className="relative w-20 sm:w-24 aspect-video rounded overflow-hidden flex-shrink-0 bg-[#494963]/10">
                              <Image src={video.thumbnail} alt={video.name} fill className="object-cover" />
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
                              aria-label={`Descargar ${video.name}`}
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#494963]/40" />
                            </button>
                          </div>
                        ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Descargar paquete - separado por audios/videos según pestaña activa */}
        <div className="mt-5 flex flex-col items-center">
          <button
            type="button"
            onClick={activeTab === "audios" ? handleDownloadAudios : handleDownloadVideos}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#494963] hover:bg-[#494963]/90 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            {activeTab === "audios" ? "Descargar todos los audios" : "Descargar todos los videos"}
          </button>
          <p className="text-xs sm:text-sm text-[#494963]/40 text-center mt-2">
            {activeTab === "audios"
              ? `Paquete con ${allAudios.length} audios`
              : `Paquete con ${allVideos.length} videos`}
          </p>
        </div>
    </div>
  );
}
