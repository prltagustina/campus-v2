import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLandingCover } from "@/components/v3/section-landing-cover";
import { TERRITORIO_ENABLED } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Territorio | Nuevo Diseño Curricular",
  description: "Acciones, encuentros y espacios de intercambio en torno al nuevo Diseño Curricular para la Educación Primaria de Santa Fe.",
};

export default function TerritorioPage() {
  if (!TERRITORIO_ENABLED) notFound();

  return (
    <SectionLandingCover
      title={"El Diseño\nen el territorio"}
      description="Encuentros, talleres y espacios de intercambio que acompañan la socialización y la implementación del Diseño Curricular en instituciones de toda la provincia."
      imageSrc="/images/territorio/sello-en-territorio.png"
      imageAlt="Sello En territorio"
      variant="territory"
    />
  );
}
