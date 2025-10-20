import { MobileLayout } from "@/components/mobile-layout"
import { InstrumentSearch } from "@/components/instruments/instrument-search"
import { InstrumentList } from "@/components/instruments/instrument-list"


export default function InstrumentsPage() {
  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="bg-primary text-primary-foreground px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">查找仪器</h1>
          <InstrumentSearch />
        </div>
        <div className="flex-1 overflow-y-auto">
          <InstrumentList />
        </div>
      </div>
    </MobileLayout>
  )
}
