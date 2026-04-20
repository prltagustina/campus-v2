import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

export default function Issue2Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero - Minimalista */}
      <section className="py-10 sm:py-12 mt-16" style={{ backgroundColor: `${AREA_COLOR}12` }}>
        <div className="container mx-auto px-4">
          <Link 
            href="/area/lenguas-extranjeras/materiales/ingles" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Volver a Inglés
          </Link>
          
          <div>
            <p className="text-xs text-[#494963]/40 uppercase tracking-wider font-semibold mb-2">
              English Funzine · Issue 2
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#494963]/50 font-display">
              Próximamente
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <Clock className="w-6 h-6 text-[#494963]/20 mx-auto mb-4" />
            <p className="text-sm text-[#494963]/40">
              Estamos trabajando en nuevos contenidos.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
