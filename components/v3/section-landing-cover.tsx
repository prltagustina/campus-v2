import type { ComponentType, SVGProps } from "react";

export function SectionLandingCover({
  title,
  description,
  icon: Icon,
  variant,
}: {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  variant: "areas" | "cycles";
}) {
  return (
    <section className={`v3-section-cover v3-section-cover--${variant}`}>
      <div className="v3-section-cover__inner">
        <header className="v3-section-cover__copy">
          <h1>{title}</h1>
          <span className="v3-section-cover__rule" aria-hidden="true" />
          <p>{description}</p>
        </header>

        <div className="v3-cover-icon-stage" aria-hidden="true">
          <div className={`v3-cover-icon v3-cover-icon--${variant}`}>
            <Icon strokeWidth={1.2} focusable="false" />
          </div>
        </div>
      </div>
    </section>
  );
}
