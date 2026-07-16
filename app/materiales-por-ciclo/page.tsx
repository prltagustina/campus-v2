import { SectionLandingCover } from "@/components/v3/section-landing-cover";
import { CycleMaterialsIcon } from "@/components/v3/navigation-icons";
import { pendingCopy } from "@/lib/v3-config";

export default function CyclesLandingPage() {
  return (
    <SectionLandingCover
      title={"Materiales\npor Ciclo"}
      description={pendingCopy.cycles}
      icon={CycleMaterialsIcon}
      variant="cycles"
    />
  );
}
