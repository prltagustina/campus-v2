import type { Metadata } from "next";
import { TerritorioExplorer } from "@/components/v3/territorio-explorer";

export const metadata: Metadata = {
  title: "Acciones en territorio | Nuevo Diseño Curricular",
  description: "Registro de acciones, encuentros y espacios de intercambio en torno al nuevo Diseño Curricular para la Educación Primaria de Santa Fe.",
};

export default function TerritorioActionsPage() {
  return <TerritorioExplorer />;
}
