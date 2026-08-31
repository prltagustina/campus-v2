import { VideoEmbed, DocumentoHero } from "@/components/v3/content-blocks";
import { CurricularWheel } from "@/components/v3/curricular-wheel";
import { TimelineSection } from "@/components/landing/timeline-section";

const INTRO_COPY =
  "Un marco común que orienta qué enseñar, cómo hacerlo y con qué propósito.\n\nUna política concreta para garantizar una enseñanza de calidad, centrada en los aprendizajes claves para las infancias del siglo XXI, en sus derechos, sus intereses y sus desafíos.\n\nUna hoja de ruta en la que cada docente tiene el rol insustituible de convertir este diseño en prácticas situadas y significativas.";

const INTRO_COPY_EDITORIAL = [
  ["Un marco común que orienta qué", "enseñar, cómo hacerlo y con qué", "propósito."],
  ["Una política concreta para garantizar", "una enseñanza de calidad, centrada en", "los aprendizajes claves para las", "infancias del siglo XXI, en sus", "derechos, sus intereses y sus desafíos."],
  ["Una hoja de ruta en la que cada", "docente tiene el rol insustituible de", "convertir este diseño en prácticas", "situadas y significativas."],
] as const;

export default function HomePage() {
  return (
    <div className="bg-white">
      <div id="presentacion">
        <VideoEmbed videoId="eu8CYPbjehE" title="Presentación Diseño Curricular de la Provincia de Santa Fe" topClassName="!pt-10 md:!pt-0" />
      </div>
      <div id="documento" className="pt-10 md:pt-16">
        <DocumentoHero
          eyebrow=""
          titulo="Diseño Curricular para la Educación Primaria de Santa Fe"
          tituloEditorial={["Diseño Curricular", "para la Educación", "Primaria de Santa Fe"]}
          descripcion={INTRO_COPY}
          descripcionEditorial={INTRO_COPY_EDITORIAL}
          portadaSrc="/images/portada-diseno-curricular.png"
          pdfUrl="https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/diseno-curricular-para-la-educacion-primaria-de-la-provincia-de-santa-fe.pdf"
          accent="#EDEDF0"
          accentText="#494963"
          secondaryHref="/area/marco-general"
          tiltedCover
          compact
        />
      </div>
      <div id="rueda" className="bg-[#F1F1F4] pt-10 md:bg-transparent md:pt-16"><CurricularWheel /></div>
      <div id="historia" className="v3-section !px-0 !pb-0 !pt-10 bg-[#F3F3F5] md:!px-[14px] md:!pb-[14px] md:!pt-16 md:bg-transparent"><div className="bg-[#F3F3F5]"><TimelineSection /></div></div>
    </div>
  );
}
