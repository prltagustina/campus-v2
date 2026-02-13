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
      <div className="mb-6">
        <h3
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "#494963" }}
        >
          Video de presentacion
        </h3>
        <div
          className="mt-2 h-[2px] w-10 rounded-full"
          style={{ backgroundColor: area.color }}
        />
      </div>

      <div className="w-full max-w-2xl">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-50 shadow-sm ring-1 ring-gray-100">
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
