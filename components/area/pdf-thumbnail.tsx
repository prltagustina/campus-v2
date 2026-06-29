"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

interface PdfThumbnailProps {
  /** URL original del PDF (se enruta por el proxy same-origin). */
  url: string;
  /** Color del área para el placeholder. */
  color: string;
  className?: string;
}

/**
 * Renderiza la primera página de un PDF como portada.
 * - Carga diferida: solo renderiza cuando entra en viewport.
 * - Usa pdf.js en el cliente a través de un proxy same-origin.
 * - Muestra un placeholder con el color del área mientras carga o si falla.
 */
export function PdfThumbnail({ url, color, className }: PdfThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [visible, setVisible] = useState(false);

  // Observa visibilidad para diferir el render
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || status !== "idle") return;
    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const proxied = `/api/pdf-proxy?url=${encodeURIComponent(url)}`;
        const loadingTask = pdfjs.getDocument({ url: proxied });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const baseViewport = page.getViewport({ scale: 1 });
        // Apuntamos a ~340px de ancho de render
        const scale = (340 / baseViewport.width) * dpr;
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setStatus("done");
      } catch (err) {
        if (!cancelled) {
          console.log(
            "[v0] pdf thumbnail error:",
            err instanceof Error ? err.message : String(err),
          );
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [visible, status, url]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ backgroundColor: `${color}10` }}
    >
      {/* Placeholder mientras carga o si hay error */}
      {status !== "done" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <FileText
            className={`w-8 h-8 ${status === "loading" ? "animate-pulse" : ""}`}
            style={{ color: `${color}99` }}
          />
          {status === "error" && (
            <span className="text-[10px] font-medium uppercase tracking-wide text-[#494963]/40">
              PDF
            </span>
          )}
        </div>
      )}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
          status === "done" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
