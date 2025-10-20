"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Bell, 
  Key, 
  Users,
  Database,
  HardDrive,
  ArrowLeft,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 模拟的系统配置数据
const initialConfig = {
  systemName: "实验室仪器管理系统",
  maintenanceMode: false,
  reservationLimit: 3,
  maxReservationHours: 4,
  reservationInterval: 30,
  overtimeWarningMinutes: 15,
  autoLogoutMinutes: 60,
  announcementEnabled: true,
};

export function AdminConfigPanel() {
  const router = useRouter();
  const [config, setConfig] = useState(initialConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // 模拟保存配置
    setTimeout(() => {
      setIsSaving(false);
      alert("系统配置已保存");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()} 
            className="text-primary-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="w-6 h-6" />
              系统设置
            </h1>
            <p className="text-primary-foreground/80 text-sm">配置实验室管理系统参数</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5" />
              基础配置
            </CardTitle>
            <CardDescription>系统基础参数设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="systemName">系统名称</Label>
                <Input
                  id="systemName"
                  value={config.systemName}
                  onChange={(e) => handleChange("systemName", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label>维护模式</Label>
                  <p className="text-sm text-muted-foreground">
                    开启后普通用户将无法使用系统
                  </p>
                </div>
                <Switch
                  checked={config.maintenanceMode}
                  onCheckedChange={(value) => handleChange("maintenanceMode", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              预约配置
            </CardTitle>
            <CardDescription>预约相关参数设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="reservationLimit">单用户最大预约数（个/天）</Label>
                <Input
                  id="reservationLimit"
                  type="number"
                  value={config.reservationLimit}
                  onChange={(e) => handleChange("reservationLimit", parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="maxReservationHours">单次最大预约时长（小时）</Label>
                <Input
                  id="maxReservationHours"
                  type="number"
                  value={config.maxReservationHours}
                  onChange={(e) => handleChange("maxReservationHours", parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="reservationInterval">预约时间间隔（分钟）</Label>
                <Input
                  id="reservationInterval"
                  type="number"
                  value={config.reservationInterval}
                  onChange={(e) => handleChange("reservationInterval", parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              时间配置
            </CardTitle>
            <CardDescription>时间相关参数设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="overtimeWarning">超时警告时间（分钟）</Label>
                <Input
                  id="overtimeWarning"
                  type="number"
                  value={config.overtimeWarningMinutes}
                  onChange={(e) => handleChange("overtimeWarningMinutes", parseInt(e.target.value))}
                  className="mt-1"
                  placeholder="超时前多少分钟发出警告"
                />
              </div>
              
              <div>
                <Label htmlFor="autoLogout">自动退出时间（分钟）</Label>
                <Input
                  id="autoLogout"
                  type="number"
                  value={config.autoLogoutMinutes}
                  onChange={(e) => handleChange("autoLogoutMinutes", parseInt(e.target.value))}
                  className="mt-1"
                  placeholder="用户无操作后自动退出的时间"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              通知配置
            </CardTitle>
            <CardDescription>通知相关参数设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>启用公告功能</Label>
                <p className="text-sm text-muted-foreground">
                  控制是否显示系统公告
                </p>
              </div>
              <Switch
                checked={config.announcementEnabled}
                onCheckedChange={(value) => handleChange("announcementEnabled", value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>保存中...</>
            ) : (
              <>
                <Save className="w-4 h-4" />
                保存配置
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}