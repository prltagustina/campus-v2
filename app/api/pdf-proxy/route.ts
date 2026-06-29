import type { NextRequest } from "next/server";

/**
 * Proxy same-origin para los PDF del campus.
 * Permite renderizar la primera página (portada) con pdf.js en el cliente
 * sin chocar con restricciones de CORS del dominio externo.
 */

const ALLOWED_HOSTS = ["campuseducativo.santafe.edu.ar"];

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");

  if (!target) {
    return new Response("Missing url", { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname) || parsed.protocol !== "https:") {
    return new Response("Forbidden host", { status: 403 });
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      headers: { Accept: "application/pdf" },
      // Cache en el edge/server para no re-descargar en cada portada
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("Upstream error", { status: 502 });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    });
  } catch {
    return new Response("Fetch failed", { status: 502 });
  }
}
