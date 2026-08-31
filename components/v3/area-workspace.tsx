"use client";

import { useState } from "react";
import type { Area } from "@/lib/areas-data";
import { VideoEmbed } from "@/components/v3/content-blocks";
import { DocumentoExplainer } from "@/components/v3/documento-explainer";
import { MaterialesSection } from "@/components/area/materiales-section";
import { FormacionesSection } from "@/components/area/formaciones-section";

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
const artisticAreaId = "educacion-artistica";

/**
 * Todas las áreas tienen un documento real en `documentUrls`, así que este
 * patrón se puede generalizar sin excepciones por ahora. Si en el futuro
 * alguna área queda sin documento, agregar acá la validación correspondiente
 * en vez de mostrar el CTA con un link roto.
 */
function documentoCurricularDescripcion(area: Area) {
  return `Accedé al Diseño Curricular de ${area.name} para conocer los objetivos, contenidos y recomendaciones didácticas del área.`;
}

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
  const options = [{ id: artisticAreaId, name: "Ed. Artística" }, ...subareas];
  const selected = options.find((option) => option.id === selectedId) ?? options[0];

  return (
    <section className="bg-white px-1 py-3 md:px-5 md:py-4">
      <div className="flex flex-wrap gap-2.5 md:gap-5" role="tablist" aria-label="Educación Artística y sus lenguajes">
        {options.map((option) => {
          const active = option.id === selected.id;
          return (
            <button
              key={option.id}
              id={`lenguaje-tab-${option.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="lenguaje-documento"
              onClick={() => onSelect(option.id)}
              className={`rounded-full border px-5 py-2.5 text-[14px] font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]/30 focus-visible:ring-offset-2 ${active ? "border-transparent text-white" : "border-[#EBEDEC] bg-white text-[#7A7A7A] hover:bg-[#EBEDEC] hover:text-[#494963]"}`}
              style={active ? { backgroundColor: area.color } : undefined}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function AreaVideoPresentation({ videoId, title }: { videoId: string; title: string }) {
  return (
    <section aria-labelledby={`video-${videoId}-title`}>
      <div className="mb-10 px-[14px] pt-10 md:mb-14 md:pt-16">
        <h2 id={`video-${videoId}-title`} className="font-display text-3xl font-semibold tracking-[-.03em] text-[#494963] md:text-4xl">
          Presentación audiovisual
        </h2>
      </div>
      <VideoEmbed videoId={videoId} title={title} />
    </section>
  );
}

export function AreaWorkspace({ area }: { area: Area }) {
  const isArtistic = area.slug === "educacion-artistica";
  const artisticSubareas = orderedArtisticSubareas(area);
  const [selectedArtisticId, setSelectedArtisticId] = useState(artisticAreaId);
  const selectedArtistic = artisticSubareas.find((subarea) => subarea.id === selectedArtisticId);
  const selectedArtisticMedia = selectedArtistic ? artisticSubareaMedia[selectedArtistic.id] : undefined;
  const hasSelectedArtisticTrainings = (area.teacherTrainings ?? []).some((group) =>
    (group.items ?? []).some((item) =>
      !selectedArtistic || item.name.toLocaleLowerCase("es").includes(selectedArtistic.name.toLocaleLowerCase("es")),
    ),
  );
  const selectArtisticLanguage = (id: string) => {
    if (id === selectedArtisticId) return;
    setSelectedArtisticId(id);
  };

  return <div className="min-h-full bg-white">
    <div className="py-4 md:space-y-5 md:pb-6 md:pt-0">
      {isArtistic ? (
        <>
          <ArtisticLanguageTabs area={area} selectedId={selectedArtisticId} onSelect={selectArtisticLanguage} />

          <div
            id="lenguaje-documento"
            key={selectedArtisticId}
            role="tabpanel"
            aria-labelledby={`lenguaje-tab-${selectedArtisticId}`}
            className="md:space-y-5"
          >
            <div id="documento">
              {selectedArtistic && selectedArtisticMedia ? (
              <DocumentoExplainer
                key={selectedArtistic.id}
                titulo={selectedArtistic.name}
                descripcion={`Accedé al documento curricular oficial desde la sección dedicada a ${selectedArtistic.name}.`}
                portadaSrc={selectedArtisticMedia.cover}
                pdfUrl={`${documentUrls[area.slug]}#page=${selectedArtisticMedia.pdfPage}`}
                accent={area.color}
                accentText={area.textOnColor}
              />
              ) : (
                <DocumentoExplainer titulo={area.name} descripcion={documentoCurricularDescripcion(area)} portadaSrc={covers[area.slug]} pdfUrl={documentUrls[area.slug]} accent={area.color} accentText={area.textOnColor} />
              )}
            </div>

            {selectedArtistic ? (
              <section className="py-10 md:px-[14px] md:py-16"><MaterialesSection area={area} artisticLanguage={selectedArtistic.name} /></section>
            ) : null}
            {hasSelectedArtisticTrainings ? (
              <section className="v3-section !p-0 md:!p-[14px]">
                <div className="rounded-none bg-[#F3F3F5] px-4 py-10 md:rounded-3xl md:px-8 md:py-16"><FormacionesSection area={area} artisticLanguage={selectedArtistic?.name} /></div>
              </section>
            ) : null}

            {selectedArtistic && selectedArtisticMedia ? (
              <div id="video">
                <AreaVideoPresentation
                  videoId={selectedArtisticMedia.videoId}
                  title={`Diseño Curricular Educación Primaria: ${selectedArtistic.name}`}
                />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div id="documento">
            <DocumentoExplainer titulo={area.name} descripcion={documentoCurricularDescripcion(area)} portadaSrc={covers[area.slug] ?? "/images/portada-diseno-curricular.png"} pdfUrl={documentUrls[area.slug]} accent={area.color} accentText={area.textOnColor} />
          </div>
          <section className="py-10 md:px-[14px] md:py-16"><MaterialesSection area={area} /></section>
          <section className="v3-section !p-0 md:!p-[14px]">
            <div className="rounded-none bg-[#F3F3F5] px-4 py-10 md:rounded-3xl md:px-8 md:py-16"><FormacionesSection area={area} /></div>
          </section>
          {videos[area.slug] ? (
            <div id="video">
              <AreaVideoPresentation videoId={videos[area.slug]} title={`Diseño Curricular Educación Primaria: ${area.name}`} />
            </div>
          ) : null}
        </>
      )}
    </div>
  </div>;
}
