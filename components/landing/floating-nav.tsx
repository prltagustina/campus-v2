"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Home,
  Lightbulb,
  Play,
  LayoutGrid,
  Clock,
} from "lucide-react";

const sections = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "que-ensenar", label: "Propuesta", icon: Lightbulb },
  { id: "marco-general", label: "Marco General", icon: Play },
  {
    id: "areas",
    label: "\u00c1reas",
    icon: null,
  },
  { id: "organizacion", label: "Organizaci\u00f3n", icon: LayoutGrid },
  { id: "proceso", label: "Proceso", icon: Clock },
];

const AreasIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 33.18 35.86" fill="currentColor">
    <path d="M31.83,12.73h0c-2.25-5.23-6.88-8.71-12.09-9.73v-1.88c0-.1-.04-.18-.1-.25-.12-.49-.54-.87-1.06-.87h-3.97c-.53,0-.95.37-1.06.87-.06.06-.1.15-.1.25v1.88c-1.14.22-2.28.56-3.39,1.04C1.64,7.64-2.26,17.41,1.35,25.82c2.7,6.28,8.83,10.04,15.27,10.04,2.18,0,4.4-.43,6.52-1.35,8.4-3.61,12.31-13.38,8.7-21.79ZM18.57,23.88c-2.54,1.09-5.49-.09-6.59-2.63-.53-1.23-.55-2.59-.05-3.84.5-1.24,1.45-2.22,2.68-2.75.64-.27,1.31-.41,1.98-.41.63,0,1.26.12,1.86.36,1.24.5,2.22,1.45,2.75,2.68h0c.53,1.23.55,2.59.05,3.84-.5,1.24-1.45,2.22-2.68,2.75ZM3.15,24.27c-1.2-3.21-1.17-6.6-.12-9.65l7.36,2.94s.02,0,.03,0c-.33,1.18-.31,2.4.04,3.56l-7.31,3.14ZM22.72,17.41l7.31-3.14c1.19,3.19,1.17,6.55.14,9.58l-7.05-3.32c-.07-.03-.14-.04-.22-.05.2-1.02.12-2.06-.19-3.06ZM29.48,12.96l-7.32,3.14c-.6-1.06-1.47-1.91-2.55-2.48l2.95-7.4c2.93,1.34,5.41,3.66,6.92,6.74ZM13.54,6.06h.01c.06.26.18.5.4.65l.84.61,1.54,1.56c.07.07.16.11.25.11s.19-.04.25-.11l1.54-1.56.85-.61c.21-.16.33-.39.4-.64h.01c.07-.08.1-.17.1-.26v-.54c.51.12,1.01.26,1.5.43l-2.95,7.39c-1.17-.33-2.39-.31-3.56.05l-3.14-7.31c.61-.23,1.22-.42,1.84-.56v.53c0,.09.04.18.1.25ZM10.29,6.39l3.14,7.31c-1.06.6-1.91,1.48-2.49,2.55,0,0-.01-.01-.02-.02l-7.36-2.94c1.34-2.93,3.65-5.41,6.73-6.91ZM3.71,25.57l7.3-3.13c.62,1.09,1.51,1.93,2.56,2.49l-2.94,7.38c-2.93-1.34-5.41-3.65-6.91-6.73ZM11.94,32.83l2.94-7.37c.56.15,1.13.24,1.72.24.62,0,1.24-.12,1.85-.31l3.14,7.32c-3.21,1.2-6.6,1.17-9.65.12ZM22.89,32.15l-3.14-7.31c1.22-.69,2.18-1.74,2.74-3.05,0,0,.02.01,.02.02l7.13,3.36c-1.33,2.95-3.66,5.46-6.76,6.98Z" />
  </svg>
);

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isDarkBg = useCallback((el: Element): boolean => {
    const bg = getComputedStyle(el).backgroundColor;
    if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") return false;
    const match = bg.match(/\d+/g);
    if (!match || match.length < 3) return false;
    const [r, g, b] = match.map(Number);
    // Luminance check: dark if below ~40%
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.4;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);

      let current = "inicio";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 200) {
          current = section.id;
        }
      }
      setActiveSection(current);

      // Check if the nav's center point overlaps a dark element
      if (navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const navCenterY = navRect.top + navRect.height / 2;
        const navCenterX = navRect.left + navRect.width / 2;
        // Get element at nav's center
        const elemAtPoint = document.elementFromPoint(navCenterX + navRect.width, navCenterY);
        if (elemAtPoint) {
          let dark = false;
          let el: Element | null = elemAtPoint;
          // Walk up ancestors to find any dark background
          while (el && el !== document.documentElement) {
            if (isDarkBg(el)) {
              dark = true;
              break;
            }
            el = el.parentElement;
          }
          setOnDark(dark);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkBg]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bgClass = onDark
    ? "bg-white/90 backdrop-blur-md shadow-lg shadow-black/10"
    : "bg-[#494963]/90 backdrop-blur-md shadow-lg shadow-black/15";

  return (
    <nav
      ref={navRef}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 hidden md:flex"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: `translateY(-50%) translateX(${visible ? 0 : -20}px)`,
      }}
    >
      <div className={`flex flex-col items-center gap-1 rounded-2xl px-1.5 py-2 transition-colors duration-500 ${bgClass}`}>
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = section.icon;

          const activeColor = onDark
            ? "bg-[#494963] text-white"
            : "bg-white text-[#494963]";
          const inactiveColor = onDark
            ? "text-[#494963]/50 hover:text-[#494963] hover:bg-[#494963]/10"
            : "text-white/50 hover:text-white hover:bg-white/10";

          return (
            <div key={section.id} className="relative group flex items-center">
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className={`relative flex items-center justify-center rounded-xl transition-all duration-300 w-9 h-9 ${
                  isActive ? activeColor : inactiveColor
                }`}
                aria-label={section.label}
              >
                {section.id === "areas" ? (
                  <AreasIcon className="w-4 h-4" />
                ) : Icon ? (
                  <Icon className="w-4 h-4" />
                ) : null}
              </button>
              {/* Tooltip */}
              <div className="absolute left-full ml-2.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md bg-[#494963] text-white">
                {section.label}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
