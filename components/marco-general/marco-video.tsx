"use client";

export function MarcoVideo() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#494963] mb-3 font-display">
            {"Video de presentación"}
          </h2>
          <p className="text-[#494963]/60 text-base mb-8 max-w-lg">
            {"Una introducción audiovisual al nuevo Diseño Curricular, sus fundamentos y su estructura."}
          </p>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#494963]/5">
            <iframe
              src="https://www.youtube.com/embed/eu8CYPbjehE"
              title="Presentación Diseño Curricular de la Provincia de Santa Fe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
