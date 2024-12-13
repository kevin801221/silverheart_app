// // server/index.js
// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());
// require('dotenv').config();
// const uri = process.env.MONGODB_URI;
// // const uri = "mongodb+srv://kevinluo1221:@cluster0.alpag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri);

// // API 端點：保存用戶設置
// app.post('/api/user-settings', async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db("silverheart");
//     const collection = database.collection("user_settings");
    
//     const result = await collection.updateOne(
//       { userId: req.body.userId || 'default-user' },
//       { $set: {
//           name: req.body.name,
//           phone: req.body.phone,
//           notificationSettings: req.body.notificationSettings,
//           securitySettings: req.body.securitySettings,
//           updatedAt: new Date()
//         }
//       },
//       { upsert: true }
//     );

//     res.json({ success: true, message: '設置已保存' });
//   } catch (error) {
//     console.error('保存設置失敗:', error);
//     res.status(500).json({ success: false, message: '保存設置失敗' });
//   } finally {
//     await client.close();
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// server/index.js
const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();
const cors = require('cors');
const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

app.use(cors());
app.use(express.json());

// 添加一個測試端點
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// 修改 webhook 端點
app.post('/webhook', line.middleware(config), async (req, res) => {
  console.log('Received webhook request');  // 添加日誌
  try {
    const events = req.body.events;
    console.log('Events:', events);  // 添加日誌

    await Promise.all(events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        const { text } = event.message;
        console.log('Received message:', text);  // 添加日誌
        
        let replyText = '收到您的訊息';
        
        switch (text) {
          case '/help':
            replyText = '可用指令：\n/投資詐騙\n/假冒身份\n/緊急求助';
            break;
          case '/投資詐騙':
            replyText = '🚨 投資詐騙常見手法：\n1. 承諾高報酬低風險\n2. 聲稱穩賺不賠\n3. 要求先付費';
            break;
        }

        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: replyText
        });
      }
    }));
    
    res.json({ success: true });  // 確保回應 200
  } catch (err) {
    console.error('Error:', err);  // 添加錯誤日誌
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});