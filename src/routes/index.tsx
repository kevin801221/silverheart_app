// src/routes/index.tsx
import React from 'react';
import TestConnection from '@/components/TestConnection';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

const routes: RouteConfig[] = [
  {
    path: '/test-connection',
    element: <TestConnection />
  }
];

export default routes;