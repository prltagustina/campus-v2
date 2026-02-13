"use client";

import Link from "next/link";
import { ArrowLeft, Globe, BookOpen, FileText, Users, MessageCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const ejes = [
  {
    titulo: "Lenguas y culturas originarias",
    descripcion: "Reconocimiento y valoracion de las lenguas y saberes de los pueblos originarios de Santa Fe y la region.",
    icono: MessageCircle,
  },
  {
    titulo: "Interculturalidad en el aula",
    descripcion: "Estrategias didacticas para promover el dialogo intercultural y la convivencia en contextos de diversidad.",
    icono: Users,
  },
  {
    titulo: "Materiales didacticos bilingues",
    descripcion: "Recursos y herramientas pedagogicas para la ensenanza en contextos bilingues e interculturales.",
    icono: BookOpen,
  },
  {
    titulo: "Marco normativo",
    descripcion: "Legislacion nacional y provincial que respalda la educacion intercultural bilingue como derecho.",
    icono: FileText,
  },
];

export default function EIBPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#3C3AE5]/10 to-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#494963]/60 hover:text-[#494963] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3C3AE5]/10 text-[#3C3AE5] text-xs font-semibold uppercase tracking-wider mb-6">
              <Globe className="w-3.5 h-3.5" />
              Enfoque transversal
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#494963] leading-tight mb-6">
              Educacion Intercultural
              <br />
              Bilingue
            </h1>
            <p className="text-lg text-[#494963]/70 leading-relaxed max-w-2xl">
              La Educacion Intercultural Bilingue (EIB) es un enfoque transversal del Diseno Curricular que promueve el reconocimiento de la diversidad cultural y linguistica como riqueza para el aprendizaje.
            </p>
          </div>
        </div>
      </section>

      {/* Ejes de trabajo */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#494963] mb-10">
            Ejes de trabajo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ejes.map((eje) => (
              <div key={eje.titulo} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#3C3AE5]/10 flex items-center justify-center flex-shrink-0">
                    <eje.icono className="w-5 h-5 text-[#3C3AE5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#494963] mb-2">{eje.titulo}</h3>
                    <p className="text-sm text-[#494963]/60 leading-relaxed">{eje.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proximamente */}
      <section className="py-16 md:py-20 bg-[#3C3AE5]/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#3C3AE5]/10 flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-[#3C3AE5]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#494963] mb-4">
              Contenido en desarrollo
            </h2>
            <p className="text-[#494963]/60 leading-relaxed">
              Estamos trabajando en la elaboracion de materiales especificos para la Educacion Intercultural Bilingue. Proximamente encontraras aqui recursos, documentos y orientaciones pedagogicas.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
