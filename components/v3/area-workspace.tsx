"use client";

import { useState } from "react";
import { BookOpen, FileText, GraduationCap, PlayCircle } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import { DocumentoHero, VideoEmbed } from "@/components/v3/content-blocks";
import { MaterialesSection } from "@/components/area/materiales-section";
import { FormacionesSection } from "@/components/area/formaciones-section";
import { StickySectionNav, type StickySectionNavItem } from "@/components/v3/sticky-section-nav";

const covers: Record<string, string> = {
  matematica: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-Matematica-web_Pa%CC%81gina_01-MCFeyxLSelYTcVpIrKsUvmK6H7FF1J.jpg",
  "lengua-y-literatura": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-LenguayLiteratura-web_Pa%CC%81gina_01-X73FFAu0g4EmxWKVcLJcsl6fx7M8Wn.jpg",
  "ciencias-naturales": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-CienciasNaturales-web_Pa%CC%81gina_01-ON4JfhAyEccyF1wMBlT25aCQwRqXB1.jpg",
  "ciencias-sociales": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-Ciencias%20Sociales-web_Pa%CC%81gina_01-lG8ndEyYm05siE6C2JeDj3xSexK7m5.jpg",
  "educacion-fisica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Educacio%CC%81n%20Fi%CC%81sica_Pa%CC%81gina_01-1EXHsDfIgMX18p63bd0ekb2g0tJiji.jpg",
  "educacion-artistica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_001-ilFO0YDa9vKlHDmif0KmJ5CFIolI1g.jpg",
  "lenguas-extranjeras": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-Lenguas%20Extranjeras-web_Pa%CC%81gina_01-J7jbT6McejoYqhAjhd6ys1baPVZXFo.jpg",
  "educacion-tecnologica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-EducTecnologica-web_Pa%CC%81gina_01-4HXXfrSSCaL44THJmYgv01hOmIrRYA.jpg",
  "saberes-vidas-y-mundos": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-SaberesVidasyMundos-web_Pa%CC%81gina_01-wA8gfFbVFu8eR9TAAFpGqxR3HWAPqa.jpg",
};

const videos: Record<string, string> = {
  "lengua-y-literatura": "L4XjGG-VifM", matematica: "r-I7AoJa8pU", "saberes-vidas-y-mundos": "HMMreVRVHTI",
  "educacion-tecnologica": "KocVYBKQrVI", "ciencias-sociales": "tNnGWjSH428", "educacion-fisica": "LRhnK6dsOik",
  "ciencias-naturales": "0abbTE7jJFg", "lenguas-extranjeras": "A3qQdMQMe3Y",
};

const documentUrls: Record<string, string> = {
  matematica: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/matematica.pdf",
  "lengua-y-literatura": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/lengua-y-literatura.pdf",
  "ciencias-naturales": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/ciencias-naturales.pdf",
  "ciencias-sociales": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/ciencias-sociales.pdf",
  "saberes-vidas-y-mundos": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/saberes-vidas-y-mundos.pdf",
  "educacion-artistica": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/educacion-artistica.pdf",
  "educacion-tecnologica": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/educacion-tecnologica.pdf",
  "educacion-fisica": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/educacion-fisica.pdf",
  "lenguas-extranjeras": "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/lenguas-extranjeras.pdf",
};

const artisticSubareaMedia: Record<string, { cover: string; videoId: string; pdfPage: number }> = {
  "artes-visuales": {
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_011-qeh6f4g3YpDp7Zlz93JgD7Rzs4kSyN.jpg",
    videoId: "l8o9umfg6pw",
    pdfPage: 11,
  },
  musica: {
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_055-mROApX9OAy4ihre3BlZ4IYUWdSvb0j.jpg",
    videoId: "zsg-8h3AOVo",
    pdfPage: 55,
  },
  "artes-audiovisuales": {
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_103-hdK3zOvWwkeNFZaAdhr4Tjs38MzheC.jpg",
    videoId: "eAKa4BS-O2U",
    pdfPage: 103,
  },
  teatro: {
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_169-IXg17BVfUab7fjCSXYxXUYQZdj35ZJ.jpg",
    videoId: "LUYNKaiWrtM",
    pdfPage: 169,
  },
  danza: {
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_141-mYsqp6pCCNjLx0Zweo9YeJ10kmlIgF.jpg",
    videoId: "1_0VxO8-yj4",
    pdfPage: 141,
  },
};

