/* ─────────────────────────────────────────────
 * Contenidos de cada secuencia, para «Ver contenidos» en las tarjetas con
 * portada de los repositorios (pedido de Visuales Curricular, 2026-11-24).
 * El popover muestra cada eje con su bajada (los contenidos), como el diseño
 * de Visuales Curricular (2026-11-25).
 * Simulación para mostrar al Ministerio: las listas están tomadas del
 * apartado «Contenidos» de cada PDF (relevado el 2026-11-25), con los
 * subítems unidos a su ítem. Ciencias Sociales 4°, de la propuesta de Agu.
 * Articulación no tiene ese apartado: van las técnicas de estudio
 * (estudiantes) y los cuatro ejes de cada secuencia (docentes), tal como los
 * presenta cada cuadernillo.
 * ───────────────────────────────────────────── */

export interface EjeContenidos {
  eje: string;
  items?: string[];
}

export interface ContenidosSecuencia {
  /** Nombre de la secuencia, cuando la tarjeta lleva otro (Matemática). */
  secuencia?: string;
  ejes: EjeContenidos[];
}

/* ── Matemática: un eje por cuadernillo (lib/matematica-secuencias.ts) ── */
export const contenidosMatematica: Record<string, string[]> = {
  "1ro-n1": [
    "El uso de números naturales de una, dos y más cifras, a través de su designación oral y representación escrita, al determinar y comparar cantidades y posiciones.",
    "El conteo de cantidades más o menos numerosas a través del recitado de una porción significativa de la serie numérica en escalas, ascendentes y descendentes, de 1 en 1 y de 10 en 10.",
    "Las composiciones y descomposiciones aditivas equivalentes de números mayores que 10 como suma de múltiplos de 10 más un dígito (Ej. 23 = 10 + 10 + 3 = 20 + 3).",
    "El reconocimiento y uso de las regularidades en la serie numérica y análisis del valor posicional en distintos contextos al leer, nombrar, escribir y comparar números de una, dos y más cifras y al operar con ellos.",
    "El uso de la calculadora para el análisis del valor de una cifra según la posición que ocupa en el número.",
  ],
  "1ro-n1-1": [
    "Construcción y uso progresivo de un repertorio memorizado de resultados de sumas y restas: sumas que dan 10, sus restas asociadas y complementos a 10; sumas de dígitos iguales.",
    "Construcción de variados procedimientos de cálculo de sumas y restas basados en descomposiciones aditivas, centrados en el cálculo horizontal y en las propiedades conmutativa y asociativa de la adición.",
  ],
  "1ro-n1-2": [
    "Exploración, reconocimiento y comparación de las características de las figuras planas como cantidad de lados, cantidad de vértices, lados rectos y curvos, cantidad de lados iguales, mediante tareas como: reflexión del copiado con modelo presente, composición de figuras a partir de otras dadas, descripción oral y escrita (juegos de adivinanzas, producción de mensajes, producción de conjeturas y análisis de afirmaciones dadas argumentando su validez).",
    "Elaboración de diversos agrupamientos de figuras de acuerdo a algunas características comunes.",
  ],
  "1ro-n1-3": [
    "Construcción de variados procedimientos de cálculo de sumas y restas basados en descomposiciones aditivas, centrados en el cálculo horizontal y en las propiedades conmutativa y asociativa de la adición.",
    "Adición y sustracción con distintos significados: de composición (reunir, separar), de transformación (agregar, avanzar, ganar, quitar, retroceder, perder).",
  ],
  "2do-n1": [
    "La adición y la sustracción con distintos significados.",
    "La construcción y el uso progresivo de un repertorio memorizado de resultados de sumas y restas: sumas de decenas enteras que dan 100, restas asociadas y complementos a 100, sumas de centenas enteras y un número cualquiera de una o dos cifras y sus restas asociadas.",
    "El uso y análisis de variados procedimientos de cálculos de sumas y restas, basados en las propiedades conmutativa y asociativa de la adición.",
  ],
  "2do-n1-1": [
    "Exploración, reconocimiento y comparación de las características de las figuras planas como cantidad de lados, cantidad de vértices, lados rectos y curvos, cantidad de lados iguales, mediante tareas como: reflexión del copiado con modelo presente, descripción oral y escrita (producción de mensajes, producción de conjeturas y análisis de afirmaciones dadas argumentando su validez).",
    "Elaboración de diversos agrupamientos de figuras de acuerdo a algunas características comunes.",
  ],
  "2do-n1-2": [
    "El reconocimiento y uso de las regularidades en la serie numérica y el análisis del valor posicional en distintos contextos al leer, nombrar, escribir y comparar números de una, dos, tres y más cifras y al operar con ellos.",
  ],
  "2do-n1-3": [
    "Multiplicación y división con distintos significados: proporcionalidad directa simple, incluidos los de organización rectangular; reparto equitativo, partición y análisis del resto en situaciones que admitan diferentes procedimientos: gráficos, reparto uno a uno, sumas o restas reiteradas, cálculos mentales.",
    "Expresión simbólica de las acciones realizadas (x, :, =).",
    "Construcción y uso progresivo de un repertorio memorizado de multiplicaciones y divisiones para resolver otros cálculos (dobles y mitades, triples y tercios, por 5 y por 10).",
  ],
  "3ro-n1": [
    "El reconocimiento y comparación de las características de figuras planas como cantidad de lados, cantidad de vértices, lados rectos y curvos, cantidad de lados iguales, presencia de diagonales, mediante diversas tareas geométricas.",
    "El uso de la regla y la escuadra para el copiado o construcción de figuras.",
  ],
  "3ro-n1-1": [
    "Adición y sustracción con distintos significados: de transformación (búsqueda del estado inicial, incógnita en la transformación, combinación de transformaciones) y de relación (comparar dos cantidades, establecer la diferencia entre dos colecciones), por medio de diferentes estrategias y de una posterior comparación.",
    "Construcción y uso progresivo de un repertorio memorizado de resultados de sumas y restas para resolver otros cálculos: sumas de centenas enteras que dan 1.000, restas asociadas y complementos a 1.000, sumas de centenas enteras y sus restas asociadas.",
  ],
  "3ro-n1-2": [
    "Multiplicación y división con distintos significados: proporcionalidad directa simple, incluidos los de organización rectangular.",
    "Construcción y uso progresivo de un repertorio memorizado de resultados de multiplicaciones y divisiones por 10, por 100 y por 1000 y otros construidos a partir de ellos.",
    "Resolución de cálculos sencillos con la calculadora para construir, validar y usar variadas estrategias de cálculo para sumar, restar, multiplicar y dividir.",
  ],
  "3ro-n1-3": [
    "Uso de números naturales de una, dos, tres, cuatro y más cifras, a través de su designación oral y representación escrita, al comparar cantidades.",
    "Composiciones y descomposiciones aditivas y multiplicativas de números de cuatro cifras (Ejemplo: 2.345 = 2.000 + 300 + 40 + 5 = 2x1.000 + 3x100 + 4x10 + 5x1).",
    "Análisis del valor de una cifra según la posición que ocupa en el número a través de la calculadora.",
    "Interpretación de información recolectada con encuestas simples (variables cualitativas y cuantitativas discretas) y presentada en diferentes soportes (imágenes, tablas, gráfico de barras, pictogramas).",
  ],
  "4to-n1": [
    "La multiplicación y la división con el significado de proporcionalidad directa.",
    "Repertorio memorizado de multiplicaciones y divisiones y relaciones entre los productos de la tabla pitagórica.",
    "Propiedades conmutativa y asociativa de la adición y multiplicación, y de la propiedad distributiva de la multiplicación respecto a la adición y sustracción (en esta secuencia sólo se desarrolla la propiedad distributiva con respecto a la adición).",
  ],
  "4to-n1-1": [
    "Reconocimiento y comparación de las propiedades de rectángulos, cuadrados y rombos: posición relativa de sus lados, cantidad de lados iguales, presencia o ausencia de ángulos rectos, posición relativa, longitud y ubicación del punto de intersección de las diagonales, mediante la reflexión del copiado y comunicación.",
    "Construcción de rectángulos, cuadrados y rombos explorando la unicidad y la posibilidad de construcción a partir de los datos dados y usando distintos instrumentos geométricos y/o software pertinente.",
  ],
  "5to-n1": [
    "La construcción de las nociones de circunferencia y círculo como lugar geométrico.",
    "La construcción de triángulos, con regla, escuadra, compás y transportador, explorando la unicidad y las condiciones que hacen posible su construcción. Propiedad triangular.",
    "La elaboración de la clasificación de triángulos considerando dos propiedades comunes: la longitud de sus lados y la amplitud de sus ángulos (en esta secuencia se aborda únicamente la clasificación según la longitud de sus lados).",
  ],
  "5to-n1-1": [
    "Multiplicación y división, analizando sus propiedades y su significado en la proporcionalidad directa, incluyendo fracciones y números decimales en una de las cantidades que se relacionan.",
    "División con el significado de reparto y partición: análisis del resto y evaluación de la razonabilidad del resultado.",
    "Uso y explicitación de las propiedades conmutativa y asociativa de la adición y de la multiplicación y de la propiedad distributiva de la multiplicación respecto a la adición y la sustracción para fundamentar procedimientos de cálculos.",
    "Uso de diferentes repertorios de productos memorizados y de la propiedad distributiva de la multiplicación respecto a la adición para construir diversos algoritmos de multiplicación por números de una y más cifras.",
  ],
  "6to-n1": [
    "La proporcionalidad directa: el porcentaje como una constante de proporcionalidad.",
    "Equivalencias entre distintas expresiones fraccionarias, decimales y porcentuales.",
    "El análisis de descuentos, promociones y opciones de financiación, mediante la interpretación de tablas o folletos y el cálculo de porcentajes para evaluar su conveniencia según el precio final, los plazos y otras condiciones.",
  ],
  "6to-n1-1": [
    "División con el significado de iteración en situaciones resueltas por medio del uso del cociente y el resto.",
    "Análisis de la relación entre dividendo (D), divisor (d), cociente (c) y resto (r): D = d × c + r, r < d.",
  ],
  "7mo-n1": [
    "Reconocimiento de situaciones de proporcionalidad directa, inversa y de aquellas que no lo son, representadas de distintos modos. Formulación de conjeturas sobre sus características. Análisis y argumentación de su validez.",
    "La formulación y validación de conjeturas acerca de la variación de perímetros y áreas en función de la variación de diferentes dimensiones.",
    "Análisis y descripción de distintos modos de representación de relaciones entre dos variables: registro coloquial, tabular y gráfico; y conversión entre estas representaciones para poder interpretar las relaciones.",
  ],
  "7mo-n1-1": [
    "Exploración y análisis de regularidades para la producción de fórmulas vinculadas al problema de conteo de colecciones e interpretación y análisis de validez de otras ya elaboradas.",
    "Exploración y análisis de regularidades sobre la suma de los ángulos interiores de un polígono convexo avanzando desde los triángulos a los polígonos de más lados.",
    "Formulación y validación de conjeturas acerca de la variación de perímetros y áreas en función de la variación de diferentes dimensiones de figuras regulares, rectángulos y triángulos isósceles (en esta secuencia no se aborda la variación del área).",
  ],
};

