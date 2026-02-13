"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MarcoGeneralSection() {
  return (
    <section id="marco-general" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-3 block">
                Fundamentos
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-sans">
                Marco General
              </h2>
              <p className="text-white/45 text-lg mt-4 max-w-lg leading-relaxed">
                {"Un video introductorio sobre los fundamentos, la estructura y los ejes del nuevo dise\u00f1o curricular."}
              </p>
            </div>

            <Link
              href="/marco-general"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-medium text-sm hover:border-white/40 hover:bg-white/5 transition-colors flex-shrink-0 self-start md:self-end"
            >
              {"Ver m\u00e1s"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Video embed */}
          <div className="w-full max-w-4xl">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/eu8CYPbjehE"
                title="Presentaci\u00f3n Dise\u00f1o Curricular de la Provincia de Santa Fe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarcoGeneralSection;
