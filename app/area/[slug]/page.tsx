import { notFound } from "next/navigation";
import { areasData } from "@/lib/areas-data";
import { AreaDetailContent } from "./area-detail-content";

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = areasData.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  return <AreaDetailContent area={area} />;
}

export async function generateStaticParams() {
  return areasData.map((area) => ({
    slug: area.slug,
  }));
}