/* ── Secuencias de las otras áreas ── */
export const contenidosCienciasSociales4to: ContenidosSecuencia = {
  ejes: [
    {
      eje: "Las sociedades en el tiempo. Cambios y continuidades.",
      items: [
        "El territorio argentino a través de la cartografía histórica. Cambios y continuidades.",
        "Conquista y ocupación del actual territorio argentino: fundación de Santa Fe y su traslado al sitio actual.",
        "La ciudad colonial: instituciones, jerarquías sociales, mestizajes, sistemas de trabajo forzado.",
        "Distintas fuentes de información primarias y secundarias: escritas, gráficas, cartográficas, orales, audiovisuales.",
      ],
    },
  ],
};

export const contenidosCienciasNaturales5to: ContenidosSecuencia = {
  ejes: [
    {
      eje: "Los seres vivos: unidad, diversidad, interacciones y cambios",
      items: [
        "Alimentación humana. Alimentación y cultura. Distinción entre comida, alimento y nutriente. Guías alimentarias para la población argentina. Seguridad alimentaria.",
        "La salud como construcción social en el contexto actual. Acciones de promoción y prevención de la salud.",
        "El laboratorio escolar de Ciencias Naturales: uso de instrumental bajo supervisión guiada: vaso de precipitados, frascos, cuchara, pinza.",
      ],
    },
    {
      eje: "Materiales: composición, propiedades y cambios",
      items: ["Mezclas homogéneas y mezclas heterogéneas."],
    },
  ],
};

