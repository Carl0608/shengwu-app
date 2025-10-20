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
import { Checkbox } from "@/components/ui/checkbox"
import { mockInstruments } from "@/lib/mock-data"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SampleFormProps {
  instrumentId?: string
}

const testItemOptions = ["表面形貌观察", "元素分析", "结构分析", "成分分析", "纯度检测", "含量测定", "其他"]

export function SampleForm({ instrumentId }: SampleFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [selectedInstrumentId, setSelectedInstrumentId] = useState(instrumentId || "")
  const [sampleName, setSampleName] = useState("")
  const [sampleType, setSampleType] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [testItems, setTestItems] = useState<string[]>([])
  const [urgency, setUrgency] = useState<"normal" | "urgent">("normal")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTestItemToggle = (item: string) => {
    setTestItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (testItems.length === 0) {
      toast({
        title: "请选择检测项目",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      toast({
        title: "送样成功",
        description: "您的送样申请已提交，等待管理员审核",
      })
      router.push("/samples")
    }, 1000)
  }

  return (
    <div className="pb-24">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">创建送样</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>送样信息</CardTitle>
            <CardDescription>请填写送样的详细信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instrument">选择仪器 *</Label>
              <Select value={selectedInstrumentId} onValueChange={setSelectedInstrumentId} required>
                <SelectTrigger id="instrument">
                  <SelectValue placeholder="请选择仪器" />
                </SelectTrigger>
                <SelectContent>
                  {mockInstruments.map((instrument) => (
                    <SelectItem key={instrument.id} value={instrument.id}>
                      {instrument.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sampleName">样品名称 *</Label>
              <Input
                id="sampleName"
                placeholder="请输入样品名称"
                value={sampleName}
                onChange={(e) => setSampleName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sampleType">样品类型 *</Label>
                <Select value={sampleType} onValueChange={setSampleType} required>
                  <SelectTrigger id="sampleType">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="固体粉末">固体粉末</SelectItem>
                    <SelectItem value="液体">液体</SelectItem>
                    <SelectItem value="薄膜">薄膜</SelectItem>
                    <SelectItem value="块状">块状</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">样品数量 *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>检测项目 *</Label>
              <div className="space-y-2">
                {testItemOptions.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={item}
                      checked={testItems.includes(item)}
                      onCheckedChange={() => handleTestItemToggle(item)}
                    />
                    <label
                      htmlFor={item}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">紧急程度 *</Label>
              <Select value={urgency} onValueChange={(v) => setUrgency(v as "normal" | "urgent")} required>
                <SelectTrigger id="urgency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">普通（7-10个工作日）</SelectItem>
                  <SelectItem value="urgent">加急（3-5个工作日，需额外费用）</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">样品描述 *</Label>
              <Textarea
                id="description"
                placeholder="请详细描述样品信息、检测要求等"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-4">
            <p className="text-sm font-medium text-amber-900 mb-2">送样须知</p>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• 样品需密封包装，标注样品名称和编号</li>
              <li>• 危险品需提前说明并采取安全措施</li>
              <li>• 送样前请与仪器负责人确认检测方案</li>
              <li>• 检测完成后请及时取回样品</li>
            </ul>
          </CardContent>
        </Card>

        <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4">
          <div className="max-w-lg mx-auto flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 bg-transparent">
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "提交中..." : "提交送样"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
