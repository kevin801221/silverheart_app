# SilverHeart: AI-Powered Anti-Fraud System 🛡️

In response to the heartbreaking surge in fraud cases, particularly those targeting vulnerable individuals like our elderly parents and grandparents, I've developed SilverHeart - an innovative AI-powered anti-fraud protection system.

## Why SilverHeart? 💝

After witnessing numerous tragic cases of fraud, including the devastating "pig butchering" scams that have destroyed families and lives, I decided to take action. I refuse to stand by and watch more people fall victim to these sophisticated scams. Every story of financial loss represents not just money, but shattered dreams, trust, and sometimes entire life savings.

## What Makes SilverHeart Different? 🤖

- **Intelligent LINE Bot Integration**: Leveraging the most popular messaging platform in Asia to provide real-time fraud prevention
- **RAG-Enhanced Response System**: Utilizing advanced Retrieval Augmented Generation for accurate, up-to-date fraud detection
- **Multi-Agent System**: Simulating real-time web searches and information verification
- **User-Friendly Interface**: Designed with elderly users in mind, making complex security accessible to all

## Project Goals 🎯

1. Prevent financial fraud before it happens
2. Educate users about the latest scam techniques
3. Provide immediate support when suspicious activities are detected
4. Build a stronger, safer community through shared knowledge

## Get Involved 🤝

This is more than just a project - it's a mission to protect our loved ones. Check out the project and contribute:

