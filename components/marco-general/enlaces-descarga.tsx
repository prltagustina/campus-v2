"use client";

import { Download, ArrowRight, BookOpen, FileText } from "lucide-react";

const documentos = [
  {
    label: "Documento de acompañamiento para docentes y directivos",
    href: "#",
    icon: FileText,
  },
  {
    label: "Presentación para supervisores, directivos y docentes",
    href: "#",
    icon: FileText,
  },
];

const formaciones = [
  {
    label: "Diversificación para la Enseñanza",
    href: "https://campuseducativo.santafe.edu.ar/diversificacion-de-la-ensenanza/",
    external: true,
  },
];

export function EnlacesDescarga() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Documentos */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#494963]/8 flex items-center justify-center">
                  <Download className="w-5 h-5 text-[#494963]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#494963]">
                    {"Documentos y descargas"}
                  </h3>
                  <p className="text-sm text-[#494963]/50">
                    {"Material de apoyo para el trabajo institucional"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {documentos.map((doc, index) => {
                  const Icon = doc.icon;
                  return (
                    <a
                      key={index}
                      href={doc.href}
                      className="flex items-start gap-3 p-4 rounded-xl bg-[#494963]/3 hover:bg-[#494963]/6 transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-[#494963]/50 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#494963]/70 group-hover:text-[#494963] transition-colors leading-snug">
                        {doc.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Formaciones */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#494963]/8 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#494963]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#494963]">
                    {"Formaciones docentes"}
                  </h3>
                  <p className="text-sm text-[#494963]/50">
                    {"Cursos y capacitaciones en Campus Educativo"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {formaciones.map((form, index) => (
                  <a
                    key={index}
                    href={form.href}
                    target={form.external ? "_blank" : undefined}
                    rel={form.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#494963]/3 hover:bg-[#494963]/6 transition-colors group"
                  >
                    <ArrowRight className="w-5 h-5 text-[#494963]/50 flex-shrink-0" />
                    <span className="text-sm font-medium text-[#494963]/70 group-hover:text-[#494963] transition-colors">
                      {form.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
