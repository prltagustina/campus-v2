export interface SubArea {
  id: string;
  name: string;
  description: string;
  axes: string[];
}

export interface TeacherTraining {
  id: string;
  name: string;
  items?: {
    id: string;
    name: string;
    url?: string;
  }[];
}

export interface Area {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  color: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  halfWheelImage?: string;
  bulletPoints?: string[];
  axes?: string[];
  subareas?: SubArea[];
  teacherTrainings?: TeacherTraining[];
}

export const areasData: Area[] = [
  {
    id: 0,
    slug: "matematica",
    name: "Matemática",
    shortDescription: "Resolución de problemas y pensamiento matemático",
    fullDescription:
      "La enseñanza de la matemática se concibe como una práctica social, reflexiva y accesible a todas las infancias. Las y los estudiantes se involucran en quehaceres matemáticos: resuelven problemas, exploran, representan, argumentan, comunican y validan ideas; construyen saberes de manera progresiva en relación con distintos contextos.\n\nLa enseñanza se organiza en torno a la resolución de problemas como eje central. La docencia diseña secuencias que promueven la participación, es mediadora en los procesos de resolución y recupera colectivamente lo aprendido para construir significados compartidos.",
    color: "#E42153",
    gradient: "linear-gradient(135deg, #E42153 0%, #B159A7 100%)",
    gradientFrom: "#E42153",
    gradientTo: "#B159A7",
    axes: [
      "Números y operaciones",
      "Estadística y probabilidades",
      "Iniciación al álgebra y funciones",
      "Geometría y medida",
    ],
    teacherTrainings: [
      {
        id: "mat-form-1",
        name: "Matemática",
        items: [
          { id: "mat-1", name: "Matemática 1er grado" },
          { id: "mat-2", name: "Matemática 2do grado" },
          { id: "mat-3", name: "Matemática 3er grado" },
          { id: "mat-4", name: "Matemática 4to grado" },
          { id: "mat-5", name: "Matemática 5to grado" },
          { id: "mat-6", name: "Matemática 6to grado" },
          { id: "mat-7", name: "Matemática 7mo grado" },
        ],
      },
      {
        id: "diversificacion",
        name: "Diversificación para la Enseñanza",
        items: [
          { 
            id: "div-1", 
            name: "Diversificación para la Enseñanza",
            url: "https://campuseducativo.santafe.edu.ar/diversificacion-para-la-ensenanza/"
          },
        ],
      },
    ],
  },
  {
    id: 1,
    slug: "lengua-y-literatura",
    name: "Lengua y Literatura",
    shortDescription: "Prácticas sociales del lenguaje y literatura",
    fullDescription:
      "El área enseña la lengua y la literatura como prácticas sociales, reflexivas y contextualizadas. Las y los estudiantes desarrollan capacidades para: comunicarse oralmente con claridad; leer con fluidez y sentido crítico distintos tipos de textos; escribir con una actitud reflexiva; analizar el funcionamiento de la lengua; y comprender la literatura como manifestación artística y cultural.\n\nLa enseñanza se organiza mediante una planificación espiralada, articulando ejes y contenidos en propuestas progresivas, situadas y significativas.",
    color: "#FF7402",
    gradient: "linear-gradient(135deg, #FF7402 0%, #B159A7 100%)",
    gradientFrom: "#FF7402",
    gradientTo: "#B159A7",
    axes: [
      "Oralidad",
      "Escritura",
      "Lectura",
      "Conocimiento y reflexión sobre la lengua y los textos",
      "Literatura",
    ],
    teacherTrainings: [
      {
        id: "lyl-form-1",
        name: "Lengua y Literatura",
        items: [
          { id: "lyl-1", name: "Alfabetización inicial" },
          { id: "lyl-2", name: "Lectura y comprensión" },
          { id: "lyl-3", name: "Escritura creativa" },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "ciencias-naturales",
    name: "Ciencias Naturales",
    shortDescription: "Comprensión de fenómenos naturales y científicos",
    fullDescription:
      "El área posibilita la comprensión de fenómenos químicos, físicos y biológicos, promoviendo la toma de decisiones responsables sobre el cuidado de la salud, el ambiente y la relación con los bienes que nos brinda la naturaleza.\n\nLas actividades experimentales simples (AES) son fundamentales para el área. Además, mediante el aprendizaje basado en proyectos (ABP), el aprendizaje basado en el juego (ABJ), las salidas escolares y otras metodologías de enseñanza en contexto, las y los estudiantes exploran su entorno, comprenden fenómenos y fortalecen el pensamiento crítico, la comunicación y el trabajo colaborativo.",
    color: "#78BB0B",
    gradient: "linear-gradient(135deg, #78BB0B 0%, #B159A7 100%)",
    gradientFrom: "#78BB0B",
    gradientTo: "#B159A7",
    axes: [
      "Los seres vivos: unidad, diversidad, interacciones y cambios",
      "Materiales: composición, propiedades y cambios",
      "Los fenómenos del mundo físico: movimiento, fuerzas, energía, luz y sonido",
      "La Tierra, el universo y sus cambios",
    ],
    teacherTrainings: [
      {
        id: "cn-form-1",
        name: "Ciencias Naturales",
        items: [
          { id: "cn-1", name: "Actividades experimentales simples" },
          { id: "cn-2", name: "Aprendizaje basado en proyectos" },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "ciencias-sociales",
    name: "Ciencias Sociales",
    shortDescription: "Comprensión de la realidad social e histórica",
    fullDescription:
      "El área propone acercar la realidad social a las infancias para formar ciudadanos y ciudadanas capaces de comprender y transformar su entorno. La realidad social es compleja, dinámica y conflictiva, y su estudio requiere considerar a los actores sociales y sus experiencias históricas.\n\nLa enseñanza se organiza mediante recortes didácticos que permiten abordar esa complejidad desde preguntas o proyectos que movilizan, orientan el recorrido y promueven la autonomía y el pensamiento crítico.",
    color: "#99CCFF",
    gradient: "linear-gradient(135deg, #99CCFF 0%, #B159A7 100%)",
    gradientFrom: "#99CCFF",
    gradientTo: "#B159A7",
    axes: [
      "Las sociedades y la construcción de espacios",
      "Las sociedades en el tiempo. Cambios y continuidades",
      "Las sociedades, la vida cotidiana y las prácticas culturales",
    ],
    teacherTrainings: [
      {
        id: "cs-form-1",
        name: "Ciencias Sociales",
        items: [
          { id: "cs-1", name: "Recortes didácticos" },
          { id: "cs-2", name: "Trabajo por proyectos" },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "educacion-fisica",
    name: "Educación Física",
    shortDescription: "Desarrollo motriz y prácticas corporales",
    fullDescription:
      "Las situaciones de enseñanza de Educación Física para la Educación Primaria se configuran en contenidos que dialogan con la corporeidad, la corporalidad y la motricidad y se encuentran organizados y secuenciados en un recorrido por ciclos y grados.\n\nHabilita y diversifica todas las prácticas corporales y motrices y las considera bienes culturales. Reconoce el juego y el jugar como contenidos necesarios en todos los ciclos y valora el deporte de la escuela.",
    color: "#20BAA1",
    gradient: "linear-gradient(135deg, #20BAA1 0%, #B159A7 100%)",
    gradientFrom: "#20BAA1",
    gradientTo: "#B159A7",
    halfWheelImage: "/images/half-wheel-educacion-fisica.png",
    axes: [
      "Prácticas corporales motrices y ludomotrices referidas al conocimiento y disponibilidad de sí mismo",
      "Prácticas corporales motrices y ludomotrices en interacción con otras personas",
      "Prácticas corporales motrices y ludomotrices en interacción con el ambiente",
    ],
    teacherTrainings: [
      {
        id: "ef-form-1",
        name: "Educación Física",
        items: [
          { id: "ef-1", name: "Prácticas corporales y motrices" },
          { id: "ef-2", name: "Juego y deporte escolar" },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "educacion-artistica",
    name: "Educación Artística",
    shortDescription: "Desarrollo creativo y expresivo en las artes",
    fullDescription:
      "El área ofrece propuestas que posibilitan desarrollar aprendizajes creativos, expresivos, críticos y simbólicos en diversos entornos en clave intercultural y desde un enfoque inclusivo. Así mismo, favorece el contacto con el patrimonio artístico local y mundial desde la promoción de la pregunta, el intercambio con pares y con artistas y agentes culturales y la mediación de manifestaciones creativas y estéticas.",
    color: "#FF6D7E",
    gradient: "linear-gradient(135deg, #FF6D7E 0%, #B159A7 100%)",
    gradientFrom: "#FF6D7E",
    gradientTo: "#B159A7",
    axes: [
      "Artes en contexto",
      "Apreciación",
      "Producción",
    ],
    subareas: [
      {
        id: "artes-visuales",
        name: "Artes Visuales",
        description:
          "El área aborda el estudio de las manifestaciones visuales y los conocimientos vinculados al lenguaje visual, sus disciplinas, procedimientos y contextos de producción y exhibición.\n\nMediante propuestas que estimulan la curiosidad, la imaginación y la percepción multisensorial, las y los estudiantes amplían sus miradas, superan estereotipos y desarrollan procesos de simbolización.",
        axes: [
          "Producción visual",
          "Apreciación",
          "Artes Visuales en contexto",
        ],
      },
      {
        id: "musica",
        name: "Música",
        description:
          "El área propone que las infancias aprendan a escuchar, cantar, interpretar, sonorizar y crear desde el hacer musical individual y colectivo. Las experiencias se organizan en torno a la contextualización, apreciación y producción musical.\n\nSe trabaja con una diversidad de músicas: canciones, juegos sonoro-musicales, músicas corporales, instrumentales y sonoridades del entorno, para favorecer experiencias significativas y creativas.",
        axes: ["Músicas en contexto", "Apreciación", "Producción musical"],
      },
      {
        id: "artes-audiovisuales",
        name: "Artes Audiovisuales",
        description:
          "El área promueve la alfabetización audiovisual mediante el juego con imágenes y sonidos. Las infancias adquieren herramientas para apreciar, analizar y producir mensajes audiovisuales en distintos contextos.\n\nLa enseñanza articula tres componentes: visionado, análisis y producción, y favorece experiencias creativas en un clima inclusivo y plural.",
        axes: [
          "Artes audiovisuales en contexto",
          "Apreciación",
          "Producción audiovisual",
        ],
      },
      {
        id: "danza",
        name: "Danza",
        description:
          "El área propone que las infancias conozcan su cuerpo, exploren el movimiento poético y narren sus experiencias desde una sensibilidad que se construye en diálogo con los otros.\n\nLa enseñanza prioriza la exploración, el juego y el disfrute en un clima plural e inclusivo, que habilita expresiones genuinas y diversas en el movimiento.",
        axes: ["Danza en contexto", "Apreciación", "Producción en danza"],
      },
      {
        id: "teatro",
        name: "Teatro",
        description:
          "Teatro se propone como experiencia expresiva y colectiva. Las infancias representan historias ante sus pares y la comunidad educativa, explorando múltiples personajes (animales, objetos, emociones, identidades y otros).\n\nEl teatro se construye con los otros, en tiempo presente, mediante la interacción y la acción conjunta. Favorece la expresión, la imaginación, la construcción de sentido y la participación.",
        axes: ["Teatro en contexto", "Apreciación", "Producción teatral"],
      },
    ],
    teacherTrainings: [
      {
        id: "ea-form-1",
        name: "Educación Artística",
        items: [
          { id: "ea-1", name: "Artes en contexto" },
          { id: "ea-2", name: "Producción artística" },
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "lenguas-extranjeras",
    name: "Lenguas Extranjeras",
    shortDescription: "Aprendizaje intercultural de lenguas",
    fullDescription:
      "El diseño incorpora progresivamente la enseñanza de una lengua extranjera en toda la escolaridad primaria. Las escuelas pueden optar por Alemán, Francés, Inglés, Italiano o Portugués.\n\nDesde un enfoque intercultural y plurilingüe, el área contribuye a la construcción de identidades, al desarrollo cognitivo y a la alfabetización inicial y avanzada. Prioriza propuestas basadas en el juego, el trabajo por proyectos y la reflexión sobre la lengua propia y la lengua extranjera.",
    color: "#FFCB02",
    gradient: "linear-gradient(135deg, #FFCB02 0%, #B159A7 100%)",
    gradientFrom: "#FFCB02",
    gradientTo: "#B159A7",
    axes: [
      "Lectura",
      "Escritura",
      "Oralidad",
      "Reflexión sobre la lengua que se aprende",
      "Reflexión intercultural",
    ],
    teacherTrainings: [
      {
        id: "le-form-1",
        name: "Lenguas Extranjeras",
        items: [
          { id: "le-1", name: "Enfoque intercultural y plurilingüe" },
          { id: "le-2", name: "Trabajo por proyectos" },
        ],
      },
    ],
  },
  {
    id: 7,
    slug: "educacion-tecnologica",
    name: "Educación Tecnológica",
    shortDescription: "Comprensión de procesos y sistemas tecnológicos",
    fullDescription:
      "El área aborda saberes que permiten analizar artefactos, sistemas y procesos técnicos: materiales y sus propiedades, transformaciones, operaciones y funciones, y la organización de procesos productivos y de sistemas de control.\n\nIncluye progresivamente saberes vinculados con sistemas basados en información y comunicación: uso de dispositivos computacionales, redes, lenguajes digitales, programación y robótica, junto con la reflexión sobre ciudadanía digital, seguridad y convivencia en entornos virtuales.\n\nSu enseñanza integra estrategias de exploración, indagación, juego, análisis de casos, trabajo por proyectos y enfoques interdisciplinarios como STEAM (Ciencia, Tecnología, Ingeniería, Arte y Matemática).",
    color: "#3C3AE5",
    gradient: "linear-gradient(135deg, #3C3AE5 0%, #B159A7 100%)",
    gradientFrom: "#3C3AE5",
    gradientTo: "#B159A7",
    axes: [
      "Los procesos tecnológicos",
      "Los medios técnicos",
      "Las tecnologías de la información y la comunicación",
      "La reflexión sobre la tecnología como proceso sociocultural",
    ],
    teacherTrainings: [
      {
        id: "educ-tec-form-1",
        name: "Educación Tecnológica",
        items: [
          {
            id: "et-1",
            name: "¿Ciencias de la Computación en la escuela? – Aportes para pensar su inclusión, desde la gestión escolar.",
            url: "https://campuseducativo.santafe.edu.ar/ciencias-de-la-computacion-en-la-escuela-aportes-para-pensar-su-inclusion-desde-la-gestion-escolar/",
          },
          {
            id: "et-2",
            name: "Desenchufados y en juego.",
            url: "https://campuseducativo.santafe.edu.ar/desenchufados-y-en-juego-programacion-inicial-para-el-aula_c1/",
          },
          {
            id: "et-3",
            name: "Conectados para Enseñar.",
            url: "https://campuseducativo.santafe.edu.ar/conectados-para-ensenar-la-programacion-y-su-didactica-en-entornos-digitales_c1/",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    slug: "saberes-vidas-y-mundos",
    name: "Saberes, Vidas y Mundos",
    shortDescription: "Área curricular flexible e integradora",
    fullDescription:
      "Es un área curricular flexible donde se reconfiguran las formas, los espacios y los tiempos para aprender, se habilitan agrupamientos integrados e interciclo y se promueve la participación activa de las infancias.\n\nAdopta una metodología basada en proyectos, en la que los contenidos de las áreas y de los enfoques transversales se articulan para abordar temáticas urgentes y actuales.",
    color: "#B159A7",
    gradient: "linear-gradient(135deg, #B159A7 0%, #B159A7 100%)",
    gradientFrom: "#B159A7",
    gradientTo: "#B159A7",
    axes: [
      "Integración de saberes curriculares y enfoques transversales",
      "Abordaje de temáticas urgentes y actuales",
      "Participación activa de las infancias",
    ],
    bulletPoints: [
      "Ciudadanía, Derechos Humanos y Participación (CDP)",
      "Educación Sexual Integral (ESI)",
      "Educación Intercultural (EI)",
      "Educación Ambiental Integral (EAI)",
      "Educación y Cultura Digital (ECD)",
    ],
    teacherTrainings: [
      {
        id: "svm-form-1",
        name: "Saberes, Vidas y Mundos",
        items: [
          {
            id: "svm-1",
            name: "Diseño, evaluación y comunicación de Aprendizaje Basado en Proyectos",
          },
        ],
      },
    ],
  },
];

export const enfoquesTransversales = [
  { id: "esi", name: "ESI", fullName: "Educación Sexual Integral", color: "#20BAA1" },
  { id: "ei", name: "EI", fullName: "Educación Intercultural", color: "#20BAA1" },
  { id: "cdyp", name: "CDyP", fullName: "Ciudadanía, Derechos Humanos y Participación", color: "#B159A7" },
  { id: "eai", name: "EAI", fullName: "Educación Ambiental Integral", color: "#B159A7" },
  { id: "ecd", name: "ECD", fullName: "Educación y Cultura Digital", color: "#B159A7" },
];
