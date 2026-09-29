import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * "Volver a X": mismo criterio en todo el sitio para un link de vuelta que
 * NO vive en la barra fija de sección (ver StickySectionNav.backHref para
 * ese caso) — páginas de materiales de Lenguas Extranjeras. Antes cada
 * página repetía el mismo markup a mano, con alguna opacidad suelta.
 */
export function BackLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    // -ml-2 compensa el px-2 (área táctil) para que el ícono quede alineado
    // al borde visual del contenido de abajo, no corrido por el padding.
    <Link
      href={href}
      className={`-ml-2 inline-flex min-h-10 items-center gap-2 rounded-full px-2 text-xs font-semibold text-[#494963]/50 transition-colors hover:bg-[#494963]/[.06] hover:text-[#494963] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963] sm:text-sm ${className}`}
    >
      <ArrowLeft className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
