"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, FileText, Headphones, Video, ArrowDownToLine, Play } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

type CategoriaId = "imprimibles" | "audios" | "videos";

const categorias: { id: CategoriaId; label: string; icon: typeof FileText }[] = [
  { id: "imprimibles", label: "Imprimibles", icon: FileText },
  { id: "audios", label: "Audios", icon: Headphones },
  { id: "videos", label: "Videos", icon: Video },
];

const issuesInfo: Record<string, { name: string; description: string }> = {
  "issue-1": { 
    name: "Issue 1", 
    description: "Primer número de English Funzines con actividades y recursos para el aula." 
  },
  "issue-2": { 
    name: "Issue 2", 
    description: "Segundo número de English Funzines con nuevas propuestas didácticas." 
  },
  "issue-3": { 
    name: "Issue 3", 
    description: "Tercer número de English Funzines con contenidos actualizados." 
  },
};

/* Materiales simulados - estos se cargarán desde una base de datos o CMS */
const materialesPorIssue: Record<string, Record<CategoriaId, { nombre: string; formato: string; size: string; url?: string }[]>> = {
  "issue-1": {
    imprimibles: [
      { nombre: "Flashcards - Unit 1", formato: "PDF", size: "2.1 MB" },
      { nombre: "Worksheet - Vocabulary", formato: "PDF", size: "1.5 MB" },
      { nombre: "Activity Book - Pages 1-10", formato: "PDF", size: "3.2 MB" },
      { nombre: "Poster - Classroom Objects", formato: "PDF", size: "4.5 MB" },
    ],
    audios: [
      { nombre: "Song - Hello Song", formato: "MP3", size: "3.2 MB" },
      { nombre: "Listening - Unit 1 Dialogue", formato: "MP3", size: "2.8 MB" },
      { nombre: "Chant - Numbers 1-10", formato: "MP3", size: "1.9 MB" },
    ],
    videos: [
      { nombre: "Introduction Video", formato: "MP4", size: "45 MB" },
      { nombre: "Story Time - The Little Red Hen", formato: "MP4", size: "62 MB" },
    ],
  },
  "issue-2": {
    imprimibles: [
      { nombre: "Flashcards - Unit 2", formato: "PDF", size: "2.3 MB" },
      { nombre: "Worksheet - Grammar", formato: "PDF", size: "1.8 MB" },
      { nombre: "Activity Book - Pages 11-20", formato: "PDF", size: "3.5 MB" },
    ],
    audios: [
      { nombre: "Song - Colors Song", formato: "MP3", size: "3.5 MB" },
      { nombre: "Listening - Unit 2 Dialogue", formato: "MP3", size: "2.5 MB" },
    ],
    videos: [
      { nombre: "Craft Tutorial - Paper Animals", formato: "MP4", size: "38 MB" },
    ],
  },
  "issue-3": {
    imprimibles: [
      { nombre: "Flashcards - Unit 3", formato: "PDF", size: "2.0 MB" },
      { nombre: "Worksheet - Reading", formato: "PDF", size: "1.6 MB" },
      { nombre: "Activity Book - Pages 21-30", formato: "PDF", size: "3.8 MB" },
      { nombre: "Board Game - Review", formato: "PDF", size: "5.2 MB" },
    ],
    audios: [
      { nombre: "Song - Family Song", formato: "MP3", size: "3.1 MB" },
      { nombre: "Listening - Unit 3 Dialogue", formato: "MP3", size: "2.9 MB" },
      { nombre: "Story - The Three Bears", formato: "MP3", size: "5.5 MB" },
    ],
    videos: [
      { nombre: "Roleplay Tutorial", formato: "MP4", size: "52 MB" },
      { nombre: "Goodbye Song Video", formato: "MP4", size: "28 MB" },
    ],
  },
};

export default function IssuePage() {
  const params = useParams();
  const issue = params.issue as string;
  
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaId>("imprimibles");
  
  const info = issuesInfo[issue] || { 
    name: issue.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()), 
    description: "Materiales de descarga" 
  };
  
  const materiales = materialesPorIssue[issue] || { imprimibles: [], audios: [], videos: [] };
  const archivosActivos = materiales[categoriaActiva] || [];

  const getIconForCategory = (categoria: CategoriaId) => {
    switch (categoria) {
      case "imprimibles": return FileText;
      case "audios": return Headphones;
      case "videos": return Video;
    }
  };

  const getActionIcon = (categoria: CategoriaId) => {
    if (categoria === "videos") return Play;
    return ArrowDownToLine;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-[#F5F5F7] py-12 sm:py-16 md:py-20 mt-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/area/lenguas-extranjeras/materiales/ingles" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Volver a English Funzines
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
              <span 
                className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full"
                style={{ backgroundColor: `${AREA_COLOR}20`, color: TEXT_ON_COLOR }}
              >
                Inglés
              </span>
              <span className="text-[10px] sm:text-xs text-[#494963]/40">
                English Funzines
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-3 sm:mb-4 font-display">
              {info.name}
            </h1>
            <p className="text-base sm:text-lg text-[#494963]/60 max-w-2xl">
              {info.description}
            </p>
          </div>
        </div>
      </section>

      {/* Materiales */}
      <section className="py-12 sm:py-16 md:py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
              {categorias.map((cat) => {
                const isActive = categoriaActiva === cat.id;
                const Icon = cat.icon;
                const count = materiales[cat.id]?.length || 0;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoriaActiva(cat.id)}
                    className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border"
                    style={{
                      backgroundColor: isActive ? AREA_COLOR : "transparent",
                      borderColor: isActive ? AREA_COLOR : "#e5e5e5",
                      color: isActive ? TEXT_ON_COLOR : "#494963",
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {cat.label}
                    <span 
                      className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: isActive ? `${TEXT_ON_COLOR}20` : "#e5e5e5",
                        color: isActive ? TEXT_ON_COLOR : "#494963"
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Files list */}
            {archivosActivos.length > 0 ? (
              <div className="flex flex-col gap-3 sm:gap-4">
                {archivosActivos.map((file, index) => {
                  const CategoryIcon = getIconForCategory(categoriaActiva);
                  const ActionIcon = getActionIcon(categoriaActiva);
                  return (
                    <div
                      key={`${file.nombre}-${index}`}
                      className="group flex items-center gap-3 sm:gap-5 rounded-xl sm:rounded-2xl border border-gray-100 bg-white px-4 sm:px-6 py-4 sm:py-5 transition-all hover:border-gray-200 hover:shadow-md"
                    >
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${AREA_COLOR}0D` }}
                      >
                        <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: AREA_COLOR }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm md:text-base text-[#494963] font-medium truncate leading-snug">
                          {file.nombre}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#494963]/35 mt-0.5 sm:mt-1">
                          {file.formato} &middot; {file.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all text-[#494963]/30 hover:text-white group-hover:opacity-100 opacity-60"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = AREA_COLOR;
                          (e.currentTarget as HTMLElement).style.color = TEXT_ON_COLOR;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "";
                          (e.currentTarget as HTMLElement).style.color = "";
                        }}
                      >
                        <ActionIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 sm:py-12">
                <p className="text-sm sm:text-base text-[#494963]/50">
                  No hay materiales disponibles en esta categoría.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
