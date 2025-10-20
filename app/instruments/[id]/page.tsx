import { MobileLayout } from "@/components/mobile-layout"
import { InstrumentDetail } from "@/components/instruments/instrument-detail"
import { InstrumentActions } from "@/components/instruments/instrument-actions"
import { mockInstruments } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
    // 这里需要返回所有可能的 id（例如从 API、数据库或本地数据中获取）
    // 示例：假设你的乐器 id 是 1、2、3
    return mockInstruments;
}
export default function InstrumentDetailPage({ params }: { params: { id: string } }) {
  const instrument = mockInstruments.find((i) => i.id === params.id)

  if (!instrument) {
    notFound()
  }

  return (
    <MobileLayout>
      <InstrumentDetail instrument={instrument} />
      <InstrumentActions instrument={instrument} />
    </MobileLayout>
  )
}
