"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockTrainingRecords, mockInstruments } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils/date"

export function TrainingList() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">培训记录</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockTrainingRecords.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">暂无培训记录</div>
        ) : (
          mockTrainingRecords.map((record) => {
            const instrument = mockInstruments.find((i) => i.id === record.instrumentId)
            return (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{instrument?.name || "未知仪器"}</CardTitle>
                    <Badge variant={record.passed ? "default" : "destructive"}>
                      {record.passed ? "已通过" : "未通过"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>培训时间：{formatDate(record.trainedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>培训老师：{record.trainer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>培训时长：{record.duration} 小时</span>
                  </div>
                  {record.certificate && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Award className="w-4 h-4" />
                      <span>证书编号：{record.certificate}</span>
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
