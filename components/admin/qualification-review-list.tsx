"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { mockQualifications, mockInstruments, mockUsers } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils/date"
import { CheckCircle, XCircle, User, Calendar } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function QualificationReviewList() {
  const { toast } = useToast()
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({})

  const pendingQualifications = mockQualifications.filter((q) => q.status === "pending")

  const handleApprove = (qualificationId: string) => {
    toast({
      title: "审核通过",
      description: "资质申请已通过",
    })
  }

  const handleReject = (qualificationId: string) => {
    const note = reviewNotes[qualificationId]
    if (!note) {
      toast({
        title: "请填写拒绝原因",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "已拒绝",
      description: "资质申请已拒绝",
    })
  }

  if (pendingQualifications.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">暂无待审核的资质申请</div>
  }

  return (
    <div className="space-y-4">
      {pendingQualifications.map((qualification) => {
        const instrument = mockInstruments.find((i) => i.id === qualification.instrumentId)
        const user = mockUsers.find((u) => u.id === qualification.userId)

        return (
          <Card key={qualification.id}>
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>申请时间：{formatDate(qualification.appliedAt)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">培训：</span>
                  <Badge variant={qualification.trainingCompleted ? "default" : "outline"}>
                    {qualification.trainingCompleted ? "已完成" : "未完成"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">考试：</span>
                  <Badge variant={qualification.examPassed ? "default" : "outline"}>
                    {qualification.examPassed ? "已通过" : "未通过"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">审核意见</label>
                <Textarea
                  placeholder="请填写审核意见（拒绝时必填）"
                  value={reviewNotes[qualification.id] || ""}
                  onChange={(e) =>
                    setReviewNotes((prev) => ({
                      ...prev,
                      [qualification.id]: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleReject(qualification.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  拒绝
                </Button>
                <Button className="flex-1" onClick={() => handleApprove(qualification.id)}>
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
