"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { mockInstruments } from "@/lib/mock-data"
import { ArrowLeft, GraduationCap, FileCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QualificationFormProps {
  instrumentId?: string
}

export function QualificationForm({ instrumentId }: QualificationFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [selectedInstrumentId, setSelectedInstrumentId] = useState(instrumentId || "")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedInstrument = mockInstruments.find((i) => i.id === selectedInstrumentId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms) {
      toast({
        title: "请同意使用条款",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      toast({
        title: "申请成功",
        description: "您的资质申请已提交，等待管理员审核",
      })
      router.push("/profile/qualifications")
    }, 1000)
  }

  return (
    <div className="pb-24">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">申请使用资质</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>资质申请</CardTitle>
            <CardDescription>申请仪器使用资质需要完成培训和考试</CardDescription>
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
                    .filter((i) => i.requiresQualification)
                    .map((instrument) => (
                      <SelectItem key={instrument.id} value={instrument.id}>
                        {instrument.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {selectedInstrument && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  培训要求
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">申请该仪器使用资质需要完成以下步骤：</p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>阅读仪器使用手册和安全规范</li>
                  <li>参加线下培训课程（约3小时）</li>
                  <li>通过在线考试（80分及格）</li>
                  <li>等待管理员审核通过</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  使用条款
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2 text-muted-foreground">
                  <p>1. 使用仪器前必须提前预约，不得擅自使用</p>
                  <p>2. 严格按照操作规程使用仪器，确保安全</p>
                  <p>3. 使用完毕后及时清理，做好使用记录</p>
                  <p>4. 如发现仪器故障，立即停止使用并报告管理员</p>
                  <p>5. 违规使用将被取消使用资格</p>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    我已阅读并同意以上使用条款
                  </label>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4">
          <div className="max-w-lg mx-auto flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 bg-transparent">
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting || !agreedToTerms || !selectedInstrumentId} className="flex-1">
              {isSubmitting ? "提交中..." : "提交申请"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
