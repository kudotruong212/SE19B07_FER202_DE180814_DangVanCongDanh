import React from 'react';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <AppRoutes />
      </BookProvider>
    </AuthProvider>
  );
}

export default App;