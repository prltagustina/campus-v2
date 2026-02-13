import Link from "next/link";
import { areasData } from "@/lib/areas-data";

export function Footer() {
  return (
    <footer className="w-full bg-[#494963] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8 border-b border-white/10">
            {/* Brand */}
            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                {"Diseno Curricular"}
              </p>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                {"Educacion Primaria de la Provincia de Santa Fe. Ministerio de Educacion."}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
                {"Navegacion"}
              </p>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
                  {"Inicio"}
                </Link>
                <Link href="/marco-general" className="text-sm text-white/60 hover:text-white transition-colors">
                  {"Marco General"}
                </Link>
                <Link href="/familias" className="text-sm text-white/60 hover:text-white transition-colors">
                  {"Para Familias"}
                </Link>
                <Link href="/eib" className="text-sm text-white/60 hover:text-white transition-colors">
                  {"Educacion Intercultural Bilingue"}
                </Link>
              </nav>
            </div>

            {/* Areas */}
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
                {"Areas curriculares"}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {areasData.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/area/${area.slug}`}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: area.color }}
                    />
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">SF</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Santa Fe</p>
                <p className="text-xs text-white/40">Ministerio de Educacion</p>
              </div>
            </div>

            <p className="text-xs text-white/30">
              {"Provincia de Santa Fe - Argentina"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
