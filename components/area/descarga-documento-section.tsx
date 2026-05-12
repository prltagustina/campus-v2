"use client";

import { Download, Share2 } from "lucide-react";
import Image from "next/image";
import type { Area } from "@/lib/areas-data";

/* Cover images mapped by area slug -- new editorial covers */
const coverImages: Record<string, string> = {
  "matematica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-Matematica-web_Pa%CC%81gina_01-MCFeyxLSelYTcVpIrKsUvmK6H7FF1J.jpg",
  "lengua-y-literatura": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-LenguayLiteratura-web_Pa%CC%81gina_01-X73FFAu0g4EmxWKVcLJcsl6fx7M8Wn.jpg",
  "ciencias-naturales": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-CienciasNaturales-web_Pa%CC%81gina_01-ON4JfhAyEccyF1wMBlT25aCQwRqXB1.jpg",
  "ciencias-sociales": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-Ciencias%20Sociales-web_Pa%CC%81gina_01-lG8ndEyYm05siE6C2JeDj3xSexK7m5.jpg",
  "educacion-fisica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Educacio%CC%81n%20Fi%CC%81sica_Pa%CC%81gina_01-1EXHsDfIgMX18p63bd0ekb2g0tJiji.jpg",
  "educacion-artistica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_001-ilFO0YDa9vKlHDmif0KmJ5CFIolI1g.jpg",
  "lenguas-extranjeras": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-Lenguas%20Extranjeras-web_Pa%CC%81gina_01-J7jbT6McejoYqhAjhd6ys1baPVZXFo.jpg",
  "educacion-tecnologica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-EducTecnologica-web_Pa%CC%81gina_01-4HXXfrSSCaL44THJmYgv01hOmIrRYA.jpg",
  "saberes-vidas-y-mundos": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-SaberesVidasyMundos-web_Pa%CC%81gina_01-wA8gfFbVFu8eR9TAAFpGqxR3HWAPqa.jpg",
};

/* Sub-area specific covers for Educacion Artistica */
const subareaCoverImages: Record<string, string> = {
  "artes-visuales": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_011-qeh6f4g3YpDp7Zlz93JgD7Rzs4kSyN.jpg",
  "musica": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_055-mROApX9OAy4ihre3BlZ4IYUWdSvb0j.jpg",
  "artes-audiovisuales": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_103-hdK3zOvWwkeNFZaAdhr4Tjs38MzheC.jpg",
  "danza": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_141-mYsqp6pCCNjLx0Zweo9YeJ10kmlIgF.jpg",
  "teatro": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Educacio%CC%81n%20Arti%CC%81stica-web_Pa%CC%81gina_169-IXg17BVfUab7fjCSXYxXUYQZdj35ZJ.jpg",
};

/* Wheel badge icon */
function WheelBadge({ color }: { color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: `${color}12` }}
    >
      <svg viewBox="0 0 48.52 52.44" className="w-5 h-5" fill={color} aria-hidden>
        <path d="M46.55,18.61h0c-3.29-7.65-10.07-12.74-17.68-14.23V1.63c0-.14-.06-.27-.15-.36-.17-.72-.79-1.27-1.56-1.27h-5.81c-.77,0-1.39.55-1.56,1.27-.09.09-.15.22-.15.36v2.74c-1.67.32-3.33.82-4.96,1.52C2.4,11.17-3.31,25.47,1.97,37.76c3.94,9.18,12.91,14.69,22.32,14.69,3.19,0,6.43-.63,9.54-1.97,12.29-5.28,18-19.57,12.72-31.86ZM27.16,34.92c-3.71,1.59-8.04-.13-9.63-3.85-.77-1.8-.8-3.79-.07-5.61.73-1.82,2.12-3.25,3.92-4.02.93-.4,1.91-.6,2.89-.6.92,0,1.84.18,2.72.53,1.82.73,3.25,2.12,4.02,3.92h0c.77,1.8.8,3.79.07,5.61-.73,1.82-2.12,3.25-3.92,4.02ZM4.6,35.5c-1.75-4.7-1.7-9.66-.18-14.11l10.76,4.3s.03,0,.04,0c-.48,1.72-.46,3.51.07,5.21l-10.7,4.59ZM33.22,25.46l10.69-4.59c1.74,4.66,1.7,9.58.21,14.01l-10.31-4.86c-.1-.05-.21-.06-.32-.08.29-1.49.17-3.02-.28-4.48ZM43.11,18.96l-10.71,4.6c-.88-1.55-2.16-2.8-3.73-3.63l4.32-10.82c4.28,1.96,7.91,5.36,10.12,9.86ZM19.8,8.86l.02.02c.09.37.27.71.58.93l1.23.9,2.26,2.28c.1.1.23.15.37.15s.27-.06.37-.15l2.26-2.27,1.24-.9c.31-.23.49-.57.58-.94l.02-.02c.1-.1.15-.23.15-.37v-.78c.74.17,1.47.38,2.19.63l-4.32,10.81c-1.72-.48-3.5-.45-5.2.07l-4.59-10.69c.89-.33,1.79-.61,2.7-.81v.78c0,.14.05.27.15.37ZM15.04,9.35l4.59,10.69c-1.55.88-2.8,2.16-3.64,3.74-.01,0-.02-.02-.03-.02l-10.76-4.3c1.96-4.28,5.34-7.91,9.84-10.11ZM5.42,37.4l10.67-4.58c.9,1.59,2.21,2.82,3.74,3.64l-4.31,10.79c-4.28-1.96-7.91-5.34-10.11-9.84ZM17.46,48.01l4.3-10.78c.81.23,1.66.35,2.51.35.9,0,1.81-.18,2.7-.45l4.59,10.7c-4.7,1.75-9.66,1.7-14.11.18ZM33.48,47.02l-4.59-10.69c1.79-1.01,3.19-2.54,4.01-4.45.01,0,.02.02.04.03l10.43,4.92c-1.95,4.32-5.35,7.99-9.89,10.2Z" />
      </svg>
    </div>
  );
}

