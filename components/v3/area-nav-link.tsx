import Link from "next/link";
import { orderedAreas } from "@/lib/v3-config";

type AreaNavItem = (typeof orderedAreas)[number];

export function areaNavForeground(area: AreaNavItem) {
  if (area.slug === "ciencias-sociales") return "#F7FAFF";
  if (area.slug === "lenguas-extranjeras") return "#494963";
  return area.textOnColor;
}

export function SolidAreaArrow({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${compact ? "ml-2 h-[10px] w-[7px]" : "ml-3 h-[14px] w-[9px]"} block shrink-0 bg-current [clip-path:polygon(0_0,100%_50%,0_100%)]`}
    />
  );
}

const variantClasses = {
  sidebar: "h-full min-h-0 rounded-[9px] px-[15px] py-2 text-[clamp(17px,1.35vw,20px)] leading-none",
  wheel: "min-h-14 rounded-[9px] px-[15px] py-3 text-[clamp(14px,1.35vw,17px)] leading-[1.08]",
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
      <span className={variant === "sidebar" ? "whitespace-nowrap" : "min-w-0 text-pretty"}>{area.name}</span>
      <SolidAreaArrow />
    </Link>
  );
}
