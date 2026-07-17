interface EditorialPageHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Cabecera editorial compartida para las secciones institucionales. */
export function EditorialPageHeading({ eyebrow, title, description }: EditorialPageHeadingProps) {
  return (
    <header className="flex min-h-[90px] shrink-0 items-center border-b border-[#494963]/[.08] bg-white px-5 py-3.5 text-[#494963] md:min-h-[96px] md:px-10 md:py-3">
      <div className="mx-auto grid w-full max-w-4xl gap-1.5 md:grid-cols-[minmax(0,.9fr)_minmax(18rem,1.1fr)] md:items-end md:gap-10">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-[#494963]/30" />
            <p className="text-[8px] font-semibold uppercase tracking-[.19em] text-[#494963]/45 sm:text-[9px]">
              {eyebrow}
            </p>
          </div>
          <h1 className="mt-1 font-display text-[1.35rem] font-medium leading-[1.06] tracking-[-.025em] sm:text-2xl md:text-[1.7rem]">
            {title}
          </h1>
        </div>

        <p className="max-w-2xl text-[11px] leading-[1.45] text-[#6F6F83] sm:text-xs md:pb-0.5 md:text-[13px]">
          {description}
        </p>
      </div>
    </header>
  );
}
