"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Smartphone, LinkIcon, Unlink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WechatBinding() {
  const user = useAppStore((state) => state.user)
  const setUser = useAppStore((state) => state.setUser)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  if (!user) return null

  const handleBind = async () => {
    setIsLoading(true)
    // 模拟绑定过程
    setTimeout(() => {
      setUser({ ...user, wechatBound: true, wechatId: "wx_" + user.id })
      toast({
        title: "绑定成功",
        description: "您的微信账号已成功绑定",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleUnbind = async () => {
    setIsLoading(true)
    // 模拟解绑过程
    setTimeout(() => {
      setUser({ ...user, wechatBound: false, wechatId: undefined })
      toast({
        title: "解绑成功",
        description: "您的微信账号已解除绑定",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          微信绑定
        </CardTitle>
        <CardDescription>绑定微信后可使用微信快捷登录和接收消息推送</CardDescription>
      </CardHeader>
      <CardContent>
        {user.wechatBound ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <LinkIcon className="w-4 h-4 text-green-600" />
              <span className="text-muted-foreground">已绑定微信：</span>
              <span className="font-medium">{user.wechatId}</span>
            </div>
            <Button variant="outline" onClick={handleUnbind} disabled={isLoading} className="w-full bg-transparent">
              <Unlink className="w-4 h-4 mr-2" />
              解除绑定
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Unlink className="w-4 h-4" />
              <span>未绑定微信账号</span>
            </div>
            <Button onClick={handleBind} disabled={isLoading} className="w-full">
              <Smartphone className="w-4 h-4 mr-2" />
              绑定微信
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
