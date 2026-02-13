// Tipo para el contenido de cada área
export interface AreaContent {
  ejes: {
    titulo: string;
    contenidos: Record<string, { texto: string; enfoques?: string[] }[]>;
  }[];
}

// Contenidos completos para todas las áreas
export const contenidosPorArea: Record<string, AreaContent> = {
  "matematica": {
    ejes: [
      {
        titulo: "Números y operaciones",
        contenidos: {
          "presentacion": [
            { texto: "Desarrollo del pensamiento matemático a través de la resolución de problemas en contextos significativos.", enfoques: [] },
            { texto: "Construcción del sentido numérico y comprensión del sistema de numeración decimal.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Exploración de números naturales hasta el 100: lectura, escritura y comparación.", enfoques: ["esi"] },
            { texto: "Resolución de problemas aditivos simples en contextos cotidianos.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Ampliación del campo numérico hasta el 1000 y operaciones con números naturales.", enfoques: ["ei"] }
          ],
          "tercer-grado": [
            { texto: "Multiplicación y división: sentido, estrategias de cálculo y problemas.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Fracciones: representación, comparación y equivalencia en contextos de medida y reparto.", enfoques: ["eai"] }
          ],
          "quinto-grado": [
            { texto: "Números decimales: lectura, escritura, comparación y operaciones básicas.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Proporcionalidad directa: razones, proporciones y porcentajes.", enfoques: ["ecd"] }
          ],
          "septimo-grado": [
            { texto: "Números enteros: representación, comparación y operaciones combinadas.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Estadística y probabilidades",
        contenidos: {
          "presentacion": [
            { texto: "Desarrollo de la capacidad de recolectar, organizar y analizar datos del entorno.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Recolección y organización de datos en tablas sencillas.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Lectura e interpretación de gráficos de barras simples.", enfoques: ["eai"] }
          ],
          "tercer-grado": [
            { texto: "Construcción de gráficos y análisis de información estadística.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Medidas de tendencia central: moda en conjuntos de datos.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Promedio aritmético y su aplicación en situaciones cotidianas.", enfoques: ["cdp"] }
          ],
          "sexto-grado": [
            { texto: "Probabilidad: eventos seguros, posibles e imposibles.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Iniciación al álgebra y funciones",
        contenidos: {
          "segundo-grado": [
            { texto: "Identificación de regularidades en secuencias numéricas.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Exploración de patrones y relaciones entre cantidades.", enfoques: ["ecd"] }
          ],
          "cuarto-grado": [
            { texto: "Expresiones con letras para representar situaciones.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Ecuaciones simples con una incógnita.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Funciones: tablas, gráficos y fórmulas.", enfoques: ["ei"] }
          ],
          "septimo-grado": [
            { texto: "Expresiones algebraicas y ecuaciones lineales.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Geometría y medida",
        contenidos: {
          "presentacion": [
            { texto: "Exploración del espacio y las formas geométricas.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Reconocimiento de figuras geométricas básicas en el entorno.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Medición de longitudes con unidades no convencionales y convencionales.", enfoques: ["esi"] }
          ],
          "tercer-grado": [
            { texto: "Perímetro y área de figuras rectangulares.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Ángulos: clasificación y medición con transportador.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Volumen de cuerpos geométricos simples.", enfoques: ["eai"] }
          ],
          "sexto-grado": [
            { texto: "Transformaciones geométricas: traslación, rotación y reflexión.", enfoques: [] }
          ],
          "septimo-grado": [
            { texto: "Teorema de Pitágoras y aplicaciones.", enfoques: [] }
          ],
        }
      },
    ],
  },
  "lengua-y-literatura": {
    ejes: [
      {
        titulo: "Oralidad",
        contenidos: {
          "presentacion": [
            { texto: "Desarrollo de competencias comunicativas orales en diversos contextos.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Participación en conversaciones y narraciones orales.", enfoques: ["esi"] },
            { texto: "Escucha atenta y comprensión de textos leídos por otros.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Producción de relatos orales con secuencia temporal.", enfoques: ["ei"] }
          ],
          "tercer-grado": [
            { texto: "Exposiciones orales breves sobre temas de interés.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Debate y argumentación oral sobre temas cotidianos.", enfoques: ["cdp"] }
          ],
          "quinto-grado": [
            { texto: "Entrevistas y diálogos formales.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Discursos expositivos y argumentativos.", enfoques: ["esi"] }
          ],
          "septimo-grado": [
            { texto: "Oratoria y presentaciones formales.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Escritura",
        contenidos: {
          "presentacion": [
            { texto: "Formación de escritores autónomos capaces de producir textos con propósitos diversos.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Escritura de palabras y oraciones en contextos significativos.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Producción de textos breves: listas, notas, mensajes.", enfoques: ["cdp"] }
          ],
          "tercer-grado": [
            { texto: "Escritura de textos narrativos y descriptivos breves.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Textos instructivos y cartas formales.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Crónicas y textos periodísticos breves.", enfoques: ["ei"] }
          ],
          "sexto-grado": [
            { texto: "Ensayos breves y textos argumentativos.", enfoques: [] }
          ],
          "septimo-grado": [
            { texto: "Textos académicos y de investigación.", enfoques: ["ecd"] }
          ],
        }
      },
      {
        titulo: "Lectura",
        contenidos: {
          "primer-grado": [
            { texto: "Iniciación a la lectura a partir de textos significativos.", enfoques: ["esi"] }
          ],
          "segundo-grado": [
            { texto: "Consolidación de la alfabetización y lectura fluida.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Lectura comprensiva de textos narrativos y expositivos.", enfoques: ["eai"] }
          ],
          "cuarto-grado": [
            { texto: "Estrategias de comprensión lectora: inferencias y predicciones.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Lectura crítica de textos informativos.", enfoques: ["cdp"] }
          ],
          "sexto-grado": [
            { texto: "Análisis de textos multimodales.", enfoques: [] }
          ],
          "septimo-grado": [
            { texto: "Lectura crítica y comparativa de fuentes.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Conocimiento y reflexión sobre la lengua y los textos",
        contenidos: {
          "segundo-grado": [
            { texto: "Reflexión sobre el sistema de escritura alfabético.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Reconocimiento de clases de palabras y su función.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Ortografía y puntuación básica.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Estructura de la oración y concordancia.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Cohesión y coherencia textual.", enfoques: ["ecd"] }
          ],
          "septimo-grado": [
            { texto: "Análisis sintáctico y semántico.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Literatura",
        contenidos: {
          "presentacion": [
            { texto: "Formación de lectores de literatura capaces de disfrutar y reflexionar.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Escucha y disfrute de textos literarios variados.", enfoques: ["ei"] }
          ],
          "segundo-grado": [
            { texto: "Lectura de cuentos, poesías y obras de teatro breves.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Análisis de personajes y ambientes en narraciones.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Géneros literarios: narrativo, lírico y dramático.", enfoques: ["ei"] }
          ],
          "quinto-grado": [
            { texto: "Literatura regional y latinoamericana.", enfoques: ["ei", "cdp"] }
          ],
          "sexto-grado": [
            { texto: "Novelas y obras de autores clásicos.", enfoques: [] }
          ],
          "septimo-grado": [
            { texto: "Literatura universal y contemporánea.", enfoques: [] }
          ],
        }
      },
    ],
  },
  "ciencias-naturales": {
    ejes: [
      {
        titulo: "Los seres vivos: diversidad, unidad, interrelaciones y cambios",
        contenidos: {
          "presentacion": [
            { texto: "Alfabetización científica: construcción de conocimientos sobre el mundo natural.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Exploración de los seres vivos: características y necesidades básicas.", enfoques: ["eai"] }
          ],
          "segundo-grado": [
            { texto: "Clasificación de seres vivos según características observables.", enfoques: ["esi"] }
          ],
          "tercer-grado": [
            { texto: "Relaciones entre los seres vivos y su ambiente.", enfoques: ["eai"] }
          ],
          "cuarto-grado": [
            { texto: "Sistemas del cuerpo humano: digestivo, respiratorio y circulatorio.", enfoques: ["esi"] }
          ],
          "quinto-grado": [
            { texto: "Reproducción y desarrollo en plantas y animales.", enfoques: ["esi"] }
          ],
          "sexto-grado": [
            { texto: "Ecosistemas: flujo de energía y ciclos de la materia.", enfoques: ["eai"] }
          ],
          "septimo-grado": [
            { texto: "Genética básica y evolución.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Los materiales y sus cambios",
        contenidos: {
          "primer-grado": [
            { texto: "Los materiales y sus propiedades: exploración y clasificación.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Cambios en los materiales por acción del calor y otros factores.", enfoques: ["ecd"] }
          ],
          "tercer-grado": [
            { texto: "Estados de la materia y cambios de estado.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Mezclas y separaciones: métodos de separación.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Transformaciones químicas en la vida cotidiana.", enfoques: ["eai"] }
          ],
          "sexto-grado": [
            { texto: "Estructura de la materia: átomos y moléculas.", enfoques: [] }
          ],
          "septimo-grado": [
            { texto: "Reacciones químicas y tabla periódica.", enfoques: ["ecd"] }
          ],
        }
      },
      {
        titulo: "Fenómenos del mundo físico",
        contenidos: {
          "segundo-grado": [
            { texto: "Exploración de fenómenos sonoros y luminosos.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Fuerzas y movimiento: empujar, tirar, fricción.", enfoques: ["ei"] }
          ],
          "cuarto-grado": [
            { texto: "Energía: formas y transformaciones.", enfoques: ["eai"] }
          ],
          "quinto-grado": [
            { texto: "Electricidad y magnetismo.", enfoques: ["ecd"] }
          ],
          "sexto-grado": [
            { texto: "Ondas: sonido y luz.", enfoques: [] }
          ],
          "septimo-grado": [
            { texto: "Mecánica: leyes de Newton.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "La Tierra, el universo y sus cambios",
        contenidos: {
          "tercer-grado": [
            { texto: "El sistema solar: el Sol, la Tierra y la Luna.", enfoques: ["eai"] }
          ],
          "cuarto-grado": [
            { texto: "Movimientos de la Tierra: día, noche y estaciones.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Estructura interna de la Tierra y fenómenos geológicos.", enfoques: ["eai"] }
          ],
          "sexto-grado": [
            { texto: "Recursos naturales y su uso sustentable.", enfoques: ["eai", "cdp"] }
          ],
          "septimo-grado": [
            { texto: "Cambio climático y acciones de mitigación.", enfoques: ["eai", "cdp"] }
          ],
        }
      },
    ],
  },
  "ciencias-sociales": {
    ejes: [
      {
        titulo: "Las sociedades y los espacios geográficos",
        contenidos: {
          "presentacion": [
            { texto: "Comprensión de la realidad social desde múltiples perspectivas.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "La vida en familia y en la escuela: roles, normas y convivencia.", enfoques: ["esi", "cdp"] }
          ],
          "segundo-grado": [
            { texto: "El barrio y la comunidad: espacios, trabajos y servicios.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "La ciudad y sus componentes: zonas urbanas y rurales.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Regiones geográficas: características físicas y humanas.", enfoques: ["ei"] }
          ],
          "quinto-grado": [
            { texto: "El país: organización política y territorial.", enfoques: ["cdp"] }
          ],
          "sexto-grado": [
            { texto: "América Latina: diversidad geográfica y cultural.", enfoques: ["ei"] }
          ],
          "septimo-grado": [
            { texto: "Globalización y relaciones internacionales.", enfoques: ["cdp"] }
          ],
        }
      },
      {
        titulo: "Las sociedades a través del tiempo",
        contenidos: {
          "primer-grado": [
            { texto: "La historia personal y familiar: pasado y presente.", enfoques: ["ei"] }
          ],
          "segundo-grado": [
            { texto: "Cambios y permanencias en la vida cotidiana a través del tiempo.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Los pueblos originarios: formas de vida y organización.", enfoques: ["ei", "cdp"] }
          ],
          "cuarto-grado": [
            { texto: "La conquista y colonización de América.", enfoques: ["ei"] }
          ],
          "quinto-grado": [
            { texto: "Independencia y formación del Estado nacional.", enfoques: ["cdp"] }
          ],
          "sexto-grado": [
            { texto: "Siglo XX: transformaciones sociales y políticas.", enfoques: ["cdp", "esi"] }
          ],
          "septimo-grado": [
            { texto: "Historia reciente y memoria colectiva.", enfoques: ["cdp", "esi"] }
          ],
        }
      },
      {
        titulo: "Las actividades humanas y la organización social",
        contenidos: {
          "segundo-grado": [
            { texto: "Instituciones y organizaciones de la comunidad.", enfoques: ["cdp"] }
          ],
          "tercer-grado": [
            { texto: "Actividades productivas: producción, distribución y consumo.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Derechos de la infancia y ciudadanía.", enfoques: ["cdp", "esi"] }
          ],
          "quinto-grado": [
            { texto: "Democracia y participación ciudadana.", enfoques: ["cdp"] }
          ],
          "sexto-grado": [
            { texto: "Economía y desigualdad social.", enfoques: ["cdp"] }
          ],
          "septimo-grado": [
            { texto: "Derechos humanos y justicia social.", enfoques: ["cdp", "esi"] }
          ],
        }
      },
    ],
  },
  "educacion-fisica": {
    ejes: [
      {
        titulo: "Corporeidad y motricidad",
        contenidos: {
          "presentacion": [
            { texto: "Prácticas corporales motrices y ludomotrices referidas al conocimiento de sí mismo.", enfoques: ["esi"] },
            { texto: "Desarrollo de la corporeidad en interacción con otros y el ambiente.", enfoques: [] }
          ],
          "primer-grado": [
            { texto: "Exploración de las posibilidades motrices del propio cuerpo.", enfoques: [] },
            { texto: "Juegos motores y actividades lúdicas grupales.", enfoques: ["esi"] }
          ],
          "segundo-grado": [
            { texto: "Habilidades motrices básicas: desplazamientos, saltos y lanzamientos.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Coordinación y equilibrio en diferentes situaciones.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Habilidades motrices combinadas y ajuste postural.", enfoques: ["esi"] }
          ],
          "quinto-grado": [
            { texto: "Desarrollo de capacidades condicionales: fuerza, resistencia, velocidad.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Cuidado del cuerpo y hábitos saludables.", enfoques: ["esi", "eai"] }
          ],
          "septimo-grado": [
            { texto: "Entrenamiento y planificación de la actividad física.", enfoques: ["esi"] }
          ],
        }
      },
      {
        titulo: "Prácticas ludomotrices",
        contenidos: {
          "primer-grado": [
            { texto: "Juegos tradicionales y autóctonos.", enfoques: ["ei"] }
          ],
          "segundo-grado": [
            { texto: "Juegos cooperativos y de oposición.", enfoques: ["cdp"] }
          ],
          "tercer-grado": [
            { texto: "Juegos deportivos modificados.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Mini-deportes con reglas adaptadas.", enfoques: ["cdp"] }
          ],
          "quinto-grado": [
            { texto: "Deportes individuales: atletismo, natación.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Deportes de conjunto: fútbol, básquet, vóley.", enfoques: ["cdp"] }
          ],
          "septimo-grado": [
            { texto: "Organización de torneos y eventos deportivos.", enfoques: ["cdp"] }
          ],
        }
      },
      {
        titulo: "Prácticas en el ambiente natural",
        contenidos: {
          "segundo-grado": [
            { texto: "Actividades motrices en contacto con la naturaleza.", enfoques: ["eai"] }
          ],
          "tercer-grado": [
            { texto: "Caminatas y juegos al aire libre.", enfoques: ["eai"] }
          ],
          "cuarto-grado": [
            { texto: "Orientación en el espacio natural.", enfoques: ["eai"] }
          ],
          "quinto-grado": [
            { texto: "Campamentos y vida al aire libre.", enfoques: ["eai", "cdp"] }
          ],
          "sexto-grado": [
            { texto: "Deportes de aventura: trekking, ciclismo.", enfoques: ["eai"] }
          ],
          "septimo-grado": [
            { texto: "Expediciones y proyectos de ecoturismo.", enfoques: ["eai", "cdp"] }
          ],
        }
      },
    ],
  },
  "educacion-artistica": {
    ejes: [
      {
        titulo: "Producción artística",
        contenidos: {
          "presentacion": [
            { texto: "Desarrollo de la sensibilidad estética y la capacidad expresiva.", enfoques: [] },
            { texto: "Exploración de diversos lenguajes artísticos.", enfoques: ["ei"] }
          ],
          "primer-grado": [
            { texto: "Exploración de materiales, herramientas y técnicas básicas.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Producción artística individual y colectiva.", enfoques: ["cdp"] }
          ],
          "tercer-grado": [
            { texto: "Técnicas de dibujo, pintura y modelado.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Composición y uso del color.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Expresión musical: canto, instrumentos y ritmo.", enfoques: ["ei"] }
          ],
          "sexto-grado": [
            { texto: "Teatro y expresión corporal.", enfoques: ["esi", "cdp"] }
          ],
          "septimo-grado": [
            { texto: "Producción audiovisual y multimedia.", enfoques: ["ecd"] }
          ],
        }
      },
      {
        titulo: "Apreciación y contextualización",
        contenidos: {
          "primer-grado": [
            { texto: "Percepción y disfrute de producciones artísticas.", enfoques: ["ei"] }
          ],
          "segundo-grado": [
            { texto: "Reconocimiento de elementos del lenguaje artístico.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Análisis de obras de diferentes épocas y culturas.", enfoques: ["ei", "cdp"] }
          ],
          "cuarto-grado": [
            { texto: "Arte local y regional: artistas y manifestaciones.", enfoques: ["ei"] }
          ],
          "quinto-grado": [
            { texto: "Historia del arte: movimientos y estilos.", enfoques: ["ei"] }
          ],
          "sexto-grado": [
            { texto: "Arte contemporáneo y nuevas expresiones.", enfoques: ["ei", "ecd"] }
          ],
          "septimo-grado": [
            { texto: "Crítica artística y reflexión estética.", enfoques: [] }
          ],
        }
      },
    ],
  },
  "lenguas-extranjeras": {
    ejes: [
      {
        titulo: "Comprensión oral y escrita",
        contenidos: {
          "presentacion": [
            { texto: "Desarrollo de competencias comunicativas en lengua extranjera.", enfoques: [] },
            { texto: "Apertura a otras culturas y formas de ver el mundo.", enfoques: ["ei"] }
          ],
          "primer-grado": [
            { texto: "Comprensión de expresiones cotidianas simples.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Comprensión de textos breves con apoyo visual.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Comprensión de instrucciones y diálogos simples.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Lectura de textos informativos breves.", enfoques: ["ei"] }
          ],
          "quinto-grado": [
            { texto: "Comprensión de textos narrativos y descriptivos.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Comprensión de textos auténticos adaptados.", enfoques: ["ei"] }
          ],
          "septimo-grado": [
            { texto: "Comprensión de medios de comunicación en lengua extranjera.", enfoques: ["ecd"] }
          ],
        }
      },
      {
        titulo: "Producción oral y escrita",
        contenidos: {
          "primer-grado": [
            { texto: "Producción oral de saludos y expresiones básicas.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Ampliación del vocabulario y estructuras comunicativas básicas.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Producción de textos breves guiados.", enfoques: ["ecd"] }
          ],
          "cuarto-grado": [
            { texto: "Descripción oral y escrita de personas, objetos y lugares.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Narración de eventos pasados y planes futuros.", enfoques: [] }
          ],
          "sexto-grado": [
            { texto: "Expresión de opiniones y preferencias.", enfoques: ["cdp"] }
          ],
          "septimo-grado": [
            { texto: "Producción de textos argumentativos breves.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Reflexión intercultural",
        contenidos: {
          "segundo-grado": [
            { texto: "Comparación de costumbres entre culturas.", enfoques: ["ei", "cdp"] }
          ],
          "tercer-grado": [
            { texto: "Exploración de manifestaciones culturales de países de habla inglesa.", enfoques: ["ei"] }
          ],
          "cuarto-grado": [
            { texto: "Festividades y tradiciones de diferentes países.", enfoques: ["ei"] }
          ],
          "quinto-grado": [
            { texto: "Literatura y música en lengua extranjera.", enfoques: ["ei"] }
          ],
          "sexto-grado": [
            { texto: "Diversidad lingüística y cultural global.", enfoques: ["ei", "cdp"] }
          ],
          "septimo-grado": [
            { texto: "Identidad y multiculturalidad en el mundo globalizado.", enfoques: ["ei", "cdp"] }
          ],
        }
      },
    ],
  },
  "educacion-tecnologica": {
    ejes: [
      {
        titulo: "La reflexión sobre la tecnología como proceso sociocultural",
        contenidos: {
          "presentacion": [
            { texto: "Las técnicas en los procesos tecnológicos: identificación de instrumentos, herramientas y máquinas utilizados en actividades cotidianas.", enfoques: [] },
            { texto: "Reconocimiento de la relación intencional entre la técnica y los propósitos o problemas que las personas buscan resolver.", enfoques: ["esi"] }
          ],
          "primer-grado": [
            { texto: "Exploración de herramientas sencillas en contextos familiares y escolares: partes y funciones.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Uso de herramientas de manera segura y adecuada a su función.", enfoques: [] }
          ],
          "tercer-grado": [
            { texto: "Tecnología y sociedad: impacto en la vida cotidiana.", enfoques: ["ecd"] }
          ],
          "cuarto-grado": [
            { texto: "Historia de la tecnología: inventos que cambiaron el mundo.", enfoques: ["ei"] }
          ],
          "quinto-grado": [
            { texto: "Tecnología y sustentabilidad.", enfoques: ["eai"] }
          ],
          "sexto-grado": [
            { texto: "Ética en el uso de tecnologías digitales.", enfoques: ["ecd", "cdp"] }
          ],
          "septimo-grado": [
            { texto: "Tecnologías emergentes y su impacto social.", enfoques: ["ecd"] }
          ],
        }
      },
      {
        titulo: "El análisis de productos tecnológicos",
        contenidos: {
          "primer-grado": [
            { texto: "Análisis de objetos de uso cotidiano: forma, materiales, función.", enfoques: [] }
          ],
          "segundo-grado": [
            { texto: "Comparación de productos que cumplen funciones similares.", enfoques: ["eai"] }
          ],
          "tercer-grado": [
            { texto: "Ciclo de vida de los productos: desde la fabricación hasta el desecho.", enfoques: ["eai"] }
          ],
          "cuarto-grado": [
            { texto: "Análisis de sistemas tecnológicos simples.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Evaluación de productos según criterios de calidad y sustentabilidad.", enfoques: ["eai"] }
          ],
          "sexto-grado": [
            { texto: "Análisis de tecnologías digitales: hardware y software.", enfoques: ["ecd"] }
          ],
          "septimo-grado": [
            { texto: "Innovación tecnológica y desarrollo de prototipos.", enfoques: [] }
          ],
        }
      },
      {
        titulo: "Los procesos tecnológicos",
        contenidos: {
          "segundo-grado": [
            { texto: "Exploración de procesos de producción sencillos.", enfoques: ["ecd"] }
          ],
          "tercer-grado": [
            { texto: "Diseño y construcción de objetos con materiales simples.", enfoques: [] }
          ],
          "cuarto-grado": [
            { texto: "Procesos de fabricación: artesanal e industrial.", enfoques: [] }
          ],
          "quinto-grado": [
            { texto: "Automatización y control de procesos.", enfoques: ["ecd"] }
          ],
          "sexto-grado": [
            { texto: "Programación y robótica básica.", enfoques: ["ecd"] }
          ],
          "septimo-grado": [
            { texto: "Proyectos tecnológicos: diseño, planificación y ejecución.", enfoques: ["ecd"] }
          ],
        }
      },
    ],
  },
  "saberes-vidas-y-mundos": {
    ejes: [
      {
        titulo: "Identidades y convivencias",
        contenidos: {
          "presentacion": [
            { texto: "Espacio curricular innovador que integra saberes de diversas disciplinas.", enfoques: [] },
            { texto: "Abordaje de problemáticas sociales relevantes desde perspectivas múltiples.", enfoques: ["esi", "cdp"] }
          ],
          "primer-grado": [
            { texto: "Exploración de la identidad personal y grupal.", enfoques: ["esi"] }
          ],
          "segundo-grado": [
            { texto: "Construcción de vínculos y convivencia democrática.", enfoques: ["cdp"] }
          ],
          "tercer-grado": [
            { texto: "Diversidad e inclusión: respeto a las diferencias.", enfoques: ["esi", "ei", "cdp"] }
          ],
          "cuarto-grado": [
            { texto: "Prevención del bullying y resolución de conflictos.", enfoques: ["esi", "cdp"] }
          ],
          "quinto-grado": [
            { texto: "Género y estereotipos: reflexión crítica.", enfoques: ["esi", "cdp"] }
          ],
          "sexto-grado": [
            { texto: "Sexualidad integral y cuidado del cuerpo.", enfoques: ["esi"] }
          ],
          "septimo-grado": [
            { texto: "Proyecto de vida y toma de decisiones.", enfoques: ["esi", "cdp"] }
          ],
        }
      },
      {
        titulo: "Ambiente y sustentabilidad",
        contenidos: {
          "primer-grado": [
            { texto: "El cuidado del ambiente cercano.", enfoques: ["eai"] }
          ],
          "segundo-grado": [
            { texto: "Problemas ambientales locales y acciones de cuidado.", enfoques: ["eai"] }
          ],
          "tercer-grado": [
            { texto: "Sustentabilidad y responsabilidad ambiental.", enfoques: ["eai", "cdp"] }
          ],
          "cuarto-grado": [
            { texto: "Consumo responsable y huella ecológica.", enfoques: ["eai"] }
          ],
          "quinto-grado": [
            { texto: "Biodiversidad y conservación de ecosistemas.", enfoques: ["eai"] }
          ],
          "sexto-grado": [
            { texto: "Cambio climático: causas, consecuencias y acciones.", enfoques: ["eai", "cdp"] }
          ],
          "septimo-grado": [
            { texto: "Desarrollo sustentable y Objetivos de Desarrollo Sostenible.", enfoques: ["eai", "cdp"] }
          ],
        }
      },
      {
        titulo: "Participación ciudadana",
        contenidos: {
          "segundo-grado": [
            { texto: "Participación en proyectos colaborativos.", enfoques: ["cdp"] }
          ],
          "tercer-grado": [
            { texto: "Construcción de ciudadanía activa y responsable.", enfoques: ["cdp", "esi"] }
          ],
          "cuarto-grado": [
            { texto: "Derechos y responsabilidades ciudadanas.", enfoques: ["cdp"] }
          ],
          "quinto-grado": [
            { texto: "Participación comunitaria y voluntariado.", enfoques: ["cdp"] }
          ],
          "sexto-grado": [
            { texto: "Medios de comunicación y pensamiento crítico.", enfoques: ["cdp", "ecd"] }
          ],
          "septimo-grado": [
            { texto: "Activismo y transformación social.", enfoques: ["cdp"] }
          ],
        }
      },
    ],
  },
};
