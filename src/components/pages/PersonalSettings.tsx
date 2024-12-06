// import React from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';
// import { Bell, Lock, UserCircle, Phone } from 'lucide-react';

// export default function PersonalSettings() {
//   return (
//     <div className="container mx-auto p-4 space-y-6">
//       <h1 className="text-2xl font-bold mb-6">個人設置</h1>
      
//       {/* 個人資料卡片 */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <UserCircle className="h-5 w-5" />
//             個人資料
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium">姓名</label>
//               <input
//                 type="text"
//                 className="w-full mt-1 p-2 border rounded-md"
//                 placeholder="請輸入姓名"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">手機號碼</label>
//               <div className="flex gap-2 mt-1">
//                 <input
//                   type="tel"
//                   className="flex-1 p-2 border rounded-md"
//                   placeholder="請輸入手機號碼"
//                 />
//                 <Button variant="outline" size="sm">
//                   <Phone className="h-4 w-4 mr-1" />
//                   驗證
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* 通知設定卡片 */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Bell className="h-5 w-5" />
//             通知設定
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">App 推送通知</p>
//               <p className="text-sm text-gray-500">接收可疑活動的即時通知</p>
//             </div>
//             <Switch />
//           </div>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">簡訊通知</p>
//               <p className="text-sm text-gray-500">接收重要安全提醒</p>
//             </div>
//             <Switch />
//           </div>
//         </CardContent>
//       </Card>

//       {/* 安全設定卡片 */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Lock className="h-5 w-5" />
//             安全設定
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">生物辨識登入</p>
//               <p className="text-sm text-gray-500">使用指紋或臉部辨識快速登入</p>
//             </div>
//             <Switch />
//           </div>
//           <Button variant="outline" className="w-full">
//             修改密碼
//           </Button>
//         </CardContent>
//       </Card>

//       <div className="flex justify-end gap-4">
//         <Button variant="outline">取消</Button>
//         <Button>儲存更改</Button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Lock, UserCircle, Phone } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface UserSettings {
  name: string;
  phone: string;
  notificationSettings: {
    appNotifications: boolean;
    smsNotifications: boolean;
  };
  securitySettings: {
    biometricLogin: boolean;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
}
export default function PersonalSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({
    name: '',
    phone: '',
    notificationSettings: {
      appNotifications: false,
      smsNotifications: false,
    },
    securitySettings: {
      biometricLogin: false,
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/user-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      });
  
      const data = await response.json() as ApiResponse;
      
      if (data.success) {
        toast({
          title: "保存成功",
          description: "您的設置已更新",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "保存失敗",
        description: error instanceof Error ? error.message : "無法更新設置",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">個人設置</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            個人資料
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">姓名</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="請輸入姓名"
                value={settings.name}
                onChange={(e) => setSettings({...settings, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">手機號碼</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="tel"
                  className="flex-1 p-2 border rounded-md"
                  placeholder="請輸入手機號碼"
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                />
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  驗證
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 通知設定卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            通知設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">App 推送通知</p>
              <p className="text-sm text-gray-500">接收可疑活動的即時通知</p>
            </div>
            <Switch
              checked={settings.notificationSettings.appNotifications}
              onCheckedChange={(checked) => 
                setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    appNotifications: checked
                  }
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">簡訊通知</p>
              <p className="text-sm text-gray-500">接收重要安全提醒</p>
            </div>
            <Switch
              checked={settings.notificationSettings.smsNotifications}
              onCheckedChange={(checked) => 
                setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    smsNotifications: checked
                  }
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 安全設定卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            安全設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">生物辨識登入</p>
              <p className="text-sm text-gray-500">使用指紋或臉部辨識快速登入</p>
            </div>
            <Switch
              checked={settings.securitySettings.biometricLogin}
              onCheckedChange={(checked) => 
                setSettings({
                  ...settings,
                  securitySettings: {
                    ...settings.securitySettings,
                    biometricLogin: checked
                  }
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">
          取消
        </Button>
        <Button onClick={handleSave}>
          儲存更改
        </Button>
      </div>
    </div>
  );
}