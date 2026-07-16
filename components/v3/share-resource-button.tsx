"use client";

import { Share2 } from "lucide-react";

export function ShareResourceButton({ title, url }: { title: string; url: string }) {
  const share = async () => {
    if (navigator.share) await navigator.share({ title, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };
  return <button type="button" onClick={share} aria-label={`Compartir ${title}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F5F5F7] text-[#494963]/55 transition-colors hover:bg-[#ECECF0] hover:text-[#494963]"><Share2 className="h-4 w-4" /></button>;
}
