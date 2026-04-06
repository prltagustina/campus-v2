"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

const funzines = [
  { id: "issue-1", name: "Issue 1", description: "Primer número de English Funzines" },
  { id: "issue-2", name: "Issue 2", description: "Segundo número de English Funzines" },
  { id: "issue-3", name: "Issue 3", description: "Tercer número de English Funzines" },
];

export default function InglesMaterilesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-[#F5F5F7] py-16 md:py-20 mt-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/area/lenguas-extranjeras#materiales" 
            className="inline-flex items-center gap-2 text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Lenguas Extranjeras
          </Link>
          <div className="max-w-3xl">
            <span 
              className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: `${AREA_COLOR}20`, color: TEXT_ON_COLOR }}
            >
              Lenguas Extranjeras
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-4 font-display">
              Inglés
            </h1>
            <p className="text-lg text-[#494963]/60 max-w-2xl">
              Materiales de descarga para la enseñanza del inglés en la escuela primaria.
            </p>
          </div>
        </div>
      </section>

      {/* English Fanzines */}
      <section className="py-16 md:py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${AREA_COLOR}15` }}
              >
                <BookOpen className="w-6 h-6" style={{ color: AREA_COLOR }} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#494963] font-display">
                  English Funzines
                </h2>
                <p className="text-sm text-[#494963]/50">
                  Seleccioná un número para ver los materiales disponibles
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {funzines.map((funzine) => (
                <Link
                  key={funzine.id}
                  href={`/area/lenguas-extranjeras/materiales/ingles/${funzine.id}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white px-6 py-5 transition-all hover:border-gray-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${AREA_COLOR}0D` }}
                    >
                      <span className="text-lg font-bold" style={{ color: AREA_COLOR }}>
                        {funzine.id.split("-")[1]}
                      </span>
                    </div>
                    <div>
                      <p className="text-base text-[#494963] font-medium">
                        {funzine.name}
                      </p>
                      <p className="text-sm text-[#494963]/40 mt-0.5">
                        {funzine.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight 
                    className="w-5 h-5 text-[#494963]/30 group-hover:text-[#494963]/60 transition-colors flex-shrink-0" 
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
