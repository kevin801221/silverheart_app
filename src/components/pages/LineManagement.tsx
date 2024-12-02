import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Users, Activity, History, Search, AlertTriangle } from 'lucide-react';

const mockApiData = [
  { time: '00:00', calls: 120, responseTime: 230, errorRate: 0.5 },
  { time: '04:00', calls: 150, responseTime: 220, errorRate: 0.8 },
  { time: '08:00', calls: 280, responseTime: 250, errorRate: 1.2 },
  { time: '12:00', calls: 310, responseTime: 280, errorRate: 1.0 },
  { time: '16:00', calls: 350, responseTime: 260, errorRate: 0.7 },
  { time: '20:00', calls: 200, responseTime: 240, errorRate: 0.6 },
];

const mockGroups = [
  { 
    id: 1, 
    name: "防詐預警群", 
    members: 156, 
    activeLevel: "高",
    lastActivity: "2024-03-02 15:30",
    alertCount: 5
  },
  // ... 更多群組
];

export default function LineManagement() {
  const [activeTab, setActiveTab] = useState('groups');

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Line 管理中心</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="groups">群組管理</TabsTrigger>
          <TabsTrigger value="api">API 監控</TabsTrigger>
          <TabsTrigger value="history">歷史分析</TabsTrigger>
        </TabsList>

        <TabsContent value="groups">
          <div className="grid gap-4">
            {mockGroups.map(group => (
              <Card key={group.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{group.name}</h3>
                        <p className="text-sm text-gray-500">
                          {group.members} 位成員
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm">活躍度</div>
                        <div className="font-medium text-green-600">
                          {group.activeLevel}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">警報數</div>
                        <div className="font-medium text-red-600">
                          {group.alertCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API 調用趨勢</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart width={800} height={300} data={mockApiData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calls" stroke="#8884d8" name="調用次數" />
                <Line type="monotone" dataKey="responseTime" stroke="#82ca9d" name="響應時間(ms)" />
                <Line type="monotone" dataKey="errorRate" stroke="#ff7300" name="錯誤率(%)" />
              </LineChart>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>RAG 檢索系統</CardTitle>
            </CardHeader>
            <CardContent>
              {/* RAG 搜索界面 */}
              <div className="flex gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="搜索歷史對話..."
                  className="flex-1 p-2 border rounded-md"
                />
                <button className="p-2 bg-blue-500 text-white rounded-md">
                  <Search className="h-5 w-5" />
                </button>
              </div>

              {/* 可視化區域 */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="text-gray-500 text-center">
                  選擇時間範圍和關鍵字開始分析
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}