const artisticSubareaOrder = ["artes-visuales", "musica", "artes-audiovisuales", "teatro", "danza"] as const;

const areaSectionItems: StickySectionNavItem[] = [
  { id: "documento", label: "Documento", icon: FileText },
  { id: "video", label: "Video", icon: PlayCircle },
  { id: "materiales", label: "Itinerarios", icon: BookOpen },
  { id: "formacion", label: "Formaciones", mobileLabel: "Formación", icon: GraduationCap },
];

function orderedArtisticSubareas(area: Area) {
  return [...(area.subareas ?? [])].sort((a, b) => artisticSubareaOrder.indexOf(a.id as (typeof artisticSubareaOrder)[number]) - artisticSubareaOrder.indexOf(b.id as (typeof artisticSubareaOrder)[number]));
}

function ArtisticLanguageTabs({
  area,
  selectedId,
  onSelect,
}: {
  area: Area;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const subareas = orderedArtisticSubareas(area);
  const selected = subareas.find((subarea) => subarea.id === selectedId) ?? subareas[0];

  if (!selected) return null;

  return (
    <section className="rounded-3xl bg-white px-1 py-6 md:px-5 md:py-8" aria-labelledby="lenguajes-title">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.16em]" style={{ color: area.color }}>Área curricular</p>
        <h2 id="lenguajes-title" className="mt-2 font-display text-3xl font-semibold tracking-[-.03em] text-[#494963] md:text-4xl">Un área, cinco lenguajes</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-[#494963]/60">
          Elegí un lenguaje para actualizar la presentación audiovisual anterior y consultar, a continuación, su documento curricular específico.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5" role="tablist" aria-label="Lenguajes de Educación Artística">
        {subareas.map((subarea, index) => {
          const active = subarea.id === selected.id;
          return (
            <button
              key={subarea.id}
              id={`lenguaje-tab-${subarea.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="lenguaje-documento"
              onClick={() => onSelect(subarea.id)}
              className={`group flex min-h-[82px] flex-col justify-between rounded-2xl p-3.5 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]/30 focus-visible:ring-offset-2 md:min-h-[86px] md:p-4 ${active ? "shadow-[0_10px_26px_-16px_rgba(73,73,99,.55)]" : "bg-[#F7F7F9] text-[#494963] hover:bg-[#EFEFF3]"}`}
              style={active ? { backgroundColor: area.color, color: "#494963" } : undefined}
            >
              <span className={`flex items-center justify-between text-[11px] font-bold tracking-[.08em] ${active ? "text-[#494963]/65" : "text-[#494963]/35"}`}>
                {String(index + 1).padStart(2, "0")}
                <i
                  className={`h-2 w-2 rounded-full transition-transform ${active ? "scale-100 bg-[#494963]" : "scale-75 opacity-30 group-hover:opacity-60"}`}
                  style={active ? undefined : { backgroundColor: area.color }}
                />
              </span>
              <span className="pr-2 text-sm font-semibold leading-tight md:text-[15px]">{subarea.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function AreaVideoPresentation({ videoId, title, context }: { videoId: string; title: string; context: string }) {
  return (
    <section aria-labelledby={`video-${videoId}-title`}>
      <div className="px-[14px] pb-1 pt-5 md:pt-7">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#494963]/40">Presentación audiovisual</p>
        <h2 id={`video-${videoId}-title`} aria-live="polite" className="mt-2 min-h-[2.35em] font-display text-2xl font-semibold tracking-[-.025em] text-[#494963] md:text-3xl">
          {context}
        </h2>
      </div>
      <VideoEmbed videoId={videoId} title={title} />
    </section>
  );
}

export function AreaWorkspace({ area }: { area: Area }) {
  const isArtistic = area.slug === "educacion-artistica";
  const artisticSubareas = orderedArtisticSubareas(area);
  const [selectedArtisticId, setSelectedArtisticId] = useState(artisticSubareas[0]?.id ?? "");
  const selectedArtistic = artisticSubareas.find((subarea) => subarea.id === selectedArtisticId) ?? artisticSubareas[0];
  const selectedArtisticMedia = selectedArtistic ? artisticSubareaMedia[selectedArtistic.id] : undefined;

  const selectArtisticLanguage = (id: string) => {
    if (id === selectedArtisticId) return;
    setSelectedArtisticId(id);
    // El video está antes de la botonera por decisión editorial. Al cambiar de
    // lenguaje lo volvemos a poner en contexto para no actualizarlo fuera de vista.
    window.requestAnimationFrame(() => {
      document.getElementById("video")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return <div className="min-h-full bg-white">
    <StickySectionNav title={area.name} items={areaSectionItems} tabsOnlyBelowDesktop />

    <div className="space-y-5 p-4 md:p-6">
      {isArtistic ? (
        <>
          <div id="documento" className="scroll-mt-14 lg:scroll-mt-20">
            <DocumentoHero titulo={area.name} eyebrow="Documento curricular" descripcion="Accedé al documento oficial del área, con la organización común de sus cinco lenguajes artísticos." portadaSrc={covers[area.slug]} pdfUrl={documentUrls[area.slug]} accent={area.color} accentText="#494963" />
          </div>

          {selectedArtistic && selectedArtisticMedia ? (
            <div id="video" className="scroll-mt-14 lg:scroll-mt-20">
              <AreaVideoPresentation
                key={selectedArtisticMedia.videoId}
                videoId={selectedArtisticMedia.videoId}
                title={`Diseño Curricular Educación Primaria: ${selectedArtistic.name}`}
                context={selectedArtistic.name}
              />
            </div>
          ) : null}

          {selectedArtistic ? <ArtisticLanguageTabs area={area} selectedId={selectedArtistic.id} onSelect={selectArtisticLanguage} /> : null}

          {selectedArtistic && selectedArtisticMedia ? (
            <div id="lenguaje-documento" role="tabpanel" aria-labelledby={`lenguaje-tab-${selectedArtistic.id}`}>
              <DocumentoHero
                key={selectedArtistic.id}
                titulo={selectedArtistic.name}
                eyebrow="Documento curricular"
                descripcion={`Accedé al documento curricular oficial desde la sección dedicada a ${selectedArtistic.name}.`}
                portadaSrc={selectedArtisticMedia.cover}
                pdfUrl={`${documentUrls[area.slug]}#page=${selectedArtisticMedia.pdfPage}`}
                accent={area.color}
                accentText="#494963"
              />
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div id="documento" className="scroll-mt-14 lg:scroll-mt-20">
            <DocumentoHero titulo={area.name} eyebrow="Documento curricular" descripcion="Accedé al documento oficial del área, con sus contenidos, orientaciones y organización por ciclos y grados." portadaSrc={covers[area.slug] ?? "/images/portada-diseno-curricular.png"} pdfUrl={documentUrls[area.slug]} accent={area.color} accentText={area.textOnColor} />
          </div>
          {videos[area.slug] ? (
            <div id="video" className="scroll-mt-14 lg:scroll-mt-20">
              <AreaVideoPresentation videoId={videos[area.slug]} title={`Diseño Curricular Educación Primaria: ${area.name}`} context={area.name} />
            </div>
          ) : null}
        </>
      )}

      <section className="py-10 md:px-6 md:py-16"><MaterialesSection area={area} /></section>
      <section className="rounded-3xl bg-[#F3F3F5] px-4 py-12 md:px-8 md:py-16"><FormacionesSection area={area} /></section>
    </div>
  </div>;
}
