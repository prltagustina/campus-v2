"use client";

export function HeroSection() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#3D4155] font-extrabold">
            Un marco común
          </h1>
          <p className="text-base md:text-lg text-[#5A5D72] max-w-3xl mx-auto leading-relaxed">
            El diseño desarrolla las siguientes áreas: Matemática, Lengua y Literatura, Ciencias Naturales, Ciencias Sociales, Educación Física, Educación Artística, Lenguas Extranjeras, Educación Tecnológica y <strong className="font-bold">Saberes, Vidas y Mundos</strong>, un espacio curricular innovador.
          </p>
        </div>
      </div>
    </section>
  );
}
