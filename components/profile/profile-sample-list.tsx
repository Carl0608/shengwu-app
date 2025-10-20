"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSampleSubmissions, mockInstruments } from "@/lib/mock-data"
import { SampleCard } from "@/components/samples/sample-card"

export function ProfileSampleList() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">送样记录</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockSampleSubmissions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">暂无送样记录</div>
        ) : (
          mockSampleSubmissions.map((sample) => {
            const instrument = mockInstruments.find((i) => i.id === sample.instrumentId)
            return <SampleCard key={sample.id} sample={sample} instrument={instrument} />
          })
        )}
      </div>
    </div>
  )
}