const EF_UNO_MISMO = "Prácticas corporales motrices y ludomotrices referidas al conocimiento y a la disponibilidad de uno mismo";
const EF_CON_OTROS = "Prácticas corporales motrices y ludomotrices en interacción con otras personas";

export const contenidosEducacionFisica1ro: ContenidosSecuencia = {
  ejes: [
    {
      eje: EF_UNO_MISMO,
      items: [
        "Conciencia del esquema corporal: el cuerpo y sus partes: sentimiento, pensamiento y acción.",
        "Ubicación del cuerpo en el espacio: nociones topológicas, proyectivas y euclidianas.",
        "Orientación y organización del tiempo: sucesión y duración.",
        "Habilidades motoras básicas de carácter polivalente.",
      ],
    },
    {
      eje: EF_CON_OTROS,
      items: ["Juegos simbólicos: con intención socializante (experimentación de roles, situaciones y acuerdos)."],
    },
  ],
};

export const contenidosEducacionFisica4to: ContenidosSecuencia = {
  ejes: [
    {
      eje: EF_UNO_MISMO,
      items: [
        "Habilidades motoras de transición de carácter variable con predominio de acciones coordinativas.",
        "Capacidades motoras coordinativas y condicionales necesarias para poder jugar.",
      ],
    },
    {
      eje: EF_CON_OTROS,
      items: [
        "Juegos reglados y actividades con intención socializante que requieran acuerdos y modificaciones.",
        "Juegos motores con carácter polivalente o multilateral de iniciación deportiva y otras prácticas específicas con sentido inclusivo.",
      ],
    },
  ],
};

