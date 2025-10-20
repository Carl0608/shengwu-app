"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockInstruments, mockQualifications, mockAnnouncements } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

interface ReservationFormProps {
  instrumentId?: string
}

export function ReservationForm({ instrumentId }: ReservationFormProps) {
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const { toast } = useToast()

  const [selectedInstrumentId, setSelectedInstrumentId] = useState(instrumentId || "")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState("2")
  const [purpose, setPurpose] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedInstrument = mockInstruments.find((i) => i.id === selectedInstrumentId)

  // 检查资格
  const checkQualifications = () => {
    const issues: string[] = []

    if (!user) {
      issues.push("用户未登录")
      return issues
    }

    if (user.status === "banned") {
      issues.push("账号已被禁止预约")
    }

    if (selectedInstrument?.requiresQualification) {
      const hasQualification = mockQualifications.some(
        (q) => q.userId === user.id && q.instrumentId === selectedInstrumentId && q.status === "approved",
      )
      if (!hasQualification) {
        issues.push("未获得该仪器使用资质")
      }
    }

    // 检查必读公告
    const mustReadAnnouncements = mockAnnouncements.filter(
      (a) => a.mustRead && (!a.instrumentId || a.instrumentId === selectedInstrumentId),
    )
    if (mustReadAnnouncements.length > 0) {
      issues.push(`有 ${mustReadAnnouncements.length} 条必读公告未阅读`)
    }

    return issues
  }

  const qualificationIssues = selectedInstrumentId ? checkQualifications() : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (qualificationIssues.length > 0) {
      toast({
        title: "预约失败",
        description: qualificationIssues.join("、"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      toast({
        title: "预约成功",
        description: "您的预约申请已提交，等待管理员审核",
      })
      router.push("/reservations")
    }, 1000)
  }

  return (
    <div className="pb-24">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">创建预约</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>预约信息</CardTitle>
            <CardDescription>请填写预约的详细信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instrument">选择仪器 *</Label>
              <Select value={selectedInstrumentId} onValueChange={setSelectedInstrumentId} required>
                <SelectTrigger id="instrument">
                  <SelectValue placeholder="请选择仪器" />
                </SelectTrigger>
                <SelectContent>
                  {mockInstruments
                    .filter((i) => i.status === "available")
                    .map((instrument) => (
                      <SelectItem key={instrument.id} value={instrument.id}>
                        {instrument.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">预约日期 *</Label>
              <Input
                id="date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">开始时间 *</Label>
                <Input
                  id="time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">时长（小时）*</Label>
                <Select value={duration} onValueChange={setDuration} required>
                  <SelectTrigger id="duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 小时</SelectItem>
                    <SelectItem value="2">2 小时</SelectItem>
                    <SelectItem value="3">3 小时</SelectItem>
                    <SelectItem value="4">4 小时</SelectItem>
                    <SelectItem value="6">6 小时</SelectItem>
                    <SelectItem value="8">8 小时</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">使用目的 *</Label>
              <Textarea
                id="purpose"
                placeholder="请简要说明使用目的和实验内容"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {qualificationIssues.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>资格审查未通过</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {qualificationIssues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {selectedInstrument && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-blue-900 mb-2">仪器信息</p>
              <div className="text-sm text-blue-800 space-y-1">
                <p>位置：{selectedInstrument.location}</p>
                <p>联系人：{selectedInstrument.contact}</p>
                <p>电话：{selectedInstrument.contactPhone}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4">
          <div className="max-w-lg mx-auto flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 bg-transparent">
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting || qualificationIssues.length > 0} className="flex-1">
              {isSubmitting ? "提交中..." : "提交预约"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
