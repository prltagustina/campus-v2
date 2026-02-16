"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu, X, ChevronDown } from "lucide-react";
import { areasData } from "@/lib/areas-data";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/marco-general", label: "Marco General" },
  { href: "/familias", label: "Familias" },
  { href: "/eib", label: "EIB" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#494963]/8">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/images/recurso-3.png"
            alt="Logo Diseno Curricular"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-semibold text-[#494963] tracking-wide uppercase hidden sm:inline">
            Diseño Curricular
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive(link.href)
                ? "text-[#494963] bg-[#494963]/6"
                : "text-[#494963]/60 hover:text-[#494963] hover:bg-[#494963]/4"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Areas Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAreasOpen(true)}
            onMouseLeave={() => setAreasOpen(false)}
          >
            <button
              type="button"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${pathname.startsWith("/area")
                ? "text-[#494963] bg-[#494963]/6"
                : "text-[#494963]/60 hover:text-[#494963] hover:bg-[#494963]/4"
                }`}
              aria-expanded={areasOpen}
              aria-haspopup="true"
            >
              {"Áreas"}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${areasOpen ? "rotate-180" : ""}`} />
            </button>

            {areasOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg shadow-black/8 border border-[#494963]/8 py-2 z-50">
                {areasData.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/area/${area.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#494963]/70 hover:text-[#494963] hover:bg-[#494963]/4 transition-colors"
                    onClick={() => setAreasOpen(false)}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: area.color }}
                    />
                    {area.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://campuseducativo.santafe.edu.ar/diseno-curricular/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#494963] text-white text-sm font-medium rounded-lg hover:bg-[#3a3a4f] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#494963] hover:bg-[#494963]/6 rounded-lg transition-colors"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#494963]/8 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(link.href)
                  ? "text-[#494963] bg-[#494963]/6"
                  : "text-[#494963]/60 hover:text-[#494963] hover:bg-[#494963]/4"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Areas Section */}
            <div className="mt-2 pt-2 border-t border-[#494963]/8">
              <p className="px-4 py-2 text-xs font-semibold text-[#494963]/40 uppercase tracking-wider">
                {"Areas curriculares"}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {areasData.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/area/${area.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#494963]/70 hover:text-[#494963] hover:bg-[#494963]/4 rounded-lg transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: area.color }}
                    />
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Download */}
            <a
              href="https://campuseducativo.santafe.edu.ar/diseno-curricular/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-[#494963] text-white text-sm font-medium rounded-lg hover:bg-[#3a3a4f] transition-colors"
            >
              <Download className="w-4 h-4" />
              {"DESCARGAR DISEÑO CURRICULAR"}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
