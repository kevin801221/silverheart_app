// src/components/pages/TermsOfService.tsx
import React from 'react';
import { FileText, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService: React.FC = () => {
  const sections = [
    {
      title: "服務範圍",
      content: `本應用程式提供詐騙預防及防護服務，包括但不限於：
        - AI 智能防詐系統
        - 即時通話監控
        - 交易安全防護
        - 緊急聯絡功能
        用戶同意在使用本服務時遵守相關法律法規。`
    },
    {
      title: "用戶責任",
      content: `用戶在使用本服務時應當：
        - 提供真實、準確的個人資訊
        - 妥善保管賬號及密碼
        - 不得將服務用於非法用途
        - 遵守相關法律法規`
    },
    {
      title: "隱私保護",
      content: `我們重視用戶隱私保護：
        - 依法收集和使用用戶資訊
        - 採取安全措施保護用戶資料
        - 未經授權不向第三方透露用戶資訊
        - 定期更新隱私保護政策`
    },
    {
      title: "免責聲明",
      content: `本服務不承擔以下責任：
        - 因不可抗力造成的服務中斷
        - 用戶未按指南操作造成的損失
        - 第三方造成的侵權行為
        - 用戶自身操作失誤造成的損失`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">使用條款</h1>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-gray-700">
                {section.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        最後更新日期：2024年3月26日
      </div>
    </div>
  );
};

export default TermsOfService;