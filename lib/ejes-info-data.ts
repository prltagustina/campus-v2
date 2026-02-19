// Datos detallados de los ejes para el esquema interactivo
// Incluye título corto y descripción completa de cada eje

export interface EjeInfo {
  titulo: string;
  descripcion: string;
}

export const ejesInfoPorArea: Record<string, EjeInfo[]> = {
  // Matemática - 4 ejes
  "matematica": [
    {
      titulo: "Números y operaciones",
      descripcion: "Este eje aborda el desarrollo del sentido numérico y la comprensión de las operaciones matemáticas. Se trabaja con distintos conjuntos numéricos de manera progresiva, desde los números naturales hasta los racionales, promoviendo estrategias de cálculo mental y algorítmico. Las y los estudiantes construyen significados sobre los números y sus relaciones, desarrollan fluidez en el cálculo y resuelven problemas diversos."
    },
    {
      titulo: "Estadística y probabilidades",
      descripcion: "Se desarrollan capacidades para recolectar, organizar, representar y analizar datos estadísticos. También se introducen conceptos básicos de probabilidad, promoviendo el pensamiento crítico frente a la información numérica. Las y los estudiantes aprenden a interpretar gráficos, tablas y medidas de resumen, y a tomar decisiones basadas en datos."
    },
    {
      titulo: "Iniciación al álgebra y funciones",
      descripcion: "Este eje introduce progresivamente el lenguaje algebraico y el estudio de relaciones funcionales. Se trabaja con patrones, regularidades, expresiones algebraicas y ecuaciones simples. Las y los estudiantes desarrollan el pensamiento algebraico a través de la generalización y la representación simbólica de situaciones."
    },
    {
      titulo: "Geometría y medida",
      descripcion: "Se aborda el estudio del espacio, las formas geométricas y la medición. Se trabaja con figuras y cuerpos geométricos, transformaciones, y unidades de medida de distintas magnitudes. Las y los estudiantes exploran propiedades de las figuras, desarrollan la visualización espacial y resuelven problemas de medida en contextos diversos."
    }
  ],

  // Lengua y Literatura - 5 ejes (orden visual del SVG: top-right, left-upper, left-lower, bottom-right, right)
  "lengua-y-literatura": [
    {
      titulo: "Oralidad",
      descripcion: "El desarrollo discursivo oral se concibe como una práctica social y cultural que progresa en contextos reales y significativos. En este sentido, la enseñanza de la oralidad supone generar espacios de intercambio que habiliten la expresión de ideas, opiniones, informaciones y experiencias. En este eje se promueve, por un lado, la participación respetuosa y la escucha activa y, por otro lado, el abordaje de diversos géneros, formatos y textos, planificados y espontáneos, con atención al propósito comunicativo y a los rasgos particulares de la oralidad."
    },
    {
      titulo: "Literatura",
      descripcion: "Se concibe la literatura como un hecho artístico y cultural que permite construir saberes sobre uno mismo, sobre el mundo y sobre el lenguaje. Se promueve que las propuestas didácticas atiendan a una cuidadosa selección de textos variados, desafiantes y de calidad literaria. Se aborda su enseñanza a partir de itinerarios literarios, conversaciones literarias y propuestas de escritura de invención."
    },
    {
      titulo: "Escritura",
      descripcion: "La enseñanza de la producción escrita implica promover el desarrollo de la capacidad de comunicar ideas de manera adecuada, atendiendo al propósito, el contexto y los destinatarios. Además, involucra la construcción de aprendizajes que permitan planificar, escribir, revisar e intervenir en las propias producciones. Las propuestas buscan propiciar un trabajo de escritura consciente y reflexivo, con intervención, orientación y andamiaje de quien enseña."
    },
    {
      titulo: "Lectura",
      descripcion: "La lectura como proceso cognitivo y sociocultural complejo requiere trabajar de manera simultánea con el sistema de escritura y la comprensión de textos. Por ello, en este eje se promueve la exploración de distintos escenarios de lectura y la participación en diferentes comunidades lectoras para propiciar la construcción de sentidos compartidos. Leer con fluidez, comprender, interpretar y gestionar los procesos de lectura son aspectos clave."
    },
    {
      titulo: "Conocimiento y reflexión sobre la lengua y los textos",
      descripcion: "La reflexión metalingüística se entiende como la capacidad de pensar y reflexionar sobre el lenguaje mismo e implica conocer las unidades de la lengua, sus relaciones y funciones, las propiedades y tramas constituyentes de los textos y las convenciones ortográficas y de puntuación del español. Se proponen situaciones de enseñanza que permitan construir conocimientos sólidos sobre el sistema lingüístico."
    }
  ],

  // Ciencias Naturales - 4 ejes
  "ciencias-naturales": [
    {
      titulo: "Los seres vivos: unidad, diversidad, interacciones y cambios",
      descripcion: "Este eje aborda el estudio de los seres vivos desde una perspectiva que integra su unidad estructural y funcional con la diversidad de formas de vida. Se exploran las interacciones entre los organismos y su ambiente, así como los cambios que experimentan a lo largo del tiempo, tanto a nivel individual como poblacional. Las y los estudiantes desarrollan una comprensión integral de la vida."
    },
    {
      titulo: "Materiales: composición, propiedades y cambios",
      descripcion: "Se abordan los materiales como componentes fundamentales del mundo natural y tecnológico. Se estudian sus propiedades, composición y los cambios que pueden experimentar, promoviendo la comprensión de conceptos básicos de química y física de los materiales. Las y los estudiantes exploran, experimentan y clasifican materiales según sus características."
    },
    {
      titulo: "Los fenómenos del mundo físico",
      descripcion: "Este eje se centra en la comprensión de los fenómenos físicos que nos rodean. Se exploran conceptos relacionados con el movimiento, las fuerzas, la energía en sus diversas formas, y los fenómenos ondulatorios como la luz y el sonido. Las actividades experimentales permiten construir modelos explicativos de estos fenómenos."
    },
    {
      titulo: "La Tierra, el universo y sus cambios",
      descripcion: "Se aborda el estudio de la Tierra como sistema dinámico y su lugar en el universo. Se exploran los cambios geológicos, climáticos y astronómicos, promoviendo una comprensión integral del planeta y el cosmos. Las y los estudiantes desarrollan una visión sistémica de los procesos terrestres y cósmicos."
    }
  ],

  // Ciencias Sociales - 3 ejes
  "ciencias-sociales": [
    {
      titulo: "Las sociedades y la construcción de espacios",
      descripcion: "Este eje aborda la relación entre las sociedades y los espacios geográficos que habitan y transforman. Se estudian los procesos de construcción social del espacio, las actividades económicas, la organización del territorio y las problemáticas ambientales. Las y los estudiantes desarrollan una mirada crítica sobre la producción y apropiación del espacio."
    },
    {
      titulo: "Las sociedades en el tiempo. Cambios y continuidades",
      descripcion: "Se aborda el estudio de los procesos históricos, identificando cambios y continuidades a lo largo del tiempo. Se trabaja con distintas escalas temporales y espaciales, promoviendo la comprensión de la multicausalidad y la multiperspectividad. Las y los estudiantes construyen nociones de tiempo histórico y desarrollan el pensamiento crítico."
    },
    {
      titulo: "Las sociedades, la vida cotidiana y las prácticas culturales",
      descripcion: "Este eje se centra en el estudio de la vida cotidiana, las instituciones sociales y las prácticas culturales de diversos grupos. Se promueve la valoración de la diversidad cultural y el reconocimiento de diferentes modos de vida. Las y los estudiantes reflexionan sobre su propia cultura y la de otros grupos sociales."
    }
  ],

  // Educación Física - 3 ejes
  "educacion-fisica": [
    {
      titulo: "Prácticas corporales referidas al conocimiento de sí mismo",
      descripcion: "Este eje aborda las prácticas corporales y motrices orientadas al conocimiento y disponibilidad del propio cuerpo. Se trabaja con la percepción, el registro y el cuidado corporal, promoviendo una relación saludable con el propio cuerpo. Las y los estudiantes desarrollan habilidades motrices básicas y combinadas, y construyen una imagen corporal positiva."
    },
    {
      titulo: "Prácticas corporales en interacción con otras personas",
      descripcion: "Se abordan las prácticas corporales y ludomotrices que se desarrollan en interacción con otros. Se trabaja con juegos, deportes y actividades expresivas grupales, promoviendo la cooperación, la comunicación y el respeto por las diferencias. Las y los estudiantes aprenden a participar, acordar reglas y resolver conflictos."
    },
    {
      titulo: "Prácticas corporales en interacción con el ambiente",
      descripcion: "Este eje se centra en las prácticas corporales que se desarrollan en contacto con el ambiente natural y otros entornos. Se promueve la exploración, el disfrute y el cuidado del ambiente a través de actividades al aire libre. Las y los estudiantes desarrollan habilidades para desenvolverse en diferentes espacios y contextos."
    }
  ],

  // Artes Visuales - 3 ejes (subarea de Educación Artística)
  "artes-visuales": [
    {
      titulo: "Producción visual",
      descripcion: "Este eje se centra en la creación de producciones visuales mediante la exploración de técnicas, materiales y procedimientos propios del lenguaje visual. Las y los estudiantes experimentan con el dibujo, la pintura, la escultura, el grabado y otras disciplinas, desarrollando capacidades expresivas y técnicas en contextos significativos."
    },
    {
      titulo: "Apreciación",
      descripcion: "Se trabaja con la percepción, el análisis y la interpretación de obras y manifestaciones artísticas visuales diversas. Se promueve el desarrollo de la sensibilidad estética y la capacidad de argumentar sobre las producciones artísticas. Las y los estudiantes aprenden a observar y reflexionar sobre las artes visuales desde múltiples perspectivas."
    },
    {
      titulo: "Artes Visuales en contexto",
      descripcion: "Este eje aborda la comprensión de las manifestaciones visuales en relación con sus contextos de producción, circulación y recepción. Se estudian las artes visuales como prácticas sociales y culturales, promoviendo el conocimiento del patrimonio artístico local, regional y mundial."
    }
  ],

  // Música - 3 ejes (subarea de Educación Artística)
  "musica": [
    {
      titulo: "Músicas en contexto",
      descripcion: "Este eje aborda la comprensión de las manifestaciones musicales en relación con sus contextos de producción, circulación y recepción. Se estudian las músicas como prácticas sociales y culturales, promoviendo el conocimiento del patrimonio musical local, regional y mundial."
    },
    {
      titulo: "Apreciación",
      descripcion: "Se trabaja con la percepción, el análisis y la interpretación de obras y manifestaciones musicales diversas. Se promueve el desarrollo de la sensibilidad estética y la capacidad de argumentar sobre las producciones musicales. Las y los estudiantes aprenden a escuchar y reflexionar sobre la música desde múltiples perspectivas."
    },
    {
      titulo: "Producción musical",
      descripcion: "Este eje se centra en la creación musical mediante la exploración, la interpretación y la composición. Se trabaja con el canto, la ejecución instrumental, la sonorización y la creación colectiva, desarrollando capacidades expresivas y técnicas en contextos significativos."
    }
  ],

  // Danza - 3 ejes (subarea de Educación Artística)
  "danza": [
    {
      titulo: "Producción en danza",
      descripcion: "Este eje se centra en la creación y producción de danza mediante la exploración del movimiento, la improvisación y la composición coreográfica. Las y los estudiantes experimentan con su cuerpo en movimiento, desarrollando capacidades expresivas y técnicas en contextos significativos."
    },
    {
      titulo: "Danza en contexto",
      descripcion: "Este eje aborda la comprensión de las manifestaciones de danza en relación con sus contextos de producción, circulación y recepción. Se estudian las danzas como prácticas sociales y culturales, promoviendo el conocimiento del patrimonio coreográfico local, regional y mundial."
    },
    {
      titulo: "Apreciación",
      descripcion: "Se trabaja con la percepción, el análisis y la interpretación de obras y manifestaciones de danza diversas. Se promueve el desarrollo de la sensibilidad estética y la capacidad de argumentar sobre las producciones de danza. Las y los estudiantes aprenden a observar y reflexionar sobre la danza desde múltiples perspectivas."
    }
  ],

  // Teatro - 3 ejes (subarea de Educación Artística)
  "teatro": [
    {
      titulo: "Teatro en contexto",
      descripcion: "Este eje aborda la comprensión de las manifestaciones teatrales en relación con sus contextos de producción, circulación y recepción. Se estudian el teatro como práctica social y cultural, promoviendo el conocimiento del patrimonio teatral local, regional y mundial."
    },
    {
      titulo: "Apreciación",
      descripcion: "Se trabaja con la percepción, el análisis y la interpretación de obras y manifestaciones teatrales diversas. Se promueve el desarrollo de la sensibilidad estética y la capacidad de argumentar sobre las producciones teatrales. Las y los estudiantes aprenden a observar y reflexionar sobre el teatro desde múltiples perspectivas."
    },
    {
      titulo: "Producción teatral",
      descripcion: "Este eje se centra en la creación teatral mediante la exploración de la acción dramática, la improvisación y la puesta en escena. Las y los estudiantes experimentan con la representación, desarrollando capacidades expresivas y técnicas en contextos significativos."
    }
  ],

  // Lenguas Extranjeras - 5 ejes
  "lenguas-extranjeras": [
    {
      titulo: "Lectura",
      descripcion: "Este eje aborda el desarrollo de la comprensión lectora en la lengua extranjera. Se trabaja con textos auténticos y adaptados de diversos géneros, promoviendo estrategias de lectura y la construcción de sentido. Las y los estudiantes exploran textos escritos y desarrollan gradualmente la autonomía lectora en la nueva lengua."
    },
    {
      titulo: "Escritura",
      descripcion: "Se aborda la producción escrita en la lengua extranjera de manera progresiva. Se trabaja con diferentes tipos de textos, atendiendo al propósito comunicativo y a las convenciones de escritura. Las y los estudiantes desarrollan la capacidad de expresarse por escrito en contextos significativos."
    },
    {
      titulo: "Oralidad",
      descripcion: "Este eje se centra en el desarrollo de la comprensión y producción oral en la lengua extranjera. Se trabaja con situaciones comunicativas variadas, promoviendo la escucha activa y la expresión oral. Las y los estudiantes participan en intercambios orales y desarrollan gradualmente la fluidez."
    },
    {
      titulo: "Reflexión sobre la lengua que se aprende",
      descripcion: "Se promueve la reflexión metalingüística sobre la lengua extranjera en relación con la lengua materna. Se trabaja con aspectos léxicos, gramaticales y discursivos, promoviendo la toma de conciencia sobre el funcionamiento del lenguaje. Las y los estudiantes desarrollan estrategias de aprendizaje autónomo."
    },
    {
      titulo: "Reflexión intercultural",
      descripcion: "Este eje aborda la dimensión cultural del aprendizaje de lenguas. Se promueve la reflexión sobre la propia cultura y las culturas asociadas a la lengua extranjera, desarrollando actitudes de apertura y respeto. Las y los estudiantes construyen una identidad intercultural y desarrollan la competencia comunicativa intercultural."
    }
  ],

  // Educación Tecnológica - 4 ejes
  "educacion-tecnologica": [
    {
      titulo: "Los procesos tecnológicos",
      descripcion: "Este eje aborda el análisis de los procesos de producción y transformación de bienes y servicios. Se estudian las operaciones, los flujos de materia, energía e información, y la organización de los procesos productivos. Las y los estudiantes desarrollan la capacidad de analizar y diseñar procesos tecnológicos."
    },
    {
      titulo: "Los medios técnicos",
      descripcion: "Se abordan los artefactos, herramientas y máquinas como medios técnicos que permiten realizar operaciones sobre materiales. Se estudian sus características, funcionamiento y relaciones con los procesos productivos. Las y los estudiantes exploran, analizan y diseñan medios técnicos sencillos."
    },
    {
      titulo: "Las tecnologías de la información y la comunicación",
      descripcion: "Este eje se centra en los sistemas digitales y computacionales. Se trabaja con dispositivos, redes, programación y robótica, promoviendo el pensamiento computacional. Las y los estudiantes desarrollan habilidades digitales y comprenden el funcionamiento de los sistemas tecnológicos basados en información."
    },
    {
      titulo: "La reflexión sobre la tecnología como proceso sociocultural",
      descripcion: "Se promueve la reflexión crítica sobre la tecnología como construcción social e histórica. Se analizan los impactos de la tecnología en la sociedad y el ambiente, y las cuestiones éticas asociadas. Las y los estudiantes desarrollan una mirada crítica y responsable sobre el desarrollo tecnológico."
    }
  ],

  // Saberes, Vidas y Mundos - 3 ejes
  "saberes-vidas-y-mundos": [
    {
      titulo: "Integración de saberes curriculares y enfoques transversales",
      descripcion: "Este eje propone la articulación de contenidos de diferentes áreas con los enfoques transversales del diseño curricular. Se trabaja con proyectos integradores que abordan problemáticas complejas desde múltiples perspectivas. Las y los estudiantes construyen saberes conectados y significativos."
    },
    {
      titulo: "Abordaje de temáticas urgentes y actuales",
      descripcion: "Se abordan temas relevantes y actuales que interpelan a las comunidades educativas. Se trabaja con problemáticas sociales, ambientales y culturales contemporáneas, promoviendo el análisis crítico y la acción transformadora. Las y los estudiantes se involucran en el estudio de su realidad cercana y global."
    },
    {
      titulo: "Participación activa de las infancias",
      descripcion: "Este eje promueve el protagonismo de las y los estudiantes en los procesos de aprendizaje. Se generan espacios de participación, toma de decisiones y expresión de las voces infantiles. Las y los estudiantes desarrollan la autonomía, el pensamiento crítico y la capacidad de actuar en su comunidad."
    }
  ]
};
