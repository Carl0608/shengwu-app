"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QualificationReviewList } from "./qualification-review-list"
import { ReservationReviewList } from "./reservation-review-list"
import { UserReviewList } from "./user-review-list"

export function AdminReviewTabs() {
  const [activeTab, setActiveTab] = useState("qualifications")

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <h1 className="text-2xl font-bold">审核管理</h1>
        <p className="text-sm text-primary-foreground/80 mt-1">管理用户申请和预约审核</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="qualifications">资质审核</TabsTrigger>
            <TabsTrigger value="reservations">预约审核</TabsTrigger>
            <TabsTrigger value="users">用户审核</TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="qualifications" className="mt-0 p-4">
              <QualificationReviewList />
            </TabsContent>
            <TabsContent value="reservations" className="mt-0 p-4">
              <ReservationReviewList />
            </TabsContent>
            <TabsContent value="users" className="mt-0 p-4">
              <UserReviewList />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
