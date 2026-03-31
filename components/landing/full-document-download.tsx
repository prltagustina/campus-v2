"use client";

import { Download } from "lucide-react";
import Image from "next/image";

export function FullDocumentDownload() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#EDEDF0]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Book cover */}
            <div className="flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-MarcoGeneral-web_Pa%CC%81gina_01-KVu4N50A14MHe61Ey0J3NdM5rfZAMQ.jpg"
                alt="Portada Diseño Curricular"
                width={320}
                height={452}
                className="w-[240px] sm:w-[280px] md:w-[320px] h-auto object-cover rounded-sm shadow-[0_4px_30px_-6px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Text + button */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#494963] leading-tight mb-6 font-display">
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
