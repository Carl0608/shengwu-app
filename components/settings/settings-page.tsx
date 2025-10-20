"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Bell, Moon, Globe, HelpCircle, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">设置</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="divide-y">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">消息通知</p>
                <p className="text-sm text-muted-foreground">接收预约和审核通知</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">深色模式</p>
                <p className="text-sm text-muted-foreground">切换应用主题</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">语言</p>
                <p className="text-sm text-muted-foreground">简体中文</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="divide-y">
          <button className="flex items-center gap-3 p-4 w-full hover:bg-accent transition-colors">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 text-left">帮助与反馈</span>
          </button>
          <button className="flex items-center gap-3 p-4 w-full hover:bg-accent transition-colors">
            <Info className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 text-left">关于我们</span>
          </button>
        </Card>

        <div className="text-center text-sm text-muted-foreground py-4">版本 1.0.0</div>
      </div>
    </div>
  )
}
