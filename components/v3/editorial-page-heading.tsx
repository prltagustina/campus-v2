interface EditorialPageHeadingProps {
  title: string;
}

/** Cabecera editorial compartida para las secciones institucionales. */
export function EditorialPageHeading({ title }: EditorialPageHeadingProps) {
  return (
    <header className="flex min-h-[72px] shrink-0 items-center border-b border-[#494963]/[.08] bg-white px-5 py-3 text-[#494963] md:min-h-[76px] md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-display text-[1.35rem] font-medium leading-tight tracking-[-.025em] sm:text-2xl md:text-[1.65rem]">
          {title}
        </h1>
      </div>
    </header>
  );
}
