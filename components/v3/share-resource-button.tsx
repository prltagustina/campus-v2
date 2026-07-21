"use client";

import { Share2 } from "lucide-react";

export function ShareResourceButton({ title, url }: { title: string; url: string }) {
  const share = async () => {
    if (navigator.share) await navigator.share({ title, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };
  return <button type="button" onClick={share} aria-label={`Compartir ${title}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#494963]/45 transition-colors hover:bg-[#494963]/[.055] hover:text-[#494963] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963]"><Share2 className="h-4 w-4" /></button>;
}
