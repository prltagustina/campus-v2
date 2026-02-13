"use client";

import { Download } from "lucide-react";

export function MarcoGeneralSection() {
  const handleDownload = () => {
    window.open("https://campuseducativo.santafe.edu.ar/diseno-curricular/", "_blank");
  };

  return (
    <section id="marco-general" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header: titulo + boton */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight">
              Presentaci&oacute;n
              <br />
              Marco General
            </h2>

            <button
              onClick={handleDownload}
              className="h-12 px-8 bg-[#494963] text-white font-semibold text-sm rounded-[10px] inline-flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#3a3a4f] flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              DESCARGAR DISE&Ntilde;O CURRICULAR
            </button>
          </div>

          {/* Video embed */}
          <div className="w-full max-w-4xl">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
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
