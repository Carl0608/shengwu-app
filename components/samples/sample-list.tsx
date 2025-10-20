"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockSampleSubmissions, mockInstruments } from "@/lib/mock-data"
import { SampleCard } from "./sample-card"
export async function generateStaticParams() {
    // 这里需要返回所有可能的 id（例如从 API、数据库或本地数据中获取）
    // 示例：假设你的乐器 id 是 1、2、3
    return mockInstruments;
}
export function SampleList() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredSamples = mockSampleSubmissions.filter((s) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return s.status === "pending"
    if (activeTab === "testing") return s.status === "testing"
    if (activeTab === "completed") return s.status === "completed"
    return true
  })

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="pending">待审核</TabsTrigger>
          <TabsTrigger value="testing">检测中</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="space-y-4 mt-0">
          {filteredSamples.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">暂无送样记录</div>
          ) : (
            filteredSamples.map((sample) => {
              const instrument = mockInstruments.find((i) => i.id === sample.instrumentId)
              return <SampleCard key={sample.id} sample={sample} instrument={instrument} />
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
