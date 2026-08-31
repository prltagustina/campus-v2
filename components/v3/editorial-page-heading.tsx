import Image from "next/image";

interface EditorialPageHeadingProps {
  title: string;
  imageSrc?: string;
}

/** Cabecera editorial compartida para las secciones institucionales. */
export function EditorialPageHeading({ title, imageSrc }: EditorialPageHeadingProps) {
  return (
    <header
      className={`relative flex shrink-0 items-center overflow-hidden border-b border-[#494963]/[.08] bg-white px-5 py-3 text-[#494963] md:px-10 ${
        imageSrc ? "min-h-[100px] md:min-h-[168px]" : "min-h-[72px] md:min-h-[76px]"
      }`}
    >
      {imageSrc ? (
        <>
          <Image src={imageSrc} alt="" fill priority className="object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" aria-hidden="true" />
        </>
      ) : null}
      <div className="relative mx-auto w-full max-w-4xl">
        <h1 className="font-display text-[1.35rem] font-medium leading-tight tracking-[-.025em] sm:text-2xl md:text-[1.65rem]">
          {title}
        </h1>
      </div>
    </header>
  );
}
