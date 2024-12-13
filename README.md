# SilverHeart - 智能防詐系統

SilverHeart 是一個現代化的智能防詐騙系統，使用 React + TypeScript + Tailwind CSS 開發，整合了 AI 圖片分析和 Line 管理功能，提供全方位的防詐騙解決方案。

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