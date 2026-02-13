"use client";

import type { Area } from "@/lib/areas-data";

interface VideoSectionProps {
  area: Area;
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
};

export function VideoSection({ area }: VideoSectionProps) {
  const videoId = videoIds[area.slug];
  if (!videoId) return null;

  return (
    <section id="video" className="scroll-mt-32">
      {/* Section header -- centered alignment */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <div
          className="w-10 h-1 rounded-full mb-6"
          style={{ backgroundColor: area.color }}
        />
        <h3
          className="text-xs md:text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: "#494963" }}
        >
          {"Video de presentaci\u00f3n"}
        </h3>
      </div>

      {/* Video embed -- full width for impact */}
      <div className="w-full max-w-4xl mx-auto">
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5"
          style={{
            boxShadow: `0 25px 60px -12px ${area.color}20, 0 12px 30px -8px rgba(0,0,0,0.08)`,
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Presentacion ${area.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
