"use client";

import Link from "next/link";
import { ArrowRight, Users, BookOpen, Globe } from "lucide-react";

const accesses = [
  {
    href: "/familias",
    label: "Para Familias",
    description: "Informacion sobre el diseno curricular para las familias",
    icon: Users,
    highlight: true,
  },
  {
    href: "/marco-general",
    label: "Para Docentes y Directivos",
    description: "Marco general, orientaciones y formaciones",
    icon: BookOpen,
    highlight: false,
  },
  {
    href: "/eib",
    label: "Educacion Intercultural Bilingue",
    description: "Enfoque intercultural y bilingue del diseno",
    icon: Globe,
    highlight: false,
  },
];

export function QuickAccessBar() {
  return (
    <div className="w-full bg-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {accesses.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                  item.highlight
                    ? "bg-[#494963] text-white hover:bg-[#3a3a4f]"
                    : "bg-[#494963]/4 text-[#494963] hover:bg-[#494963]/8"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.highlight
                      ? "bg-white/15"
                      : "bg-[#494963]/8"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold block leading-tight">
                    {item.label}
                  </span>
                  <span
                    className={`text-xs mt-0.5 block ${
                      item.highlight ? "text-white/70" : "text-[#494963]/50"
                    }`}
                  >
                    {item.description}
                  </span>
                </div>
                <ArrowRight
                  className={`w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all ${
                    item.highlight ? "text-white" : "text-[#494963]"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
