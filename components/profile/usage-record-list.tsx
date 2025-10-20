"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockUsageRecords, mockInstruments } from "@/lib/mock-data"
import { formatDateTime } from "@/lib/utils/date"

export function UsageRecordList() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">使用记录</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockUsageRecords.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">暂无使用记录</div>
        ) : (
          mockUsageRecords.map((record) => {
            const instrument = mockInstruments.find((i) => i.id === record.instrumentId)
            return (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{instrument?.name || "未知仪器"}</CardTitle>
                    <Badge variant={record.status === "completed" ? "outline" : "default"}>
                      {record.status === "completed" ? "已完成" : "使用中"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>开始：{formatDateTime(record.startTime)}</span>
                  </div>
                  {record.endTime && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>结束：{formatDateTime(record.endTime)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>时长：{record.duration ? `${record.duration} 分钟` : "进行中"}</span>
                  </div>
                  {record.fee && (
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span>费用：¥{record.fee}</span>
                    </div>
                  )}
                  {record.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">备注：{record.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
