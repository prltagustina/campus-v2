"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuickAccessBar() {
  return (
    <div className="w-full bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <Link
            href="/familias"
            className="group flex items-center justify-center gap-3 px-8 py-5 text-[#494963] hover:bg-[#494963]/[0.03] transition-colors"
          >
            <span className="text-sm font-semibold tracking-wide">Para Familias</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
          </Link>

          <Link
            href="/eib"
            className="group flex items-center justify-center gap-3 px-8 py-5 text-[#494963] hover:bg-[#494963]/[0.03] transition-colors"
          >
            <span className="text-sm font-semibold tracking-wide">{'Educaci\u00f3n Intercultural Biling\u00fce'}</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
