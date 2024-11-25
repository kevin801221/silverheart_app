// src/components/MainInterface.tsx
import React from 'react';
import { Shield } from 'lucide-react';

const MainInterface = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-xl font-bold">銀心永晟 - 智能防詐系統</h1>
        </div>
      </header>
      
      <div className="p-4">
        <p>Hello World</p>
      </div>
    </div>
  );
};

export default MainInterface;