"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAnnouncements } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils/date"
import { AlertCircle } from "lucide-react"

export function AnnouncementList() {
  const activeAnnouncements = mockAnnouncements.filter((a) => {
    if (!a.expiresAt) return true
    return new Date(a.expiresAt) > new Date()
  })

  if (activeAnnouncements.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">系统公告</h2>
      <div className="space-y-3">
        {activeAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base flex items-center gap-2">
                  {announcement.mustRead && <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />}
                  <span className="line-clamp-1">{announcement.title}</span>
                </CardTitle>
                {announcement.mustRead && (
                  <Badge variant="destructive" className="flex-shrink-0">
                    必读
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
              <p className="text-xs text-muted-foreground mt-2">{formatDate(announcement.publishedAt)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
