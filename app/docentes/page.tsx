"use client";

import Link from "next/link";
import { ArrowLeft, Download, FileText, ArrowRight, Bookmark } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const documentos = [
  {
    titulo: "Documento de acompañamiento para docentes y directivos",
    url: "/docs/Documento_Acompanamiento.pdf",
  },
  {
    titulo: "Presentación para supervisores, directivos y docentes",
    url: "/docs/Presentacion_Supervisores.pdf",
  },
];

const formaciones = [
  {
    titulo: "Diversificación para la Enseñanza",
    url: "https://campuseducativo.santafe.edu.ar/diversificacion-para-la-ensenanza/",
  },
];

const PRIMARY_COLOR = "#494963";

export default function DocentesPage() {
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
              Para Docentes y Directivos
            </h1>
          </div>
        </div>
      </section>

      {/* PDF Preview Section */}
      <section className="py-12 md:py-16 bg-[#EDEDF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-6 font-display">
              Presentación del Diseño Curricular
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://docs.google.com/presentation/d/1BKzPQiSzHd73OvYHmVLTDccV-qt8g-tg/embed?start=false&loop=false&delayms=3000"
                className="w-full h-[350px] md:h-[450px] lg:h-[500px]"
                title="Presentación del Diseño Curricular para Docentes y Directivos"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentos y Formaciones - Two columns */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Documentos y descargas */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#494963]/5 flex items-center justify-center">
                  <Download className="w-5 h-5 text-[#494963]" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-[#494963] font-display">
                    Documentos y descargas
                  </h2>
                  <p className="text-sm text-[#494963]/50">
                    Material de apoyo para el trabajo institucional
                  </p>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                {documentos.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    download
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[#F5F5F7] hover:bg-[#EDEDF0] transition-colors group"
                  >
                    <FileText className="w-4 h-4 flex-shrink-0 text-[#494963]/40" />
                    <span className="text-sm text-[#494963] flex-1">{doc.titulo}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Formaciones docentes */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#494963]/5 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-[#494963]" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-[#494963] font-display">
                    Formaciones docentes
                  </h2>
                  <p className="text-sm text-[#494963]/50">
                    Cursos y capacitaciones en Campus Educativo
                  </p>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                {formaciones.map((formacion, i) => (
                  <a
                    key={i}
                    href={formacion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[#F5F5F7] hover:bg-[#EDEDF0] transition-colors group"
                  >
                    <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#494963]/40" />
                    <span className="text-sm text-[#494963] flex-1">{formacion.titulo}</span>
                  </a>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
