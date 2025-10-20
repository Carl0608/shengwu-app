"use client"

import { useAppStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function HomeHeader() {
  const user = useAppStore((state) => state.user)

  if (!user) return null

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-4 py-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-primary-foreground/20">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            {user.role === "admin" && (
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
                管理员
              </Badge>
            )}
          </div>
          <p className="text-sm text-primary-foreground/80 mt-1">{user.department}</p>
          <div className="flex items-center gap-2 mt-2">
            {user.wechatBound ? (
              <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">已绑定微信</span>
            ) : (
              <span className="text-xs bg-destructive/20 px-2 py-1 rounded-full">未绑定微信</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
