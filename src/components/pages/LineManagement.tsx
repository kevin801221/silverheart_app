// src/components/pages/LineManagement.tsx

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { 
  Users, Activity, History, Search, AlertTriangle, 
  MessageCircle, Settings, Database
} from 'lucide-react';
import { fraudPreventionQA, handleLineMessage } from '@/services/lineService';

// API 監控數據
const mockApiData = [
  { time: '00:00', calls: 120, responseTime: 230, errorRate: 0.5 },
  { time: '04:00', calls: 150, responseTime: 220, errorRate: 0.8 },
  { time: '08:00', calls: 280, responseTime: 250, errorRate: 1.2 },
  { time: '12:00', calls: 310, responseTime: 280, errorRate: 1.0 },
  { time: '16:00', calls: 350, responseTime: 260, errorRate: 0.7 },
  { time: '20:00', calls: 200, responseTime: 240, errorRate: 0.6 },
];

// Line 群組數據
const mockGroups = [
  {
    id: 1,
    name: "防詐預警群",
    members: 156,
    activeLevel: "高",
    lastActivity: "2024-03-02 15:30",
    alertCount: 5
  },
  {
    id: 2,
    name: "社區防詐群",
    members: 89,
    activeLevel: "中",
    lastActivity: "2024-03-02 14:15",
    alertCount: 2
  }
];

export default function LineManagement() {
  const [activeTab, setActiveTab] = useState('bot');
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [botStatus, setBotStatus] = useState({
    isActive: true,
    friendCount: 1234,
    messageCount: 5678,
    lastActive: new Date().toLocaleString()
  });

  // 測試機器人回應
  const handleTest = async () => {
    if (!testMessage.trim()) return;
    const response = await handleLineMessage(testMessage);
    setTestResponse(response);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Line 管理中心</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="bot">機器人設置</TabsTrigger>
          <TabsTrigger value="groups">群組管理</TabsTrigger>
          <TabsTrigger value="api">API 監控</TabsTrigger>
          <TabsTrigger value="history">歷史分析</TabsTrigger>
        </TabsList>

        {/* 機器人設置頁面 */}
        <TabsContent value="bot">
          <div className="space-y-6">
            {/* 機器人狀態卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  機器人狀態
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">運行狀態</span>
                    </div>
                    <p className="text-green-600 font-medium">正常運行中</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium">好友數量</span>
                    <p className="text-blue-600 font-medium">{botStatus.friendCount}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium">訊息量</span>
                    <p className="text-blue-600 font-medium">{botStatus.messageCount}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium">最後更新</span>
                    <p className="text-gray-600">{botStatus.lastActive}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 指令測試區域 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  指令測試
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="輸入測試訊息... (例如: /help)"
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleTest()}
                    />
                    <Button onClick={handleTest}>測試</Button>
                  </div>
                  {testResponse && (
                    <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                      {testResponse}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 預設指令列表 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  預設指令列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudPreventionQA.map((qa, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setTestMessage(qa.question);
                        handleTest();
                      }}
                    >
                      <div className="font-medium text-blue-600">
                        {qa.question}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {qa.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 群組管理頁面 */}
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

        {/* API 監控頁面 */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API 調用趨勢</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <LineChart width={800} height={300} data={mockApiData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="calls" 
                    stroke="#8884d8" 
                    name="調用次數" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#82ca9d" 
                    name="響應時間(ms)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="errorRate" 
                    stroke="#ff7300" 
                    name="錯誤率(%)" 
                  />
                </LineChart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 歷史分析頁面 */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>RAG 檢索系統</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input 
                  type="text" 
                  placeholder="搜索歷史對話..."
                />
                <Button>
                  <Search className="h-5 w-5" />
                </Button>
              </div>
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