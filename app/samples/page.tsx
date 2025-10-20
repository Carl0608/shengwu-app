import { MobileLayout } from "@/components/mobile-layout"
import { SampleList } from "@/components/samples/sample-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function SamplesPage() {
  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="bg-primary text-primary-foreground px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">送样预约</h1>
            <Link href="/samples/create">
              <Button size="sm" variant="secondary">
                <Plus className="w-4 h-4 mr-1" />
                新建送样
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SampleList />
        </div>
      </div>
    </MobileLayout>
  )
}
