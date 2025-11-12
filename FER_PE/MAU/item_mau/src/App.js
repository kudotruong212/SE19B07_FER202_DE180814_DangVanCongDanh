import React from 'react';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
// ============================================
// 🔄 HƯỚNG DẪN CHUYỂN ĐỔI - App.js
// ============================================
// BƯỚC 1: Đổi import từ "ItemProvider" -> "[Object]Provider" (ví dụ: "ProductProvider")
// BƯỚC 2: Đổi import path từ "./contexts/ItemContext" -> "./contexts/[Object]Context"
// BƯỚC 3: Đổi component từ "<ItemProvider>" -> "<[Object]Provider>"
// ============================================

// ⚠️ CẦN ĐỔI: "ItemProvider" -> "[Object]Provider" (ví dụ: "ProductProvider", "BookProvider")
// ⚠️ CẦN ĐỔI: "./contexts/ItemContext" -> "./contexts/[Object]Context"
import { ItemProvider } from './contexts/ItemContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      {/* ⚠️ CẦN ĐỔI: "<ItemProvider>" -> "<[Object]Provider>" */}
      <ItemProvider>
        <AppRoutes />
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;