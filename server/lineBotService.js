const express = require('express');
const line = require('@line/bot-sdk');
const { OpenAI } = require('openai');
require('dotenv').config();

// 首先檢查環境變數
const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

// 檢查配置是否存在
if (!lineConfig.channelAccessToken || !lineConfig.channelSecret) {
  console.error('請確保 LINE_CHANNEL_ACCESS_TOKEN 和 LINE_CHANNEL_SECRET 已設置在 .env 文件中');
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error('請確保 OPENAI_API_KEY 已設置在 .env 文件中');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const client = new line.Client(lineConfig);
const app = express();

// 基本的錯誤處理中間件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// 測試路由
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running'
  });
});

// Webhook 路由
app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  try {
    console.log('Received webhook request:', JSON.stringify(req.body, null, 2));
    
    // 立即返回 200
    res.status(200).json({ status: 'ok' });
    
    // 確保 events 存在
    const events = req.body.events || [];
    
    // 非同步處理每個事件
    for (const event of events) {
      try {
        if (event.type !== 'message' || event.message.type !== 'text') {
          console.log('Skipping non-text message event');
          continue;
        }

        const { text } = event.message;
        console.log('Processing message:', text);

        // 使用 OpenAI API
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { 
              role: "system", 
              content: "You are a fraud prevention expert. Please respond in Traditional Chinese." 
            },
            { 
              role: "user", 
              content: text 
            }
          ]
        });

        const replyText = completion.choices[0].message.content || "抱歉，無法生成回應";
        console.log('AI response:', replyText);

        // 回覆訊息
        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: replyText
        });
        
        console.log('Reply sent successfully');
      } catch (eventError) {
        console.error('Error processing event:', eventError);
      }
    }
  } catch (error) {
    console.error('Webhook error:', error);
    // 即使發生錯誤也確保返回 200
    if (!res.headersSent) {
      res.status(200).json({
        status: 'error',
        message: error.message
      });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment variables loaded:');
  console.log('- LINE_CHANNEL_ACCESS_TOKEN:', lineConfig.channelAccessToken ? '已設置' : '未設置');
  console.log('- LINE_CHANNEL_SECRET:', lineConfig.channelSecret ? '已設置' : '未設置');
  console.log('- OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '已設置' : '未設置');
  console.log('\nWebhook URL should be set to:');
  console.log('https://your-ngrok-url/webhook');
});