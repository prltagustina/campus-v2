import Image from "next/image";

interface EditorialPageHeadingProps {
  title: string;
  imageSrc?: string;
}

/** Cabecera editorial compartida para las secciones institucionales. */
export function EditorialPageHeading({ title, imageSrc }: EditorialPageHeadingProps) {
  return (
    <header
      className="relative flex min-h-[116px] shrink-0 items-center overflow-hidden border-b border-[#494963]/[.08] bg-white px-5 py-4 text-[#494963] md:min-h-[180px] md:px-10"
    >
      {imageSrc ? (
        <>
          <Image src={imageSrc} alt="" fill priority className="object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" aria-hidden="true" />
        </>
      ) : null}
      <div className="relative mx-auto w-full max-w-4xl">
        <h1 className="text-balance font-display text-[1.7rem] font-medium leading-[1.12] tracking-[-.03em] sm:text-[2rem] sm:max-w-[20ch] md:text-[2.6rem]">
          {title}
        </h1>
      </div>
    </header>
  );
}
