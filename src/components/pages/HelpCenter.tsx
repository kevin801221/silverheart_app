// src/components/pages/HelpCenter.tsx
import React from 'react';
import { HelpCircle, Phone, Mail, MessageCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpCenter: React.FC = () => {
  const faqs = [
    {
      question: "如何開啟通話監控功能？",
      answer: "進入主頁面後，點擊「詐騙檢測」按鈕，在功能列表中開啟「通話監控」開關即可啟動監控功能。"
    },
    {
      question: "忘記密碼怎麼辦？",
      answer: "點擊登入頁面的「忘記密碼」，輸入註冊郵箱後，系統會發送重置密碼連結至您的信箱。"
    },
    {
      question: "如何新增緊急聯絡人？",
      answer: "在側邊選單中選擇「家人管理」，點擊「新增聯絡人」，填寫聯絡人資訊後儲存即可。"
    },
    {
      question: "系統誤判該如何處理？",
      answer: "如遇系統誤判，可以點擊警報通知中的「誤判回報」按鈕，填寫具體情況後提交給我們審核。"
    },
    {
      question: "如何設置交易限額？",
      answer: "在「安全設置」中選擇「交易限額設置」，可以根據需求設定單筆和每日交易限額。"
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-blue-500" />,
      title: "電話支援",
      content: "0800-123-456",
      subContent: "服務時間：週一至週五 9:00-18:00"
    },
    {
      icon: <Mail className="w-6 h-6 text-green-500" />,
      title: "電子郵件",
      content: "support@silverheart.com",
      subContent: "一般在 24 小時內回覆"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
      title: "線上客服",
      content: "點擊開始對話",
      subContent: "24小時智能客服"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">幫助中心</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>常見問題</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>聯絡我們</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {method.icon}
                  <div className="flex-1">
                    <h3 className="font-medium">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{method.subContent}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenter;