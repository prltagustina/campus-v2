import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";
import { MarcoHero } from "@/components/marco-general/marco-hero";
import { MarcoVideo } from "@/components/marco-general/marco-video";
import { EjesDetail } from "@/components/marco-general/ejes-detail";
import { EnlacesDescarga } from "@/components/marco-general/enlaces-descarga";
import { AreasAccess } from "@/components/marco-general/areas-access";

export const metadata: Metadata = {
  title: "Marco General - Diseno Curricular Primaria Santa Fe",
  description:
    "Conoce el marco general del nuevo Diseno Curricular para la Educacion Primaria de Santa Fe. Ejes centrales, orientaciones, documentos y formaciones docentes.",
};

export default function MarcoGeneralPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col" role="main">
      <Header />

      <MarcoHero />

      <MarcoVideo />

      <EjesDetail />

      <EnlacesDescarga />

      <AreasAccess />

      <Footer />
    </main>
  );
}
