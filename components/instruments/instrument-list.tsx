"use client"

import { mockInstruments } from "@/lib/mock-data"
import { InstrumentCard } from "./instrument-card"

export function InstrumentList() {
  return (
    <div className="p-4 space-y-4">
      {mockInstruments.map((instrument) => (
        <InstrumentCard key={instrument.id} instrument={instrument} />
      ))}
    </div>
  )
}
