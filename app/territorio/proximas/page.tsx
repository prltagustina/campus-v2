import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TerritorioExplorer } from "@/components/v3/territorio-explorer";
import { TERRITORIO_ENABLED } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Próximas acciones en territorio | Nuevo Diseño Curricular",
  description: "Próximas acciones, encuentros y espacios de intercambio en torno al nuevo Diseño Curricular para la Educación Primaria de Santa Fe.",
};

export default function TerritorioProximasPage() {
  if (!TERRITORIO_ENABLED) notFound();

  return <TerritorioExplorer mode="proximas" />;
}
