"use client"

import type { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User as UserIcon,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Edit,
  Lock,
  Unlock
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils/date";

interface UserDetailProps {
  user: User;
}

const statusConfig = {
  active: {
    label: "正常",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  banned: {
    label: "已禁用",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  pending: {
    label: "待审核",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  },
};

export function UserDetail({ user }: UserDetailProps) {
  const router = useRouter();
  const status = statusConfig[user.status];
  const StatusIcon = status.icon;

  return (
    <div className="pb-24">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-primary-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">用户详情</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800 font-bold text-lg rounded-full">
                  {user.name.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <Badge variant="outline">{user.role === "admin" ? "管理员" : "普通用户"}</Badge>
                  <Badge className={`${status.bgColor} ${status.color} border-0`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.department}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" disabled>
                <Edit className="w-4 h-4 mr-2" />
                编辑
              </Button>
              {user.status === "active" ? (
                <Button variant="destructive" size="sm" className="flex-1" disabled>
                  <Lock className="w-4 h-4 mr-2" />
                  禁用账号
                </Button>
              ) : (
                <Button variant="default" size="sm" className="flex-1" disabled>
                  <Unlock className="w-4 h-4 mr-2" />
                  启用账号
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">邮箱</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">手机号</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">所属部门</p>
                  <p className="font-medium">{user.department}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">注册时间</p>
                  <p className="font-medium">{formatDateTime(user.registeredAt)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserIcon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">微信绑定</p>
                  <p className="font-medium">
                    {user.wechatBound
                      ? `已绑定（ID: ${user.wechatId}）`
                      : "未绑定"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">安全信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">账号状态</p>
                  <p className="font-medium">
                    <Badge className={`${status.bgColor} ${status.color} border-0`}>
                      {status.label}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}