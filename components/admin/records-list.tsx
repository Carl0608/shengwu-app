"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Package, 
  FileText, 
  ArrowLeft, 
  Users,
  Search,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  mockUsageRecords, 
  mockInstruments, 
  mockSampleSubmissions, 
  mockFeeRecords 
} from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils/date";

// 定义记录类型
type RecordType = "usage" | "sample" | "fee";

export function AdminRecordsList() {
  const router = useRouter();
  const [selectedRecordType, setSelectedRecordType] = useState<RecordType>("usage");

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
          <h1 className="text-2xl font-bold">使用记录</h1>
        </div>
        <p className="text-primary-foreground/80 text-sm">查看和管理实验室设备使用记录</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs 
          value={selectedRecordType} 
          onValueChange={(value) => setSelectedRecordType(value as RecordType)}
          className="h-full flex flex-col"
        >
          <div className="border-b px-4">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="usage" className="text-sm">使用记录</TabsTrigger>
              <TabsTrigger value="sample" className="text-sm">送样记录</TabsTrigger>
              <TabsTrigger value="fee" className="text-sm">扣费记录</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="usage" className="flex-1 overflow-y-auto p-0 h-[calc(100%-56px)]">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索使用记录..."
                    className="pl-8 pr-4 py-2 w-full border rounded-md text-sm"
                  />
                </div>
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-1" />
                  筛选
                </Button>
              </div>

              {mockUsageRecords.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">暂无使用记录</div>
              ) : (
                mockUsageRecords.map((record) => {
                  const instrument = mockInstruments.find(i => i.id === record.instrumentId);
                  const user = mockInstruments.find(i => i.id === record.instrumentId)
                    ? mockInstruments.find(i => i.id === record.instrumentId)?.contact
                    : "未知用户"; // 在mock数据中没有完整的用户信息

                  return (
                    <Card key={record.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base">
                            {instrument?.name || "未知仪器"}
                          </CardTitle>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {instrument?.department}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{user || "未知用户"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>开始：{formatDateTime(record.startTime)}</span>
                        </div>
                        {record.endTime && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>结束：{formatDateTime(record.endTime)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>时长：{record.duration ? `${record.duration}分钟` : "进行中"}</span>
                        </div>
                        {record.fee && (
                          <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <DollarSign className="w-4 h-4" />
                            <span>费用：¥{record.fee}</span>
                          </div>
                        )}
                        {record.notes && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground">备注：{record.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="sample" className="flex-1 overflow-y-auto p-0 h-[calc(100%-56px)]">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索送样记录..."
                    className="pl-8 pr-4 py-2 w-full border rounded-md text-sm"
                  />
                </div>
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-1" />
                  筛选
                </Button>
              </div>

              {mockSampleSubmissions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">暂无送样记录</div>
              ) : (
                mockSampleSubmissions.map((record) => {
                  const instrument = mockInstruments.find(i => i.id === record.instrumentId);

                  return (
                    <Card key={record.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base">
                            {record.sampleName}
                          </CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            record.status === "completed" ? "bg-green-100 text-green-800" :
                            record.status === "testing" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {record.status === "pending" ? "待处理" : 
                             record.status === "testing" ? "测试中" : "已完成"}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {instrument?.name || "未知仪器"}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span>类型：{record.sampleType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>紧急度：{record.urgency === "urgent" ? "紧急" : "普通"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>提交时间：{formatDateTime(record.submittedAt)}</span>
                        </div>
                        {record.expectedCompletionDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>预计完成：{formatDateTime(record.expectedCompletionDate)}</span>
                          </div>
                        )}
                        {record.fee && (
                          <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <DollarSign className="w-4 h-4" />
                            <span>费用：¥{record.fee}</span>
                          </div>
                        )}
                        {record.description && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground">描述：{record.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="fee" className="flex-1 overflow-y-auto p-0 h-[calc(100%-56px)]">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索扣费记录..."
                    className="pl-8 pr-4 py-2 w-full border rounded-md text-sm"
                  />
                </div>
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-1" />
                  筛选
                </Button>
              </div>

              {mockFeeRecords.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">暂无扣费记录</div>
              ) : (
                mockFeeRecords.map((record) => {
                  const user = mockInstruments.find(i => i.id === record.relatedId)
                    ? mockInstruments.find(i => i.id === record.relatedId)?.contact
                    : "未知用户"; // 在mock数据中没有完整的用户信息

                  return (
                    <Card key={record.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base">
                            {record.description}
                          </CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            record.status === "confirmed" ? "bg-green-100 text-green-800" :
                            record.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {record.status === "confirmed" ? "已确认" : 
                             record.status === "pending" ? "待确认" : "有争议"}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{user || "未知用户"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>金额：¥{record.amount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span>类型：{record.type === "usage" ? "使用费" : 
                                   record.type === "sample" ? "送样费" : 
                                   record.type === "training" ? "培训费" : "其他费用"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>创建时间：{formatDateTime(record.createdAt)}</span>
                        </div>
                        {record.confirmedAt && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>确认时间：{formatDateTime(record.confirmedAt)}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}