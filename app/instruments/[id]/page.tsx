import { MobileLayout } from "@/components/mobile-layout"
import { InstrumentDetail } from "@/components/instruments/instrument-detail"
import { InstrumentActions } from "@/components/instruments/instrument-actions"
import { mockInstruments } from "@/lib/mock-data"
import { notFound } from "next/navigation"

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
