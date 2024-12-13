// src/services/lineService.ts

interface QATemplate {
    question: string;  // 觸發的指令
    answer: string;    // 回應內容
    description: string; // 指令說明
  }
  
  // 預設的防詐騙Q&A模板
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
    {
      question: "/緊急求助",
      answer: "🆘 緊急狀況處理：\n" +
              "1. 立即撥打165反詐騙專線\n" +
              "2. 凍結銀行帳戶：撥打銀行24小時服務專線\n" +
              "3. 向警察單位報案\n" +
              "4. 保留所有對話紀錄\n\n" +
              "📞 重要電話：\n" +
              "- 反詐騙專線：165\n" +
              "- 警察報案專線：110\n" +
              "- 金融監督管理委員會：1998",
      description: "當發現遭遇詐騙時的緊急處理方式"
    },
    {
      question: "/個資保護",
      answer: "🔒 個人資料保護提醒：\n" +
              "不要提供的資料：\n" +
              "1. 身分證號碼\n" +
              "2. 銀行帳號\n" +
              "3. 信用卡資料\n" +
              "4. 網路銀行密碼\n\n" +
              "💡 保護原則：\n" +
              "- 不回應要求個資的訊息\n" +
              "- 不掃描可疑QR碼\n" +
              "- 不下載不明來源軟體",
      description: "了解如何保護個人資料，避免資料外洩"
    },
    {
      question: "/詐騙案例",
      answer: "📱 近期常見詐騙手法：\n" +
              "1. 假網購/假賣家\n" +
              "- 要求用其他通訊軟體聯絡\n" +
              "- 要求先付款才出貨\n\n" +
              "2. 假投資/假系統升級\n" +
              "- 要求安裝遠端軟體\n" +
              "- 聲稱系統升級需要驗證\n\n" +
              "3. 假客服退款詐騙\n" +
              "- 謊稱重複扣款需退款\n" +
              "- 要求提供帳戶存款明細",
      description: "查看最新詐騙案例和手法"
    }
  ];
  
  // LINE Bot 回應處理
  async function handleLineMessage(message: string): Promise<string> {
    // 移除空白字符並轉換為小寫來做比對
    const normalizedMessage = message.trim().toLowerCase();
    
    // 查找匹配的Q&A
    const qa = fraudPreventionQA.find(
      item => item.question.toLowerCase() === normalizedMessage
    );
  
    // 如果找到匹配的問題，返回對應答案
    if (qa) {
      return qa.answer;
    }
  
    // 如果是查詢指令列表
    if (normalizedMessage === '/help' || normalizedMessage === '/?') {
      return generateHelpMessage();
    }
  
    // 默認回應
    return "您好！我是防詐騙小幫手。\n" +
           "請輸入 /help 或 /? 查看可用指令列表。\n" +
           "若需要緊急協助，請輸入 /緊急求助";
  }
  
  // 生成幫助訊息
  function generateHelpMessage(): string {
    let helpMessage = "📋 防詐騙小幫手指令列表：\n\n";
    
    fraudPreventionQA.forEach(qa => {
      helpMessage += `${qa.question}\n- ${qa.description}\n\n`;
    });
  
    helpMessage += "輸入任何指令獲取詳細資訊！";
    
    return helpMessage;
  }
  
  export { handleLineMessage, fraudPreventionQA };