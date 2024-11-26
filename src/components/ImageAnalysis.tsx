import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeImageWithOllama } from '../services/ollamaService';

const ImageAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // 將文件轉換為 base64
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            // 移除 base64 URL 前綴
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setSelectedImage(base64String);
    } catch (err) {
      setError('圖片處理失敗');
      console.error(err);
    }
  };
  const [analysisStatus, setAnalysisStatus] = useState<string>('');

  const handleAnalysis = async () => {
    if (!selectedImage) return;
  
    setIsAnalyzing(true);
    setError(null);
    setAnalysis('');
    
    try {
      setAnalysisStatus('正在準備圖片...');
      
      setAnalysisStatus('正在連接 AI 服務...');
      const result = await analyzeImageWithOllama(selectedImage);
      
      if (result.error) {
        setError(result.error);
        setAnalysisStatus('分析失敗');
      } else {
        setAnalysis(result.analysis);
        setAnalysisStatus('分析完成');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失敗');
      setAnalysisStatus('發生錯誤');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            AI 圖片分析
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 上傳區域 - 修改文字樣式 */}
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
                點擊或拖拽上傳圖片
              </span>
              <span className="text-sm text-gray-500">
                支援 JPG、PNG 格式
              </span>
            </label>
          </div>

          {selectedImage && (
            <div className="mt-4">
              <img
                src={`data:image/jpeg;base64,${selectedImage}`}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
            </div>
          )}

          <Button
            onClick={handleAnalysis}
            disabled={!selectedImage || isAnalyzing}
            className="w-full h-12 text-base font-medium"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-base">AI 分析中...</span>
              </div>
            ) : (
              <span className="text-base">開始 AI 分析</span>
            )}
          </Button>

          {isAnalyzing && (
            <Alert className="bg-blue-50 border-blue-200">
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              <AlertTitle className="text-blue-700 text-base">處理中</AlertTitle>
              <AlertDescription className="text-blue-600 text-base">
                {analysisStatus}
              </AlertDescription>
            </Alert>
          )}

          {analysis && !error && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700 text-base">分析完成</AlertTitle>
              <AlertDescription className="text-green-600 text-base whitespace-pre-line">
                {analysis}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-base">錯誤</AlertTitle>
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageAnalysis;