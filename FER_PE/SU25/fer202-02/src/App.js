import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import { MotorbikeProvider } from './contexts/MotorbikeContext';
import { CartProvider } from './contexts/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <MotorbikeProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </MotorbikeProvider>
    </AuthProvider>
  );
}

export default App;