"use client";

import Link from "next/link";
import { areasData } from "@/lib/areas-data";
import { ArrowRight } from "lucide-react";

export function AreasAccess() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#494963] mb-2">
            {"Explorar las areas curriculares"}
          </h2>
          <p className="text-[#494963]/50 text-base mb-8">
            {"Accedé al detalle de cada área: ejes de contenidos, orientaciones didácticas, formaciones docentes y materiales."}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {areasData.map((area) => (
              <Link
                key={area.slug}
                href={`/area/${area.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-[#494963]/6 hover:border-[#494963]/15 hover:shadow-sm transition-all"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: area.color }}
                />
                <span className="text-sm font-medium text-[#494963]/70 group-hover:text-[#494963] transition-colors flex-1">
                  {area.name}
                </span>
                <ArrowRight className="w-4 h-4 text-[#494963]/30 group-hover:text-[#494963]/60 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
