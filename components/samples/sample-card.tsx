"use client"

import type { SampleSubmission, Instrument } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package, AlertCircle } from "lucide-react"
import { formatDate } from "@/lib/utils/date"
import Link from "next/link"

interface SampleCardProps {
  sample: SampleSubmission
  instrument?: Instrument
}

const statusConfig = {
  pending: { label: "待审核", variant: "secondary" as const },
  approved: { label: "已通过", variant: "default" as const },
  rejected: { label: "已拒绝", variant: "destructive" as const },
  testing: { label: "检测中", variant: "default" as const },
  completed: { label: "已完成", variant: "outline" as const },
}

const urgencyConfig = {
  normal: { label: "普通", className: "bg-gray-100 text-gray-700" },
  urgent: { label: "加急", className: "bg-red-100 text-red-700" },
}

export function SampleCard({ sample, instrument }: SampleCardProps) {
  const status = statusConfig[sample.status]
  const urgency = urgencyConfig[sample.urgency]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-base">
            <Link href={`/instruments/${instrument?.id}`} className="hover:text-primary">
              {instrument?.name || "未知仪器"}
            </Link>
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={urgency.className}>{urgency.label}</Badge>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{sample.sampleName}</span>
          <span className="text-muted-foreground">({sample.sampleType})</span>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>数量：{sample.quantity} 个</p>
          <p>检测项目：{sample.testItems.join("、")}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>提交时间：{formatDate(sample.submittedAt)}</span>
        </div>
        {sample.expectedCompletionDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span>预计完成：{formatDate(sample.expectedCompletionDate)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
