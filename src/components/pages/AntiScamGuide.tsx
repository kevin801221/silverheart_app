// src/components/pages/AntiScamGuide.tsx
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AntiScamGuide: React.FC = () => {
  const guides = [
    {
      title: "電話詐騙防範",
      tips: [
        "接到陌生電話要提高警覺",
        "不輕易相信來電顯示",
        "接到自稱公務機關要求操作 ATM 要特別小心",
        "遇有疑似詐騙電話撥打 165 諮詢"
      ]
    },
    {
      title: "網路詐騙防範",
      tips: [
        "不隨意點擊不明網站",
        "網購請使用知名平台",
        "避免在不安全的網站輸入個人資料",
        "定期更新密碼和安全設定"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">防詐指南</h1>
      </div>

      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <AlertTitle className="text-yellow-700">重要提醒</AlertTitle>
        <AlertDescription className="text-yellow-600">
          如果您遇到可疑情況，請立即撥打 165 反詐騙專線尋求協助。
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {guides.map((guide, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{guide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {guide.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2">
                    <div className="min-w-[24px] h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                      {tipIndex + 1}
                    </div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AntiScamGuide;