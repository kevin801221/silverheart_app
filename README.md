# SilverHeart - 智能防詐系統

SilverHeart 是一個現代化的智能防詐騙系統前端應用，使用 React + TypeScript + Tailwind CSS 開發，旨在幫助用戶預防和識別各類詐騙行為。

## 技術棧

- **框架**: React 18 + TypeScript
- **構建工具**: Vite
- **樣式**: Tailwind CSS
- **UI 組件**: shadcn/ui
- **圖標**: Lucide React

## 功能特點

- 📱 即時通話監控
- 🎯 AI 智能詐騙識別
- 🔔 風險預警通知
- 💳 可疑交易監控
- 👥 家人安全管理
- 📊 風險等級評估

## 安裝

1. 克隆專案:
```bash
git clone [repository-url]
cd silverheart-new
```

2. 安裝依賴:
```bash
# 安裝核心依賴
npm install

# 安裝 UI 組件相關依賴
npm install lucide-react @radix-ui/react-slot clsx tailwindcss-animate class-variance-authority tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-icons

# 安裝開發依賴
npm install -D tailwindcss postcss autoprefixer @types/node
```

## 專案結構

```
silverheart-new/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── alert.tsx    # Alert 組件
│   │   │   ├── card.tsx     # Card 組件
│   │   │   └── sheet.tsx    # Sheet 組件
│   │   └── AntiFraudApp.tsx # 主應用組件
│   ├── lib/
│   │   └── utils.ts         # 工具函數
│   ├── App.tsx              # 應用入口
│   ├── main.tsx             # 主入口
│   └── index.css            # 全局樣式
├── tailwind.config.js       # Tailwind 配置
├── vite.config.ts          # Vite 配置
└── package.json            # 專案配置
```

## 開發

啟動開發服務器:
```bash
npm run dev
```

建構生產版本:
```bash
npm run build
```

預覽生產版本:
```bash
npm run preview
```

## 主要組件

### AntiFraudApp
主要應用界面，包含：
- 頂部導航欄
- 風險預警提示
- 功能按鈕區
- 統計信息卡片
- 緊急操作按鈕

### 防詐檢測中心
包含：
- 即時監控狀態
- 安全設置選項
- 風險評估報告

### 警報中心
提供：
- 即時警報顯示
- 歷史警報記錄
- 風險等級指示

## 樣式定制

項目使用 Tailwind CSS 進行樣式管理，主題配置位於：
- `tailwind.config.js`
- `src/index.css` (全局樣式和CSS變量)

## 貢獻指南

1. Fork 專案
2. 創建特性分支
3. 提交更改
4. 推送到分支
5. 創建 Pull Request

## 待開發功能

- [ ] 深色模式支持
- [ ] 多語言支持
- [ ] 離線功能支持
- [ ] 更多 AI 模型整合
- [ ] 用戶數據分析儀表板

## 授權

本專案採用雙重授權模式：

1. 社區版本：
   - 遵循 AGPL-3.0 授權
   - 適用於非商業用途
   - 需要保持開源和分享改進

2. 商業版本：
   - 需要獲得銀心永晟科技的商業授權
   - 提供額外的功能和支持
   - 允許閉源使用和商業部署

詳細授權條款請聯繫：[聯繫方式]

## 聯繫方式

[LinkedIN:https://www.linkedin.com/in/zih-jia-luo-2b49a31b3/]