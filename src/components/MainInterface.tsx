// src/components/MainInterface.tsx
import React from 'react';
import { Shield, AlertTriangle, Bell } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

const MainInterface = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航欄 */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-xl font-bold">銀心永晟 - 智能防詐系統</h1>
        </div>
      </header>

      {/* 警告通知 */}
      <div className="p-4">
        <Alert variant="destructive">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div>
              <AlertTitle className="text-red-500 font-bold">
                發現潛在詐騙風險！
              </AlertTitle>
              <AlertDescription className="text-red-700">
                檢測到可疑語音模式，請提高警覺
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>

      {/* 主要功能按鈕 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <button className="bg-blue-500 text-white p-6 rounded-lg flex flex-col items-center gap-3 shadow-md hover:bg-blue-600 transition-colors">
          <Shield className="w-10 h-10" />
          <span className="text-lg">詐騙檢測</span>
          <span className="text-sm text-blue-100">AI智能防護</span>
        </button>
        <button className="bg-blue-500 text-white p-6 rounded-lg flex flex-col items-center gap-3 shadow-md hover:bg-blue-600 transition-colors">
          <Bell className="w-10 h-10" />
          <span className="text-lg">警報中心</span>
          <span className="text-sm text-blue-100">2則新通知</span>
        </button>
      </div>
    </div>
  );
};

export default MainInterface;