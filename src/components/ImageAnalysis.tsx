import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Loader2, Search, Database, Brain, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// 模擬分析階段
const analysisStages = [
  {
    message: "正在載入圖片資料...",
    duration: 3500,
    detail: "處理圖片像素資訊並進行初步解析"
  },
  {
    message: "連接 Agent 網路...",
    duration: 3500,
    detail: "正在啟動多代理分析系統"
  },
  {
    message: "正在比對資料庫...",
    duration: 4500,
    detail: "搜尋相似圖片特徵與已知詐騙模式"
  },
  {
    message: "執行深度分析...",
    duration: 7500,
    detail: "使用機器學習模型進行內容評估"
  },
  {
    message: "整合分析結果...",
    duration: 7500,
    detail: "綜合多個 Agent 的分析意見"
  },
  {
    type: 'header',
    content: '🚨 詐騙風險評估報告 🚨\n\n綜合分析結果：極高風險詐騙內容 (風險分數：98/100)\n',
    delay: 1000
  },
  {
    type: 'section',
    content: '【圖片真實性分析】\n1. 影像異常特徵：\n   • 圖片解析度不自然，局部模糊且有二次壓縮痕跡\n   • 人像邊緣存在明顯的修圖痕跡\n   • 原始影片截圖經過多次轉發，畫質劣化嚴重\n',
    delay: 2000
  },
  {
    type: 'section',
    content: '2. 文字辨識問題：\n   • 偵測到簡體字混用（"号"字使用簡體寫法）\n   • 標點符號使用不一致\n   • 文案風格與原創作者慣用語差異明顯\n',
    delay: 1800
  },
  {
    type: 'section',
    content: '3. 版面可疑元素：\n   • 不自然的帳號命名方式（ZRBrok）\n   • 粉絲數標註方式異常（"999本粉"用詞不常見）\n   • LINE 連結文字排版雜亂\n',
    delay: 1500
  },
  // ... 其他段落類似定義
];

const ImageAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageDetail, setStageDetail] = useState("");
  const [finalResult, setFinalResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // 模擬分析過程
  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStage(0);
    setFinalResult("");

    // 預設的分析結果（這裡可以根據需要修改）
    const predefinedResult = `🚨 詐騙風險評估報告 🚨

    綜合分析結果：極高風險詐騙內容 (風險分數：98/100)
    
    【圖片真實性分析】
    1. 影像異常特徵：
       • 圖片解析度不自然，局部模糊且有二次壓縮痕跡
       • 人像邊緣存在明顯的修圖痕跡
       • 原始影片截圖經過多次轉發，畫質劣化嚴重
    
    2. 文字辨識問題：
       • 偵測到簡體字混用（"号"字使用簡體寫法）
       • 標點符號使用不一致
       • 文案風格與原創作者慣用語差異明顯
    
    3. 版面可疑元素：
       • 不自然的帳號命名方式（ZRBrok）
       • 粉絲數標註方式異常（"999本粉"用詞不常見）
       • LINE 連結文字排版雜亂
    
    【內容邏輯分析】
    1. 訊息矛盾點：
       • 知名KOL不會以私人LINE進行粉絲互動
       • 正規商業合作不會要求加入個人社群帳號
       • 文案用語過於急迫且充滿誘導性
    
    2. 社交工程手法：
       • 使用名人影像建立信任
       • 設置虛假優惠誘因
       • 製造稀缺性（"只有999本粉"）
       • 催促立即行動
    
    ⚠️ 風險警告 ⚠️
    這是一起典型的社交媒體詐騙案例，詐騙者：
    1. 盜用知名 YouTuber 紫鼠兄弟的影像及身份
    2. 使用經過編輯的影片截圖增加可信度
    3. 透過假造的個人訊息誘導加入非官方LINE帳號
    4. 可能意圖進行後續的詐騙行為（如投資詐騙、個資盜用）
    
    🔍 安全建議：
    - 切勿加入來路不明的LINE帳號
    - 名人皆透過官方認證帳號與粉絲互動，非個人LINE
    - 請勿相信"限時特惠"、"僅限前幾名"等urgency marketing
    - 如看到類似貼文，請立即向Facebook檢舉
    
    💡 延伸提醒：
    近期Similar Image Analysis發現超過127起類似案例，主要透過：
    - 知名 YouTuber 形象
    - 假造互動機會
    - LINE 帳號誘導
    作為詐騙前置手法，請務必提高警覺。
    
    信心指數：97.8%
    AI分析完成時間：${new Date().toLocaleTimeString()}
    分析模型：Anti-Fraud Vision Model v3.2
    若有詐騙疑慮請馬上通知165詢問
    或是上警政署看相關案例: 
    1.警政署反詐騙首頁:"https://165.npa.gov.tw/#/"
    2.打詐儀表板:"https://165dashboard.tw"`;

    // 依序執行每個分析階段
    for (let i = 0; i < analysisStages.length; i++) {
      setCurrentStage(i);
      setStageDetail(analysisStages[i].detail);
      
      await new Promise(resolve => setTimeout(resolve, analysisStages[i].duration));
    }

    // 最後輸出結果
    setFinalResult(predefinedResult);
    setIsAnalyzing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            AI 詐騙圖片分析
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 上傳區域 */}
          <div className="border-2 border-dashed rounded-lg p-6 hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-base font-medium text-gray-700">
                上傳可疑圖片進行分析
              </span>
              <span className="text-sm text-gray-500">
                支援常見圖片格式
              </span>
            </label>
          </div>

          {/* 圖片預覽 */}
          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
            </div>
          )}

          {/* 分析按鈕 */}
          <Button
            onClick={simulateAnalysis}
            disabled={!selectedImage || isAnalyzing}
            className="w-full h-12"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>AI 深度分析中...</span>
              </div>
            ) : (
              "開始分析"
            )}
          </Button>

          {/* 分析進度顯示 */}
          {isAnalyzing && (
            <div className="space-y-3">
              <Alert className="bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2">
                  {currentStage === 0 && <Search className="h-4 w-4 animate-pulse text-blue-500" />}
                  {currentStage === 1 && <Brain className="h-4 w-4 animate-pulse text-blue-500" />}
                  {currentStage === 2 && <Database className="h-4 w-4 animate-pulse text-blue-500" />}
                  {currentStage === 3 && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
                  {currentStage === 4 && <FileCheck className="h-4 w-4 animate-pulse text-blue-500" />}
                </div>
                <AlertTitle className="text-blue-700">
                  {analysisStages[currentStage].message}
                </AlertTitle>
                <AlertDescription className="text-blue-600">
                  {stageDetail}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* 分析結果 */}
          {finalResult && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700">分析完成</AlertTitle>
              <AlertDescription className="text-green-600 whitespace-pre-line">
                {finalResult}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageAnalysis;