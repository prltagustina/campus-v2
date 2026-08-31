import { notFound } from "next/navigation";
import { SectionLandingCover } from "@/components/v3/section-landing-cover";
import { CycleMaterialsIcon } from "@/components/v3/navigation-icons";
import { pendingCopy } from "@/lib/v3-config";
import { MATERIALES_POR_CICLO_ENABLED } from "@/lib/constants";

export default function CyclesLandingPage() {
  if (!MATERIALES_POR_CICLO_ENABLED) notFound();

  return (
    <SectionLandingCover
      title={"Materiales\npor Ciclo"}
      description={pendingCopy.cycles}
      icon={CycleMaterialsIcon}
      variant="cycles"
    />
  );
}
