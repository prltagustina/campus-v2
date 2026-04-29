"use client";

import Link from "next/link";
import { ArrowLeft, FileText, ExternalLink, Download, ArrowRight, Scale, FolderOpen, Calendar } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

/* Legislación, normativa y documentos curriculares */
const legislacion = {
  resolucion: {
    titulo: "Descargar Resolución",
    archivo: "Resolución 1023-26 EE.pdf",
    url: "/documentos/resolucion-1023-26-eib.pdf",
  },
  elementosJuridicos: {
    titulo: "ELEMENTOS JURÍDICOS RELACIONADOS",
    subtitulo: "CON LA EDUCACIÓN INTERCULTURAL BILINGÜE",
    documentos: [
      {
        nombre: "Documento 1",
        url: "https://campuseducativo.santafe.edu.ar/elementos-juridicos-relacionados-con-la-educacion-intercultural-bilingue/",
      },
      {
        nombre: "Documento 2",
        url: "https://www.amsafe.org.ar/normativa_2025/modalidades/modalidad_educaci%C3%B3n_intercultural_bilingue/elementos_juridicos_eI_bilingue.pdf",
      },
    ],
  },
  marcoLegal: {
    titulo: "MARCO LEGAL QUE ENCUADRA EL TRABAJO DE LA",
    subtitulo: "MODALIDAD DE EDUCACIÓN INTERCULTURAL BILINGÜE",
    descripcion: "Referencias a legislación nacional, provincial e internacional vinculada",
    descripcion2: "con la Modalidad de Educación Intercultural Bilingüe.",
    url: "https://campuseducativo.santafe.edu.ar/marco-legal-que-encuadra-el-trabajo-de-la-modalidad-de-educacion-intercultural-bilingue/",
  },
};

/* Proyectos por nivel */
const proyectos = {
  inicial: [
    {
      nombre: "Semillas de Identidad",
      url: "https://campuseducativo.santafe.edu.ar/semillas-de-identidad/",
    },
  ],
  primario: [
    {
      nombre: '"Varias especies de remedios naturales" - "NATARIPI"',
      url: "https://campuseducativo.santafe.edu.ar/varias-especies-de-remedios-naturales-nataripi/",
    },
    {
      nombre: "Aprendemos haciendo",
      url: "https://campuseducativo.santafe.edu.ar/aprendemos-haciendo/",
    },
    {
      nombre: "Cosechando aprendizajes: la huerta escolar en acción 2025",
      url: "https://campuseducativo.santafe.edu.ar/cosechando-aprendizajes-la-huerta-escolar-en-accion/",
    },
    {
      nombre: "Cosechando aprendizajes: la huerta escolar en acción 2026",
      url: "https://campuseducativo.santafe.edu.ar/manos-a-la-huerta",
    },
    {
      nombre: "Fortaleciendo nuestra identidad",
      url: "https://campuseducativo.santafe.edu.ar/fortaleciendo-nuestra-identidad/",
    },
  ],
  secundario: [
    {
      nombre: "Guardianes de la Naturaleza. Vivir en un Mundo Sustentable.",
      url: "https://campuseducativo.santafe.edu.ar/guardianes-de-la-naturaleza-509-vivir-en-un-mundo-sustentable/",
    },
    {
      nombre: "En el mundo del reciclado: flores que transforman y murales que embellecen",
      url: "https://campuseducativo.santafe.edu.ar/en-el-mundo-del-reciclado-flores-que-transforman-y-murales-que-embellecen/",
    },
  ],
  terciario: [
    {
      nombre: "Voces diversas, ¿un lenguaje común?: ESI e interculturalidad en Inglés a través de narrativas infantiles",
      url: "https://campuseducativo.santafe.edu.ar/voces-diversas-un-lenguaje-comun-esi-e-interculturalidad-en-ingles-a-traves-de-narrativas-infantile/",
    },
  ],
};

/* Celebraciones y efemérides */
const celebraciones = [
  {
    nombre: "Calishim: Dalagay Ñaga Mokoit. Renacer: Año Nuevo Mocoví",
    url: "https://campuseducativo.santafe.edu.ar/calishim-dalagay-naga-mokoit-documenta-los-origenes/",
  },
  {
    nombre: "Semana de los Pueblos Originarios del territorio Santafesino",
    url: "https://campuseducativo.santafe.edu.ar/semana-de-los-pueblos-originarios-del-territorio-santafesino/",
  },
  {
    nombre: "Semana de los Pueblos Originarios del territorio Santafesino (Actividad)",
    url: "https://campuseducativo.santafe.edu.ar/actividad-semana-de-los-pueblos-originarios/",
  },
  {
    nombre: "Semana de los Pueblos Originarios",
    url: "https://campuseducativo.santafe.edu.ar/semana-de-los-pueblos-originarios/",
  },
  {
    nombre: "Día Internacional de los Pueblos Originarios",
    url: "https://campuseducativo.santafe.edu.ar/dia-internacional-de-los-pueblos-originarios/",
  },
  {
    nombre: "Los Pueblos Originarios Hoy",
    url: "https://campuseducativo.santafe.edu.ar/los-pueblos-originarios-hoy/",
  },
  {
    nombre: "Miradas que nos hablan",
    url: "https://campuseducativo.santafe.edu.ar/miradas-que-nos-hablan/",
  },
  {
    nombre: "Viajando por mi Provincia ¡Santa Fe! Haciendo visibles las miradas históricas. En memoria a los Caciques Nereguiye, Alayquín, Quebachín e Icholay",
    url: "https://campuseducativo.santafe.edu.ar/viajando-por-mi-provinciasanta-fe-haciendo-visibles-las-miradas-historicas/",
  },
  {
    nombre: "11 de Marzo de 1887, Masacre de San Antonio de Obligado",
    url: "https://campuseducativo.santafe.edu.ar/11-de-marzo-de-1887-masacre-de-san-antonio-de-obligado/",
  },
  {
    nombre: "25 de Mayo de 1810",
    url: "https://campuseducativo.santafe.edu.ar/el-25-de-mayo-de-1810/",
  },
  {
    nombre: "9 de Agosto: Día Internacional de los Pueblos Indígenas",
    url: "https://campuseducativo.santafe.edu.ar/9-de-agosto-dia-internacional-de-los-pueblos-indigenas/",
  },
  {
    nombre: "11 de octubre: Último día de libertad indígena. Nada para celebrar. Mucho para reflexionar.",
    url: "https://campuseducativo.santafe.edu.ar/11-de-octubre-ultimo-dia-de-libertad-indigena/",
  },
  {
    nombre: '11 de Octubre. "Último Día de Libertad de los Pueblos Originarios de América"',
    url: "https://campuseducativo.santafe.edu.ar/11-de-octubre-ultimo-dia-de-libertad-de-los-pueblos-originarios-de-america-2/",
  },
  {
    nombre: "Atrapasueños",
    url: "https://campuseducativo.santafe.edu.ar/atrapasuenos/",
  },
  {
    nombre: "Himno Nacional Argentino",
    url: "https://campuseducativo.santafe.edu.ar/himno-nacional-argentino/",
  },
];

export default function EIBPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero sutil - sin imagen de fondo */}
      <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-6 sm:mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Volver al inicio
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight font-display">
              Educación Intercultural Bilingüe
            </h1>
          </div>
        </div>
      </section>

      {/* Sección 1: Legislación, normativa y documentos curriculares */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#EDEDF0]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Título con icono estilo docentes */}
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#494963]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-[#494963]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#494963] font-display leading-tight">
                  Legislación, normativa y documentos curriculares
                </h2>
                <p className="text-sm text-[#494963]/50 mt-1">
                  Marco legal y resoluciones de la modalidad EIB
                </p>
              </div>
            </div>

            {/* Resolución */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-bold text-[#494963] uppercase tracking-wide mb-3 sm:mb-4">
                Resolución
              </h3>
              <a
                href={legislacion.resolucion.url}
                download
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group"
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#E42153] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm sm:text-base font-medium text-[#494963] block">
                    {legislacion.resolucion.titulo}
                  </span>
                  <span className="text-xs sm:text-sm text-[#494963]/50">
                    {legislacion.resolucion.archivo}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span className="text-[10px] sm:text-xs text-[#494963]/40 uppercase tracking-wide hidden sm:block">PDF</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4 text-[#494963]/40 group-hover:text-[#494963]/70 transition-colors" />
                  </div>
                </div>
              </a>
            </div>

            {/* Elementos Jurídicos */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-bold text-[#494963] uppercase tracking-wide mb-3 sm:mb-4 leading-snug">
                {legislacion.elementosJuridicos.titulo}
                <br />
                {legislacion.elementosJuridicos.subtitulo}
              </h3>
              <div className="space-y-2">
                {legislacion.elementosJuridicos.documentos.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl hover:bg-gray-50 transition-all group"
                  >
                    <FileText className="w-4 h-4 text-[#494963]/40 group-hover:text-[#494963]/70 transition-colors flex-shrink-0" />
                    <span className="text-sm text-[#494963] flex-1">{doc.nombre}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#494963]/30 group-hover:text-[#494963]/60 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Marco Legal */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#494963] uppercase tracking-wide mb-2 sm:mb-3 leading-snug">
                {legislacion.marcoLegal.titulo}
                <br />
                {legislacion.marcoLegal.subtitulo}
              </h3>
              <p className="text-sm sm:text-base text-[#494963]/60 mb-3 sm:mb-4 leading-relaxed">
                {legislacion.marcoLegal.descripcion}
                <br />
                {legislacion.marcoLegal.descripcion2}
              </p>
              <a
                href={legislacion.marcoLegal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-[#494963] group"
              >
                <span>Ver documento</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#494963]/40 group-hover:text-[#494963]/70 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Proyectos, secuencias e itinerarios */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Título con icono estilo docentes */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#494963]/5 flex items-center justify-center flex-shrink-0">
                <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#494963]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#494963] font-display leading-snug">
                  Proyectos, secuencias e itinerarios
                </h2>
                <p className="text-sm text-[#494963]/50 mt-0.5">
                  Escuelas de Modalidad EIB de la provincia de Santa Fe
                </p>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10">
              {/* Nivel Inicial */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF7402]" />
                  <h3 className="text-sm sm:text-base font-bold text-[#494963]">
                    Proyectos Nivel Inicial
                  </h3>
                </div>
                <div className="space-y-2">
                  {proyectos.inicial.map((proyecto, idx) => (
                    <a
                      key={idx}
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F7] rounded-xl hover:bg-[#EDEDF0] transition-all group"
                    >
                      <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#FF7402] group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-sm text-[#494963] flex-1">{proyecto.nombre}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#494963]/30 group-hover:text-[#494963]/60 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Nivel Primario */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#E42153]" />
                  <h3 className="text-sm sm:text-base font-bold text-[#494963]">
                    Proyectos Nivel Primario
                  </h3>
                </div>
                <div className="space-y-2">
                  {proyectos.primario.map((proyecto, idx) => (
                    <a
                      key={idx}
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F7] rounded-xl hover:bg-[#EDEDF0] transition-all group"
                    >
                      <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#E42153] group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-sm text-[#494963] flex-1">{proyecto.nombre}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#494963]/30 group-hover:text-[#494963]/60 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Nivel Secundario */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <h3 className="text-sm sm:text-base font-bold text-[#494963]">
                    Proyectos Nivel Secundario
                  </h3>
                </div>
                <div className="space-y-2">
                  {proyectos.secundario.map((proyecto, idx) => (
                    <a
                      key={idx}
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F7] rounded-xl hover:bg-[#EDEDF0] transition-all group"
                    >
                      <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#3B82F6] group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-sm text-[#494963] flex-1">{proyecto.nombre}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#494963]/30 group-hover:text-[#494963]/60 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Nivel Terciario */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <h3 className="text-sm sm:text-base font-bold text-[#494963]">
                    Proyectos Nivel Terciario
                  </h3>
                </div>
                <div className="space-y-2">
                  {proyectos.terciario.map((proyecto, idx) => (
                    <a
                      key={idx}
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F7] rounded-xl hover:bg-[#EDEDF0] transition-all group"
                    >
                      <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-sm text-[#494963] flex-1">{proyecto.nombre}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#494963]/30 group-hover:text-[#494963]/60 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Celebraciones y efemérides */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#EDEDF0]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Título con icono estilo docentes */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#494963]/5 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#494963]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#494963] font-display">
                  Celebraciones y efemérides
                </h2>
                <p className="text-sm text-[#494963]/50 mt-0.5">
                  Fechas importantes de las comunidades originarias
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
              {celebraciones.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50/50 transition-colors group"
                >
                  <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#494963]/30 group-hover:text-[#494963]/60 group-hover:translate-x-0.5 transition-all" />
                  <span className="text-sm text-[#494963] flex-1">{item.nombre}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#494963]/20 group-hover:text-[#494963]/50 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
