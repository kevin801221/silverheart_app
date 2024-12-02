# SilverHeart - 智能防詐系統

SilverHeart 是一個現代化的智能防詐騙系統前端應用，使用 React + TypeScript + Tailwind CSS 開發，整合了 AI 圖片分析和 Line 管理功能，旨在提供全方位的防詐騙解決方案。

## 專案架構圖
![專案架構road map](/src/assets/structure.png)

## 技術棧
- **核心框架**: 
  - React 18 + TypeScript + Vite
  - React Router DOM v6
- **樣式方案**: 
  - Tailwind CSS
  - CSS Modules
- **UI 組件**:
  - shadcn/ui
  - Radix UI Primitives
  - Recharts (資料視覺化)
- **狀態管理**:
  - React Hooks
  - Context API
- **圖標**: Lucide React
- **工具庫**:
  - class-variance-authority
  - clsx
  - tailwind-merge
- **API 整合**:
  - LINE Messaging API
  - Ollama API (AI 模型)
- **數據庫**:
  - MongoDB (消息歷史)
  - Redis (快取)
  - Vector Database (RAG 系統)

## 功能特點
### 核心功能
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

## 安裝指南
1. 克隆專案:
```bash
git clone [repository-url]
cd silverheart-new
```

2. 安裝依賴:
```bash
# 核心依賴
npm install

# UI 組件相關依賴
npm install @radix-ui/react-slot @radix-ui/react-slider @radix-ui/react-switch
npm install @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-tabs
npm install class-variance-authority lucide-react clsx tailwind-merge

# 路由相關
npm install react-router-dom

# 資料視覺化
npm install recharts

# API 整合
npm install @line/bot-sdk
npm install ollama

# 數據庫驅動
npm install mongodb
npm install redis
npm install @pinecone-database/pinecone

# 開發依賴
npm install -D tailwindcss postcss autoprefixer @types/node
```

3. 環境配置:
創建 `.env` 文件：
```env
# Line Bot 配置
LINE_CHANNEL_ACCESS_TOKEN=your_access_token
LINE_CHANNEL_SECRET=your_channel_secret

# 數據庫配置
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
PINECONE_API_KEY=your_pinecone_api_key

# Ollama API 配置
OLLAMA_API_URL=http://localhost:11434
```

## 專案結構
```
silverheart-new/
├── src/
│ ├── components/
│ │ ├── ui/
│ │ │ ├── alert.tsx
│ │ │ ├── button.tsx
│ │ │ ├── card.tsx
│ │ │ ├── dialog.tsx
│ │ │ ├── sheet.tsx
│ │ │ ├── slider.tsx
│ │ │ ├── switch.tsx
│ │ │ ├── tabs.tsx        # 新增
│ │ │ ├── toast.tsx
│ │ │ └── use-toast.ts
│ │ ├── pages/           # 新增
│ │ │ ├── PersonalSettings.tsx
│ │ │ ├── LineManagement.tsx
│ │ │ └── FamilyManagement.tsx
│ │ ├── AntiFraudApp.tsx
│ │ ├── FreezeTransaction.tsx
│ │ ├── ImageAnalysis.tsx  # 新增
│ │ └── MainInterface.tsx
│ ├── services/          # 新增
│ │ ├── lineService.ts
│ │ └── ollamaService.ts
│ ├── lib/
│ │ └── utils.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
```

## 開發指南
### 啟動開發服務器:
```bash
npm run dev
```

### 建構生產版本:
```bash
npm run build
```

### 預覽生產版本:
```bash
npm run preview
```

## 路由配置
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<AntiFraudApp />}>
      <Route path="/settings/personal" element={<PersonalSettings />} />
      <Route path="/line-management" element={<LineManagement />} />
      {/* 其他路由 */}
    </Route>
  </Routes>
</BrowserRouter>
```

## 新增功能示例
### Line 管理介面
```tsx
<Tabs defaultValue="groups">
  <TabsList>
    <TabsTrigger value="groups">群組管理</TabsTrigger>
    <TabsTrigger value="api">API 監控</TabsTrigger>
    <TabsTrigger value="history">歷史分析</TabsTrigger>
  </TabsList>
  {/* Tab 內容 */}
</Tabs>
```

### AI 圖片分析
```tsx
<ImageAnalysis onAnalyze={handleAnalyze} />
```

## 數據庫配置
### MongoDB 配置
```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
```

### Redis 配置
```typescript
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL
});
await client.connect();
```

## 待開發功能
- [ ] 深色模式支持
- [ ] 多語言支持
- [ ] 離線功能支持
- [ ] 生物認證整合
- [ ] Line Bot 自動回覆功能
- [ ] RAG 系統優化
- [ ] 群組行為分析
- [ ] API 使用量預警

## 貢獻指南
1. Fork 專案
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權
本專案使用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案瞭解詳情
Copyright (c) 2024 銀心永晟科技

## 支持與聯繫
- Email: kilong31442@gmail.com
- LinkedIn: https://www.linkedin.com/in/zih-jia-luo-2b49a31b3/
- Medium: https://medium.com/@kilong31442
- GitHub: https://github.com/kevin801221/silverheart_app.git

## 疑難排解
如果遇到安裝或運行問題：

1. 清除 node_modules 並重新安裝：
```bash
rm -rf node_modules
npm install
```

2. 確保 TypeScript 配置正確：
```bash
npm install -D typescript @types/react @types/react-dom
```

3. 檢查 Vite 配置：
```bash
npm install -D vite @vitejs/plugin-react
```