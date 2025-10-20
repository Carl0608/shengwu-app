import { MobileLayout } from "@/components/mobile-layout";
import { AdminInstrumentDetail } from "@/components/admin/admin-instrument-detail";
import { mockInstruments } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // 为静态生成返回所有可能的仪器 id
  return mockInstruments.map((instrument) => ({
    id: instrument.id,
  }));
}

export default function AdminInstrumentDetailPage({ params }: { params: { id: string } }) {
  const instrument = mockInstruments.find((i) => i.id === params.id);

  if (!instrument) {
    notFound();
  }

  return (
    <MobileLayout>
      <AdminInstrumentDetail instrument={instrument} />
    </MobileLayout>
  );
}