export const contenidosArtesVisuales1ro: ContenidosSecuencia = {
  ejes: [
    {
      eje: "Apreciación",
      items: [
        "Percepción de entornos cercanos (la escuela, el barrio, la casa) mediante la vista, el tacto, el desplazamiento, el oído y/o el olfato.",
        "Manifestación de ideas y sensaciones sobre las propias producciones y las de pares.",
      ],
    },
    {
      eje: "Artes visuales en contexto",
      items: [
        "Las obras de arte en contextos cotidianos. Reconocimiento de pinturas y esculturas en la vía pública, reproducciones de obras en el entorno familiar, producciones infantiles y/o artísticas en la escuela, entre otros.",
      ],
    },
    {
      eje: "Producción visual",
      items: [
        "Características y posibilidades de las formas (grandes, pequeñas, abiertas y cerradas, alargadas, redondeadas y angulosas o rectilíneas). Creación de formas mediante manchas, recortes, trazos y/o estampados.",
        "Exploración de las relaciones entre las formas y el espacio que las contiene: variaciones en la cantidad, posición y ubicación (juntas, distanciadas, superpuestas, arriba, abajo, etcétera).",
        "Exploración y resignificación de pequeños y medianos espacios, objetos y elementos naturales, mediante la creación de pequeñas instalaciones. Reconocimiento y uso de espacios abiertos, cerrados, ocupados, vacíos.",
      ],
    },
  ],
};

export const contenidosMusica5to: ContenidosSecuencia = {
  ejes: [
    {
      eje: "Músicas en contexto",
      items: [
        "Las músicas de la Región Litoral: el chamamé. Características relevantes de sus poéticas, autorías, instrumentos, estructuras rítmicas y formales y aportes del pueblo guaraní.",
        "Reconocimiento de las producciones musicales del ritmo del chamamé desde las personas que realizan interpretaciones, versiones y composiciones musicales del folclore argentino.",
      ],
    },
    {
      eje: "Apreciación",
      items: [
        "Escucha de la Leyenda de la Yerba Mate; apreciación y reconocimiento del ritmo de chamamé desde los rasgos birrítmicos 6/8 y 3/4; discriminación e identificación de la conformación instrumental tradicional, aspectos formales y poéticos.",
        "Apreciación de otras especies musicales del Litoral.",
      ],
    },
    {
      eje: "Producción musical",
      items: [
        "Interpretación vocal del chamamé El mate y la luna usando la expresividad de la voz en la ejecución: ajuste tonal en la afinación y atención a dinámicas, entradas y cierres en la producción colectiva.",
        "Ejecución corporal concertada atendiendo las características propias del chamamé: birritmia 6/8 y 3/4, acentuaciones, forma musical, entre otros.",
      ],
    },
  ],
};

