"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockFeeRecords } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils/date"

const statusConfig = {
  pending: { label: "待确认", variant: "secondary" as const },
  confirmed: { label: "已确认", variant: "default" as const },
  disputed: { label: "有异议", variant: "destructive" as const },
}

const typeConfig = {
  usage: "使用费",
  sample: "送样费",
  training: "培训费",
  other: "其他",
}

export function FeeList() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const filteredFees = mockFeeRecords.filter((f) => {
    if (activeTab === "all") return true
    return f.status === activeTab
  })

  const totalAmount = filteredFees.reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">扣费记录</h1>
        </div>
        <div className="bg-primary-foreground/10 rounded-lg p-4">
          <p className="text-sm text-primary-foreground/80 mb-1">总计费用</p>
          <p className="text-3xl font-bold">¥{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="pending">待确认</TabsTrigger>
            <TabsTrigger value="confirmed">已确认</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="space-y-4 mt-0">
            {filteredFees.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">暂无扣费记录</div>
            ) : (
              filteredFees.map((fee) => {
                const status = statusConfig[fee.status]
                return (
                  <Card key={fee.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{typeConfig[fee.type]}</CardTitle>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <DollarSign className="w-5 h-5" />
                        <span>¥{fee.amount.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{fee.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>创建时间：{formatDate(fee.createdAt)}</span>
                      </div>
                      {fee.confirmedAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>确认时间：{formatDate(fee.confirmedAt)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
