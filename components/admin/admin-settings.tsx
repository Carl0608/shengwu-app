"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Activity, FileText, SettingsIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const managementItems = [
  {
    icon: Users,
    title: "用户管理",
    description: "查看和管理用户信息",
    href: "/admin/users",
    color: "text-blue-600",
  },
  {
    icon: Activity,
    title: "仪器监控",
    description: "实时监控仪器使用状态",
    href: "/admin/instruments",
    color: "text-green-600",
  },
  {
    icon: FileText,
    title: "使用记录",
    description: "查询所有使用记录",
    href: "/admin/records",
    color: "text-purple-600",
  },
  {
    icon: SettingsIcon,
    title: "系统设置",
    description: "配置系统参数",
    href: "/admin/config",
    color: "text-orange-600",
  },
]

export function AdminSettings() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">系统管理</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>管理功能</CardTitle>
            <CardDescription>选择要管理的功能模块</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {managementItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Card className="hover:bg-accent transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                      <div
                        className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${item.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">统计信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">待审核资质申请</span>
              <span className="font-semibold text-primary">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">待审核预约申请</span>
              <span className="font-semibold text-primary">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">使用中的仪器</span>
              <span className="font-semibold text-green-600">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">今日预约</span>
              <span className="font-semibold">2</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
