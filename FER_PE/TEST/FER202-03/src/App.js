import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import { StudentProvider } from './contexts/StudentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <AppRoutes />
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;
