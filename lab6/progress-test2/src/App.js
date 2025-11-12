import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
    <AuthProvider>
      <PaymentProvider>
        <AppRoutes />
      </PaymentProvider>
    </AuthProvider>
    </Provider>
  );
}

export default App;