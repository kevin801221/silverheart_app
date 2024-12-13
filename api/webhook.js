// api/webhook.js

const line = require('@line/bot-sdk');

// Line Bot 配置
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

// 創建 Line client
const client = new line.Client(config);

export default async function handler(req, res) {
  // 只接受 POST 請求
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const events = req.body.events;
    
    await Promise.all(events.map(async (event) => {
      if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
      }

      let replyText = '收到您的訊息';

      // 基本的指令處理
      switch (event.message.text.toLowerCase()) {
        case '/help':
        case '/?':
          replyText = '可用指令列表：\n' +
                     '/投資詐騙 - 了解投資詐騙手法\n' +
                     '/假冒身份 - 了解假冒身份詐騙\n' +
                     '/緊急求助 - 獲取緊急協助\n' +
                     '/個資保護 - 個資保護建議\n' +
                     '/詐騙案例 - 查看近期詐騙案例';
          break;
        
        case '/投資詐騙':
          replyText = '🚨 投資詐騙常見手法：\n' +
                     '1. 承諾高報酬低風險\n' +
                     '2. 聲稱穩賺不賠的投資\n' +
                     '3. 要求先付費才能提領收益\n\n' +
                     '⚠️ 保護方式：\n' +
                     '- 不輕信未經證實的投資機會\n' +
                     '- 避免點擊可疑連結\n' +
                     '- 不透露個人資料給陌生人';
          break;

        // ... 其他指令處理 ...
      }

      // 發送回覆
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
      });
    }));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook 處理錯誤:', error);
    res.status(500).json({ success: false, message: '處理失敗' });
  }
}