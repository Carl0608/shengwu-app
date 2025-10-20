"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppStore } from "@/lib/store"
import { mockUsers } from "@/lib/mock-data"
import { Smartphone } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const setUser = useAppStore((state) => state.setUser)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // 模拟登录验证
    const user = mockUsers.find((u) => u.email === email)
    if (user) {
      setUser(user)
      router.push("/")
    } else {
      setError("用户名或密码错误")
    }
  }

  const handleWechatLogin = () => {
    // 模拟微信登录
    const user = mockUsers[0]
    setUser(user)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">实验室仪器管理系统</CardTitle>
          <CardDescription className="text-center">登录以访问您的账户</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">或</span>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent" onClick={handleWechatLogin}>
            <Smartphone className="mr-2 h-4 w-4" />
            微信快捷登录
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            测试账号：zhangsan@example.com (普通用户)
            <br />
            lisi@example.com (管理员)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
