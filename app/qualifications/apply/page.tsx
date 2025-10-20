import { MobileLayout } from "@/components/mobile-layout"
import { QualificationForm } from "@/components/qualifications/qualification-form"

export default function ApplyQualificationPage({
  searchParams,
}: {
  searchParams: { instrumentId?: string }
}) {
  return (
    <MobileLayout>
      <QualificationForm instrumentId={searchParams.instrumentId} />
    </MobileLayout>
  )
}
