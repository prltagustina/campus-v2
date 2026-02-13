"use client";

import Link from "next/link";
import { Home, BookOpen, Video, FileText, Bookmark } from "lucide-react";
import { areasData, type Area } from "@/lib/areas-data";
import { areasOrder, MARCO_GENERAL_COLOR } from "@/lib/constants";

const secciones = [
  { id: "ejes", name: "Ejes", icon: BookOpen },
  { id: "video", name: "Video", icon: Video },
  { id: "materiales", name: "Materiales", icon: FileText },
  { id: "formacion", name: "Formaciones", icon: Bookmark },
];

/* Original wheel SVG icon */
const AreasIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48.52 52.44" fill="currentColor">
    <path d="M46.55,18.61h0c-3.29-7.65-10.07-12.74-17.68-14.23V1.63c0-.14-.06-.27-.15-.36-.17-.72-.79-1.27-1.56-1.27h-5.81c-.77,0-1.39.55-1.56,1.27-.09.09-.15.22-.15.36v2.74c-1.67.32-3.33.82-4.96,1.52C2.4,11.17-3.31,25.47,1.97,37.76c3.94,9.18,12.91,14.69,22.32,14.69,3.19,0,6.43-.63,9.54-1.97,12.29-5.28,18-19.57,12.72-31.86ZM27.16,34.92c-3.71,1.59-8.04-.13-9.63-3.85-.77-1.8-.8-3.79-.07-5.61.73-1.82,2.12-3.25,3.92-4.02.93-.4,1.91-.6,2.89-.6.92,0,1.84.18,2.72.53,1.82.73,3.25,2.12,4.02,3.92h0c.77,1.8.8,3.79.07,5.61-.73,1.82-2.12,3.25-3.92,4.02ZM4.6,35.5c-1.75-4.7-1.7-9.66-.18-14.11l10.76,4.3s.03,0,.04,0c-.48,1.72-.46,3.51.07,5.21l-10.7,4.59ZM33.22,25.46l10.69-4.59c1.74,4.66,1.7,9.58.21,14.01l-10.31-4.86c-.1-.05-.21-.06-.32-.08.29-1.49.17-3.02-.28-4.48ZM43.11,18.96l-10.71,4.6c-.88-1.55-2.16-2.8-3.73-3.63l4.32-10.82c4.28,1.96,7.91,5.36,10.12,9.86ZM19.8,8.86l.02.02c.09.37.27.71.58.93l1.23.9,2.26,2.28c.1.1.23.15.37.15s.27-.06.37-.15l2.26-2.27,1.24-.9c.31-.23.49-.57.58-.94l.02-.02c.1-.1.15-.23.15-.37v-.78c.74.17,1.47.38,2.19.63l-4.32,10.81c-1.72-.48-3.5-.45-5.2.07l-4.59-10.69c.89-.33,1.79-.61,2.7-.81v.78c0,.14.05.27.15.37ZM15.04,9.35l4.59,10.69c-1.55.88-2.8,2.16-3.64,3.74-.01,0-.02-.02-.03-.02l-10.76-4.3c1.96-4.28,5.34-7.91,9.84-10.11ZM5.42,37.4l10.67-4.58c.9,1.59,2.21,2.82,3.74,3.64l-4.31,10.79c-4.28-1.96-7.91-5.34-10.11-9.84ZM17.46,48.01l4.3-10.78c.81.23,1.66.35,2.51.35.9,0,1.81-.18,2.7-.45l4.59,10.7c-4.7,1.75-9.66,1.7-14.11.18ZM33.48,47.02l-4.59-10.69c1.79-1.01,3.19-2.54,4.01-4.45.01,0,.02.02.04.03l10.43,4.92c-1.95,4.32-5.35,7.99-9.89,10.2Z" />
  </svg>
);

