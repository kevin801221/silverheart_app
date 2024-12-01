# SilverHeart - 智能防詐系統

SilverHeart 是一個現代化的智能防詐騙系統前端應用，使用 React + TypeScript + Tailwind CSS 開發，旨在幫助用戶預防和識別各類詐騙行為。

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

fraud_detection_system/
├── README.md                 # 項目說明文檔
├── requirements.txt          # 依賴包清單
├── main.py                  # 主程序入口
├── .env                     # 環境變數
├── config/
│   ├── config.yaml          # 基本配置
│   └── secrets.yaml         # 敏感配置（不進版控）
│
├── frontend/
│   ├── pages/
│   │   ├── __init__.py
│   │   ├── dashboard.py     # 首頁儀表板
│   │   ├── detection.py     # 詐騙檢測中心
│   │   ├── alerts.py        # 警報中心
│   │   └── linebot.py       # LINE Bot管理
│   │
│   ├── components/
│   │   ├── __init__.py
│   │   ├── navbar.py        # 導航欄
│   │   ├── cards.py         # 卡片元件
│   │   ├── charts.py        # 圖表元件
│   │   └── alerts.py        # 警告元件
│   │
│   └── assets/
│       ├── css/             # 樣式文件
│       └── images/          # 圖片資源
│
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py        # API路由
│   │   └── endpoints/       # API端點
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── fraud_detection.py    # 詐騙檢測服務
│   │   ├── alert_service.py      # 警報服務
│   │   └── analytics_service.py  # 分析服務
│   │
│   └── models/
│       ├── __init__.py
│       └── schemas.py       # 資料模型定義
│
├── linebot/
│   ├── __init__.py
│   ├── bot.py              # LINE Bot主程序
│   ├── handlers/
│   │   ├── __init__.py
│   │   ├── message_handler.py    # 訊息處理
│   │   └── event_handler.py      # 事件處理
│   │
│   ├── processors/
│   │   ├── __init__.py
│   │   ├── text_processor.py     # 文本處理
│   │   ├── image_processor.py    # 圖片處理
│   │   └── audio_processor.py    # 語音處理
│   │
│   └── analytics/
│       ├── __init__.py
│       └── fraud_analyzer.py     # 詐騙分析
│
├── database/
│   ├── __init__.py
│   ├── vector_db.py        # 向量資料庫連接
│   ├── relational_db.py    # 關聯式資料庫連接
│   └── redis_client.py     # Redis客戶端
│
└── utils/
    ├── __init__.py
    ├── logger.py           # 日誌工具
    └── helpers.py          # 通用輔助函數

## 關鍵技術棧：

### 前端：


#### Streamlit
#### Plotly
#### Hydralit Components


### 後端：


#### FastAPI
#### LINE Bot SDK
#### OpenCV/Pillow（圖片處理）
#### peech Recognition（語音處理）


### 資料庫：


#### PostgreSQL（關聯式資料庫）
#### Milvus/Pinecone（向量資料庫）
#### Redis（快取）


### 部署：


#### Docker
#### Docker Compose
