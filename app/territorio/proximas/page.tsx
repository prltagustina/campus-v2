import type { Metadata } from "next";
import { TerritorioExplorer } from "@/components/v3/territorio-explorer";

export const metadata: Metadata = {
  title: "Próximas acciones en territorio | Nuevo Diseño Curricular",
  description: "Próximas acciones, encuentros y espacios de intercambio en torno al nuevo Diseño Curricular para la Educación Primaria de Santa Fe.",
};

export default function TerritorioProximasPage() {
  return <TerritorioExplorer mode="proximas" />;
}
