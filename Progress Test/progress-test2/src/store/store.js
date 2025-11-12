// store.js - Cấu hình Redux store
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import paymentsReducer from './paymentsSlice';

// Cấu hình Redux store với các reducers
export const store = configureStore({
    reducer: {
        users: usersReducer,
        payments: paymentsReducer,
    },
});

// Export store ra window để dễ kiểm tra trong Console (chỉ trong development)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    window.store = store;
    window.__REDUX_STORE__ = store;
}

