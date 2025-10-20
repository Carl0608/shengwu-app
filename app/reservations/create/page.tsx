import { MobileLayout } from "@/components/mobile-layout"
import { ReservationForm } from "@/components/reservations/reservation-form"

export default function CreateReservationPage({
  searchParams,
}: {
  searchParams: { instrumentId?: string }
}) {
  return (
    <MobileLayout>
      <ReservationForm instrumentId={searchParams.instrumentId} />
    </MobileLayout>
  )
}
