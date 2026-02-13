"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MarcoGeneralSection() {
  return (
    <section id="marco-general" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight">
                {"Conoce el"}
                <br />
                {"marco general"}
              </h2>
              <p className="text-[#494963]/60 text-lg mt-3 max-w-lg leading-relaxed">
                {"Un video introductorio sobre los fundamentos, la estructura y los ejes del nuevo diseno curricular."}
              </p>
            </div>

            <Link
              href="/marco-general"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#494963]/15 text-[#494963] font-medium text-sm hover:border-[#494963]/30 hover:bg-[#494963]/4 transition-colors flex-shrink-0 self-start md:self-end"
            >
              {"Conocer mas sobre el Marco General"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Video embed */}
          <div className="w-full max-w-4xl">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#494963]/5">
              <iframe
                src="https://www.youtube.com/embed/eu8CYPbjehE"
                title="Presentacion Diseno Curricular de la Provincia de Santa Fe"
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
