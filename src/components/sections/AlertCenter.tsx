import React from 'react';
import { Bell, AlertTriangle, History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AlertCenter = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Bell className="w-6 h-6 text-blue-500" />
        警報中心
      </h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            今日警報
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-red-600 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <span>高風險通話警報</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">檢測到可疑詐騙語音模式</p>
            <p className="text-sm text-gray-500">今天 14:30</p>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-600 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <span>可疑交易提醒</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">檢測到大額轉帳請求</p>
            <p className="text-sm text-gray-500">今天 11:15</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            歷史警報
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-2 font-bold text-gray-700">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span>系統警報 #{i + 1}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">已處理的警報記錄</p>
                <p className="text-sm text-gray-500">2024/03/{20 - i}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertCenter;