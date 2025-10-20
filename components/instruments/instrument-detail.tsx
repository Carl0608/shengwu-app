"use client"

import type { Instrument } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Phone, User, Building, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface InstrumentDetailProps {
  instrument: Instrument
}

const statusConfig = {
  available: { label: "可用", className: "bg-green-100 text-green-700 border-green-200" },
  "in-use": { label: "使用中", className: "bg-blue-100 text-blue-700 border-blue-200" },
  maintenance: { label: "维护中", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  offline: { label: "离线", className: "bg-gray-100 text-gray-700 border-gray-200" },
}

export function InstrumentDetail({ instrument }: InstrumentDetailProps) {
  const router = useRouter()
  const status = statusConfig[instrument.status]

  return (
    <div className="pb-24">
      <div className="relative h-64 bg-muted">
        <Image
          src={instrument.imageUrl || "/placeholder.svg?height=256&width=400"}
          alt={instrument.name}
          fill
          className="object-cover"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h1 className="text-2xl font-bold">{instrument.name}</h1>
            <Badge className={status.className}>{status.label}</Badge>
          </div>
          <p className="text-muted-foreground">{instrument.model}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">资产编号</p>
                <p className="font-medium">{instrument.assetNumber}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">所属单位</p>
                <p className="font-medium">{instrument.department}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">放置地点</p>
                <p className="font-medium">{instrument.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">联系人</p>
                <p className="font-medium">{instrument.contact}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">联系电话</p>
                <p className="font-medium">{instrument.contactPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">详细信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">产地</p>
                <p className="font-medium">{instrument.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">分类</p>
                <p className="font-medium">{instrument.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">出产日期</p>
                <p className="font-medium">{instrument.manufactureDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">购买日期</p>
                <p className="font-medium">{instrument.purchaseDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">仪器描述</p>
              <p className="text-sm leading-relaxed">{instrument.description}</p>
            </div>
          </CardContent>
        </Card>

        {(instrument.requiresTraining || instrument.requiresQualification) && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-amber-900 mb-2">使用要求</p>
              <ul className="text-sm text-amber-800 space-y-1">
                {instrument.requiresTraining && <li>• 需要完成培训</li>}
                {instrument.requiresQualification && <li>• 需要申请使用资质</li>}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
