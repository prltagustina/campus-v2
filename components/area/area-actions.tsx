"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

type AreaShape = {
  id: number | string;
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
};

export default function AreaActions({ area }: { area: AreaShape }) {
  const handleShare = async () => {
    const shareData = {
      title: (area.name ?? "Área") + " - Diseño Curricular",
      text: area.fullDescription ?? area.shortDescription ?? "",
      url: typeof window !== "undefined" ? window.location.href : ""
    };

    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share(shareData);
      } catch (err) {
        console.debug("Share cancelled or failed", err);
      }
      return;
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url || "");
        alert("Enlace copiado al portapapeles");
      } else {
        // Fallback simple
        alert("Copia manual: " + (shareData.url || ""));
      }
    } catch (err) {
      console.debug("No se pudo copiar al portapapeles", err);
      alert("No se pudo copiar el enlace");
    }
  };

  const handleDownload = () => {
    // Placeholder: reemplaza con la URL o lógica real de descarga si la tenés
    alert("Iniciando descarga para " + (area.name ?? String(area.id)));
  };

  return (
    <div className="flex items-center gap-2 ml-auto">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="rounded-full font-semibold"
      >
        <Download className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Descargar PDF</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="rounded-full font-semibold"
      >
        <Share2 className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Compartir</span>
      </Button>
    </div>
  );
}
