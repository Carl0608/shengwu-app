"use client"

import { useAppStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function ProfileHeader() {
  const user = useAppStore((state) => state.user)

  if (!user) return null

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-4 pt-6 pb-8">
      <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
        <div className="p-4 flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-primary-foreground">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-primary">{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-semibold text-primary-foreground">{user.name}</h1>
              {user.role === "admin" && <Badge className="bg-primary-foreground text-primary">管理员</Badge>}
            </div>
            <p className="text-sm text-primary-foreground/80 mb-2">{user.department}</p>
            <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
