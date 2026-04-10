"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  FileText, 
  Headphones, 
  Video, 
  Play,
  Download,
  Eye,
  Pause
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

/* Datos del Issue 1 */
const issueData = {
  number: 1,
  title: "It's great to be me!",
  documents: [
    { id: "magazine", name: "Magazine", format: "PDF", size: "8.2 MB" },
    { id: "activity-book", name: "Activity Book", format: "PDF", size: "6.4 MB" },
    { id: "teachers-guide", name: "Teacher's Guide", format: "PDF", size: "4.1 MB" },
  ],
  audios: {
    magazine: [
      { id: "m1", name: "Track 01 - Welcome Song", duration: "2:34" },
      { id: "m2", name: "Track 02 - Hello Chant", duration: "1:45" },
      { id: "m3", name: "Track 03 - My Name Is...", duration: "2:12" },
      { id: "m4", name: "Track 04 - Numbers Song", duration: "2:58" },
      { id: "m5", name: "Track 05 - Colors Rhyme", duration: "1:55" },
    ],
    activityBook: [
      { id: "a1", name: "Activity 1 - Listen and Repeat", duration: "1:23" },
      { id: "a2", name: "Activity 2 - Listening Exercise", duration: "2:45" },
      { id: "a3", name: "Activity 3 - Song Practice", duration: "3:10" },
      { id: "a4", name: "Activity 4 - Pronunciation Drill", duration: "2:05" },
    ],
  },
  videos: [
    { id: "v1", name: "Introducción a Issue 1", duration: "3:45", thumbnail: null },
    { id: "v2", name: "Actividades para el aula", duration: "5:20", thumbnail: null },
    { id: "v3", name: "Canción: It's Great to Be Me!", duration: "2:30", thumbnail: null },
    { id: "v4", name: "Tips para docentes", duration: "4:15", thumbnail: null },
  ],
};

type TabType = "documents" | "audios" | "videos";

export default function Issue1Page() {
  const [activeTab, setActiveTab] = useState<TabType>("documents");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const tabs: { id: TabType; label: string; icon: typeof FileText }[] = [
    { id: "documents", label: "Documentos", icon: FileText },
    { id: "audios", label: "Audios", icon: Headphones },
    { id: "videos", label: "Videos", icon: Video },
  ];

  const toggleAudio = (audioId: string) => {
    setPlayingAudio(playingAudio === audioId ? null : audioId);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="py-10 sm:py-14 md:py-16 mt-16" style={{ backgroundColor: `${AREA_COLOR}12` }}>
        <div className="container mx-auto px-4">
          <Link 
            href="/area/lenguas-extranjeras/materiales/ingles" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Volver a English Funzine
          </Link>
          
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: AREA_COLOR }}
            >
              <span className="text-xl sm:text-2xl font-bold" style={{ color: TEXT_ON_COLOR }}>
                {issueData.number}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#494963]/40 uppercase tracking-wider font-semibold mb-1">
                English Funzine
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#494963] font-display">
                Issue {issueData.number}
              </h1>
              <p className="text-base sm:text-lg text-[#494963]/60 mt-1">
                {issueData.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100/60 rounded-full w-fit mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isActive 
                        ? "bg-white shadow-sm text-[#494963]" 
                        : "text-[#494963]/50 hover:text-[#494963]/70"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div className="space-y-3">
                {issueData.documents.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${AREA_COLOR}15` }}
                      >
                        <FileText className="w-5 h-5" style={{ color: AREA_COLOR }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#494963]">{doc.name}</p>
                        <p className="text-xs text-[#494963]/40">{doc.format} · {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        type="button" 
                        className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-[#494963]/40 hover:text-[#494963]"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        type="button" 
                        className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-[#494963]/40 hover:text-[#494963]"
                        title="Descargar"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Audios Tab */}
            {activeTab === "audios" && (
              <div className="space-y-8">
                {/* Magazine Audios */}
                <div>
                  <p className="text-xs font-semibold text-[#494963]/50 uppercase tracking-wider mb-3">
                    Magazine
                  </p>
                  <div className="space-y-1">
                    {issueData.audios.magazine.map((audio) => {
                      const isPlaying = playingAudio === audio.id;
                      return (
                        <div 
                          key={audio.id}
                          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <button 
                            type="button"
                            onClick={() => toggleAudio(audio.id)}
                            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                            style={{ 
                              backgroundColor: isPlaying ? AREA_COLOR : `${AREA_COLOR}15`,
                            }}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4" style={{ color: TEXT_ON_COLOR }} />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" style={{ color: AREA_COLOR }} />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#494963] truncate">{audio.name}</p>
                            <p className="text-xs text-[#494963]/35">{audio.duration}</p>
                          </div>
                          <button 
                            type="button" 
                            className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all text-[#494963]/40 hover:text-[#494963]"
                            title="Descargar"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Activity Book Audios */}
                <div>
                  <p className="text-xs font-semibold text-[#494963]/50 uppercase tracking-wider mb-3">
                    Activity Book
                  </p>
                  <div className="space-y-1">
                    {issueData.audios.activityBook.map((audio) => {
                      const isPlaying = playingAudio === audio.id;
                      return (
                        <div 
                          key={audio.id}
                          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <button 
                            type="button"
                            onClick={() => toggleAudio(audio.id)}
                            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                            style={{ 
                              backgroundColor: isPlaying ? AREA_COLOR : `${AREA_COLOR}15`,
                            }}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4" style={{ color: TEXT_ON_COLOR }} />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" style={{ color: AREA_COLOR }} />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#494963] truncate">{audio.name}</p>
                            <p className="text-xs text-[#494963]/35">{audio.duration}</p>
                          </div>
                          <button 
                            type="button" 
                            className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all text-[#494963]/40 hover:text-[#494963]"
                            title="Descargar"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === "videos" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {issueData.videos.map((video) => (
                  <div 
                    key={video.id}
                    className="group rounded-xl border border-gray-100 bg-white overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                  >
                    {/* Video thumbnail */}
                    <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: AREA_COLOR }}
                      >
                        <Play className="w-5 h-5 ml-0.5" style={{ color: TEXT_ON_COLOR }} />
                      </div>
                      <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <p className="text-sm text-[#494963] font-medium truncate pr-2">{video.name}</p>
                      <button 
                        type="button" 
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-[#494963]/30 hover:text-[#494963] flex-shrink-0"
                        title="Descargar"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
