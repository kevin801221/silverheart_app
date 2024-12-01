# SilverHeart - 智能防詐系統

SilverHeart 是一個現代化的智能防詐騙系統前端應用，使用 React + TypeScript + Tailwind CSS 開發，旨在幫助用戶預防和識別各類詐騙行為。

# 專案架構圖：
![專案架構road map](/Users/lo-ai/github_items/silverheart_app/src/assets/structure.png)
## 技術棧

- **核心框架**: React 18 + TypeScript + Vite
- **樣式方案**: Tailwind CSS
- **UI 組件**: 
  - shadcn/ui
  - Radix UI Primitives
- **圖標**: Lucide React
- **工具庫**: 
  - class-variance-authority
  - clsx
  - tailwind-merge

## 功能特點

- 📱 即時通話監控
- 🎯 AI 智能詐騙識別
- 🔔 風險預警通知
- 💳 交易監控與凍結
- 👥 家人安全管理
- 📊 風險等級評估
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
# 安裝核心依賴
npm install

# 安裝 UI 組件相關依賴
npm install @radix-ui/react-slot @radix-ui/react-slider @radix-ui/react-switch 
npm install @radix-ui/react-toast @radix-ui/react-dialog class-variance-authority
npm install lucide-react clsx tailwind-merge

# 安裝開發依賴
npm install -D tailwindcss postcss autoprefixer @types/node
```

## 專案結構

```
silverheart-new/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── alert.tsx     # 警告提示組件
│   │   │   ├── button.tsx    # 按鈕組件
│   │   │   ├── card.tsx      # 卡片組件
│   │   │   ├── dialog.tsx    # 對話框組件
│   │   │   ├── sheet.tsx     # 側邊欄組件
│   │   │   ├── slider.tsx    # 滑塊組件
│   │   │   ├── switch.tsx    # 開關組件
│   │   │   ├── toast.tsx     # 通知提示組件
│   │   │   └── use-toast.ts  # Toast Hook
│   │   ├── AntiFraudApp.tsx  # 主應用組件
│   │   └── FreezeTransaction.tsx # 交易凍結組件
│   ├── lib/
│   │   └── utils.ts          # 工具函數
│   ├── App.tsx               # 應用入口
│   ├── main.tsx              # 主入口
│   └── index.css            # 全局樣式
├── tailwind.config.js       # Tailwind 配置
├── vite.config.ts          # Vite 配置
└── package.json            # 專案配置
```

## 開發指南

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

## UI 組件使用示例

### 警告提示
```tsx
<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>警告</AlertTitle>
  <AlertDescription>檢測到可疑活動</AlertDescription>
</Alert>
```

### 交易凍結
```tsx
<FreezeTransaction 
  onFreeze={handleFreeze} 
  onUnfreeze={handleUnfreeze}
  transactionState={transactionState}
/>
```

### 通知提示
```tsx
const { toast } = useToast()

toast({
  title: "操作成功",
  description: "交易已成功凍結"
})
```

## 配置說明

### Tailwind 配置
確保 `tailwind.config.js` 包含必要的配置：
- 顏色系統
- 動畫效果
- 組件預設值

### 環境變量
在 `.env` 文件中配置：
- API 端點
- 環境標識
- 其他配置項

## 待開發功能

- [ ] 深色模式支持
- [ ] 多語言支持
- [ ] 離線功能支持
- [ ] 生物認證整合
- [ ] 更多 AI 模型整合
- [ ] 風險評分系統
- [ ] 交易行為分析
- [ ] 家庭賬戶管理

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

如有問題或建議，請聯繫：
- Email: [kilong31442@gmail.com]
- Website: [https://www.linkedin.com/in/zih-jia-luo-2b49a31b3/,https://medium.com/@kilong31442]
- Issue Tracker: [https://github.com/kevin801221/silverheart_app.git]