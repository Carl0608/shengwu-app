"use client"

import type { Reservation, Instrument } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, X } from "lucide-react"
import { formatDateTime } from "@/lib/utils/date"
import Link from "next/link"

interface ReservationCardProps {
  reservation: Reservation
  instrument?: Instrument
}

const statusConfig = {
  pending: { label: "待审核", variant: "secondary" as const },
  approved: { label: "已通过", variant: "default" as const },
  rejected: { label: "已拒绝", variant: "destructive" as const },
  completed: { label: "已完成", variant: "outline" as const },
  cancelled: { label: "已取消", variant: "outline" as const },
}

export function ReservationCard({ reservation, instrument }: ReservationCardProps) {
  const status = statusConfig[reservation.status]

  const handleCancel = () => {
    // 取消预约逻辑
    console.log("[v0] Cancel reservation:", reservation.id)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">
            <Link href={`/instruments/${instrument?.id}`} className="hover:text-primary">
              {instrument?.name || "未知仪器"}
            </Link>
          </CardTitle>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>{formatDateTime(reservation.startTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>
            {Math.round(
              (new Date(reservation.endTime).getTime() - new Date(reservation.startTime).getTime()) / 3600000,
            )}{" "}
            小时
          </span>
        </div>
        {instrument && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{instrument.location}</span>
          </div>
        )}
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">用途：{reservation.purpose}</p>
        </div>
        {reservation.status === "pending" && (
          <Button variant="outline" size="sm" onClick={handleCancel} className="w-full bg-transparent">
            <X className="w-4 h-4 mr-2" />
            撤销申请
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
