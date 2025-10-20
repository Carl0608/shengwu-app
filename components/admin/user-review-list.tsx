"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockUsers } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils/date"
import { CheckCircle, XCircle, Mail, Phone, Building, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function UserReviewList() {
  const { toast } = useToast()

  const pendingUsers = mockUsers.filter((u) => u.status === "pending")

  const handleApprove = (userId: string) => {
    toast({
      title: "审核通过",
      description: "用户注册已通过",
    })
  }

  const handleReject = (userId: string) => {
    toast({
      title: "已拒绝",
      description: "用户注册已拒绝",
    })
  }

  if (pendingUsers.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">暂无待审核的用户注册</div>
  }

  return (
    <div className="space-y-4">
      {pendingUsers.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base">{user.name}</CardTitle>
              <Badge variant="secondary">待审核</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span>{user.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>注册时间：{formatDate(user.registeredAt)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => handleReject(user.id)}>
                <XCircle className="w-4 h-4 mr-2" />
                拒绝
              </Button>
              <Button className="flex-1" onClick={() => handleApprove(user.id)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                通过
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
