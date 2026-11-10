"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { programaDeRuta, programas } from "@/lib/programas/programas";

/**
 * "Programas" del menú institucional (desde 1024 px), hasta ahora un texto
 * sin función. Despliega las tres experiencias del prototipo, como el menú
 * "Programas" del Campus real. Botón para abrir (acción), enlaces para ir
 * (navegación). Se cierra con Escape, al tocar fuera o al cambiar de página.
 */
export function ProgramsMenu() {
  const pathname = usePathname();
  const actual = programaDeRuta(pathname);
  const [abierto, setAbierto] = useState(false);
  const panelId = useId();
  const botonRef = useRef<HTMLButtonElement>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => setAbierto(false), [pathname]);

  useEffect(() => {
    if (!abierto) return;
    const alTeclado = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    const alTocar = (event: PointerEvent) => {
      if (!contenedorRef.current?.contains(event.target as Node)) setAbierto(false);
    };
    document.addEventListener("keydown", alTeclado);
    document.addEventListener("pointerdown", alTocar);
    return () => {
      document.removeEventListener("keydown", alTeclado);
      document.removeEventListener("pointerdown", alTocar);
    };
  }, [abierto]);

  return (
    <div ref={contenedorRef} className="relative">
      <button
        ref={botonRef}
        type="button"
        aria-expanded={abierto}
        aria-controls={panelId}
        onClick={() => setAbierto((valor) => !valor)}
        className="-mx-1 -my-1 flex items-center gap-2 rounded-md px-1 py-1 transition-colors hover:text-[#494963] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963]"
      >
        Programas
        <ChevronDown className={`h-3.5 w-3.5 fill-current transition-transform duration-200 ${abierto ? "rotate-180" : ""}`} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <div
        id={panelId}
        hidden={!abierto}
        className="absolute left-1/2 top-full z-50 mt-3 w-[340px] -translate-x-1/2 rounded-2xl border border-[#494963]/[.12] bg-white p-2 shadow-[0_14px_35px_-20px_rgba(35,35,55,.45)]"
      >
        <ul className="flex flex-col gap-1">
          {programas.map((programa) => {
            const activo = programa.id === actual;
            return (
              <li key={programa.id}>
                <Link
                  href={programa.href}
                  aria-current={activo ? "true" : undefined}
                  className={`flex min-h-11 items-center justify-between gap-3 rounded-[9px] px-3 py-2 text-[15px] font-semibold leading-tight tracking-[-.015em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${
                    activo ? "bg-[#494963] text-white focus-visible:ring-white" : "text-[#494963] hover:bg-[#494963]/[.06]"
                  }`}
                >
                  {programa.nombre}
                  {activo ? <span className="shrink-0 text-[10px] font-bold uppercase tracking-[.12em] text-white/90">Estás acá</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/programas"
          className="mt-1 flex min-h-10 items-center rounded-[9px] border-t border-[#494963]/[.08] px-3 pt-1 text-sm font-semibold text-[#494963]/[.82] underline-offset-4 hover:text-[#494963] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963]"
        >
          Ver la portada de programas
        </Link>
      </div>
    </div>
  );
}
