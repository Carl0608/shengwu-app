"use client"

import type { Instrument } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface InstrumentCardProps {
  instrument: Instrument
}

const statusConfig = {
  available: { label: "可用", className: "bg-green-100 text-green-700 border-green-200" },
  "in-use": { label: "使用中", className: "bg-blue-100 text-blue-700 border-blue-200" },
  maintenance: { label: "维护中", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  offline: { label: "离线", className: "bg-gray-100 text-gray-700 border-gray-200" },
}

export function InstrumentCard({ instrument }: InstrumentCardProps) {
  const status = statusConfig[instrument.status]

  return (
    <Link href={`/instruments/${instrument.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <Image
              src={instrument.imageUrl || "/placeholder.svg?height=96&width=96"}
              alt={instrument.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardHeader className="p-0 mb-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold line-clamp-1">{instrument.name}</h3>
                <Badge className={status.className}>{status.label}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{instrument.model}</p>
            </CardHeader>
            <CardContent className="p-0 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="line-clamp-1">{instrument.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="w-3 h-3 flex-shrink-0" />
                <span>{instrument.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span>{instrument.contactPhone}</span>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  )
}
