"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Headphones, 
  Video, 
  ChevronDown,
  ChevronRight,
  Play,
  Download,
  Eye,
  Clock
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

/* Materiales y recursos educativos */
const recursosEducativos = [
  { id: "secuencias", name: "Secuencias didácticas", icon: FileText },
  { id: "audiovisuales", name: "Materiales audiovisuales", icon: Video },
  { id: "guias", name: "Guías para la docencia", icon: BookOpen },
];

/* Datos de los Issues */
const issues = [
  {
    id: "issue-1",
    number: 1,
    title: "It's great to be me!",
    available: true,
    materials: {
      magazine: { name: "Magazine", format: "PDF", size: "8.2 MB" },
      activityBook: { name: "Activity Book", format: "PDF", size: "6.4 MB" },
      teachersGuide: { name: "Teacher's Guide", format: "PDF", size: "4.1 MB" },
    },
    audios: {
      magazine: [
        { name: "Track 01 - Welcome Song", duration: "2:34" },
        { name: "Track 02 - Hello Chant", duration: "1:45" },
        { name: "Track 03 - My Name Is...", duration: "2:12" },
        { name: "Track 04 - Numbers Song", duration: "2:58" },
      ],
      activityBook: [
        { name: "Activity 1 - Listen and Repeat", duration: "1:23" },
        { name: "Activity 2 - Listening Exercise", duration: "2:45" },
        { name: "Activity 3 - Song Practice", duration: "3:10" },
      ],
    },
    videos: [
      { name: "Introduction to Issue 1", duration: "3:45" },
      { name: "Classroom Activities Demo", duration: "5:20" },
      { name: "Song: It's Great to Be Me!", duration: "2:30" },
    ],
  },
  {
    id: "issue-2",
    number: 2,
    title: "Próximamente",
    available: false,
    materials: {},
    audios: { magazine: [], activityBook: [] },
    videos: [],
  },
  {
    id: "issue-3",
    number: 3,
    title: "Próximamente",
    available: false,
    materials: {},
    audios: { magazine: [], activityBook: [] },
    videos: [],
  },
];

