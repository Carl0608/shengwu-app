import { MobileLayout } from "@/components/mobile-layout"
import { SampleForm } from "@/components/samples/sample-form"

export default function CreateSamplePage({
  searchParams,
}: {
  searchParams: { instrumentId?: string }
}) {
  return (
    <MobileLayout>
      <SampleForm instrumentId={searchParams.instrumentId} />
    </MobileLayout>
  )
}
