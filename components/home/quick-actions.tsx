"use client"

import Link from "next/link"
import { Search, Calendar, Send, QrCode, FileText, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useAppStore } from "@/lib/store"

const userActions = [
  { icon: Search, label: "查找仪器", href: "/instruments", color: "text-blue-600" },
  { icon: Calendar, label: "机时预约", href: "/reservations", color: "text-green-600" },
  { icon: Send, label: "送样预约", href: "/samples", color: "text-purple-600" },
  { icon: QrCode, label: "扫码上机", href: "/scan", color: "text-orange-600" },
]

const adminActions = [
  { icon: FileText, label: "审核管理", href: "/admin/reviews", color: "text-red-600" },
  { icon: Settings, label: "系统管理", href: "/admin/settings", color: "text-gray-600" },
]

export function QuickActions() {
  const user = useAppStore((state) => state.user)
  const isAdmin = user?.role === "admin"

  const actions = isAdmin ? [...userActions, ...adminActions] : userActions

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">快捷功能</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.href} href={action.href}>
              <Card className="p-4 flex flex-col items-center gap-2 hover:bg-accent transition-colors">
                <div className={`w-10 h-10 rounded-full bg-secondary flex items-center justify-center ${action.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-center leading-tight">{action.label}</span>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
