# Propuesta: Plan Provincial de Matemática y Modo Secundaria en Campus V3

Primera propuesta navegable para revisar en equipo. **No está publicada ni aprobada**: vive en la rama `claude/programas-matematica-secundaria`, sin commit, y se ve en local. Las decisiones marcadas como propuesta son hipótesis para discutir.

## Problema

Hay personas que no encuentran materiales porque están muy abajo en páginas largas. El caso concreto es Evaluación en Modo Secundaria: en el Campus actual aparece después de cinco bloques. El objetivo es que se pueda reconocer qué hay, elegir y llegar sin recorrer bloques ajenos. No se busca eliminar el scroll.

## Rutas para revisar

Con el servidor local (`npm run dev`; en esta sesión, `http://localhost:3001`):

| Ruta | Qué es |
|---|---|
| `/programas` | Portada común de las tres experiencias |
| `/plan-provincial-de-matematica` | Plan: entra directo a Educación Inicial |
| `/plan-provincial-de-matematica/inicial` · `/primaria` · `/secundaria` | Plan: un nivel, con sus grados o años adentro |
| `/modo-secundaria` | Secundaria: Inicio (introducción y Accesos) |
| `/modo-secundaria/ensenanza-y-evaluacion#evaluacion` | Secundaria: una sección, con la pestaña del tema abierta |
| `/`, `/area/...`, `/familias`, etc. | Diseño Curricular, sin cambios de recorrido |

## Arquitectura

Se siguió el manual *Campus Educativo V3 · Sistema de diseño v0.1* y su anexo técnico, sobre todo el capítulo 10 (nuevas secciones): reutilizar lo que funciona y no asumir que todo tiene la estructura de Diseño Curricular.

**Acceso común (navegación general).** Diseño Curricular, el Plan y Modo Secundaria son entradas distintas. No se sumaron al menú de Diseño Curricular (Inicio, Áreas, Equipos, Familias, EIB). Se resolvió así:

- **Menú institucional:** "Programas" del encabezado pasa a ser un menú real, desde 1024 px. Hasta ahora era un texto sin función. Lista las tres experiencias, como el menú "Programas" del Campus real.
- **Franja de ruta:** suma un acceso "Programas" en todos los tamaños. El nombre del programa va en la franja (como "Diseño Curricular"), no en un botón.

**La misma lógica de navegación que Diseño Curricular.** Cada programa reemplaza las secciones de la columna principal por las suyas, con el mismo botón:

- **Columna principal:** las secciones del programa, como Inicio · Áreas · Equipos directivos · Familias · EIB. Los programas no se mezclan entre sí ni con Diseño Curricular.
- **Columna lateral:** se abre cuando hay una lista para elegir, como Áreas abre las áreas. En los programas no hay: el Plan usa una botonera horizontal (ver abajo).
- **Adentro de una sección sin columna lateral:** una página, o pestañas como en Familias, Equipos y EIB.
- **Celular:** las mismas secciones en la barra inferior.
- **Separación:** la de Diseño Curricular, 24 px entre secciones desde 768 px y 20 px en celular (medido en las dos).

**Plan Provincial de Matemática** (según la maqueta de Visuales Curricular del 2026-11-10).