/** La misma secuencia (y los mismos contenidos) en los cinco idiomas. */
export const contenidosLenguasExtranjeras: ContenidosSecuencia = {
  ejes: [
    {
      eje: "Lectura",
      items: [
        "Reconocimiento y uso, gradualmente autónomo, de imágenes, íconos y otros paratextos como soporte para la comprensión.",
        "Lectura de textos en la lengua extranjera o plurilingües con la docencia como posibilidad de aprender, disfrutar, emocionarse, conocer otras culturas y reflexionar sobre la propia (fichas técnicas, adivinanzas, consignas, etc.).",
        "Reconocimiento de palabras cortas y conocidas en textos breves.",
      ],
    },
    {
      eje: "Escritura",
      items: [
        "Producción de textos en la lengua extranjera o bilingües, colaborativos e individuales (fichas técnicas, perfiles, entre otros).",
        "Uso de todo el repertorio lingüístico (la lengua extranjera, la lengua de escolarización y otras lenguas conocidas) como medio para resolver tareas y situaciones de la escritura.",
      ],
    },
    {
      eje: "Oralidad",
      items: [
        "Reconocimiento y uso gradual de frases rutinarias simples y vocabulario relacionado al entorno personal, familiar, escolar y comunitario.",
        "Comprensión de preguntas personales y sobre el entorno físico cercano y formulación de respuestas relevantes breves.",
      ],
    },
    {
      eje: "Reflexión sobre la lengua que se aprende",
      items: [
        "Inicio en el reconocimiento de las características principales de los géneros textuales abordados.",
        "Inicio en el reconocimiento de las categorías de género y número en sustantivos y pronombres en la lengua extranjera en el marco de enunciados relevantes.",
        "Inicio en el reconocimiento de palabras similares entre la lengua extranjera y el español en el marco de campos léxicos conocidos.",
      ],
    },
    {
      eje: "Reflexión intercultural",
      items: [
        "Reconocimiento de las diferentes lenguas y variedades del español presentes en la comunidad, la región y el mundo y respeto por la diversidad y las singularidades de las personas.",
        "Involucramiento progresivo en actividades de observación, comparación, contraste, análisis, interacción, reflexión y descentramiento (ponerse en el lugar del otro) a partir de historias de vida, reales o ficcionales, y descripciones de eventos y procesos culturales de las comunidades (locales y extranjeras).",
      ],
    },
  ],
};

/* ── Articulación Primaria-Secundaria («¡Aprender a estudiar!») ── */
export const contenidosArticulacionEstudiantes: ContenidosSecuencia = {
  ejes: [
    { eje: "Esquemas y mapas conceptuales" },
    { eje: "Subrayado" },
    { eje: "Claves para entender el texto" },
    { eje: "Línea de tiempo" },
  ],
};

export const contenidosArticulacionDocentes: ContenidosSecuencia = {
  ejes: [
    { eje: "Comenzamos", items: ["Un trabajo metacognitivo que permita anticipar sentidos y reflexionar sobre el propio proceso de lectura."] },
    { eje: "Comprendemos", items: ["Actividades de comprensión textual graduadas en dificultad (vocabulario, jerarquización, inferencias, intuición lectora)."] },
    { eje: "¡A escribir!", items: ["Producción de textos breves a partir de lo trabajado, para consolidar la comprensión y ejercitar la expresión escrita."] },
    { eje: "Técnicas de estudio", items: ["Organización de la información y elaboración de recursos personales de aprendizaje, como mapas conceptuales, esquemas o material gráfico de síntesis."] },
  ],
};