interface SidebarProps {
  area: Area;
  activeSection: string;
  showAreasNav: boolean;
  setShowAreasNav: (show: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

export function Sidebar({
  area,
  activeSection,
  showAreasNav,
  setShowAreasNav,
  scrollToSection,
}: SidebarProps) {
  return (
    <aside className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col items-center gap-1 bg-[#494963]/90 backdrop-blur-md rounded-2xl px-1.5 py-2 shadow-lg shadow-black/15">
        {/* Home */}
        <div className="relative group flex items-center">
          <Link
            href="/"
            className="flex items-center justify-center rounded-xl transition-all duration-300 w-9 h-9 text-white/50 hover:text-white hover:bg-white/10"
            aria-label="Inicio"
          >
            <Home className="w-4 h-4" />
          </Link>
          <div className="absolute left-full ml-2.5 px-2.5 py-1 bg-[#494963] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
            Inicio
          </div>
        </div>

        {/* Areas toggle */}
        <div className="relative group flex items-center">
          <button
            type="button"
            onClick={() => setShowAreasNav(!showAreasNav)}
            className="flex items-center justify-center rounded-xl transition-all duration-300 w-9 h-9"
            style={{
              backgroundColor: showAreasNav ? "white" : "transparent",
              color: showAreasNav ? "#494963" : "rgba(255,255,255,0.5)",
            }}
            aria-label={"\u00c1reas"}
          >
            <AreasIcon className="w-5 h-5" />
          </button>
          <div className="absolute left-full ml-2.5 px-2.5 py-1 bg-[#494963] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
            {"\u00c1reas"}
          </div>
        </div>

        {/* Areas dots list (collapsible) */}
        {showAreasNav && (
          <div className="flex flex-col items-center gap-2.5 py-2 px-1">
            {areasOrder.map((areaId) => {
              const areaItem = areasData.find((a) => a.id === areaId);
              if (!areaItem) return null;
              const isActive = areaItem.id === area.id;
              return (
                <div key={areaId} className="relative group/dot flex items-center">
                  <Link
                    href={`/area/${areaItem.slug}`}
                    className="flex items-center justify-center"
                    title={areaItem.name}
                  >
                    <div
                      className={`rounded-full transition-all ${
                        isActive
                          ? "w-3.5 h-3.5"
                          : "w-2.5 h-2.5 hover:scale-125 opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor: areaItem.color,
                        boxShadow: isActive ? `0 0 0 2px rgba(73,73,99,0.9), 0 0 0 4px ${areaItem.color}` : "none",
                      }}
                    />
                  </Link>
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#494963] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover/dot:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
                    {areaItem.name}
                  </div>
                </div>
              );
            })}
            {/* Marco General */}
            <div className="relative group/dot flex items-center">
              <Link href="/marco-general" className="flex items-center justify-center">
                <div
                  className="w-2.5 h-2.5 rounded-full hover:scale-125 transition-all opacity-60 hover:opacity-100"
                  style={{ backgroundColor: MARCO_GENERAL_COLOR }}
                />
              </Link>
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#494963] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover/dot:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
                Marco General
              </div>
            </div>
          </div>
        )}

        {/* Separator */}
        <div className="w-5 h-px bg-white/15 my-1" />

        {/* Section navigation */}
        {secciones.map((seccion) => {
          const isActive = activeSection === seccion.id;
          return (
            <div key={seccion.id} className="relative group flex items-center">
              <button
                type="button"
                onClick={() => scrollToSection(seccion.id)}
                data-section={seccion.id}
                className="flex items-center justify-center rounded-xl transition-all duration-300 w-9 h-9"
                style={{
                  backgroundColor: isActive ? "white" : "transparent",
                  color: isActive ? "#494963" : "rgba(255,255,255,0.5)",
                }}
                aria-label={seccion.name}
              >
                <seccion.icon className="w-4 h-4" />
              </button>
              <div className="absolute left-full ml-2.5 px-2.5 py-1 bg-[#494963] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
                {seccion.name}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
