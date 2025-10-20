"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockReservations, mockInstruments } from "@/lib/mock-data"
import { formatDateTime } from "@/lib/utils/date"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

export function RecentActivity() {
  const recentReservations = mockReservations.slice(0, 3)

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "待审核", variant: "secondary" },
      approved: { label: "已通过", variant: "default" },
      rejected: { label: "已拒绝", variant: "destructive" },
      completed: { label: "已完成", variant: "outline" },
      cancelled: { label: "已取消", variant: "outline" },
    }
    const config = variants[status] || { label: status, variant: "outline" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">最近预约</h2>
        <Link href="/profile/reservations" className="text-sm text-primary">
          查看全部
        </Link>
      </div>
      <div className="space-y-3">
        {recentReservations.map((reservation) => {
          const instrument = mockInstruments.find((i) => i.id === reservation.instrumentId)
          return (
            <Card key={reservation.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-1">{instrument?.name}</CardTitle>
                  {getStatusBadge(reservation.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateTime(reservation.startTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(reservation.endTime).getHours() - new Date(reservation.startTime).getHours()} 小时
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">用途：{reservation.purpose}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
