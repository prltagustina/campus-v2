"use client";

import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const materiales = [
  {
    nombre: "Familias_cartilla_familias.pdf",
    titulo: "Cartilla para familias",
    formato: "PDF",
    url: "/docs/Familias_cartilla_familias.pdf",
  },
  {
    nombre: "PTT DISENO CURRICULAR para FAMILIAS.pptx.pdf",
    titulo: "Presentación del Diseño Curricular para Familias",
    formato: "PDF",
    url: "/docs/PTT_DISENO_CURRICULAR_para_FAMILIAS.pdf",
  },
  {
    area: "Lengua y Literatura",
    color: "#FF7402",
    nombre: "Familias_objetivos_contenido_LenguayLiteratura.pdf",
    titulo: "Objetivos y contenidos - Lengua y Literatura",
    formato: "PDF",
    url: "/docs/Familias_objetivos_contenido_LenguayLiteratura.pdf",
  },
  {
    area: "Matemática",
    color: "#E42153",
    nombre: "Familias_objetivos_contenido_Matematica.pdf",
    titulo: "Objetivos y contenidos - Matemática",
    formato: "PDF",
    url: "/docs/Familias_objetivos_contenido_Matematica.pdf",
  },
];

export default function FamiliasPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[#F5F5F7] py-16 md:py-20 mt-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-4 font-display">
              Materiales para Familias
            </h1>
          </div>
        </div>
      </section>

      {/* PDF Preview Section */}
      <section className="py-12 md:py-16 bg-[#EDEDF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-6 text-center font-display">
              Presentación del Diseño Curricular
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="/docs/PTT_DISENO_CURRICULAR_para_FAMILIAS.pdf"
                className="w-full h-[500px] md:h-[600px] lg:h-[700px]"
                title="Presentación del Diseño Curricular para Familias"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Materiales para descargar */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-8 text-center font-display">
            Materiales para descargar
          </h2>
          <div className="max-w-3xl mx-auto border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {materiales.map((mat) => (
              <a
                key={mat.nombre}
                href={mat.url}
                download
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors group"
              >
                {"area" in mat && mat.area ? (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: mat.color }} />
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: mat.color }} />
                  </>
                ) : (
                  <FileText className="w-5 h-5 flex-shrink-0 text-[#E42153]" />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-[#494963] font-medium block truncate">{mat.titulo}</span>
                  <span className="text-xs text-[#494963]/40 block mt-0.5">{mat.nombre}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#494963]/30 font-semibold flex-shrink-0">{mat.formato}</span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[#494963]/30 group-hover:text-[#494963]/60 group-hover:bg-gray-100">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-[#494963]/30 mt-4 text-center">
            Se irán sumando materiales para más áreas a medida que estén disponibles.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
