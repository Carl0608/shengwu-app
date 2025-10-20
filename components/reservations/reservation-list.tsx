"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockReservations, mockInstruments } from "@/lib/mock-data"
import { ReservationCard } from "./reservation-card"

export function ReservationList() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredReservations = mockReservations.filter((r) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return r.status === "pending"
    if (activeTab === "approved") return r.status === "approved"
    if (activeTab === "completed") return r.status === "completed"
    return true
  })

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="pending">待审核</TabsTrigger>
          <TabsTrigger value="approved">已通过</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="space-y-4 mt-0">
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">暂无预约记录</div>
          ) : (
            filteredReservations.map((reservation) => {
              const instrument = mockInstruments.find((i) => i.id === reservation.instrumentId)
              return <ReservationCard key={reservation.id} reservation={reservation} instrument={instrument} />
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
