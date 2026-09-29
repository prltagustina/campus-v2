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
    // flex flex-col + min-h-full: cuando el contenido entra en la pantalla
    // sin necesitar scroll, la última sección (línea histórica) estira su
    // "flex-1" hasta el borde inferior real del panel — la misma línea en la
    // que termina el botón de EIB del rail — en vez de terminar más arriba
    // y dejar un espacio en blanco desparejo contra el rail.
    <div className="flex min-h-full flex-col bg-white">
      <div id="presentacion">
        {/* Arriba sin padding (el video arranca a la misma altura en la que
           empieza el botón "Inicio" del rail). A los lados y abajo, el mismo
           inset que la sección de descarga de acá abajo (DocumentoHero usa
           v3-section !p-0 md:!p-[14px]), para que los dos midan igual. */}
        <VideoEmbed
          videoId="eu8CYPbjehE"
          title="Presentación Diseño Curricular de la Provincia de Santa Fe"
          topClassName="!pt-0"
          className="!px-0 !pb-0 md:!px-[14px] md:!pb-0"
          mediaClassName="rounded-none md:rounded-2xl"
        />
      </div>
      {/* pt-12/md:pt-16: más aire que el resto de los saltos de Inicio (que
         usan pt-8/md:pt-10) porque acá son dos bloques oscuros y grandes uno
         pegado al otro (el video y la tarjeta violeta de descarga) — con el
         mismo valor que los demás se seguía sintiendo muy junto. */}
      <div id="documento" className="pt-12 md:pt-16">
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
      {/* pt-8/md:pt-10: mismo espacio en estas dos transiciones (acá y antes
         de la línea histórica) — la de arriba (video→documento) es la única
         distinta, ver comentario de "documento". */}
      <div id="rueda" className="bg-[#F1F1F4] pt-8 md:bg-transparent md:pt-10"><CurricularWheel /></div>
      {/* flex + flex-1: el pt-8/md:pt-10 (mismo espacio que la transición de
         acá arriba) y el md:!pb-[14px] quedan FUERA del contenido que se
         centra — son el mismo margen fijo que ya tenían, no se estiran.
         Lo que crece (si sobra alto) es el m-auto de adentro, repartiendo el
         extra en partes iguales arriba y abajo del propio contenido. */}
      <div id="historia" className="v3-section flex flex-1 flex-col !px-0 !pb-0 !pt-8 bg-[#F3F3F5] md:!px-[14px] md:!pb-[14px] md:!pt-10 md:bg-transparent">
        <div className="m-auto w-full overflow-hidden rounded-none bg-[#F3F3F5] md:rounded-2xl"><TimelineSection /></div>
      </div>
    </div>
  );
}
