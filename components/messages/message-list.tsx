"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { formatDate } from "@/lib/utils/date"
import { Bell, CheckCircle } from "lucide-react"

const messageTypeConfig = {
  "reservation-reminder": { label: "预约提醒", color: "bg-blue-100 text-blue-700" },
  "qualification-result": { label: "资质审核", color: "bg-green-100 text-green-700" },
  "reservation-result": { label: "预约审核", color: "bg-purple-100 text-purple-700" },
  "overtime-warning": { label: "超时提醒", color: "bg-red-100 text-red-700" },
  "system-notice": { label: "系统通知", color: "bg-gray-100 text-gray-700" },
}

export function MessageList() {
  const messages = useAppStore((state) => state.messages)
  const markMessageAsRead = useAppStore((state) => state.markMessageAsRead)

  const handleMessageClick = (messageId: string, read: boolean) => {
    if (!read) {
      markMessageAsRead(messageId)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6" />
          消息通知
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">暂无消息</div>
        ) : (
          messages.map((message) => {
            const typeConfig = messageTypeConfig[message.type]
            return (
              <Card
                key={message.id}
                className={`cursor-pointer transition-colors ${message.read ? "bg-muted/30" : "bg-card"}`}
                onClick={() => handleMessageClick(message.id, message.read)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                        {message.read && <CheckCircle className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <h3 className={`font-medium mb-1 ${!message.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formatDate(message.createdAt)}</p>
                    </div>
                    {!message.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
