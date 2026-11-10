"use client";

import { Share2 } from "lucide-react";

export function ShareResourceButton({ title, url }: { title: string; url: string }) {
  const share = async () => {
    if (navigator.share) await navigator.share({ title, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };
  {/* Siempre en su círculo con borde, en todos los tamaños (pedido
     explícito: nunca el ícono suelto), como el Compartir del bloque del
     documento del área y de los documentos descargables. Antes, en desktop
     (xl) quedaba sin fondo ni borde. */}
  return <button type="button" onClick={share} aria-label={`Compartir ${title}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#494963]/25 bg-white text-[#494963]/70 transition-colors hover:border-[#494963]/55 hover:bg-[#494963]/[.06] hover:text-[#494963] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963]"><Share2 className="h-4 w-4" /></button>;
}
