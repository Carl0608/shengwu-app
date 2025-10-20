"use client"

import type { Instrument } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Building,
  Package,
  Calendar as CalendarIcon,
  Edit,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AdminInstrumentDetailProps {
  instrument: Instrument;
}

const statusConfig = {
  available: {
    label: "可用",
    className: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle
  },
  "in-use": {
    label: "使用中",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Activity
  },
  maintenance: {
    label: "维护中",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: AlertTriangle
  },
  offline: {
    label: "离线",
    className: "bg-gray-100 text-gray-700 border-gray-200",
    icon: XCircle
  },
};

export function AdminInstrumentDetail({ instrument }: AdminInstrumentDetailProps) {
  const router = useRouter();
  const StatusIcon = statusConfig[instrument.status].icon;
  const status = statusConfig[instrument.status];

  return (
    <div className="pb-24">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-primary-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">仪器详情</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
          <Image
            src={instrument.imageUrl || "/placeholder.svg?height=192&width=384"}
            alt={instrument.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{instrument.name}</h1>
            <p className="text-muted-foreground">{instrument.model}</p>
          </div>
          <Badge className={status.className}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full" disabled>
            <Edit className="w-4 h-4 mr-2" />
            编辑信息
          </Button>
          <Button variant="outline" className="w-full" disabled>
            <BarChart3 className="w-4 h-4 mr-2" />
            使用统计
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
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
                <p className="text-sm text-muted-foreground">制造商</p>
                <p className="font-medium">{instrument.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">分类</p>
                <p className="font-medium">{instrument.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">出厂日期</p>
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
            <div className="flex gap-2 pt-2">
              <Badge variant={instrument.requiresTraining ? "default" : "outline"}>
                {instrument.requiresTraining ? "需要培训" : "无需培训"}
              </Badge>
              <Badge variant={instrument.requiresQualification ? "default" : "outline"}>
                {instrument.requiresQualification ? "需要资质" : "无需资质"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}