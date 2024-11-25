import React, { useState } from 'react';
import { 
  Bell, Shield, Phone, Lock, MessageSquare, Menu, ArrowLeft, AlertTriangle,
  Settings, FileText, Users, History, ChevronRight, Smartphone, VolumeX,
  CreditCard, Share2, ShieldCheck, BookOpen, HelpCircle, UserCog
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// 定義部分類型
type SectionType = 'main' | 'fraudDetection' | 'alerts';

interface AlertItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'high' | 'medium' | 'low';
}

interface MonitoringItem {
  icon: React.ReactNode;
  label: string;
  status: 'running' | 'stopped' | 'error';
}

interface SecuritySetting {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const AntiFraudApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('main');

  // 監控項目數據
  const monitoringItems: MonitoringItem[] = [
    {
      icon: <Smartphone className="text-green-600" />,
      label: "通話監控",
      status: "running"
    },
    {
      icon: <VolumeX className="text-green-600" />,
      label: "詐騙語音識別",
      status: "running"
    },
    {
      icon: <CreditCard className="text-green-600" />,
      label: "交易監控",
      status: "running"
    }
  ];

  // 安全設置項目
  const securitySettings: SecuritySetting[] = [
    {
      icon: <Share2 />,
      label: "可疑號碼攔截",
      onClick: () => console.log("開啟可疑號碼攔截設置")
    },
    {
      icon: <ShieldCheck />,
      label: "安全名單設置",
      onClick: () => console.log("開啟安全名單設置")
    }
  ];

  const renderFraudDetection = (): JSX.Element => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">詐騙檢測中心</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>即時監控</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {monitoringItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <div className="text-green-600">
                {item.status === 'running' ? '運行中' : '已停止'}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>安全設置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {securitySettings.map((setting, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
              onClick={setting.onClick}
            >
              <div className="flex items-center gap-3">
                {setting.icon}
                <span>{setting.label}</span>
              </div>
              <ChevronRight />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderAlerts = (): JSX.Element => {
    const todayAlerts: AlertItem[] = [
      {
        id: 1,
        title: "高風險通話警報",
        description: "檢測到可疑詐騙語音模式",
        time: "今天 14:30",
        type: "high"
      },
      {
        id: 2,
        title: "可疑交易提醒",
        description: "檢測到大額轉帳請求",
        time: "今天 11:15",
        type: "medium"
      }
    ];

    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">警報中心</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>今日警報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.type === 'high' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className={`flex items-center gap-2 font-bold ${
                  alert.type === 'high' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                  <span>{alert.title}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{alert.description}</p>
                <p className="text-sm text-gray-500">{alert.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>歷史警報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 font-bold">
                    <Bell className="w-5 h-5" />
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

  const handleEmergencyAction = (action: 'freeze' | 'call'): void => {
    if (action === 'freeze') {
      console.log('凍結交易');
    } else {
      console.log('撥打家人電話');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeSection !== 'main' && (
              <ArrowLeft 
                className="w-6 h-6 cursor-pointer" 
                onClick={() => setActiveSection('main')}
              />
            )}
            <Shield className="w-8 h-8" />
            <h1 className="text-xl font-bold">銀心永晟 - 智能防詐系統</h1>
          </div>
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>系統選單</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {[
                  { icon: <UserCog className="w-5 h-5" />, label: '個人設置' },
                  { icon: <Users className="w-5 h-5" />, label: '家人管理' },
                  { icon: <History className="w-5 h-5" />, label: '操作記錄' },
                  { icon: <BookOpen className="w-5 h-5" />, label: '防詐指南' },
                  { icon: <FileText className="w-5 h-5" />, label: '使用條款' },
                  { icon: <HelpCircle className="w-5 h-5" />, label: '幫助中心' },
                  { icon: <Settings className="w-5 h-5" />, label: '系統設置' }
                ].map((item, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => console.log(`Clicked: ${item.label}`)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {activeSection === 'main' && (
        <>
          <Alert className="mx-4 mt-4 border-red-500 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <AlertTitle className="text-red-500 font-bold">
              發現潛在詐騙風險！
            </AlertTitle>
            <AlertDescription className="text-red-700">
              檢測到可疑語音模式
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4 p-4 mt-4">
            <button 
              className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center gap-2"
              onClick={() => setActiveSection('fraudDetection')}
            >
              <Shield className="w-8 h-8" />
              <span>詐騙檢測</span>
            </button>
            <button 
              className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center gap-2"
              onClick={() => setActiveSection('alerts')}
            >
              <Bell className="w-8 h-8" />
              <span>警報中心</span>
            </button>
          </div>

          <Card className="mx-4 mt-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">今日已阻擋詐騙次數</h3>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <div>
                  <h3 className="font-bold">當前風險等級</h3>
                  <p className="text-2xl font-bold text-red-600">高</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeSection === 'fraudDetection' && renderFraudDetection()}
      {activeSection === 'alerts' && renderAlerts()}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <button 
            className="bg-red-500 text-white p-4 rounded-lg flex items-center justify-center gap-2"
            onClick={() => handleEmergencyAction('freeze')}
          >
            <Lock className="w-6 h-6" />
            <span>凍結交易</span>
          </button>
          <button 
            className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center gap-2"
            onClick={() => handleEmergencyAction('call')}
          >
            <Phone className="w-6 h-6" />
            <span>聯絡家人</span>
          </button>
        </div>
      </div>

      <button 
        className="fixed bottom-20 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => console.log('開啟聊天機器人')}
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AntiFraudApp;