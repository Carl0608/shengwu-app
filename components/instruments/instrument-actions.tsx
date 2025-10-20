"use client"

import type { Instrument } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Calendar, Send, FileCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockQualifications } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"

interface InstrumentActionsProps {
  instrument: Instrument
}

export function InstrumentActions({ instrument }: InstrumentActionsProps) {
  const router = useRouter()
  const user = useAppStore((state) => state.user)

  // 检查用户是否已有该仪器的资质
  const hasQualification = mockQualifications.some(
    (q) => q.userId === user?.id && q.instrumentId === instrument.id && q.status === "approved",
  )

  const hasPendingQualification = mockQualifications.some(
    (q) => q.userId === user?.id && q.instrumentId === instrument.id && q.status === "pending",
  )

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4">
      <div className="max-w-lg mx-auto flex gap-3">
        {instrument.requiresQualification && !hasQualification && (
          <Button
            variant={hasPendingQualification ? "outline" : "default"}
            className="flex-1"
            disabled={hasPendingQualification}
            onClick={() => router.push(`/qualifications/apply?instrumentId=${instrument.id}`)}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            {hasPendingQualification ? "资质审核中" : "申请资质"}
          </Button>
        )}
        <Button
          variant="default"
          className="flex-1"
          disabled={instrument.status !== "available" || (instrument.requiresQualification && !hasQualification)}
          onClick={() => router.push(`/reservations/create?instrumentId=${instrument.id}`)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          机时预约
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => router.push(`/samples/create?instrumentId=${instrument.id}`)}
        >
          <Send className="w-4 h-4 mr-2" />
          送样预约
        </Button>
      </div>
    </div>
  )
}
