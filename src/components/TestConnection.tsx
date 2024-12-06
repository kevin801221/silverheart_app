// // src/components/TestConnection.tsx
// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { useToast } from "@/components/ui/use-toast";

// export default function TestConnection() {
//   const { toast } = useToast();

//   const testConnection = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/test-connection');
//       const data = await response.json();
      
//       if (data.success) {
//         toast({
//           title: "連接成功",
//           description: data.message,
//         });
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "連接失敗",
//         description: error instanceof Error ? error.message : "未知錯誤",
//       });
//     }
//   };

//   return (
//     <Button onClick={testConnection}>
//       測試連接
//     </Button>
//   );
// }