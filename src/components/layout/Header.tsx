// import React from 'react';
// import { Shield, Menu, ArrowLeft } from 'lucide-react';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { SidebarContent } from './SidebarContent';

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

// interface HeaderProps {
//   activeSection: SectionType;
//   setActiveSection: (section: SectionType) => void;
// }

// export const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white relative">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           {activeSection !== 'main' && (
//             <ArrowLeft 
//               className="w-6 h-6 cursor-pointer" 
//               onClick={() => setActiveSection('main')}
//             />
//           )}
//           <Shield className="w-8 h-8" />
//           <h1 className="text-xl font-bold">銀心永晟 - 智能防詐系統</h1>
//         </div>
//         <Sheet>
//           <SheetTrigger>
//             <Menu className="w-6 h-6" />
//           </SheetTrigger>
//           <SheetContent>
//             <SheetHeader>
//               <SheetTitle>系統選單</SheetTitle>
//             </SheetHeader>
//             <SidebarContent setActiveSection={setActiveSection} />
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// };