import { SectionLandingCover } from "@/components/v3/section-landing-cover";
import { AreasMaterialsIcon } from "@/components/v3/navigation-icons";
import { AreasQuickPicker } from "@/components/v3/areas-quick-picker";
import { pendingCopy } from "@/lib/v3-config";

export default function AreasLandingPage() {
  return (
    <>
      <SectionLandingCover
        title={"Áreas y\nMateriales"}
        description={pendingCopy.areas}
        icon={AreasMaterialsIcon}
        variant="areas"
      />
      <AreasQuickPicker />
    </>
  );
}
