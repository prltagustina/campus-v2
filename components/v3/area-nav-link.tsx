import Link from "next/link";
import { orderedAreas } from "@/lib/v3-config";

type AreaNavItem = (typeof orderedAreas)[number];

export function areaNavForeground(area: AreaNavItem) {
  // Mismo oscuro que Lenguas Extranjeras: sobre el celeste clarito de
  // Ciencias Sociales, el texto/ícono blanquecino de antes (#F7FAFF)
  // contrastaba mal — este oscuro se lee mucho mejor ahí.
  if (area.slug === "ciencias-sociales") return "#494963";
  if (area.slug === "lenguas-extranjeras") return "#494963";
  return area.textOnColor;
}

/** Único nombre que se abrevia en el aside angosto de TABLET: el resto entra
 * en 2 líneas (ver boceto), pero "Saberes, Vidas y Mundos" no entra igual.
 * En desktop (xl) vuelve a mostrarse completo, como siempre. */
const shortAreaName: Partial<Record<string, string>> = {
  "saberes-vidas-y-mundos": "S, V y M",
};

export function SolidAreaArrow({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${compact ? "ml-2 h-[10px] w-[7px]" : "ml-3 h-[14px] w-[9px]"} block shrink-0 bg-current [clip-path:polygon(0_0,100%_50%,0_100%)]`}
    />
  );
}

const variantClasses = {
  // leading-[1.15] (no leading-none): con el aside angosto el texto envuelve
  // a 2 líneas y line-height:1 recortaba el descendente de letras como la
  // "g" ("Lengua"). h-full lo da la fila del grid (ver auto-rows en el aside).
  // El tamaño de texto vuelve al de siempre en xl (desktop real).
  sidebar: "h-full min-h-0 rounded-[9px] px-[15px] py-2 text-[clamp(15px,1.35vw,20px)] xl:text-[clamp(17px,1.35vw,20px)] leading-[1.15]",
  // clamp(17px...): antes 14px, se veía chico al lado de lo grandes que son
  // los botones en la botonera de mobile (una sola columna, con mucho lugar
  // de sobra a diferencia del aside angosto de tablet).
  wheel: "min-h-14 rounded-[9px] px-[15px] py-3 text-[clamp(17px,1.35vw,20px)] leading-[1.08]",
} as const;

export function AreaNavLink({
  area,
  active = false,
  variant = "sidebar",
}: {
  area: AreaNavItem;
  active?: boolean;
  variant?: keyof typeof variantClasses;
}) {
  const foreground = areaNavForeground(area);
  const short = variant === "sidebar" ? shortAreaName[area.slug] : undefined;

  return (
    <Link
      href={`/area/${area.slug}`}
      aria-current={active ? "page" : undefined}
      className={`group flex min-w-0 w-full items-center justify-between border font-normal tracking-[-0.035em] transition-colors duration-150 hover:bg-[var(--area)] hover:text-[var(--area-active-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] ${variantClasses[variant]} ${active ? "bg-[var(--area)] text-[var(--area-active-fg)]" : "bg-white text-[var(--area)]"}`}
      style={{
        borderColor: area.color,
        ["--area" as string]: area.color,
        ["--area-active-fg" as string]: foreground,
      }}
    >
      {/* Tablet (md/lg): el aside angosto ya no fuerza una sola línea, el
         nombre envuelve a 2 (text-balance reparte mejor el salto que el wrap
         por defecto). Desktop (xl): vuelve a como estaba, una sola línea con
         el nombre completo — por eso el swap de textos acá abajo.
         break-words: si en algún ancho intermedio ni así entra, corta la
         palabra en vez de desbordar el botón (evita que se rompa el layout). */}
      <span className={`min-w-0 text-pretty break-words ${variant === "sidebar" ? "text-balance" : ""}`}>
        {short ? (
          <>
            <span className="xl:hidden">{short}</span>
            <span className="hidden xl:inline">{area.name}</span>
          </>
        ) : (
          area.name
        )}
      </span>
      <SolidAreaArrow />
    </Link>
  );
}
