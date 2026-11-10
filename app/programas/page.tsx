import type { Metadata } from "next";
import Link from "next/link";
import { ProgramBanner, ProgramSection, ProgramView } from "@/components/programas/program-layout";
import { programas } from "@/lib/programas/programas";

export const metadata: Metadata = {
  title: "Programas · Campus Educativo",
  description: "Acceso a Diseño Curricular Educación Primaria, Plan Provincial de Matemática y Modo Secundaria.",
};

/**
 * Punto común de las tres experiencias del prototipo (al que llevan el menú
 * "Programas" del encabezado y el acceso de la franja): la portada y el
 * nombre de cada programa. No reemplaza la home del Campus.
 */
export default function ProgramasPage() {
  return (
    <ProgramView>
      <ProgramBanner color="#494963" colorTexto="#FFFFFF" rotulo="Campus Educativo" titulo="Programas" descripcion="Diseño Curricular Educación Primaria, Plan Provincial de Matemática y Modo Secundaria." />
      <ProgramSection id="lista-programas" titulo="Elegí un programa">
        <ul className="grid gap-3 md:grid-cols-3">
          {programas.map((programa) => (
            <li key={programa.id}>
              <Link
                href={programa.href}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#494963]/[.12] bg-white transition-colors duration-150 hover:border-[#494963] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963]"
              >
                <span className="grid h-40 place-items-center overflow-hidden border-b border-[#494963]/[.08] bg-[#F5F5F7] p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={programa.imagen.src}
                    alt=""
                    className={`max-h-full w-auto max-w-full object-contain ${programa.id === "diseno-curricular" ? "h-full rounded-sm shadow-[0_8px_20px_rgba(20,20,35,.18)]" : ""}`}
                  />
                </span>
                <span className="p-5 font-display text-xl font-semibold leading-tight tracking-[-.02em] text-[#494963]">{programa.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </ProgramSection>
    </ProgramView>
  );
}
