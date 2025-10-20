"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import {
  Clock,
  Calendar,
  Send,
  FileText,
  GraduationCap,
  CreditCard,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"

const menuItems = [
  { icon: Clock, label: "使用记录", href: "/profile/usage", color: "text-blue-600" },
  { icon: Calendar, label: "预约记录", href: "/profile/reservations", color: "text-green-600" },
  { icon: Send, label: "送样记录", href: "/profile/samples", color: "text-purple-600" },
  { icon: FileText, label: "资质申请", href: "/profile/qualifications", color: "text-orange-600" },
  { icon: GraduationCap, label: "培训记录", href: "/profile/training", color: "text-pink-600" },
  { icon: CreditCard, label: "扣费记录", href: "/profile/fees", color: "text-yellow-600" },
]

export function ProfileMenu() {
  const router = useRouter()
  const setUser = useAppStore((state) => state.setUser)

  const handleLogout = () => {
    setUser(null)
    router.push("/login")
  }

  return (
    <div className="space-y-4">
      <Card className="divide-y">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-3 p-4 hover:bg-accent transition-colors">
                <div className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1 font-medium">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Link>
          )
        })}
      </Card>

      <Card className="divide-y">
        <Link href="/settings">
          <div className="flex items-center gap-3 p-4 hover:bg-accent transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1">设置</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>
        <button onClick={handleLogout} className="w-full">
          <div className="flex items-center gap-3 p-4 hover:bg-accent transition-colors text-destructive">
            <LogOut className="w-5 h-5" />
            <span className="flex-1 text-left">退出登录</span>
          </div>
        </button>
      </Card>
    </div>
  )
}
