"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockQualifications, mockInstruments } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils/date"
import Link from "next/link"

const statusConfig = {
  pending: { label: "待审核", variant: "secondary" as const, icon: Clock },
  approved: { label: "已通过", variant: "default" as const, icon: CheckCircle },
  rejected: { label: "已拒绝", variant: "destructive" as const, icon: XCircle },
}

export function QualificationList() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">资质申请</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Link href="/qualifications/apply">
          <Button className="w-full">申请新资质</Button>
        </Link>

        {mockQualifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">暂无资质申请记录</div>
        ) : (
          mockQualifications.map((qualification) => {
            const instrument = mockInstruments.find((i) => i.id === qualification.instrumentId)
            const status = statusConfig[qualification.status]
            const StatusIcon = status.icon

            return (
              <Card key={qualification.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{instrument?.name || "未知仪器"}</CardTitle>
                    <Badge variant={status.variant} className="flex items-center gap-1">
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>申请时间：{formatDate(qualification.appliedAt)}</span>
                  </div>
                  {qualification.reviewedAt && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>审核时间：{formatDate(qualification.reviewedAt)}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">培训：</span>
                      <Badge variant={qualification.trainingCompleted ? "default" : "outline"}>
                        {qualification.trainingCompleted ? "已完成" : "未完成"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">考试：</span>
                      <Badge variant={qualification.examPassed ? "default" : "outline"}>
                        {qualification.examPassed ? "已通过" : "未通过"}
                      </Badge>
                    </div>
                  </div>
                  {qualification.reviewNote && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">审核意见：{qualification.reviewNote}</p>
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
