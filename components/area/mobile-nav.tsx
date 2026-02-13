"use client";

import Link from "next/link";
import { Home, Download, MoreHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { areasData, type Area } from "@/lib/areas-data";
import { areasOrder, MARCO_GENERAL_COLOR } from "@/lib/constants";

interface MobileNavProps {
  area: Area;
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const AreasIcon = ({ className, color }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 48.52 52.44" fill={color || "currentColor"}>
    <path d="M46.55,18.61h0c-3.29-7.65-10.07-12.74-17.68-14.23V1.63c0-.14-.06-.27-.15-.36-.17-.72-.79-1.27-1.56-1.27h-5.81c-.77,0-1.39.55-1.56,1.27-.09.09-.15.22-.15.36v2.74c-1.67.32-3.33.82-4.96,1.52C2.4,11.17-3.31,25.47,1.97,37.76c3.94,9.18,12.91,14.69,22.32,14.69,3.19,0,6.43-.63,9.54-1.97,12.29-5.28,18-19.57,12.72-31.86ZM27.16,34.92c-3.71,1.59-8.04-.13-9.63-3.85-.77-1.8-.8-3.79-.07-5.61.73-1.82,2.12-3.25,3.92-4.02.93-.4,1.91-.6,2.89-.6.92,0,1.84.18,2.72.53,1.82.73,3.25,2.12,4.02,3.92h0c.77,1.8.8,3.79.07,5.61-.73,1.82-2.12,3.25-3.92,4.02ZM4.6,35.5c-1.75-4.7-1.7-9.66-.18-14.11l10.76,4.3s.03,0,.04,0c-.48,1.72-.46,3.51.07,5.21l-10.7,4.59ZM33.22,25.46l10.69-4.59c1.74,4.66,1.7,9.58.21,14.01l-10.31-4.86c-.1-.05-.21-.06-.32-.08.29-1.49.17-3.02-.28-4.48ZM43.11,18.96l-10.71,4.6c-.88-1.55-2.16-2.8-3.73-3.63l4.32-10.82c4.28,1.96,7.91,5.36,10.12,9.86ZM19.8,8.86l.02.02c.09.37.27.71.58.93l1.23.9,2.26,2.28c.1.1.23.15.37.15s.27-.06.37-.15l2.26-2.27,1.24-.9c.31-.23.49-.57.58-.94l.02-.02c.1-.1.15-.23.15-.37v-.78c.74.17,1.47.38,2.19.63l-4.32,10.81c-1.72-.48-3.5-.45-5.2.07l-4.59-10.69c.89-.33,1.79-.61,2.7-.81v.78c0,.14.05.27.15.37ZM15.04,9.35l4.59,10.69c-1.55.88-2.8,2.16-3.64,3.74-.01,0-.02-.02-.03-.02l-10.76-4.3c1.96-4.28,5.34-7.91,9.84-10.11ZM5.42,37.4l10.67-4.58c.9,1.59,2.21,2.82,3.74,3.64l-4.31,10.79c-4.28-1.96-7.91-5.34-10.11-9.84ZM17.46,48.01l4.3-10.78c.81.23,1.66.35,2.51.35.9,0,1.81-.18,2.7-.45l4.59,10.7c-4.7,1.75-9.66,1.7-14.11.18ZM33.48,47.02l-4.59-10.69c1.79-1.01,3.19-2.54,4.01-4.45.01,0,.02.02.04.03l10.43,4.92c-1.95,4.32-5.35,7.99-9.89,10.2Z" />
  </svg>
);

/* Staggered menu overlay -- inspired by reactbits staggered-menu */
function StaggeredAreasMenu({
  currentArea,
  onClose,
}: {
  currentArea: Area;
  onClose: () => void;
}) {
  const allItems = [
    ...areasOrder.map((id) => {
      const a = areasData.find((x) => x.id === id);
      return a ? { slug: a.slug, name: a.name, color: a.color, isCurrent: a.id === currentArea.id } : null;
    }).filter(Boolean) as { slug: string; name: string; color: string; isCurrent: boolean }[],
    { slug: "marco-general", name: "Marco General", color: MARCO_GENERAL_COLOR, isCurrent: false },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#0e0e1a]/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Close button */}
      <motion.button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Menu items */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 py-16">
        <motion.p
          className="text-white/40 text-xs uppercase tracking-[0.2em] font-semibold mb-6 pl-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {"Áreas curriculares"}
        </motion.p>

        {allItems.map((item, i) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            transition={{
              duration: 0.45,
              delay: 0.08 + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={item.slug === "marco-general" ? "/#marco-general" : `/area/${item.slug}`}
              onClick={onClose}
              className="group flex items-center gap-4 py-3"
            >
              {/* Dot */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-150"
                style={{
                  backgroundColor: item.color,
                  boxShadow: item.isCurrent ? `0 0 12px ${item.color}80` : "none",
                }}
              />

              {/* Name */}
              <span
                className="text-xl font-bold transition-all duration-300"
                style={{
                  color: item.isCurrent ? item.color : "rgba(255,255,255,0.5)",
                }}
              >
                {item.name}
              </span>

              {/* Active indicator */}
              {item.isCurrent && (
                <motion.div
                  className="ml-auto h-1 rounded-full"
                  style={{ backgroundColor: item.color, width: 24 }}
                  layoutId="mobile-active-bar"
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function MobileNav({
  area,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
}: MobileNavProps) {
  return (
    <>
      {/* Staggered Areas overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <StaggeredAreasMenu
            currentArea={area}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-4 py-2 safe-area-pb">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/" className="flex flex-col items-center gap-1 p-2">
            <Home className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] text-gray-400">Inicio</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center gap-1 p-2"
          >
            <AreasIcon
              className="w-5 h-5"
              color={mobileMenuOpen ? area.color : "#9CA3AF"}
            />
            <span
              className="text-[10px]"
              style={{ color: mobileMenuOpen ? area.color : "#9CA3AF" }}
            >
              {"Áreas"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("materiales")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <Download
              className="w-5 h-5"
              style={{ color: activeSection === "materiales" ? area.color : "#9CA3AF" }}
            />
            <span
              className="text-[10px]"
              style={{ color: activeSection === "materiales" ? area.color : "#9CA3AF" }}
            >
              Descargas
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("video")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <MoreHorizontal
              className="w-5 h-5"
              style={{
                color: ["video", "formacion"].includes(activeSection) ? area.color : "#9CA3AF",
              }}
            />
            <span
              className="text-[10px]"
              style={{
                color: ["video", "formacion"].includes(activeSection) ? area.color : "#9CA3AF",
              }}
            >
              {"Ver más"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
