import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MotorbikeProvider } from './contexts/MotorbikeContext';
import { CartProvider } from './contexts/CartContext';

import Login from './pages/Login';
import MotorbikeList from './pages/MotorbikeList';
import MotorbikeDetail from './pages/MotorbikeDetail';
import Cart from './pages/Cart';
import NotFound from './components/NotFound';

// Private Route component
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MotorbikeProvider>
          <CartProvider>
            <Routes>
              <Route path="/login" element={<Login setUser={() => {}} />} />
              
              <Route
                path="/motorbikes"
                element={
                  <PrivateRoute>
                    <MotorbikeList />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/view/:id"
                element={
                  <PrivateRoute>
                    <MotorbikeDetail />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </MotorbikeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;