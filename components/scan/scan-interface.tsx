"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Camera, CheckCircle, XCircle, Clock } from "lucide-react"
import { mockInstruments, mockQualifications, mockUsageRecords } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

type ScanStatus = "idle" | "scanning" | "success" | "error"

export function ScanInterface() {
  const user = useAppStore((state) => state.user)
  const { toast } = useToast()
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle")
  const [scannedInstrument, setScannedInstrument] = useState<(typeof mockInstruments)[0] | null>(null)
  const [action, setAction] = useState<"check-in" | "check-out" | null>(null)

  // 模拟扫码
  const handleScan = (scanAction: "check-in" | "check-out") => {
    setScanStatus("scanning")
    setAction(scanAction)

    // 模拟扫码过程
    setTimeout(() => {
      // 随机选择一个仪器
      const instrument = mockInstruments[0]
      setScannedInstrument(instrument)

      // 检查权限
      const hasQualification = mockQualifications.some(
        (q) => q.userId === user?.id && q.instrumentId === instrument.id && q.status === "approved",
      )

      if (!hasQualification && instrument.requiresQualification) {
        setScanStatus("error")
        toast({
          title: "权限不足",
          description: "您没有该仪器的使用资质",
          variant: "destructive",
        })
        return
      }

      // 检查是否有进行中的使用记录
      const activeUsage = mockUsageRecords.find(
        (r) => r.userId === user?.id && r.instrumentId === instrument.id && r.status === "in-progress",
      )

      if (scanAction === "check-in" && activeUsage) {
        setScanStatus("error")
        toast({
          title: "上机失败",
          description: "您已经在使用该仪器",
          variant: "destructive",
        })
        return
      }

      if (scanAction === "check-out" && !activeUsage) {
        setScanStatus("error")
        toast({
          title: "下机失败",
          description: "未找到使用记录",
          variant: "destructive",
        })
        return
      }

      setScanStatus("success")
      toast({
        title: scanAction === "check-in" ? "上机成功" : "下机成功",
        description: `${instrument.name} - ${scanAction === "check-in" ? "开始使用" : "使用结束"}`,
      })
    }, 2000)
  }

  const resetScan = () => {
    setScanStatus("idle")
    setScannedInstrument(null)
    setAction(null)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <h1 className="text-2xl font-bold">扫码上下机</h1>
        <p className="text-sm text-primary-foreground/80 mt-1">扫描仪器二维码进行上机或下机操作</p>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {scanStatus === "idle" && (
          <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">请选择操作类型后扫描仪器二维码</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" onClick={() => handleScan("check-in")} className="h-24 flex-col gap-2">
                <Camera className="w-8 h-8" />
                <span>扫码上机</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleScan("check-out")}
                className="h-24 flex-col gap-2 bg-transparent"
              >
                <Camera className="w-8 h-8" />
                <span>扫码下机</span>
              </Button>
            </div>
          </>
        )}

        {scanStatus === "scanning" && (
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center animate-pulse">
                <Camera className="w-20 h-20 text-primary" />
              </div>
              <p className="text-lg font-medium">正在扫描...</p>
              <p className="text-sm text-muted-foreground mt-2">请将二维码对准摄像头</p>
            </CardContent>
          </Card>
        )}

        {scanStatus === "success" && scannedInstrument && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-green-900">{action === "check-in" ? "上机成功" : "下机成功"}</CardTitle>
                  <CardDescription className="text-green-700">操作已记录</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white rounded-lg p-4 space-y-2">
                <p className="font-medium text-green-900">{scannedInstrument.name}</p>
                <p className="text-sm text-muted-foreground">{scannedInstrument.location}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{new Date().toLocaleString("zh-CN")}</span>
                </div>
              </div>
              <Button onClick={resetScan} className="w-full">
                完成
              </Button>
            </CardContent>
          </Card>
        )}

        {scanStatus === "error" && scannedInstrument && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-red-900">操作失败</CardTitle>
                  <CardDescription className="text-red-700">请检查权限或联系管理员</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white rounded-lg p-4 space-y-2">
                <p className="font-medium text-red-900">{scannedInstrument.name}</p>
                <p className="text-sm text-muted-foreground">{scannedInstrument.location}</p>
              </div>
              <Button onClick={resetScan} variant="outline" className="w-full bg-transparent">
                重新扫描
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. 上机前请确保已完成预约</p>
            <p>2. 扫码上机后系统开始计时</p>
            <p>3. 使用完毕后请及时扫码下机</p>
            <p>4. 超时使用将产生额外费用</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
