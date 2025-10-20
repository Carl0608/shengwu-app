"use client"

import type { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Mail, Phone, Building, Calendar, Lock, CheckCircle } from "lucide-react";
import { formatDateTime } from "@/lib/utils/date";
import Link from "next/link";

interface UserCardProps {
  user: User;
}

const statusConfig = {
  active: { label: "正常", variant: "default" as const },
  banned: { label: "已禁用", variant: "destructive" as const },
  pending: { label: "待审核", variant: "secondary" as const },
};

export function UserCard({ user }: UserCardProps) {
  const status = statusConfig[user.status];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800 font-bold rounded-full">
                {user.name.charAt(0)}
              </div>
            </div>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={status.variant}>{status.label}</Badge>
                {user.role === "admin" && (
                  <Badge variant="outline" className="border-purple-200 text-purple-700">
                    管理员
                  </Badge>
                )}
                {user.wechatBound ? (
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    已绑定微信
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-gray-200 text-gray-500">
                    未绑定微信
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="w-4 h-4" />
          <span>{user.department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>注册于 {formatDateTime(user.registeredAt)}</span>
        </div>
        <div className="pt-3 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/admin/users/${user.id}`}>查看</Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" disabled>
            编辑
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}