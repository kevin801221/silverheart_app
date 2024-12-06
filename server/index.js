// server/index.js
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
require('dotenv').config();
const uri = process.env.MONGODB_URI;
// const uri = "mongodb+srv://kevinluo1221:@cluster0.alpag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// API 端點：保存用戶設置
app.post('/api/user-settings', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("silverheart");
    const collection = database.collection("user_settings");
    
    const result = await collection.updateOne(
      { userId: req.body.userId || 'default-user' },
      { $set: {
          name: req.body.name,
          phone: req.body.phone,
          notificationSettings: req.body.notificationSettings,
          securitySettings: req.body.securitySettings,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    res.json({ success: true, message: '設置已保存' });
  } catch (error) {
    console.error('保存設置失敗:', error);
    res.status(500).json({ success: false, message: '保存設置失敗' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});