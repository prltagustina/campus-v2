"use client";

import { useState } from "react";
import { PillTabs } from "@/components/v3/pill-tabs";
import { RepositoryAccordionGroup, RepositoryFileGroup } from "@/components/v3/repository-accordion";
import type { CategoriaId, CategoriaPlan, Etapa } from "@/lib/programas/plan-matematica";

const TINTA = "#494963";

/**
 * Repositorio de un nivel del Plan (maqueta de Visuales Curricular,
 * 2026-11-10): arriba, los grados o años con las pestañas de idiomas de
 * Lenguas Extranjeras, en tinta (el rojo queda para el nivel y las
 * categorías, así se distinguen); abajo, las categorías del Campus una debajo
 * de la otra (Materiales, Formaciones, Juegos Matemáticos) con el repositorio
 * de "Itinerarios didácticos" de cada área. Una categoría abierta por vez y
 * la primera con contenido abierta al entrar; una categoría sin nada para ese
 * grado queda sin contenido, como en las áreas.
 */
export function PlanRepositorio({
  nivelId,
  nivelNombre,
  etapas,
  etapaTipo,
  porEtapa,
  color,
  colorTexto,
}: {
  nivelId: string;
  nivelNombre: string;
  etapas: Etapa[];
  etapaTipo?: "grado" | "año";
  /** Categorías de cada grado o año; sin etapas, una sola entrada "todo". */
  porEtapa: Record<string, CategoriaPlan[]>;
  color: string;
  colorTexto: string;
}) {
  const primeraConContenido = (slug: string) => porEtapa[slug]?.find((categoria) => categoria.archivos.length)?.id ?? null;
  const [etapa, setEtapa] = useState(etapas[0]?.slug ?? "todo");
  const [abierta, setAbierta] = useState<CategoriaId | null>(() => primeraConContenido(etapas[0]?.slug ?? "todo"));
  const categorias = porEtapa[etapa] ?? [];
  const panelId = `repositorio-${nivelId}`;

  // Al cambiar de grado sigue abierta la misma categoría, salvo que en ese
  // grado no tenga nada: ahí se abre la primera con contenido.
  const elegirEtapa = (slug: string) => {
    setEtapa(slug);
    const tiene = porEtapa[slug]?.some((categoria) => categoria.id === abierta && categoria.archivos.length);
    if (!tiene) setAbierta(primeraConContenido(slug));
  };

  return (
    <section aria-labelledby={`${panelId}-titulo`} className="pt-5 md:px-[14px] md:pt-6">
      <h2 id={`${panelId}-titulo`} className="sr-only">
        Materiales, formaciones y juegos de {nivelNombre}
      </h2>
      {etapas.length ? (
        <PillTabs
          options={etapas.map((e) => ({ id: e.slug, name: e.nombre }))}
          selectedId={etapa}
          onSelect={elegirEtapa}
          color={TINTA}
          ariaLabel={`${etapaTipo === "año" ? "Años" : "Grados"} de ${nivelNombre}`}
          panelId={panelId}
          idPrefix={`${nivelId}-etapa`}
          className="mb-5 px-4 md:mb-6 md:px-0"
        />
      ) : null}
      <div
        id={panelId}
        role={etapas.length ? "tabpanel" : undefined}
        aria-labelledby={etapas.length ? `${nivelId}-etapa-${etapa}` : undefined}
        className="flex w-full min-w-0 flex-col gap-2.5 px-4 md:px-0"
      >
        {categorias.map((categoria) => (
          <RepositoryAccordionGroup
            key={categoria.id}
            id={`${nivelId}-${etapa}-${categoria.id}`}
            title={categoria.titulo}
            total={categoria.archivos.length}
            color={color}
            activeForeground={colorTexto}
            open={abierta === categoria.id}
            onToggle={() => setAbierta((actual) => (actual === categoria.id ? null : categoria.id))}
          >
            <RepositoryFileGroup files={categoria.archivos.map((file) => ({ file }))} color={color} />
          </RepositoryAccordionGroup>
        ))}
      </div>
    </section>
  );
}
