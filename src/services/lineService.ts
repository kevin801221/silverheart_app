// src/services/lineService.ts

// ===== Type Definitions =====
interface QATemplate {
  question: string;
  answer: string;
  description: string;
}

interface MessageResponse {
  content: string;
  type: 'instant' | 'typing' | 'searching';
  searchResults?: string[]; // 用於存儲相關URL
}

// ===== Constants =====
const TYPING_DELAYS = {
  START_DELAY: 500,     // 開始打字前的延遲
  CHAR_DELAY: 50,       // 每個字符的延遲
  NEWLINE_DELAY: 500,   // 換行的額外延遲
  SECTION_DELAY: 1000   // 段落之間的延遲
};

// ===== Data =====
const fraudPreventionQA: QATemplate[] = [
  {
    question: "/投資詐騙",
    answer: "🚨 投資詐騙常見手法：\n" +
      "1. 承諾高報酬低風險\n" +
      "2. 聲稱穩賺不賠的投資\n" +
      "3. 要求先付費才能提領收益\n\n" +
      "⚠️ 保護方式：\n" +
      "- 不輕信未經證實的投資機會\n" +
      "- 避免點擊可疑連結\n" +
      "- 不透露個人資料給陌生人",
    description: "了解常見的投資詐騙手法和防範方式"
  },
  {
    question: "/假冒身份",
    answer: "❗ 假冒身份詐騙警示：\n" +
      "常見假冒身份：\n" +
      "1. 政府機關人員\n" +
      "2. 警察局公務人員\n" +
      "3. 銀行客服人員\n\n" +
      "📢 記住：\n" +
      "- 政府機關不會用LINE聯繫\n" +
      "- 不要點擊可疑連結\n" +
      "- 收到可疑電話立即掛斷並撥打165防詐專線確認",
    description: "了解如何識別假冒身份的詐騙者"
  },
  // ... 其他 QA 項目保持不變 ...
];
// 模擬搜索結果
const mockSearchResults = {
  "投資詐騙": [
    "https://www.165.gov.tw/investement-fraud/article/2024/03/15",
    "https://www.fsc.gov.tw/prevention/news/20240314",
    "https://www.police.gov.tw/fraud-cases/investment/2024",
    "https://www.moj.gov.tw/fraud-prevention/latest/20240310",
    "https://www.cib.gov.tw/news/fraud-alert/2024"
  ],
  "假冒身份": [
    "https://www.165.gov.tw/identity-theft/article/2024/03/12",
    "https://www.npa.gov.tw/fraud-alert/identity/20240313",
    "https://www.mjib.gov.tw/prevention/fake-id/2024",
    "https://www.banking.gov.tw/security/alert/20240311",
    "https://www.tfm.gov.tw/news/fraud/2024"
  ],
  // ... 其他類型的搜索結果
};

// ===== Helper Functions =====
function generateDelaySequence(text: string): number[] {
  const delays: number[] = [TYPING_DELAYS.START_DELAY];
  let totalDelay = TYPING_DELAYS.START_DELAY;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '\n') {
      if (text[i + 1] === '\n') {
        totalDelay += TYPING_DELAYS.SECTION_DELAY;
        delays.push(totalDelay);
        i++; // 跳過第二個換行符
      } else {
        totalDelay += TYPING_DELAYS.NEWLINE_DELAY;
        delays.push(totalDelay);
      }
    } else {
      totalDelay += TYPING_DELAYS.CHAR_DELAY;
      delays.push(totalDelay);
    }
  }
  return delays;
}

function generateHelpMessage(): string {
  let helpMessage = "📋 防詐騙小幫手指令列表：\n\n";
  fraudPreventionQA.forEach(qa => {
    helpMessage += `${qa.question}\n- ${qa.description}\n\n`;
  });
  helpMessage += "輸入任何指令獲取詳細資訊！";
  return helpMessage;
}

async function generateSearchSequence(query: string): Promise<string[]> {
  const messages = [
    "🔍 正在搜索相關資訊...",
    "📡 連接到反詐騙資料庫...",
    "🤖 使用 AI 分析最新案例...",
    "📊 彙整相關資訊...",
    "\n找到以下相關資源：",
  ];
  
  const searchType = query.replace('/', '');
  const urls = mockSearchResults[searchType] || [];
  
  return [...messages, ...urls.map(url => `🔗 ${url}`)];
}

async function generateSearchingText(): Promise<string> {
  return `🤖 AI Agent 啟動中...\n
🔍 開始進行網路搜索...\n
📡 正在檢索最新資訊...\n
⚡ 使用 RAG (Retrieval Augmented Generation) 進行分析...\n
✨ 生成最佳回應中...\n
\n📊 分析完成！為您整理以下資訊：\n`;
}

// ===== Main Functions =====
async function handleLineMessage(message: string): Promise<MessageResponse> {
  console.log('Handling message:', message);
  
  const normalizedMessage = message.trim().toLowerCase();
  console.log('Normalized message:', normalizedMessage);
  
  const qa = fraudPreventionQA.find(
    item => item.question.toLowerCase() === normalizedMessage
  );
  console.log('Found QA match:', qa);

  if (qa) {
    console.log('Preparing search response for:', qa.question);
    const searchType = qa.question.replace('/', '');
    const searchResults = mockSearchResults[searchType] || [];
    
    const searchingText = await generateSearchingText();
    console.log('Generated searching text');
    
    return {
      content: `${searchingText}\n\n${qa.answer}`,
      type: 'searching',
      searchResults
    };
  } else if (normalizedMessage === '/help' || normalizedMessage === '/?') {
    console.log('Generating help message');
    return {
      content: generateHelpMessage(),
      type: 'instant'
    };
  } else {
    console.log('Generating default response');
    return {
      content: "您好！我是防詐騙小幫手。\n" +
        "請輸入 /help 或 /? 查看可用指令列表。\n" +
        "若需要緊急協助，請輸入 /緊急求助",
      type: 'typing'
    };
  }
}

// ===== Exports =====
export {
  handleLineMessage,
  fraudPreventionQA,
  type MessageResponse,
  type QATemplate,
  generateDelaySequence,
  generateSearchSequence,
  generateSearchingText,  // 記得加入新的導出
  mockSearchResults       // 如果需要在其他地方使用
};