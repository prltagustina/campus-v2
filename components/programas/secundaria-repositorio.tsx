"use client";

import { useState } from "react";
import { RepositoryAccordionGroup, RepositoryFileGroup } from "@/components/v3/repository-accordion";
import type { ItinerarioFile } from "@/lib/itinerarios-data";

export interface CategoriaSecundaria {
  id: string;
  titulo: string;
  /** Subgrupos con nombre (Resoluciones / Anexos); uno sin nombre muestra los archivos directo. */
  grupos: { id: string; titulo?: string; archivos: ItinerarioFile[] }[];
}

/**
 * Repositorio con categorías desplegables, el mismo de "Itinerarios
 * didácticos" de cada área (RepositoryAccordionGroup + RepositoryFileGroup),
 * en tinta. Adentro, los subgrupos (Resoluciones / Anexos) se abren como los
 * grados dentro de una categoría del Plan. Una categoría y un subgrupo
 * abiertos por vez, y los primeros abiertos al entrar, para no mostrar todo
 * colapsado. Lo usa Diseño Curricular Secundaria (Técnicas Profesionales /
 * Orientadas).
 */
export function RepositorioCategorias({ id, categorias }: { id: string; categorias: CategoriaSecundaria[] }) {
  const [abierta, setAbierta] = useState<string | null>(categorias[0]?.id ?? null);
  const [grupoAbierto, setGrupoAbierto] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(categorias.map((categoria) => [categoria.id, categoria.grupos[0]?.id ?? null])),
  );

  return (
    <div className="flex w-full min-w-0 flex-col gap-2.5">
      {categorias.map((categoria) => {
        const conGrupos = categoria.grupos.some((grupo) => grupo.titulo);
        return (
          <RepositoryAccordionGroup
            key={categoria.id}
            id={`${id}-${categoria.id}`}
            title={categoria.titulo}
            total={categoria.grupos.reduce((suma, grupo) => suma + grupo.archivos.length, 0)}
            color="#494963"
            activeForeground="#FFFFFF"
            open={abierta === categoria.id}
            onToggle={() => setAbierta((actual) => (actual === categoria.id ? null : categoria.id))}
          >
            {conGrupos ? (
              categoria.grupos.map((grupo) => (
                <RepositoryAccordionGroup
                  key={grupo.id}
                  id={`${id}-${categoria.id}-${grupo.id}`}
                  title={grupo.titulo ?? ""}
                  total={grupo.archivos.length}
                  color="#494963"
                  activeForeground="#FFFFFF"
                  size="sm"
                  open={grupoAbierto[categoria.id] === grupo.id}
                  onToggle={() => setGrupoAbierto((actual) => ({ ...actual, [categoria.id]: actual[categoria.id] === grupo.id ? null : grupo.id }))}
                >
                  <RepositoryFileGroup files={grupo.archivos.map((file) => ({ file }))} color="#494963" />
                </RepositoryAccordionGroup>
              ))
            ) : (
              <RepositoryFileGroup files={categoria.grupos.flatMap((grupo) => grupo.archivos.map((file) => ({ file })))} color="#494963" />
            )}
          </RepositoryAccordionGroup>
        );
      })}
    </div>
  );
}