[SilverHeart Project Repository](https://github.com/kevin801221/silverheart_app.git)

Together, we can build a shield against fraud and ensure no more families have to experience the devastation of scams. Because every parent, grandparent, and vulnerable individual deserves to feel safe and protected in our digital world.

#AntiFraud #AIForGood #ElderProtection #FraudPrevention #TechForGood

Let's make the digital world a safer place for everyone, one line of code at a time. 🌟
# SilverHeart - 智能防詐系統

SilverHeart 是一個現代化的智能防詐騙系統，使用 React + TypeScript + Tailwind CSS 開發，整合了 AI 圖片分析和 Line 管理功能，提供全方位的防詐騙解決方案。

## 最新更新AI內容 (2024/12/14)

### 1. Line Bot 智能升級
#### 1.1 交互式搜索體驗
- 新增模擬網路搜索功能，提供更真實的AI助手體驗
- 整合打字機效果，實現漸進式信息展示
- 模擬RAG（Retrieval Augmented Generation）流程，展示實時檢索過程

#### 1.2 Agent系統實現
```typescript
const agentBehaviors = {
  搜索階段: "🔍 正在搜索相關資訊...",
  資料庫連接: "📡 連接到反詐騙資料庫...",
  AI分析: "🤖 使用 AI 分析最新案例...",
  信息整合: "📊 彙整相關資訊..."
}
```
- 模擬多階段處理流程
- 展示AI決策過程
- 提供透明的處理步驟說明

### 2. 架構改進
#### 2.1 模組化設計
- 分離服務邏輯與展示層
- 統一類型定義
- 可擴展的消息處理系統

```typescript
interface MessageResponse {
  content: string;
  type: 'instant' | 'typing' | 'searching';
  searchResults?: string[];
}
```

#### 2.2 Mock資料結構
```typescript
const mockSearchResults = {
  "投資詐騙": [
    "https://www.165.gov.tw/investement-fraud/article/2024/03/15",
    // ... 更多相關連結
  ]
}
```

### 3. 未來規劃功能
#### 3.1 自動化內容更新
- [ ] 實現自動爬蟲系統，定期更新詐騙案例資料庫
- [ ] 使用LLM自動分類和整理新案例
- [ ] 建立動態更新的知識庫

#### 3.2 智能分析升級
- [ ] 整合真實的RAG系統
- [ ] 添加多模態分析能力
- [ ] 實現跨語言詐騙模式識別

#### 3.3 使用者互動優化
- [ ] 支援多輪對話記憶
- [ ] 個性化回應定制
- [ ] 情境感知回應系統

### 4. 技術實現重點
```typescript
// 核心消息處理
async function handleLineMessage(message: string): Promise<MessageResponse> {
  // 智能消息分類與處理
  // RAG模擬與回應生成
  // 動態內容整合
}

// 搜索序列生成
async function generateSearchSequence(query: string): Promise<string[]> {
  // 模擬網絡搜索過程
  // 相關資源檢索
  // 結果排序與過濾
}
```

### 5. 安裝與配置
新增配置項：
```bash
# 環境變數設置
LINE_CHANNEL_ACCESS_TOKEN=your_access_token
LINE_CHANNEL_SECRET=your_channel_secret
OPENAI_API_KEY=your_api_key
```

### 6. 使用說明
1. 安裝依賴：`npm install`
2. 設置環境變數
3. 啟動服務：
   ```bash
   npm run dev        # 前端開發服務
   cd server && node lineBotService.js  # LINE Bot 服務
   ```

### 7. 注意事項
- 當前搜索功能為模擬實現，將在後續版本中整合真實搜索
- 建議在測試環境中充分驗證新功能
- 保持環境變數的安全性

---

## 專案架構圖
![專案架構road map](/src/assets/structure.png)

## 核心功能

### 基礎功能
- 📱 即時通話監控
- 🎯 AI 智能詐騙識別
- 🔔 風險預警通知
- 💳 交易監控與凍結
- 👥 家人安全管理
- 📊 風險等級評估

### Line 管理功能
- 🤖 群組管理
  - 群組狀態監控
  - 成員管理
  - 警報配置
- 📊 API 監控
  - 調用頻率統計
  - 響應時間追踪
  - 錯誤率分析
- 🔍 RAG 檢索系統
  - 歷史消息搜索
  - 相似案例分析
  - 智能推薦

### 交易安全
- 🔒 智能凍結交易
  - 自定義凍結時長
  - 多級別凍結選項
  - 交易限額設置
- ⚡ 緊急聯絡功能
  - 快速聯繫家人
  - 多重緊急聯絡人管理

## 技術架構

### 前端技術
- **核心框架**: React 18 + TypeScript + Vite
- **路由**: React Router DOM v6
- **樣式**: Tailwind CSS + CSS Modules
- **UI 組件**: 
  - shadcn/ui
  - Radix UI Primitives
  - Recharts (資料視覺化)
- **狀態管理**: React Hooks + Context API
- **工具庫**:
  - class-variance-authority
  - clsx
  - tailwind-merge
- **圖標**: Lucide React

### 後端整合
- **LINE Bot 服務**:
  - LINE Messaging API
  - Express.js
  - OpenAI GPT-4
- **AI 服務**: 
  - Ollama API
  - RAG 系統
- **數據存儲**:
  - MongoDB (消息歷史)
  - Redis (快取)
  - Vector Database (RAG 系統)

  ## 安裝與部署指南

### 前端安裝
1. 克隆專案:
```bash
git clone https://github.com/kevin801221/silverheart_app.git
cd silverheart_app
```

2. 安裝核心依賴:
```bash
# 安裝基礎依賴
npm install

# UI 組件相關依賴
npm install @radix-ui/react-slot @radix-ui/react-slider @radix-ui/react-switch
npm install @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-tabs
npm install class-variance-authority lucide-react clsx tailwind-merge
npm install react-router-dom recharts

# 開發依賴
npm install -D tailwindcss postcss autoprefixer
npm install -D typescript @types/react @types/react-dom @types/node
```

### LINE Bot 服務安裝
1. 安裝 LINE Bot 相關依賴:
```bash
npm install express @line/bot-sdk openai dotenv
```

2. 環境配置:
創建 `.env` 文件並填入以下配置：
```env
# Line Bot 配置
LINE_CHANNEL_ACCESS_TOKEN=your_access_token
LINE_CHANNEL_SECRET=your_channel_secret
OPENAI_API_KEY=your_openai_api_key

# 前端配置
VITE_API_URL=http://localhost:3001
```

### 啟動服務

1. 啟動前端開發服務器:
```bash
npm run dev
```
前端服務將在 http://localhost:5173 運行

2. 啟動 LINE Bot 服務:
```bash
# 切換到 server 目錄
cd server

# 啟動服務
node lineBotService.js
```
LINE Bot 服務將在 http://localhost:3001 運行

3. 啟動 ngrok 進行外網連接:
```bash
ngrok http 3001
```

### LINE Bot 配置
1. 前往 [LINE Developers Console](https://developers.line.biz/)
2. 在您的 Channel 設定中:
   - 設置 Webhook URL: `https://your-ngrok-url/webhook`
   - 開啟 "Use webhook" 選項
   - 點擊 "Verify" 按鈕測試連接

### 專案結構
```
silverheart_app/
├── src/
│   ├── components/
│   │   ├── ui/              # UI 組件
│   │   ├── pages/           # 頁面組件
│   │   └── ...
│   ├── services/            # 服務層
│   └── lib/                 # 工具函數
├── server/
│   └── lineBotService.js    # LINE Bot 服務
├── .env                     # 環境變數
└── README.md
```

### 生產環境部署

1. 建構前端生產版本:
```bash
npm run build
```

2. 預覽生產版本:
```bash
npm run preview
```

3. 部署 LINE Bot 服務:
```bash
# 使用 PM2 運行服務（推薦）
npm install -g pm2
pm2 start server/lineBotService.js

# 或使用普通方式運行
node server/lineBotService.js
```

## 開發指南

### 路由配置
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<AntiFraudApp />}>
      <Route path="/settings/personal" element={<PersonalSettings />} />
      <Route path="/line-management" element={<LineManagement />} />
      <Route path="/family-management" element={<FamilyManagement />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Fraud Detection Workflow System

新實作的詐騙檢測工作流程系統基於 LangGraph 設計概念，提供模組化且靈活的詐騙檢測方法。

#### 核心組件
- `TextAnalysisTool`: 可疑文字訊息分析
- `ImageAnalysisTool`: 詐騙圖片檢測
- `TransactionAnalysisTool`: 可疑交易監控
- `PhoneCallAnalysisTool`: 通話模式分析

#### 實作範例
```typescript
const workflow = new FraudDetectionWorkflow();

// 事件監聽設置
workflow.on('analysisComplete', ({ type, result, state }) => {
  if (state.riskLevel > 0.8) {
    triggerHighRiskAlert(result);
  }
});

// 支援多種分析類型
await workflow.analyze(textData, "text");
await workflow.analyze(imageData, "image");
await workflow.analyze(transactionData, "transaction");
```

## 故障排除指南

### 常見問題解決

1. **前端開發環境問題**
```bash
# 清除依賴並重新安裝
rm -rf node_modules
npm install

# 清除快取
npm cache clean --force
```

2. **LINE Bot 連接問題**
- 確認 ngrok 是否正常運行
- 檢查 Webhook URL 設置是否正確
- 確保環境變數正確設置

3. **資料庫連接問題**
- 檢查資料庫連接字串
- 確認資料庫服務是否運行
- 檢查網路連接狀態

### TypeScript 相關問題
```bash
# 重新安裝 TypeScript
npm install -D typescript @types/react @types/react-dom

# 生成新的 tsconfig.json
npx tsc --init
```

## 待開發功能
- [ ] 深色模式支持
- [ ] 多語言系統
- [ ] 離線功能
- [ ] 生物認證
- [ ] Line Bot 自動回覆優化
- [ ] RAG 系統增強
- [ ] 群組行為分析
- [ ] API 使用量監控

## 貢獻指南
1. Fork 專案
2. 創建特性分支 (`git checkout -b feature/YourFeature`)
3. 提交更改 (`git commit -m 'Add YourFeature'`)
4. 推送到分支 (`git push origin feature/YourFeature`)
5. 開啟 Pull Request

## 授權與支持
- **授權**: Apache2.0
- **Email**: kilong31442@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/zih-jia-luo-2b49a31b3/
- **GitHub**: https://github.com/kevin801221/silverheart_app.git

### 聯繫支持
如有任何問題或建議，歡迎透過以上管道聯繫，或在 GitHub 上開啟 Issue。

Copyright (c) 2024 銀心永晟科技
