/**
 * Tipos compartidos por los programas del Campus que no son Diseño Curricular
 * (Plan Provincial de Matemática, Modo Secundaria). Los datos viven en
 * archivos propios por programa; la presentación, en components/programas.
 */

/**
 * Qué pasa al usar el enlace, según el comportamiento real del destino
 * (verificado en el relevamiento de octubre 2026):
 * - ver: abre el documento en un visor (Google Drive o el visor de PDF del
 *   navegador). No descarga.
 * - descargar: descarga directa del archivo (Drive `uc?export=download`).
 * - aula: abre un aula de la Plataforma Educativa (Moodle).
 * - pagina: abre otra página del Campus actual.
 * - presentacion: abre una presentación de Google.
 */
export type AccionTipo = "ver" | "descargar" | "aula" | "pagina" | "presentacion";

export interface Accion {
  tipo: AccionTipo;
  url: string;
}

/** Ubicación del recurso en la página actual del Campus (para el inventario). */
export interface OrigenRecurso {
  pagina: string;
  ubicacion: string;
}

export interface Recurso {
  id: string;
  /** Título tal como figura en el Campus. */
  titulo: string;
  /** Bajada institucional que acompaña al título en el Campus. */
  detalle?: string;
  /** Formato o metadatos verificados (p. ej. "PDF · 3,3 MB"). Sin inventar. */
  meta?: string;
  /** Portada publicada en el Campus. */
  portada?: string;
  /** "horizontal" para banners de programas (2:1); por defecto, tapa de documento (3:4). */
  portadaFormato?: "vertical" | "horizontal";
  /** Solo si la imagen tiene texto propio que hay que transcribir. */
  portadaAlt?: string;
  /** Acciones en orden de importancia. */
  acciones: Accion[];
  /** Advertencia sobre el destino (p. ej. requiere usuario). */
  aviso?: string;
  /** Subgrupo dentro de su grupo, cuando el repositorio los separa (p. ej. "Resoluciones" / "Anexos"). */
  subgrupo?: string;
  origen: OrigenRecurso[];
}

/** Un grupo de recursos con un rótulo (p. ej. "Materiales", "Formaciones"). */
export interface GrupoRecursos {
  id: string;
  titulo: string;
  recursos: Recurso[];
}

