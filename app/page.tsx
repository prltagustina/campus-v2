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

/**
 * PROTOTIPO — scroll "apilado" en el inicio.
 *
 * MOBILE: se fijan video e histórica. La descarga y la trama NO se fijan
 * porque su contenido puede ser más alto que el viewport (la trama al
 * desplegar "Marco General", la descarga por su bajada de 3 párrafos) y
 * fijarlas recorta lo de abajo antes de poder scrollear hasta ahí.
 * DESKTOP (md+): las 4 quedan fijas con un "escenario" de alto ~pantalla
 * visible (se resta header + franja + padding del shell: 142px md / 194px lg);
 * la siguiente sube y se monta encima.
 *
 * Común a todas:
 *   - CARD: sombra superior + esquinas de arriba redondeadas (md) al MISMO
 *     radio que el panel del shell (rounded-2xl) para que coincidan.
 *   - TOP: la misma separación superior (32px / 48px). En documento y rueda se
 *     neutraliza el padding-top propio del bloque interno para igualar el total.
 *
 * Para revertir: sacar CARD, PIN y STAGE de los wrappers y volver
 * `md:bg-transparent` en rueda/historia.
 */
const CARD = "relative shadow-[0_-14px_40px_-24px_rgba(73,73,99,.32)] md:rounded-t-2xl";
const STAGE =
  "md:min-h-[calc(var(--app-vh,100svh)_-_142px)] lg:min-h-[calc(var(--app-vh,100svh)_-_194px)]";
const PIN_ALL = `sticky top-0 ${STAGE}`;
const PIN_MD = `md:sticky md:top-0 ${STAGE}`;
const TOP = "pt-8 md:pt-12";

export default function HomePage() {
  return (
    <div className="bg-white">
      <div id="presentacion" className={`${CARD} ${PIN_ALL} ${TOP} z-0 bg-white`}>
        <VideoEmbed videoId="eu8CYPbjehE" title="Presentación Diseño Curricular de la Provincia de Santa Fe" topClassName="!pt-0" />
      </div>
      <div id="documento" className={`${CARD} ${PIN_MD} ${TOP} z-10 bg-white md:[&>section]:!pt-0`}>
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
      <div id="rueda" className={`${CARD} ${PIN_MD} ${TOP} z-20 bg-[#F1F1F4] md:bg-white md:[&>section]:!pt-0`}><CurricularWheel /></div>
      <div id="historia" className={`${CARD} ${PIN_ALL} v3-section !px-0 !pb-0 !pt-8 md:!px-[14px] md:!pb-[14px] md:!pt-12 z-30 bg-[#F3F3F5] md:bg-white`}><div className="overflow-hidden rounded-none bg-[#F3F3F5] md:rounded-2xl"><TimelineSection /></div></div>
    </div>
  );
}
