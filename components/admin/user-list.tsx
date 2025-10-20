"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mock-data";
import { UserCard } from "./user-card";

export function UserList() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredUsers = mockUsers.filter((user) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return user.status === "active";
    if (activeTab === "banned") return user.status === "banned";
    if (activeTab === "pending") return user.status === "pending";
    return true;
  });

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="active">正常</TabsTrigger>
          <TabsTrigger value="banned">已禁用</TabsTrigger>
          <TabsTrigger value="pending">待审核</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="space-y-4 mt-0">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">暂无用户</div>
          ) : (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}