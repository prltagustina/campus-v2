"use client";

import Link from "next/link";
import { ArrowRight, Users, BookOpen } from "lucide-react";

export function QuickAccessBar() {
  return (
    <div className="w-full bg-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Familias -- primary/highlighted */}
          <Link
            href="/familias"
            className="group flex-1 flex items-center gap-4 px-5 py-3.5 rounded-xl bg-[#494963] text-white hover:bg-[#3a3a4f] transition-colors"
          >
            <Users className="w-5 h-5 flex-shrink-0 text-white/60" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold block leading-tight">
                Para Familias
              </span>
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all text-white" />
          </Link>

          {/* Docentes -- secondary */}
          <Link
            href="/marco-general"
            className="group flex-1 flex items-center gap-4 px-5 py-3.5 rounded-xl border border-[#494963]/12 text-[#494963] hover:border-[#494963]/25 hover:bg-[#494963]/[0.03] transition-colors"
          >
            <BookOpen className="w-5 h-5 flex-shrink-0 text-[#494963]/50" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold block leading-tight">
                Para Docentes y Directivos
              </span>
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all text-[#494963]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