export default function InglesMaterilesPage() {
  const [expandedIssue, setExpandedIssue] = useState<string | null>("issue-1");
  const [expandedSection, setExpandedSection] = useState<string | null>("documents");

  const toggleIssue = (issueId: string) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
    setExpandedSection("documents");
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero - fondo amarillo clarito */}
      <section className="py-12 sm:py-16 md:py-20 mt-16" style={{ backgroundColor: `${AREA_COLOR}12` }}>
        <div className="container mx-auto px-4">
          <Link 
            href="/area/lenguas-extranjeras#materiales" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Volver a Lenguas Extranjeras
          </Link>
          <div className="max-w-3xl">
            <span 
              className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4"
              style={{ backgroundColor: `${AREA_COLOR}40`, color: TEXT_ON_COLOR }}
            >
              Lenguas Extranjeras
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-2 font-display">
              Inglés
            </h1>
            <p className="text-lg sm:text-xl text-[#494963]/70 font-medium">
              Itinerarios didácticos
            </p>
          </div>
        </div>
      </section>

      {/* Materiales y recursos educativos */}
      <section className="py-10 sm:py-14 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-[#494963] mb-6">
              Materiales y recursos educativos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recursosEducativos.map((recurso) => {
                const Icon = recurso.icon;
                return (
                  <button
                    key={recurso.id}
                    type="button"
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white text-left transition-all hover:border-gray-200 hover:shadow-sm"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${AREA_COLOR}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: AREA_COLOR }} />
                    </div>
                    <span className="text-sm text-[#494963] font-medium">{recurso.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#494963]/30 ml-auto" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Serie English Funzine */}
      <section className="py-10 sm:py-14 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Funzine Header */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${AREA_COLOR}15` }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: AREA_COLOR }} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#494963] font-display">
                    Serie English Funzine
                  </h2>
                  <p className="text-sm text-[#494963]/50 italic">
                    the magazine that makes English fun
                  </p>
                </div>
              </div>
              
              {/* Video de presentación placeholder */}
              <div className="mt-6 rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: AREA_COLOR }}
                  >
                    <Play className="w-7 h-7 ml-1" style={{ color: TEXT_ON_COLOR }} />
                  </div>
                  <p className="text-sm text-[#494963]/50">Video de presentación</p>
                </div>
              </div>

              <p className="mt-6 text-sm sm:text-base text-[#494963]/70 leading-relaxed">
                Les damos la bienvenida a <em>English Funzine</em>. Esta serie de materiales está pensada para acompañar la implementación de <em>Lenguas Extranjeras</em> en aquellas escuelas primarias de Santa Fe que elijan enseñar inglés.
              </p>
            </div>

            {/* Issues */}
            <div className="space-y-4">
              {issues.map((issue) => (
                <div 
                  key={issue.id}
                  className={`rounded-2xl border transition-all ${
                    issue.available 
                      ? "border-gray-100 bg-white" 
                      : "border-gray-100 bg-gray-50/50"
                  }`}
                >
                  {/* Issue Header */}
                  <button
                    type="button"
                    onClick={() => issue.available && toggleIssue(issue.id)}
                    disabled={!issue.available}
                    className={`w-full flex items-center justify-between p-5 sm:p-6 text-left ${
                      issue.available ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: issue.available ? `${AREA_COLOR}15` : "#e5e5e5",
                        }}
                      >
                        <span 
                          className="text-lg font-bold"
                          style={{ color: issue.available ? AREA_COLOR : "#999" }}
                        >
                          {issue.number}
                        </span>
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-[#494963]">
                          English Funzine - Issue {issue.number}
                        </p>
                        {issue.available ? (
                          <p className="text-sm text-[#494963]/50 mt-0.5">{issue.title}</p>
                        ) : (
                          <p className="text-sm text-[#494963]/40 mt-0.5 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            Próximamente
                          </p>
                        )}
                      </div>
                    </div>
                    {issue.available && (
                      <ChevronDown 
                        className={`w-5 h-5 text-[#494963]/30 transition-transform ${
                          expandedIssue === issue.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Issue Content - Solo si está disponible y expandido */}
                  {issue.available && expandedIssue === issue.id && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 space-y-4">
                      {/* Documentos */}
                      <div className="border-t border-gray-100 pt-4">
                        <button
                          type="button"
                          onClick={() => toggleSection("documents")}
                          className="flex items-center justify-between w-full py-2"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#494963]/40" />
                            <span className="text-sm font-semibold text-[#494963]">Documentos</span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 text-[#494963]/30 transition-transform ${
                              expandedSection === "documents" ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expandedSection === "documents" && (
                          <div className="mt-3 space-y-2">
                            {Object.values(issue.materials).map((material, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                <div>
                                  <p className="text-sm text-[#494963] font-medium">{material.name}</p>
                                  <p className="text-xs text-[#494963]/40 mt-0.5">{material.format} - {material.size}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button type="button" className="p-2 rounded-full hover:bg-white transition-colors text-[#494963]/40 hover:text-[#494963]">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button type="button" className="p-2 rounded-full hover:bg-white transition-colors text-[#494963]/40 hover:text-[#494963]">
                                    <Download className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Audios */}
                      <div className="border-t border-gray-100 pt-4">
                        <button
                          type="button"
                          onClick={() => toggleSection("audios")}
                          className="flex items-center justify-between w-full py-2"
                        >
                          <div className="flex items-center gap-2">
                            <Headphones className="w-4 h-4 text-[#494963]/40" />
                            <span className="text-sm font-semibold text-[#494963]">Audios</span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 text-[#494963]/30 transition-transform ${
                              expandedSection === "audios" ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expandedSection === "audios" && (
                          <div className="mt-3 space-y-4">
                            {/* Magazine Audios */}
                            <div>
                              <p className="text-xs font-semibold text-[#494963]/60 uppercase tracking-wider mb-2">Magazine</p>
                              <div className="space-y-1">
                                {issue.audios.magazine.map((audio, idx) => (
                                  <div 
                                    key={idx}
                                    className="flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <button 
                                        type="button" 
                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                        style={{ backgroundColor: `${AREA_COLOR}15` }}
                                      >
                                        <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: AREA_COLOR }} />
                                      </button>
                                      <div>
                                        <p className="text-sm text-[#494963]">{audio.name}</p>
                                        <p className="text-xs text-[#494963]/40">{audio.duration}</p>
                                      </div>
                                    </div>
                                    <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#494963]/30 hover:text-[#494963]">
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Activity Book Audios */}
                            <div>
                              <p className="text-xs font-semibold text-[#494963]/60 uppercase tracking-wider mb-2">Activity Book</p>
                              <div className="space-y-1">
                                {issue.audios.activityBook.map((audio, idx) => (
                                  <div 
                                    key={idx}
                                    className="flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <button 
                                        type="button" 
                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                        style={{ backgroundColor: `${AREA_COLOR}15` }}
                                      >
                                        <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: AREA_COLOR }} />
                                      </button>
                                      <div>
                                        <p className="text-sm text-[#494963]">{audio.name}</p>
                                        <p className="text-xs text-[#494963]/40">{audio.duration}</p>
                                      </div>
                                    </div>
                                    <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#494963]/30 hover:text-[#494963]">
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Videos */}
                      <div className="border-t border-gray-100 pt-4">
                        <button
                          type="button"
                          onClick={() => toggleSection("videos")}
                          className="flex items-center justify-between w-full py-2"
                        >
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-[#494963]/40" />
                            <span className="text-sm font-semibold text-[#494963]">Videos</span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 text-[#494963]/30 transition-transform ${
                              expandedSection === "videos" ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expandedSection === "videos" && (
                          <div className="mt-3 space-y-2">
                            {issue.videos.map((video, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100"
                                  >
                                    <Play className="w-4 h-4 ml-0.5 text-[#494963]/50" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-[#494963]">{video.name}</p>
                                    <p className="text-xs text-[#494963]/40">{video.duration}</p>
                                  </div>
                                </div>
                                <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#494963]/30 hover:text-[#494963]">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
