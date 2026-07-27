"use client";

import type { Area } from "@/lib/areas-data";

interface VideoSectionProps {
  area: Area;
  selectedSubarea?: string | null;
}

const videoIds: Record<string, string> = {
  "lengua-y-literatura": "L4XjGG-VifM",
  matematica: "r-I7AoJa8pU",
  "saberes-vidas-y-mundos": "HMMreVRVHTI",
  "educacion-tecnologica": "KocVYBKQrVI",
  "ciencias-sociales": "tNnGWjSH428",
  "educacion-fisica": "LRhnK6dsOik",
  "ciencias-naturales": "0abbTE7jJFg",
  "lenguas-extranjeras": "A3qQdMQMe3Y",
  "artes-visuales": "l8o9umfg6pw",
  musica: "zsg-8h3AOVo",
  "artes-audiovisuales": "eAKa4BS-O2U",
  teatro: "LUYNKaiWrtM",
  danza: "1_0VxO8-yj4",
};

export function VideoSection({ area, selectedSubarea }: VideoSectionProps) {
  const videoId = videoIds[selectedSubarea ?? area.slug];
  const displayName = selectedSubarea
    ? area.subareas?.find((subarea) => subarea.id === selectedSubarea)?.name ?? area.name
    : area.name;

  return (
    <section id="video" className="scroll-mt-32">
      {/* Section header -- centered alignment, stronger hierarchy */}
      <div className="flex flex-col items-center text-center mb-14 md:mb-20">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963] font-display">
          {"Video de presentaci\u00f3n"}
        </h3>
      </div>

      {videoId ? <div className="w-full max-w-4xl mx-auto">
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5"
          style={{
            boxShadow: `0 25px 60px -12px ${area.color}20, 0 12px 30px -8px rgba(0,0,0,0.08)`,
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Presentacion ${displayName}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div> : <div className="mx-auto max-w-4xl rounded-2xl bg-[#F3F3F5] px-5 py-8 text-[#494963]/45">La presentación audiovisual de {displayName} se publicará próximamente.</div>}
    </section>
  );
}
