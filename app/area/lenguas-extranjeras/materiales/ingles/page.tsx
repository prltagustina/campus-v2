"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  Download,
  FileText,
} from "lucide-react";
import { BackLink } from "@/components/v3/back-link";
import { ShareResourceButton } from "@/components/v3/share-resource-button";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";
const PRESENTATION_VIDEO_ID = "rAAkotC7txU";

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

/* PDF URLs */
const pdfUrls = {
  magazine: "https://drive.google.com/uc?export=download&id=10Lx9KCy2fJvlwSQNTLgqauG9DuPimu6H",
  activityBook: "https://drive.google.com/uc?export=download&id=1iyZujvPywO3zIBTe6jAnZWDBpm0QmJ6y",
  teachersGuide: "https://drive.google.com/uc?export=download&id=10iFhPHeI6d1mZGOTvYM0NoxCx0UwLxTl",
};

/* Portadas publicadas en la página oficial de English Funzine. */
const coverImages = {
  magazine: {
    src: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/fun-zine-1.jpg",
    width: 528,
    height: 749,
    alt: "Portada de English Funzine Magazine 1",
  },
  activityBook: {
    src: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/02-activity.jpg",
    width: 506,
    height: 713,
    alt: "Portada de English Funzine Activity Book 1",
  },
  teachersGuide: {
    src: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/03-guide.jpg",
    width: 506,
    height: 713,
    alt: "Portada de English Funzine Teacher's Guide 1",
  },
};

