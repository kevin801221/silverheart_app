import React, { useState, useEffect } from 'react';
import { 
  Bell, Shield, Phone, Lock, MessageSquare, Menu, ArrowLeft, AlertTriangle,
  Settings, FileText, Users, History, ChevronRight, Smartphone, VolumeX,
  CreditCard, Share2, ShieldCheck, BookOpen, HelpCircle, UserCog, CircleDollarSign
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
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import FreezeTransaction from './FreezeTransaction';

// 定義介面
interface TransactionState {
  isFrozen: boolean;
  frozenUntil: Date | null;
  frozenOptions: FreezeOptions | null;
}

interface FreezeOptions {
  blockAll: boolean;
  blockOnline: boolean;
  blockInternational: boolean;
  maxAmount: number;
}

interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

const AntiFraudApp = () => {
  const [activeSection, setActiveSection] = useState('main');
  const { toast } = useToast();
  
  // 交易狀態管理
  const [transactionState, setTransactionState] = useState<TransactionState>({
    isFrozen: false,
    frozenUntil: null,
    frozenOptions: null
  });

  // 緊急聯絡人
  const [emergencyContacts] = useState<EmergencyContact[]>([
    { name: "張先生", phone: "0912-345-678", relation: "父親" },
    { name: "李小姐", phone: "0923-456-789", relation: "女兒" }
  ]);

  // 處理凍結交易
  const handleFreeze = async (duration: number, options: FreezeOptions) => {
    try {
      // 設置凍結結束時間
      const frozenUntil = new Date();
      frozenUntil.setHours(frozenUntil.getHours() + duration);

      // 更新狀態
      setTransactionState({
        isFrozen: true,
        frozenUntil,
        frozenOptions: options
      });

      // 顯示成功提示
      toast({
        title: "交易已凍結",
        description: `帳戶將凍結至 ${frozenUntil.toLocaleString()}`,
        variant: "destructive",
      });

      // 這裡可以添加與後端的通信邏輯
      // await api.freezeTransaction(duration, options);
      
    } catch (error) {
      toast({
        title: "凍結失敗",
        description: "請稍後重試或聯繫客服",
        variant: "destructive",
      });
    }
  };

  // 處理解除凍結
  const handleUnfreeze = async () => {
    try {
      // 更新狀態
      setTransactionState({
        isFrozen: false,
        frozenUntil: null,
        frozenOptions: null
      });

      toast({
        title: "已解除凍結",
        description: "交易功能已恢復正常",
      });

      // 這裡可以添加與後端的通信邏輯
      // await api.unfreezeTransaction();

    } catch (error) {
      toast({
        title: "解凍失敗",
        description: "請稍後重試或聯繫客服",
        variant: "destructive",
      });
    }
  };

  // 處理緊急聯絡
  const handleEmergencyCall = (contact: EmergencyContact) => {
    toast({
      title: "正在撥打緊急聯絡人",
      description: `正在聯繫 ${contact.name}（${contact.relation}）`,
    });
    // 這裡可以添加實際的撥號邏輯
    window.location.href = `tel:${contact.phone}`;
  };

  // 渲染詐騙檢測中心
  const renderFraudDetection = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-500" />
        詐騙檢測中心
      </h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="w-5 h-5 text-green-500" />
            交易狀態
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactionState.isFrozen ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>交易已凍結</AlertTitle>
              <AlertDescription>
                凍結將持續至：{transactionState.frozenUntil?.toLocaleString()}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700">交易正常</AlertTitle>
              <AlertDescription className="text-green-600">
                您的帳戶目前可以正常交易
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-500" />
            即時監控
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="text-green-600" />
              <span>通話監控</span>
            </div>
            <div className="text-green-600">運行中</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <VolumeX className="text-green-600" />
              <span>詐騙語音識別</span>
            </div>
            <div className="text-green-600">運行中</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="text-green-600" />
              <span>交易監控</span>
            </div>
            <div className="text-green-600">運行中</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-500" />
            安全設置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Share2 className="text-gray-600" />
              <span>可疑號碼攔截</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-gray-600" />
              <span>安全名單設置</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // 渲染警報中心
  const renderAlerts = () => (
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
                  { icon: <UserCog />, label: '個人設置' },
                  { icon: <Users />, label: '家人管理' },
                  { icon: <History />, label: '操作記錄' },
                  { icon: <BookOpen />, label: '防詐指南' },
                  { icon: <FileText />, label: '使用條款' },
                  { icon: <HelpCircle />, label: '幫助中心' },
                  { icon: <Settings />, label: '系統設置' }
                ].map((item, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="w-5 h-5 text-gray-500">{item.icon}</div>
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
          {/* Alert Section */}
          <Alert className="mx-4 mt-4 border-red-500 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <AlertTitle className="text-red-500 font-bold">
              發現潛在詐騙風險！
            </AlertTitle>
            <AlertDescription className="text-red-700">
              檢測到可疑語音模式
            </AlertDescription>
          </Alert>

          {/* Transaction Status */}
          {transactionState.isFrozen && (
            <Alert 
              className="mx-4 mt-4" 
              variant="destructive"
            >
              <Lock className="h-5 w-5" />
              <AlertTitle>交易已凍結</AlertTitle>
              <AlertDescription>
                將持續至 {transactionState.frozenUntil?.toLocaleString()}
              </AlertDescription>
            </Alert>
          )}

          {/* Main Function Buttons */}
          
          <div className="grid grid-cols-2 gap-4 p-4 mt-4">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg flex flex-col items-center gap-3 transition-colors shadow-md"
              onClick={() => setActiveSection('fraudDetection')}
            >
              <Shield className="w-8 h-8" />
              <span className="text-lg">詐騙檢測</span>
              <span className="text-sm text-blue-100">AI智能防護</span>
            </button>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg flex flex-col items-center gap-3 transition-colors shadow-md"
              onClick={() => setActiveSection('alerts')}
            >
              <Bell className="w-8 h-8" />
              <span className="text-lg">警報中心</span>
              <span className="text-sm text-blue-100">2則新通知</span>
            </button>
          </div>

          {/* Statistics Card */}
          <Card className="mx-4 mt-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-700">今日已阻擋詐騙次數</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-1">3</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">當前風險等級</h3>
                  <p className="text-2xl font-bold text-red-600 mt-1">高</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeSection === 'fraudDetection' && renderFraudDetection()}
      {activeSection === 'alerts' && renderAlerts()}

      {/* Emergency Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <FreezeTransaction 
            onFreeze={handleFreeze} 
            onUnfreeze={handleUnfreeze}
            transactionState={transactionState}
          />
          <div className="relative group">
            <button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={() => {
                if (emergencyContacts.length > 0) {
                  handleEmergencyCall(emergencyContacts[0]);
                }
              }}
            >
              <Phone className="w-6 h-6" />
              <span>聯絡家人</span>
            </button>
            {/* 緊急聯絡人下拉選單 */}
            <div className="hidden group-hover:block absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border">
              {emergencyContacts.map((contact, index) => (
                <button
                  key={index}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 text-left"
                  onClick={() => handleEmergencyCall(contact)}
                >
                  <Phone className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.relation}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Button */}
      <button 
        className="fixed bottom-20 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
        onClick={() => {
          toast({
            title: "AI 助手已啟動",
            description: "有什麼我可以幫您的嗎？",
          });
        }}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Toast 提供者 */}
      <ToastProvider>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export default AntiFraudApp;