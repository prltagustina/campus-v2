"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { type Area } from "@/lib/areas-data";

interface ScrollToTopProps {
  area: Area;
}

export function ScrollToTop({ area }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el scroll supera 500px
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:brightness-110 z-50 lg:hidden"
      style={{ backgroundColor: area.color }}
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}