/* Helpers para construir URLs reales (Google Drive / YouTube) */
const drive = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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
  const presentacionRef = useRef<HTMLDivElement>(null);
  const magazineRef = useRef<HTMLDivElement>(null);
  const activityBookRef = useRef<HTMLDivElement>(null);
  const teachersGuideRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
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
    <div className="flex min-h-full min-w-0 flex-col bg-white">
      {/* MAIN LAYOUT */}
      <main className="relative flex-1 overflow-x-hidden">
        {/* HERO como tarjeta, mismo patrón EXACTO que DocumentoExplainer en
           cualquier área: v3-section con !pt-0 (sin padding arriba — la
           tarjeta arranca pegada al margen superior del panel, como la
           portada de cualquier área) y 14px a los costados/abajo. */}
        <section className="v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0">
          <div className="relative overflow-hidden rounded-none md:rounded-t-2xl">
          {/* Background amarillo saturado */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              background: "linear-gradient(180deg, #FFCA28 0%, #FFD54F 30%, #FFE082 55%, #FFF8E1 75%, #F5F3EE 100%)",
            }}
          />

          {/* Contenido del Hero: alineado a la izquierda, sin centrar ni topar
             el ancho del contenedor — igual que el texto de DocumentoExplainer
             en cualquier área (que tampoco centra ni topa su columna; el
             párrafo de bienvenida, más abajo, tiene su propio max-w para
             no leerse ancho, como allá). Antes quedaba centrado con un
             hueco vacío a la derecha, desconectado del resto del sitio. */}
          <div className="relative" style={{ zIndex: 2 }}>
            <div className="w-full px-4 sm:px-7">
                  <h1 className="sr-only">English Funzine</h1>

                  {/* Todo lo que es texto/logo/botones va centrado con un
                     máximo de ancho — a todo el ancho de la columna se veía
                     desproporcionado en desktop. El video y la ilustración
                     de personajes sí ocupan todo el ancho (son piezas
                     visuales, no texto). */}
                  <div className="mx-auto max-w-2xl">
                    <BackLink href="/area/lenguas-extranjeras" label="Volver a Lenguas Extranjeras" className="mt-6 sm:mt-8" />

                    {/* Logo - más grande en mobile */}
                    <div className="mt-5 mb-5 sm:mt-6 sm:mb-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-funzine-LQEjEmOFKR3zDMZCkWPx4Q1ircXGEX.svg"
                        alt="English Funzine"
                        width={550}
                        height={150}
                        unoptimized
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
                  </div>

                  {/* Video oficial de presentación: a todo el ancho de la
                     columna (igual que VideoEmbed en "Presentación
                     audiovisual" de cada área), no topado como el resto. */}
                  <div ref={presentacionRef} id="presentacion" className="mb-10 sm:mb-12">
                    <div className="mx-auto max-w-2xl">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-[#494963]/40">
                        Video de presentación
                      </p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-[#494963]/5">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${PRESENTATION_VIDEO_ID}?rel=0`}
                        title="Presentación de English Funzine 1"
                        className="absolute inset-0 h-full w-full"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  <div className="mx-auto max-w-2xl">
                    {/* Intro text - más grande en mobile */}
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#494963]/80 leading-relaxed mb-8 sm:mb-10">
                      Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>.
                      Esta serie de materiales está pensada para acompañar la implementación de Lenguas Extranjeras
                      en aquellas escuelas primarias de Santa Fe que elijan enseñar inglés.
                    </p>

                    {/* Issues section - integrado con el diseño */}
                    <div className="mb-8 sm:mb-10 lg:mb-12">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-[#494963]/40 sm:mb-4">
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
                  </div>

                  {/* Magazine covers - Banner con personajes: a todo el
                     ancho de la columna, como el video de arriba. */}
                  <div className="relative mt-8 sm:mt-12 lg:mt-16 pb-10 sm:pb-14 lg:pb-20">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen_web_ingles_mockupypersonajes-HLAuGaOy5Pa7aaMDJAJLLqqWWi8L0g.png"
                      alt="English Funzine - Magazine, Activity Book y Teacher's Guide con personajes"
                      width={3752}
                      height={2212}
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 40rem, 42rem"
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
          </div>
        </section>

        {/* MATERIALS SECTION - mismo patrón EXACTO que el hero de arriba: el
           v3-section externo solo da el inset de 14px (sin pintar nada), y
           el color de fondo va en una tarjeta interior (rounded-b-2xl, ya
           que arriba cierra con el hero en rounded-t-2xl). Antes el color
           estaba pintado directo en el v3-section externo, que no tiene ese
           inset — por eso el fondo se veía más ancho que el del hero. */}
        <section className="v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0" style={{ marginTop: "-40px" }}>
          <div className="relative overflow-hidden rounded-none bg-[#F5F3EE] md:rounded-b-2xl" style={{ zIndex: 0, paddingTop: "60px" }}>
          <div className="mx-auto w-full max-w-2xl px-4 sm:px-7 py-8 sm:py-12 lg:py-16">
              {/* Issue 1 Title */}
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#494963] flex items-center gap-2 sm:gap-3">
                  <span>It&apos;s great to be me!</span>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#494963]/30 flex-shrink-0" />
                </h2>
              </div>

              {/* Materials */}
              <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                {/* 01. Magazine */}
                <div ref={magazineRef} id="magazine">
                  <MaterialCard
                    title="Magazine"
                    pdfUrl={pdfUrls.magazine}
                    cover={coverImages.magazine}
                    media={funzineMedia.magazine}
                  />
                </div>

                {/* Activity Book */}
                <div ref={activityBookRef} id="activity-book">
                  <MaterialCard
                    title="Activity Book"
                    pdfUrl={pdfUrls.activityBook}
                    cover={coverImages.activityBook}
                    media={funzineMedia.activityBook}
                  />
                </div>

                {/* Teacher's Guide */}
                <div ref={teachersGuideRef} id="teachers-guide">
                  <MaterialCard
                    title="Teacher's Guide"
                    pdfUrl={pdfUrls.teachersGuide}
                    cover={coverImages.teachersGuide}
                    media={funzineMedia.teachersGuide}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

/* Tarjeta de cada publicación de English Funzine. */
function MaterialCard({ 
  title, 
  pdfUrl,
  cover,
  media,
}: { 
  title: string; 
  pdfUrl: string;
  cover: { src: string; width: number; height: number; alt: string };
  media: MaterialMedia;
}) {
  const [activeTab, setActiveTab] = useState<"audios" | "videos">("audios");
  const [playingAudioId, setPlayingAudioId] = useState<string | number | null>(null);
  const [openSeqs, setOpenSeqs] = useState<number[]>([]);
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

  return (
    <div className="rounded-[18px] border border-[#EBEDEC] bg-white p-4 sm:p-6 lg:p-8">
      {/* Título */}
      <p className="mb-4 text-lg font-bold text-[#494963] sm:mb-5 sm:text-xl lg:text-2xl">
        {title}
      </p>

      {/* La página oficial presenta cada publicación mediante su portada y
         deja la descarga como una acción explícita. Además de mantener el
         mismo tratamiento visual, esto evita que el navegador cargue o
         descargue tres PDFs completos apenas se visita FUNZINE. */}
      <div className="mb-4 flex w-full justify-center sm:mb-5">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(max-width: 639px) calc(100vw - 4rem), 506px"
          className="h-[436px] w-auto max-w-full border-[10px] border-[#EBEDEC] object-contain sm:h-[640px] lg:h-[800px]"
        />
      </div>

      {/* Descarga principal en amarillo, con el radio corto del sistema (no
         circular). Compartir conserva la acción secundaria compacta. */}
      <div className="flex items-center gap-2">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Descargar ${title}`}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-[9px] px-4 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963]"
          style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
        >
          <Download className="h-4 w-4 shrink-0" />
          <span className="text-sm font-semibold">Descargar PDF</span>
        </a>
        <ShareResourceButton title={`English Funzine - ${title}`} url={pdfUrl} />
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

        {/* AUDIOS: agrupados por secuencia (acordeón minimalista) */}
        {activeTab === "audios" && (
          <div className="space-y-3">
            {media.audios.length === 0 && (
              <p className="text-sm text-[#494963]/40 py-6 text-center">No hay audios disponibles.</p>
            )}
            {media.audios.map((sequence) => {
              const isOpen = openSeqs.includes(sequence.seq);
              return (
                <div
                  key={sequence.seq}
                  className="border border-[#494963]/10 rounded-xl overflow-hidden"
                >
                  {/* Cabecera de secuencia */}
                  <button
                    type="button"
                    onClick={() => toggleSeq(sequence.seq)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-[#494963]/[0.03] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm sm:text-base font-semibold text-[#494963]">
                        Secuencia {sequence.seq}
                      </span>
                      <span className="text-xs text-[#494963]/40 flex-shrink-0">
                        {sequence.items.length} {sequence.items.length === 1 ? "audio" : "audios"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#494963]/40 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Lista de audios de la secuencia */}
                  {isOpen && (
                    <div className="px-4 pb-2 border-t border-[#494963]/5">
                      {sequence.items.map((audio) => {
                        const isPlaying = playingAudioId === audio.id;
                        return (
                          <div
                            key={audio.id}
                            className="flex items-center gap-3 py-3 border-b border-[#494963]/5 last:border-b-0"
                          >
                            {/* Mismo criterio que el botón de Descargar al
                               lado: superficie/fondo en reposo, no solo en
                               hover. */}
                            <button
                              type="button"
                              onClick={() => handleTogglePlay(audio.id, audio.url)}
                              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-[#494963]/[.06] transition-colors hover:bg-[#494963]/[.12]"
                              style={{ color: isPlaying ? AREA_COLOR : "rgba(73,73,99,0.4)" }}
                              aria-label={isPlaying ? "Pausar" : "Reproducir"}
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : (
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-base text-[#494963] leading-tight truncate">{audio.name}</p>
                              <p className="text-xs sm:text-sm text-[#494963]/40 mt-0.5">{audio.duration}</p>
                            </div>
                            <a
                              href={audio.url}
                              download
                              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#494963]/[.06] transition-colors hover:bg-[#494963]/[.12]"
                              aria-label={`Descargar ${audio.name}`}
                            >
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#494963]/40" />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* VIDEOS: grilla responsiva */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {media.videos.length === 0 && (
              <p className="text-sm text-[#494963]/40 py-6 text-center col-span-full">No hay videos disponibles.</p>
            )}
            {media.videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl overflow-hidden border border-[#494963]/10 hover:border-[#494963]/20 transition-colors"
              >
                <div className="relative aspect-video bg-[#494963]/10 overflow-hidden">
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.name}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 3.5rem), 20rem"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-[#494963]/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                      <Play className="w-5 h-5 text-[#494963] ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base text-[#494963] leading-tight truncate">{video.name}</p>
                    <p className="text-xs text-[#494963]/40 mt-0.5">{video.duration}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        
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
        </div>
    </div>
  );
}
