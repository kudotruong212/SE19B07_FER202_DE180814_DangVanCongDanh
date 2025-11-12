import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import { ItemProvider } from './contexts/ItemContext';
import { CartProvider } from './contexts/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;