"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { mockReservations, mockInstruments, mockUsers } from "@/lib/mock-data"
import { formatDateTime } from "@/lib/utils/date"
import { CheckCircle, XCircle, User, Calendar, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function ReservationReviewList() {
  const { toast } = useToast()
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({})

  const pendingReservations = mockReservations.filter((r) => r.status === "pending")

  const handleApprove = (reservationId: string) => {
    toast({
      title: "审核通过",
      description: "预约申请已通过",
    })
  }

  const handleReject = (reservationId: string) => {
    const note = reviewNotes[reservationId]
    if (!note) {
      toast({
        title: "请填写拒绝原因",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "已拒绝",
      description: "预约申请已拒绝",
    })
  }

  if (pendingReservations.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">暂无待审核的预约申请</div>
  }

  return (
    <div className="space-y-4">
      {pendingReservations.map((reservation) => {
        const instrument = mockInstruments.find((i) => i.id === reservation.instrumentId)
        const user = mockUsers.find((u) => u.id === reservation.userId)

        return (
          <Card key={reservation.id}>
            <CardHeader>
              <CardTitle className="text-base">{instrument?.name || "未知仪器"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-muted-foreground">({user?.department})</span>
                </div>
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
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm font-medium mb-1">使用目的</p>
                <p className="text-sm text-muted-foreground">{reservation.purpose}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">审核意见</label>
                <Textarea
                  placeholder="请填写审核意见（拒绝时必填）"
                  value={reviewNotes[reservation.id] || ""}
                  onChange={(e) =>
                    setReviewNotes((prev) => ({
                      ...prev,
                      [reservation.id]: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleReject(reservation.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  拒绝
                </Button>
                <Button className="flex-1" onClick={() => handleApprove(reservation.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  通过
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