interface DescargaDocumentoSectionProps {
  area: Area;
  selectedSubarea?: string | null;
}

export function DescargaDocumentoSection({ area, selectedSubarea }: DescargaDocumentoSectionProps) {
  /* Determine the correct cover image */
  let coverSrc = coverImages[area.slug] || coverImages["matematica"];
  if (selectedSubarea && subareaCoverImages[selectedSubarea]) {
    coverSrc = subareaCoverImages[selectedSubarea];
  }

  /* Determine display name */
  const displayName = selectedSubarea
    ? area.subareas?.find((s) => s.id === selectedSubarea)?.name || area.name
    : area.name;

  return (
    <section id="descarga" className="flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-14">
          {/* Book cover -- editorial style with subtle shadow */}
          <div className="flex-shrink-0">
            <Image
              src={coverSrc}
              alt={`Portada ${displayName}`}
              width={280}
              height={396}
              className="w-[220px] sm:w-[260px] md:w-[300px] h-auto object-cover rounded-sm shadow-[0_2px_20px_-4px_rgba(0,0,0,0.12)]"
            />
          </div>

          {/* Text + button -- clean editorial layout */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Area badge */}
            <div className="flex items-center gap-3 mb-5">
              <WheelBadge color={area.color} />
              <span
                className="text-sm font-semibold uppercase tracking-[0.15em]"
                style={{ color: area.color }}
              >
                {displayName}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#494963] leading-snug mb-4 text-balance font-display">
              {"Descargá"}
              <br />
              {"el documento del área"}
            </h3>

            {/* Description */}
            <p className="text-[#494963]/60 text-lg sm:text-xl leading-relaxed mb-9 max-w-md font-medium">
              {"Para profundizar en los contenidos, ejes y orientaciones de esta \u00e1rea curricular."}
            </p>

            {/* Download + Share buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-lg px-7 py-3.5 text-base font-semibold transition-all hover:opacity-90 hover:shadow-md"
                style={{ backgroundColor: area.color, color: area.textOnColor }}
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Descargar PDF</span>
                <span className="sm:hidden">Descargar</span>
              </a>
              <button
                type="button"
                onClick={(e) => {
                  const btn = e.currentTarget;
                  navigator.clipboard.writeText(window.location.href);
                  btn.classList.add("scale-95");
                  setTimeout(() => btn.classList.remove("scale-95"), 150);
                  // Mostrar feedback visual
                  const originalHTML = btn.innerHTML;
                  btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                  setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
                }}
                className="group w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 hover:scale-105"
                style={{ 
                  backgroundColor: "transparent", 
                  borderColor: area.color, 
                  color: area.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = area.color;
                  e.currentTarget.style.color = area.textOnColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = area.color;
                }}
                aria-label="Compartir"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
