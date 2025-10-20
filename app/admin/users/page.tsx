import { MobileLayout } from "@/components/mobile-layout";
import { UserList } from "@/components/admin/user-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="bg-primary text-primary-foreground px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">用户管理</h1>
            <Button size="sm" variant="secondary" disabled>
              <Plus className="w-4 h-4 mr-1" />
              新增用户
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <UserList />
        </div>
      </div>
    </MobileLayout>
  );
}