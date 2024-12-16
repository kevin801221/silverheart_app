import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, MessageSquare } from 'lucide-react';

// 模擬對話腳本
const simulatedResponses = [
  {
    triggers: ['你好', 'hello', 'hi'],
    responses: [
      '您好！我是防詐騙小幫手 🤖\n有什麼我可以協助您的嗎？',
      '您好！需要了解最新的詐騙手法或防範方式嗎？',
      '您好！我可以協助您了解：\n1. 最新詐騙手法\n2. 防詐騙指南\n3. 緊急處理方式'
    ]
  },
  {
    triggers: ['投資'],
    responses: [
      '⚠️ 提醒您注意投資詐騙！\n\n常見手法：\n1. 承諾高報酬低風險\n2. 要求先付費才能提領\n3. 宣稱使用內部消息\n\n請務必小心驗證！',
      '🚨 投資詐騙警告！\n\n主要特徵：\n- 聲稱穩賺不賠\n- 要求先付費\n- 施加時間壓力\n\n如有疑慮請撥打 165 專線'
    ]
  },
  {
    triggers: ['緊急'],
    responses: [
      '‼️ 緊急處理方式：\n\n1. 立即凍結帳戶：撥打銀行緊急專線\n2. 報案：撥打 165 反詐騙專線\n3. 保存對話紀錄\n\n需要銀行專線號碼嗎？',
      '🆘 緊急狀況處理：\n\n1. 保持冷靜\n2. 不要再繼續匯款\n3. 撥打 165 專線\n4. 向銀行通報\n\n我可以協助您聯繫相關單位'
    ]
  }
];

const LineBotTester = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [metrics, setMetrics] = useState({
    messageCount: 0,
    avgResponseTime: 1005,
    successRate: 100
  });

  // 模擬回應選擇
  const getSimulatedResponse = (message) => {
    const normalizedMessage = message.toLowerCase().trim();
    
    for (const script of simulatedResponses) {
      if (script.triggers.some(trigger => normalizedMessage.includes(trigger))) {
        const randomResponse = script.responses[Math.floor(Math.random() * script.responses.length)];
        return randomResponse;
      }
    }
    
    return '我了解您的意思了。讓我查詢相關資訊...\n\n需要了解更多具體資訊嗎？';
  };

  // 模擬打字效果
  const simulateTyping = async (response) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'system',
      content: '正在使用 AI 分析您的訊息...',
      timestamp: new Date()
    }]);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setMessages(prev => {
      const filtered = prev.filter(msg => msg.type !== 'system');
      return [...filtered, {
        id: Date.now(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      }];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 添加用戶訊息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // 更新指標
    setMetrics(prev => ({
      messageCount: prev.messageCount + 1,
      avgResponseTime: 1005,
      successRate: 100
    }));

    // 獲取並顯示回應
    const response = getSimulatedResponse(inputMessage);
    await simulateTyping(response);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 指標區 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-blue-600">總訊息數</div>
          <div className="text-2xl font-bold text-blue-700">{metrics.messageCount}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-green-600">平均回應時間</div>
          <div className="text-2xl font-bold text-green-700">{metrics.avgResponseTime}ms</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-purple-600">成功率</div>
          <div className="text-2xl font-bold text-purple-700">{metrics.successRate}%</div>
        </div>
      </div>

      {/* 對話區 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-500" />
            測試對話
          </h2>
        </div>
        
        {/* 訊息列表 */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white ml-12'
                    : msg.type === 'system'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-white border mr-12'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 輸入區 */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="輸入測試訊息..."
              className="flex-1"
            />
            <Button type="submit">發送</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LineBotTester;