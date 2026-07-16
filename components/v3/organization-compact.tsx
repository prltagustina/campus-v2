import { BookOpen, CheckCircle2, Compass, FileText, Lightbulb, Library } from "lucide-react";

const items = [
  ["01", "Presentación del área", "Fundamentos, sentido formativo y ejes de contenido que orientan la propuesta curricular.", Compass],
  ["02", "Objetivos", "Metas de aprendizaje por ciclo y para séptimo grado.", CheckCircle2],
  ["03", "Contenidos", "Organizados en cuadros por eje y grado, con progresión clara.", BookOpen],
  ["04", "Enfoques transversales", "Etiquetas que relacionan los contenidos con los enfoques.", Lightbulb],
  ["05", "Recomendaciones", "Orientaciones para la enseñanza y la evaluación.", FileText],
  ["06", "Lecturas y glosario", "Bibliografía y conceptos para profundizar.", Library],
] as const;

export function OrganizationCompact({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`rounded-3xl p-6 shadow-[0_8px_30px_rgba(73,73,99,.06)] md:p-10 ${dark ? "bg-[#494963] text-white" : "bg-white text-[#494963]"}`}>
      <h2 className="font-display text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">Cómo está<br />organizada cada área</h2>
      {!dark && <p className="mt-2 text-sm text-[#494963]/45">Todas comparten una misma estructura de seis secciones.</p>}
      <div className="scrollbar-hide mt-8 flex snap-x gap-2 overflow-x-auto pb-2">
        {items.map(([number, title, description, Icon]) => <article key={number} className={`min-h-[210px] w-[220px] shrink-0 snap-start rounded-lg p-5 ${dark ? "bg-white text-[#494963]" : "bg-[#F5F5F7]"}`}>
          <div className="flex items-center gap-2 text-[#494963]/35"><Icon className="h-4 w-4" /><span className="text-xl font-bold">{number}</span></div>
          <h3 className="mt-5 text-sm font-extrabold">{title}</h3>
          <p className="mt-4 text-xs leading-relaxed text-[#494963]/50">{description}</p>
        </article>)}
      </div>
      <div className="mt-4 flex justify-center gap-1"><i className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-white" : "bg-[#494963]"}`} /><i className="h-1.5 w-1.5 rounded-full bg-[#CFCFD6]" /><i className="h-1.5 w-1.5 rounded-full bg-[#CFCFD6]" /></div>
    </section>
  );
}
