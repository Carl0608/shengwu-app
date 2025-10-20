"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockInstruments } from "@/lib/mock-data";
import { AdminInstrumentCard } from "./admin-instrument-card";

export function InstrumentList() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredInstruments = mockInstruments.filter((instrument) => {
    if (activeTab === "all") return true;
    if (activeTab === "available") return instrument.status === "available";
    if (activeTab === "in-use") return instrument.status === "in-use";
    if (activeTab === "maintenance") return instrument.status === "maintenance";
    if (activeTab === "offline") return instrument.status === "offline";
    return true;
  });

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="available">可用</TabsTrigger>
          <TabsTrigger value="in-use">使用中</TabsTrigger>
          <TabsTrigger value="maintenance">维护中</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="space-y-4 mt-0">
          {filteredInstruments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">暂无仪器</div>
          ) : (
            filteredInstruments.map((instrument) => (
              <AdminInstrumentCard key={instrument.id} instrument={instrument} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}