"use client";

import { Download } from "lucide-react";
import Image from "next/image";

export function FullDocumentDownload() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#F5F5F7]">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col items-center gap-7 sm:gap-10 md:flex-row md:gap-16">
            {/* Book cover */}
            <div className="flex-shrink-0">
              <Image
                src="/images/portada-diseno-curricular.png"
                alt="Portada Diseño Curricular"
                width={320}
                height={452}
                className="h-auto w-[min(52vw,220px)] object-cover rounded-sm shadow-[0_4px_30px_-6px_rgba(0,0,0,0.15)] sm:w-[280px] md:w-[320px]"
              />
            </div>

            {/* Text + button */}
            <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
              <h3 className="text-3xl font-bold sm:text-4xl md:text-5xl text-[#494963] leading-tight mb-6 font-display">
                Descargá el
                <br />
                documento completo
              </h3>

              {/* Download button */}
              <a
                href="/docs/Diseno_Curricular_Completo.pdf"
                download
                className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-base font-semibold transition-all hover:opacity-90 hover:shadow-md bg-[#494963] text-white"
              >
                <Download className="w-5 h-5" />
                <span>Descargar PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
