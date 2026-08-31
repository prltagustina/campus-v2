import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

export function SectionLandingCover({
  title,
  description,
  icon: Icon,
  imageSrc,
  imageAlt = "",
  variant,
}: {
  title: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  imageSrc?: string;
  imageAlt?: string;
  variant: "areas" | "cycles" | "territory";
}) {
  const hasIcon = Boolean(imageSrc || Icon);

  return (
    <section className={`v3-section-cover v3-section-cover--${variant} ${!hasIcon ? "v3-section-cover--no-icon" : ""}`}>
      <div className={`v3-section-cover__inner ${!hasIcon ? "v3-section-cover__inner--no-icon" : ""}`}>
        <header className="v3-section-cover__copy">
          <h1>{title}</h1>
          <span className="v3-section-cover__rule" aria-hidden="true" />
          <p>{description}</p>
        </header>

        {hasIcon ? (
          <div className="v3-cover-icon-stage" aria-hidden="true">
            <div className={`v3-cover-icon v3-cover-icon--${variant}`}>
              {imageSrc ? <Image src={imageSrc} alt={imageAlt} width={231} height={231} className="v3-cover-icon__image" /> : Icon ? <Icon strokeWidth={1.2} focusable="false" /> : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
