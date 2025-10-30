import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import Header from './components/Header';
import MovieManager from './pages/MovieManager';
import Login from './pages/Login';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MovieManager />
                </PrivateRoute>
              }
            />
          </Routes>
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
