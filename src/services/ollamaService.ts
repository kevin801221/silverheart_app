// src/services/ollamaService.ts
import ollama from 'ollama';

export interface ImageAnalysisResult {
  analysis: string;
  error?: string;
}

export async function analyzeImageWithOllama(imageBase64: string): Promise<ImageAnalysisResult> {
  console.log('開始分析圖片...');
  
  try {
    // 檢查 base64 字串是否正確
    console.log('圖片大小:', Math.round(imageBase64.length * 0.75 / 1024), 'KB');

    console.log('正在呼叫 Ollama API...');
    const startTime = Date.now();
    
    const response = await ollama.chat({
      model: 'llama3.2-vision:latest',
      messages: [{
        role: 'user',
        content: '這是一張甚麼圖片？請用中文簡單描述。',  // 簡化提示詞，測試基本功能
        images: [imageBase64]
      }],
      stream: false  // 設置為 false 以便更好地追踪進度
    });

    const endTime = Date.now();
    console.log('分析完成，耗時:', (endTime - startTime) / 1000, '秒');
    console.log('API 回應:', response);

    return {
      analysis: response.message.content
    };
  } catch (error) {
    console.error('Ollama 分析錯誤:', error);
    return {
      analysis: '',
      error: error instanceof Error ? 
        `分析錯誤: ${error.message}` : 
        '連接 Ollama 服務失敗，請檢查服務是否正常運行'
    };
  }
}