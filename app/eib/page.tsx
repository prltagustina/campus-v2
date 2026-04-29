"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, ExternalLink, Calendar, BookOpen, Sprout, GraduationCap, School } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

/* Legislación, normativa y documentos curriculares */
const legislacion = {
  elementosJuridicos: {
    titulo: "Elementos Jurídicos Relacionados con la Educación Intercultural Bilingüe",
    documentos: [
      {
        nombre: "Documento 1",
        descripcion: "Referencia en el portal del Ministerio",
        url: "https://campuseducativo.santafe.edu.ar/elementos-juridicos-relacionados-con-la-educacion-intercultural-bilingue/",
        tipo: "link",
      },
      {
        nombre: "Documento 2",
        descripcion: "Documento completo (PDF)",
        url: "https://www.amsafe.org.ar/normativa_2025/modalidades/modalidad_educaci%C3%B3n_intercultural_bilingue/elementos_juridicos_eI_bilingue.pdf",
        tipo: "pdf",
      },
    ],
  },
  marcoLegal: {
    titulo: "Marco Legal que encuadra el trabajo de la Modalidad de Educación Intercultural Bilingüe",
    descripcion: "Referencias a legislación nacional, provincial e internacional vinculada con la Modalidad de Educación Intercultural Bilingüe.",
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

/* Iconos para niveles */
const nivelesConfig = {
  inicial: { icon: Sprout, label: "Proyectos Nivel Inicial", color: "#22C55E" },
  primario: { icon: BookOpen, label: "Proyectos Nivel Primario", color: "#3B82F6" },
  secundario: { icon: School, label: "Proyectos Nivel Secundario", color: "#8B5CF6" },
  terciario: { icon: GraduationCap, label: "Proyectos Nivel Terciario", color: "#F59E0B" },
};

export default function EIBPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero con imagen */}
      <section className="relative py-16 md:py-20 mt-16 overflow-hidden">
        <Image
          src="/images/cabecera-eib.png"
          alt=""
          fill
          className="object-cover object-right"
          priority
        />
        <div className="relative z-10 container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-4 font-display">
              Educación Intercultural Bilingüe
            </h1>
            <p className="text-base md:text-lg text-[#494963]/70 leading-relaxed max-w-2xl">
              La Educación Intercultural Bilingüe (EIB) es un enfoque transversal del Diseño Curricular que promueve el reconocimiento de la diversidad cultural y lingüística como riqueza para el aprendizaje.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 1: Legislación, normativa y documentos curriculares */}
      <section className="py-12 md:py-16 bg-[#EDEDF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-8 font-display">
              Legislación, normativa y documentos curriculares
            </h2>

            {/* Elementos Jurídicos */}
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm mb-6">
              <h3 className="text-base md:text-lg font-semibold text-[#494963] mb-4">
                {legislacion.elementosJuridicos.titulo}
              </h3>
              <div className="space-y-3">
                {legislacion.elementosJuridicos.documentos.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#494963]/5 flex items-center justify-center flex-shrink-0">
                      {doc.tipo === "pdf" ? (
                        <FileText className="w-5 h-5 text-[#E42153]" />
                      ) : (
                        <ExternalLink className="w-5 h-5 text-[#3C3AE5]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-[#494963] block">{doc.nombre}</span>
                      <span className="text-xs text-[#494963]/50">{doc.descripcion}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#494963]/30 font-semibold flex-shrink-0">
                      {doc.tipo === "pdf" ? "PDF" : "Link"}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Marco Legal */}
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-[#494963] mb-2">
                {legislacion.marcoLegal.titulo}
              </h3>
              <p className="text-sm text-[#494963]/60 mb-4">
                {legislacion.marcoLegal.descripcion}
              </p>
              <a
                href={legislacion.marcoLegal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#3C3AE5] hover:underline"
              >
                Ver documento
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Proyectos, secuencias e itinerarios */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-8 font-display">
              Proyectos, secuencias e itinerarios de Escuelas de Modalidad EIB de la provincia de Santa Fe
            </h2>

            <div className="space-y-6">
              {(Object.keys(nivelesConfig) as Array<keyof typeof nivelesConfig>).map((nivel) => {
                const config = nivelesConfig[nivel];
                const proyectosNivel = proyectos[nivel];
                const IconComponent = config.icon;

                return (
                  <div key={nivel} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 bg-gray-50/50">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${config.color}15` }}
                      >
                        <IconComponent className="w-4 h-4" style={{ color: config.color }} />
                      </div>
                      <h3 className="font-semibold text-[#494963]">{config.label}</h3>
                      <span className="text-xs text-[#494963]/40 ml-auto">{proyectosNivel.length} proyecto{proyectosNivel.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {proyectosNivel.map((proyecto, idx) => (
                        <a
                          key={idx}
                          href={proyecto.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors group"
                        >
                          <FileText className="w-4 h-4 text-[#494963]/30 flex-shrink-0" />
                          <span className="text-sm text-[#494963]/80 flex-1 min-w-0 group-hover:text-[#494963]">
                            {proyecto.nombre}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#494963]/20 group-hover:text-[#494963]/50 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Celebraciones y efemérides */}
      <section className="py-12 md:py-16 bg-[#EDEDF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#494963] font-display">
                Celebraciones y efemérides de las comunidades
              </h2>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100">
                {celebraciones.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <span className="text-sm text-[#494963]/80 flex-1 min-w-0 group-hover:text-[#494963]">
                      {item.nombre}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#494963]/20 group-hover:text-[#494963]/50 flex-shrink-0" />
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
