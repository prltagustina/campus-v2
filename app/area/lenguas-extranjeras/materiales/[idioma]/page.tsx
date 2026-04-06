"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

const idiomasInfo: Record<string, { name: string; description: string }> = {
  aleman: { 
    name: "Alemán", 
    description: "Materiales de descarga para la enseñanza del alemán en la escuela primaria." 
  },
  frances: { 
    name: "Francés", 
    description: "Materiales de descarga para la enseñanza del francés en la escuela primaria." 
  },
  italiano: { 
    name: "Italiano", 
    description: "Materiales de descarga para la enseñanza del italiano en la escuela primaria." 
  },
  portugues: { 
    name: "Portugués", 
    description: "Materiales de descarga para la enseñanza del portugués en la escuela primaria." 
  },
};

export default function IdiomaMaterilesPage() {
  const params = useParams();
  const idioma = params.idioma as string;
  
  // Redirigir a la página específica de inglés
  if (idioma === "ingles") {
    return null; // La página de inglés tiene su propia ruta
  }

  const info = idiomasInfo[idioma] || { 
    name: idioma.charAt(0).toUpperCase() + idioma.slice(1), 
    description: "Materiales de descarga" 
  };

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
              {info.name}
            </h1>
            <p className="text-lg text-[#494963]/60 max-w-2xl">
              {info.description}
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-16 md:py-24 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${AREA_COLOR}15` }}
            >
              <Clock className="w-8 h-8" style={{ color: AREA_COLOR }} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-4 font-display">
              Próximamente
            </h2>
            <p className="text-base text-[#494963]/50">
              Los materiales para {info.name} estarán disponibles muy pronto. 
              Estamos trabajando para ofrecerte recursos de calidad.
            </p>
            <Link
              href="/area/lenguas-extranjeras#materiales"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-semibold transition-all border"
              style={{ 
                backgroundColor: AREA_COLOR, 
                borderColor: AREA_COLOR, 
                color: TEXT_ON_COLOR 
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a seleccionar idioma
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