- **Sin columnas al costado ni barra inferior:** los niveles van en una **botonera horizontal** dentro del contenido: Educación Inicial · Educación Primaria · Educación Secundaria (en celular, Inicial · Primaria · Secundaria). El Plan entra directo a Educación Inicial. Para volver a Diseño Curricular o ir a Modo Secundaria, el acceso "Programas" de la franja y del encabezado.
- **Arriba,** el bloque rojo del programa: "Plan Provincial de Matemática", su descripción y la portada al costado.
- **Grados o años** (Primaria: 1er a 7mo grado; Secundaria: 1er y 2do año; Inicial no tiene): con las pestañas de idiomas de Lenguas Extranjeras, en tinta. Al entrar queda elegido el primero.
- **Repositorios,** uno debajo del otro, del grado elegido: **Materiales · Formaciones · Juegos Matemáticos**, como en el Campus, con el repositorio de "Itinerarios didácticos" de las áreas. Una categoría abierta por vez y la primera con contenido abierta al entrar; si un grado no tiene nada en una categoría (por ejemplo, Juegos Matemáticos fuera de 7mo grado), queda sin contenido, como las categorías vacías de las áreas. Las formaciones son filas que abren su página del Campus.
- **Para que se distinga cada cosa** (pedido de Visuales Curricular): el nivel en rojo y grande (botones con flecha), el grado en tinta y más chico (pestañas) y las categorías como barras rojas a todo el ancho (relleno pleno solo la abierta).
- **Ancho:** sin columnas al costado, el contenido va en una columna centrada de 56rem, como Familias, Equipos y EIB.
- **Color:** el rojo de Matemática (#E42153), también en la barra de scroll. El texto sigue en la tinta.

**Modo Secundaria, "como página de recursos" (composición A del manual).** Reúne documentos, aulas, presentaciones y enlaces de temas muy distintos, con poco contenido cada uno (1 a 3 recursos).

- **Columna:** Inicio · Diseño curricular · Enseñanza y evaluación · Trayectorias y articulación · Gestión institucional. Las cuatro agrupaciones no existen en el Campus: son una propuesta.
- **Inicio:** el logo, la introducción y los Accesos (las portadas de los programas), que en el Campus van primero.
- **Cada sección:** la plantilla de Familias, Equipos y EIB, con encabezado y una pestaña por tema, en el orden del Campus:

| Sección | Pestañas |
|---|---|
| Diseño curricular | Espacios Curriculares Articulados · Técnicas Profesionales y Orientadas |
| Enseñanza y evaluación | Alfabetización · Evaluación · Matemática |
| Trayectorias y articulación | Articulación entre Primaria y Secundaria · Jornada de Convivencia |
| Gestión institucional | Escuelas Agrotécnicas · Jornada institucional |

- **Sin duplicar:** cada tema está en un solo lugar. Ya no hay página larga ni botonera de secciones.
- **Dirección propia por tema:** la pestaña queda en la dirección (`/modo-secundaria/ensenanza-y-evaluacion#evaluacion`), para compartirla o recargar en ella.
- **Diseño:**
  - **Repositorios, no tarjetas sueltas:** las listas van en una sola caja con filas separadas por línea (el panel de repositorio de Familias, Equipos y EIB), y las presentaciones embebidas como en esas páginas. 24 px entre bloques, como entre esas cajas.
  - **Espacios Curriculares Articulados:** la banda del Campus en clave editorial, como tarjeta de su pestaña. Degradé violeta a naranja, título grande y los tres documentos como índice de filas con ícono, descripción y peso del PDF.
  - **Documentos con portada en el Campus:** tarjetas con su tapa, título y acciones: Descargar PDF, Ver (solo el ojo, con el nombre completo para lectores de pantalla) y Compartir, en una línea desde tablet. Son los de Alfabetización e Itinerarios Matemáticos.
  - **Acceso a las aulas:** con el isologo del Campus, como en el Campus real (Alfabetización y Jornada institucional).
  - **Articulación entre Primaria y Secundaria:** como en el Campus, la foto de los cuadernillos y el enlace "Materiales" a su propia página.
  - **Técnicas Profesionales y Orientadas:** el repositorio de Itinerarios de las áreas, en tinta. Las dos son categorías desplegables, una abierta por vez y la primera abierta al entrar. Adentro, **Resoluciones** y **Anexos** van separados, como los grados dentro de una categoría del Plan (Técnicas Profesionales: 8 resoluciones y 10 anexos; Orientadas: 1 y 1).

**Comportamiento común.** Enlaces para navegar y botones para acciones. Cada sección, nivel y tema tiene su dirección propia, así que se puede compartir y recargar. La ubicación se marca en la columna principal, la botonera de niveles, las pestañas, la franja de ruta y el título de la pestaña del navegador. Las acciones dicen lo que hace el destino real:

- **"Descargar":** descarga directa.
- **"Ver documento":** abre el visor de Google Drive; no se promete una descarga.
- **"Acceder al aula":** abre la Plataforma Educativa.
- **"Abrir":** abre una página del Campus.

## Inventario y correspondencia

`inventario.csv` tiene una fila por enlace de las dos páginas actuales: 76 en total. Para cada uno indica la sección y la agrupación actuales, el título, el tipo de destino real (verificado en octubre de 2026), la URL, la ubicación en la propuesta y las dudas. Todos los enlaces quedan ubicados.

Duplicados resueltos con un solo registro:

- **Evaluación:** "Presentación" y "Material" llevan al mismo archivo.
- **Itinerarios Matemáticos 1er Año:** está en Matemática y en Modo Secundaria.
- **Tesoro Matemático:** los mismos tres archivos en Primaria 7mo grado y en Secundaria 1er y 2do año.

Lo que en el Campus es un enlace a otra página (Articulación, ConectaDOS, Tutorías virtuales, ¡Quedate!, Vivamos los juegos, las formaciones) sigue siendo un enlace a esa página: no se trae su contenido, para no mezclar información de vistas distintas. No se inventaron documentos, enlaces ni metadatos. Solo se muestran pesos donde se pudieron verificar (los tres PDF de Espacios Curriculares Articulados).

## Cambios en piezas compartidas

Acotados y sin cambiar el recorrido de Diseño Curricular:

- **Inter** se carga con `next/font`, con el eje óptico de Inter 4 (`app/layout.tsx`, `app/globals.css`). Antes se veía en Inter solo si estaba instalada en la computadora; si no, en la fuente del sistema. Se comparó Diseño Curricular antes y después en 7 páginas y 3 anchos: el contenido no cambia; solo cambian el encabezado y la franja por el acceso "Programas".
- **`app-shell.tsx`:**
  - menú "Programas", acceso en la franja y migas de los programas;
  - columna principal y barra móvil con las secciones de Modo Secundaria; el Plan va sin columnas ni barra móvil (botonera horizontal en el contenido). Diseño Curricular conserva las suyas; los botones de la columna pasan a tener un tipo explícito, sin cambiar su aspecto;
  - barra de scroll roja en el Plan y lugar reservado para la barra en los programas (el contenido no se corre al aparecer el scroll);
  - el cuerpo de la página y el marco ya no se corren al saltar a un `#ancla`. Antes el salto del navegador dejaba el encabezado cortado y una franja vacía; esto previene lo mismo en Diseño Curricular.
- **Opciones nuevas, con el comportamiento de siempre por defecto:**
  - `ResourceRow`: texto e ícono de acción propios.
  - `RepositoryMaterialRow`: archivos que se ven en un visor y filas que abren una página (formaciones), con el ícono de formación.
  - `SlideDeckEmbed`: tono del rótulo.
  - `SectionTabs` (las pestañas de Familias, Equipos y EIB): `hashSync`, para que la pestaña elegida quede en la dirección. Apagado en Diseño Curricular.
- **`lib/itinerarios-data.ts`:** el tipo de archivo suma la opción `accion: "ver"` (la usa el repositorio del Plan).
- **Familias, Equipos directivos y EIB:** sus listas pasan de chips sueltos a la caja de repositorio, igual que Modo Secundaria: una caja blanca, filas separadas por línea y el nombre del grupo como encabezado. Antes ese nombre era un rótulo chico en mayúsculas.
  - Quedan iguales los documentos, los enlaces y el orden.
  - En EIB, Efemérides pasa de dos columnas a una sola lista por grupo.
  - Efemérides y Proyectos llevan la flecha de página y el botón Compartir de la fila.
  - Proyectos conserva el numeral 01-04 y el nombre del nivel al costado de su caja.
  - Marco General sigue con chips porque no entraba en este pedido.

## Verificaciones

**Técnicas (hechas):**

- **Chequeo de tipos** (`tsc`): sin errores. **Build de producción:** sin errores; las rutas nuevas son estáticas (4 secciones de Secundaria y 3 niveles del Plan).
- **19 de 20 recorridos automáticos OK**, en Chrome:
  - Evaluación en 2 clics desde Inicio de Modo Secundaria (columna o barra inferior y pestaña), visible sin desplazar a 1440 y 390 px; la recarga mantiene la pestaña.
  - Dirección directa a un tema abre su pestaña, sin correr el encabezado; flechas del teclado entre pestañas.
  - Material de 3er grado en 2 clics (Primaria en la botonera y la pestaña 3er grado), en escritorio y en celular.
  - Diseño Curricular conserva su columna (Inicio, Áreas, Equipos directivos, Familias, EIB).
  - Sin desborde horizontal a 320 px en ninguna ruta nueva.
- **La comprobación que falla es de contraste (axe, WCAG 2.2 AA).** No es de lo nuevo: viene de los componentes que se reutilizan. La bajada de la fila de recurso está al 60 %, los metadatos del repositorio al 42 %, el rótulo del carrusel de formaciones al 50-60 % la bajada del botón de la columna (como "Materiales y formaciones" en Áreas) al 72 % y las etiquetas inactivas de la barra inferior de celular al 50 %, que ahora también aparece en los programas. Son los mismos hallazgos que el manual marca "A MEJORAR" en todo el sitio. Se corrige en pocas clases, pero cambia también Diseño Curricular: queda a decisión del equipo. Los numerales decorativos (ocultos para lectores de pantalla) quedan fuera de la revisión, porque WCAG exceptúa el texto decorativo.

**Con usuarios (no hecha):** todo lo anterior es comprobación técnica. Falta probar las tareas con docentes y equipos directivos, idealmente sumando a alguien que use lector de pantalla.

## Decisiones y dudas para el equipo

1. **Secciones de Modo Secundaria:** las cuatro agrupaciones y sus nombres son una propuesta. Adentro de cada una se conservó el orden del Campus.
2. **Nombres cortos** en las pestañas: "Alfabetización" (título real: "Fortalecer las trayectorias de los estudiantes"), "Jornada de Convivencia" (título real: "Jornada de Convivencia en Secundaria") y "Técnicas Profesionales y Orientadas" (título real: "Diseño Curricular Secundaria", para no repetir el nombre de la sección).
3. **Banda de Espacios Curriculares Articulados:** el degradé termina en un naranja apenas más profundo que el del Campus, para que el texto blanco se lea mejor. Aun así, el texto chico no llega a 4,5:1 en el tramo naranja. Hay que definirlo con identidad.
4. **Formaciones del área Matemática:** las 7 tarjetas del área en Diseño Curricular que hoy no tienen enlace coinciden con las formaciones por grado del Plan. Se podrían conectar desde la misma fuente de datos; no se tocó.
5. **Subpáginas:** Tutorías virtuales, ConectaDOS, Articulación, ¡Quedate! y Vivamos los juegos siguen siendo enlaces a sus páginas del Campus; su contenido no se suma acá. Si más adelante se rediseñan, conviene hacerlo como vistas propias.
6. **Datos a confirmar en el Campus** (detalle en el inventario):
   - el archivo de "Res 2630-14" se llama "Res 263-1.PDF";
   - "Anexo 02" de la Res 2630-14 es en realidad "Anexo III";
   - el PDF de Escuelas Agrotécnicas se llama "Programa Fortalecimiento de la Escuela Secundaria";
   - el aula de Alfabetización pide inscripción;
   - erratas en origen: "¡Quedate! te acompañaos" en el banner y "estudiates" en ConectaDOS;
   - la introducción de Modo Secundaria empieza con "Desde esa perspectiva…", como si faltara un párrafo anterior;
   - Resoluciones y Anexos se separaron por el título: es anexo lo que se titula "Anexo…" o termina en "- Anexo NN". "Res 160-14 y Anexo hasta página 50" quedó como resolución. Los Anexos 02 a 11 parecen ser de la Res 0069-11, pero no está verificado.

## Fuentes

- **Páginas del Campus**, relevadas el 19 y 20 de octubre de 2026:
  - campuseducativo.santafe.edu.ar/plan-provincial-de-matematica/
  - campuseducativo.santafe.edu.ar/programas/modo-secundaria/
  - las subpáginas de Modo Secundaria.
- **Prototipo** (rama `main`, commit `4ff01c6`) y su manual v0.1 con anexo técnico.
- **Capturas** de escritorio y celular en `capturas/`.

## Versiones probadas

En la misma sesión se probaron otras estructuras; las dos primeras quedaron guardadas para poder volver:

- **Una sola página por programa:** el programa como único botón de la columna; Modo Secundaria en una página larga con botonera de secciones.
- **Grados en el aside:** el Plan con Inicio · Inicial · Primaria · Secundaria en la columna, y Primaria abriendo los 7 grados al costado (una página por grado).
- **Inicio en el Plan:** la columna con un botón "Inicio" y una portada del Plan con tarjetas de niveles; se reemplazó por entrar directo a Educación Inicial.
- **Niveles en el aside:** el Plan con un solo botón en la columna principal y Educación Inicial · Primaria · Secundaria en la columna lateral, con los grados como desplegables dentro de cada categoría; se reemplazó por la botonera horizontal de la maqueta de Visuales Curricular (2026-11-10).
