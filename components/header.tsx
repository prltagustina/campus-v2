"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isAreaPage = pathname.startsWith("/area/");
  const areaSlug = isAreaPage ? pathname.split("/")[2] : null;

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#20BAA1] rounded-full" />
            <div className="w-2 h-2 bg-[#B159A7] rounded-full" />
            <div className="w-2 h-2 bg-[#FF7402] rounded-full" />
          </div>
          <span className="text-sm md:text-base font-semibold text-[#494963] tracking-wide uppercase">
            Nuevo Diseño Curricular
          </span>
          {areaSlug && (
            <span className="hidden md:inline text-sm text-gray-400">|</span>
          )}
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-[#20BAA1]" : "text-gray-600 hover:text-[#20BAA1]"
            }`}
          >
            Inicio
          </Link>
        </nav>
      </div>
    </header>
  );
}
