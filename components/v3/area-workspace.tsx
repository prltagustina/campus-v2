"use client";

import { useState } from "react";
import type { Area } from "@/lib/areas-data";
import { VideoEmbed } from "@/components/v3/content-blocks";
import { DocumentoExplainer } from "@/components/v3/documento-explainer";
import { MaterialesSection } from "@/components/area/materiales-section";
import { FormacionesSection } from "@/components/area/formaciones-section";
import { PillTabs } from "@/components/v3/pill-tabs";

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

  return (
    // pb-2.5 (no md:pb-8): mismo espacio de abajo que la separación de la
    // botonera de áreas (gap-2.5), en todos los anchos. pt-2.5 en mobile
    // (antes pt-6): mismo valor que el pb, quedaba con mucho más aire arriba
    // que abajo.
    <section className="sticky top-0 z-30 bg-white px-4 pt-2.5 pb-2.5 md:px-[14px] md:pt-0">
      <PillTabs
        options={options}
        selectedId={selectedId}
        onSelect={onSelect}
        color={area.color}
        activeForeground={area.textOnColor}
        ariaLabel="Educación Artística y sus lenguajes"
        panelId="lenguaje-documento"
        idPrefix="lenguaje-tab"
      />
    </section>
  );
}

function AreaVideoPresentation({ videoId, title }: { videoId: string; title: string }) {
  return (
    <section aria-labelledby={`video-${videoId}-title`}>
      {/* px-4/md:px-[14px]: mismo inset que VideoEmbed de acá abajo (su propio
         v3-section, con ese mismo padding) — el título tiene que quedar al
         ras de su borde, no más adentro. pt-5/md:pt-6 (antes pt-8/md:pt-10): mismo espacio que
         separa a Materiales de Formaciones (ver más abajo), para que las
         tres secciones queden parejas entre sí. */}
      <div className="mb-6 px-4 md:px-[14px] pt-5 md:mb-8 md:pt-6">
        <h2 id={`video-${videoId}-title`} className="font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">
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

  return <div className="bg-white">
    {/* pb-4/md:pb-6: aire propio después del último bloque (Video u
       Organización). Sin space-y acá: cada sección ya trae su propio
       pt-5/md:pt-6 (antes pt-8/md:pt-10; o su pb, en el caso de los tabs) — un space-y sumaba
       un segundo margen encima y duplicaba el salto entre secciones
       respecto de Inicio y Marco General. */}
    <div className="pb-4 md:pb-6">
      {isArtistic ? (
        <>
          <ArtisticLanguageTabs area={area} selectedId={selectedArtisticId} onSelect={selectArtisticLanguage} />

          <div
            id="lenguaje-documento"
            key={selectedArtisticId}
            role="tabpanel"
            aria-labelledby={`lenguaje-tab-${selectedArtisticId}`}
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
              <section className="pt-5 md:px-[14px] md:pt-6"><MaterialesSection area={area} artisticLanguage={selectedArtistic.name} /></section>
            ) : null}
            {hasSelectedArtisticTrainings ? (
              <section className="pt-5 md:px-[14px] md:pt-6"><FormacionesSection area={area} artisticLanguage={selectedArtistic?.name} /></section>
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
        <div>
          <div id="documento">
            <DocumentoExplainer titulo={area.name} descripcion={documentoCurricularDescripcion(area)} portadaSrc={covers[area.slug] ?? "/images/portada-diseno-curricular.png"} pdfUrl={documentUrls[area.slug]} accent={area.color} accentText={area.textOnColor} />
          </div>
          {/* pt (no py): el espacio "de abajo" de cada sección lo pone el pt
             de la siguiente, no las dos sumadas — si no, quedaba el doble de
             aire entre Materiales/Formaciones/Presentación que entre
             Documento y Materiales. Mismo valor en las tres (pt-5/md:pt-6, antes pt-8/md:pt-10,
             ver AreaVideoPresentation) para que el ritmo sea parejo. */}
          <section className="pt-5 md:px-[14px] md:pt-6"><MaterialesSection area={area} /></section>
          {/* Sin contenedor gris propio: mismo wrapper que Itinerarios, para
             que el título quede alineado con el resto de la vista. */}
          <section className="pt-5 md:px-[14px] md:pt-6"><FormacionesSection area={area} /></section>
          {videos[area.slug] ? (
            <div id="video">
              <AreaVideoPresentation videoId={videos[area.slug]} title={`Diseño Curricular Educación Primaria: ${area.name}`} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  </div>;
}
