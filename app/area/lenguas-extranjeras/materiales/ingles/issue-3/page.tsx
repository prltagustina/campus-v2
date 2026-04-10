import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

export default function Issue3Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="py-10 sm:py-14 md:py-16 mt-16" style={{ backgroundColor: `${AREA_COLOR}12` }}>
        <div className="container mx-auto px-4">
          <Link 
            href="/area/lenguas-extranjeras/materiales/ingles" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Volver a English Funzine
          </Link>
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gray-200/50">
              <span className="text-xl sm:text-2xl font-bold text-[#494963]/30">
                3
              </span>
            </div>
            <div>
              <p className="text-xs text-[#494963]/40 uppercase tracking-wider font-semibold mb-1">
                English Funzine
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#494963]/50 font-display">
                Issue 3
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gray-100">
              <Clock className="w-8 h-8 text-[#494963]/30" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#494963] mb-3 font-display">
              Próximamente
            </h2>
            <p className="text-sm sm:text-base text-[#494963]/50 mb-8">
              El Issue 3 de English Funzine estará disponible muy pronto. 
              Estamos trabajando para ofrecerte nuevos contenidos.
            </p>
            <Link
              href="/area/lenguas-extranjeras/materiales/ingles"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-md"
              style={{ backgroundColor: AREA_COLOR, color: TEXT_ON_COLOR }}
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a English Funzine
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
