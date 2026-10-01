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
      {/* sticky top-0 + z-index creciente (presentación < documento < rueda <
         historia): cada sección queda pegada arriba mientras la siguiente la
         tapa al scrollear, apilándose como tarjetas - sin bordes/sombras
         nuevas (el "apilado" lo da el propio scroll, no un estilo agregado).
         Sin padding-top propio en ninguna de las stickeadas (se quitó el
         pt-6/pt-5/etc que tenían): con padding, al quedar pegada arriba
         dejaba un hueco vacío entre el borde de la ventana y el contenido
         (se notaba como "mal encastrada", no a la línea superior). bg-white
         en las dos primeras: sin fondo propio, dejaban ver lo que quedaba
         pegado debajo por el padding lateral mientras están stuck.
         Ninguna de las stickeadas tiene overflow/max-h propio ni en un hijo
         (se probaron las dos formas): position:sticky + overflow:auto, ya
         sea en el MISMO elemento o en un hijo adentro, termina rompiendo el
         sticky en mobile real o tapando botones de forma inconsistente
         entre navegadores - nada de scroll de respaldo acá. En cambio, el
         contenido de "documento" se achicó lo necesario (ver
         .documento-hero--compact en globals.css) para entrar siempre sin
         scroll en una pantalla de celular real, y "rueda" apoya solo en el
         scroll propio de su acordeón (wheel-accordion--scroll en
         globals.css), que NO es sticky — un descendiente no-sticky con su
         propio scroll no tiene ese problema.
         "historia" usa relative (no sticky): no necesita quedar pegada (es
         la última, nada la tapa a ella) - pero sí necesita estar
         posicionada (con z-index propio) para pintarse ARRIBA de "rueda" al
         taparla; un hermano sin position siempre se pinta DEBAJO de uno con
         position, sin importar el orden en el DOM - además, al ser la
         última, con sticky se liberaba casi al instante en vez de quedar
         pegada un buen tramo (caso límite de cuando no hay nada después que
         la empuje). */}
      <div id="presentacion" className="sticky top-0 z-10 bg-white">
        {/* Sin overrides de padding lateral/inferior ni de esquinas (antes iba
           pegado a los bordes en mobile, sin redondear): mismo tratamiento
           que el video de "Presentación audiovisual" en cada área. Sí se
           pisa el padding superior en desktop (md:!pt-0, no el !pt-[14px]
           por default): tiene que arrancar a la misma altura que el botón
           "Inicio" del rail, si no queda más abajo. */}
        <VideoEmbed
          videoId="eu8CYPbjehE"
          title="Presentación Diseño Curricular de la Provincia de Santa Fe"
          topClassName="!pt-4 md:!pt-0"
        />
      </div>
      <div id="documento" className="sticky top-0 z-20 bg-white">
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
      <div id="rueda" className="sticky top-0 z-30 bg-[#F1F1F4] md:bg-transparent"><CurricularWheel /></div>
      <div id="historia" className="v3-section relative z-40 !px-0 !pb-0 !pt-0 bg-[#F3F3F5] md:!px-[14px] md:!pb-[14px] md:!pt-0 md:bg-transparent">
        <div className="w-full overflow-hidden rounded-none bg-[#F3F3F5] md:rounded-2xl"><TimelineSection /></div>
      </div>
    </div>
  );
}
