"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import type { Area } from "@/lib/areas-data";

/* Wheel badge icon */
function WheelBadge({ color }: { color: string }) {
  return (
    <div
      className="absolute -top-7 left-8 sm:left-12 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-30"
      style={{ backgroundColor: "#494963" }}
    >
      <svg viewBox="0 0 48.52 52.44" className="w-7 h-7" fill={color} aria-hidden>
        <path d="M46.55,18.61h0c-3.29-7.65-10.07-12.74-17.68-14.23V1.63c0-.14-.06-.27-.15-.36-.17-.72-.79-1.27-1.56-1.27h-5.81c-.77,0-1.39.55-1.56,1.27-.09.09-.15.22-.15.36v2.74c-1.67.32-3.33.82-4.96,1.52C2.4,11.17-3.31,25.47,1.97,37.76c3.94,9.18,12.91,14.69,22.32,14.69,3.19,0,6.43-.63,9.54-1.97,12.29-5.28,18-19.57,12.72-31.86ZM27.16,34.92c-3.71,1.59-8.04-.13-9.63-3.85-.77-1.8-.8-3.79-.07-5.61.73-1.82,2.12-3.25,3.92-4.02.93-.4,1.91-.6,2.89-.6.92,0,1.84.18,2.72.53,1.82.73,3.25,2.12,4.02,3.92h0c.77,1.8.8,3.79.07,5.61-.73,1.82-2.12,3.25-3.92,4.02ZM4.6,35.5c-1.75-4.7-1.7-9.66-.18-14.11l10.76,4.3s.03,0,.04,0c-.48,1.72-.46,3.51.07,5.21l-10.7,4.59ZM33.22,25.46l10.69-4.59c1.74,4.66,1.7,9.58.21,14.01l-10.31-4.86c-.1-.05-.21-.06-.32-.08.29-1.49.17-3.02-.28-4.48ZM43.11,18.96l-10.71,4.6c-.88-1.55-2.16-2.8-3.73-3.63l4.32-10.82c4.28,1.96,7.91,5.36,10.12,9.86ZM19.8,8.86l.02.02c.09.37.27.71.58.93l1.23.9,2.26,2.28c.1.1.23.15.37.15s.27-.06.37-.15l2.26-2.27,1.24-.9c.31-.23.49-.57.58-.94l.02-.02c.1-.1.15-.23.15-.37v-.78c.74.17,1.47.38,2.19.63l-4.32,10.81c-1.72-.48-3.5-.45-5.2.07l-4.59-10.69c.89-.33,1.79-.61,2.7-.81v.78c0,.14.05.27.15.37ZM15.04,9.35l4.59,10.69c-1.55.88-2.8,2.16-3.64,3.74-.01,0-.02-.02-.03-.02l-10.76-4.3c1.96-4.28,5.34-7.91,9.84-10.11ZM5.42,37.4l10.67-4.58c.9,1.59,2.21,2.82,3.74,3.64l-4.31,10.79c-4.28-1.96-7.91-5.34-10.11-9.84ZM17.46,48.01l4.3-10.78c.81.23,1.66.35,2.51.35.9,0,1.81-.18,2.7-.45l4.59,10.7c-4.7,1.75-9.66,1.7-14.11.18ZM33.48,47.02l-4.59-10.69c1.79-1.01,3.19-2.54,4.01-4.45.01,0,.02.02.04.03l10.43,4.92c-1.95,4.32-5.35,7.99-9.89,10.2Z" />
      </svg>
    </div>
  );
}

interface DescargaDocumentoSectionProps {
  area: Area;
}

export function DescargaDocumentoSection({ area }: DescargaDocumentoSectionProps) {
  return (
    <section id="descarga" className="flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-visible"
          style={{
            backgroundColor: "#494963",
            boxShadow: `0 30px 70px -15px ${area.color}25, 0 15px 35px -10px rgba(73,73,99,0.2)`,
          }}
        >
          <WheelBadge color={area.color} />

          <div className="flex flex-col sm:flex-row items-center sm:items-end">
            {/* Book cover -- tilted */}
            <div className="flex-shrink-0 -mt-8 sm:mt-0 sm:ml-2 relative z-20 pt-10 sm:pt-8 pb-4 sm:pb-0">
              <Image
                src="/images/portada-lengua.png"
                alt={`Portada ${area.name}`}
                width={320}
                height={452}
                className="w-[200px] md:w-[280px] lg:w-[300px] h-auto drop-shadow-2xl"
                style={{ transform: "rotate(-6deg) translateY(-12px)" }}
              />
            </div>

            {/* Text + button -- LARGE text to match reference */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-10 md:px-12 py-8 sm:py-12 md:py-14 text-center sm:text-left">
              <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-balance">
                {"Descarg\u00e1 el documento completo para profundizar en los contenidos"}
              </p>

              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-base font-bold transition-all hover:scale-[1.03] hover:shadow-lg shadow-md"
                  style={{ backgroundColor: area.color, color: "white" }}
                >
                  Descargar PDF
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
