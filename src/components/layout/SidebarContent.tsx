// import React from 'react';
// import { 
//   UserCog, Users, History, BookOpen, 
//   FileText, HelpCircle, Settings 
// } from 'lucide-react';

// type SectionType = 
//   | 'main'
//   | 'fraudDetection'
//   | 'alerts'
//   | 'imageAnalysis'
//   | 'userSettings'
//   | 'familyManagement'
//   | 'operationHistory'
//   | 'antiScamGuide'
//   | 'termsOfService'
//   | 'helpCenter'
//   | 'systemSettings';

// interface SidebarContentProps {
//   setActiveSection: (section: SectionType) => void;
// }

// const menuItems = [
//   { icon: <UserCog />, label: '個人設置', section: 'userSettings' },
//   { icon: <Users />, label: '家人管理', section: 'familyManagement' },
//   { icon: <History />, label: '操作記錄', section: 'operationHistory' },
//   { icon: <BookOpen />, label: '防詐指南', section: 'antiScamGuide' },
//   { icon: <FileText />, label: '使用條款', section: 'termsOfService' },
//   { icon: <HelpCircle />, label: '幫助中心', section: 'helpCenter' },
//   { icon: <Settings />, label: '系統設置', section: 'systemSettings' }
// ];

// export const SidebarContent = ({ setActiveSection }: SidebarContentProps) => {
//   return (
//     <div className="mt-6 space-y-4">
//       {menuItems.map((item, index) => (
//         <button
//           key={index}
//           className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
//           onClick={() => {
//             setActiveSection(item.section as SectionType);
//             // 關閉側邊選單
//             document.querySelector('[data-radix-ui-dialog-close]')?.click();
//           }}
//         >
//           <div className="w-5 h-5 text-gray-500">{item.icon}</div>
//           <span className="text-gray-700">{item.label}</span>
//         </button>
//       ))}
//     </div>
//   );
// };