// paymentsSlice.js - Quản lý state thanh toán sử dụng Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as api from '../services/api';

// Initial state
const initialState = {
    payments: [],
    isLoading: false,
    error: null,
};

// Tạo async thunk để tạo thanh toán mới
export const createPayment = createAsyncThunk(
    'payments/createPayment',
    async (paymentData, { rejectWithValue }) => {
        try {
            // Thêm status mặc định là 'SUCCESS' cho payment mới
            const paymentWithStatus = {
                ...paymentData,
                status: 'SUCCESS',
            };
            const response = await api.addPayment(paymentWithStatus);
            // Đảm bảo response có status nếu API không trả về
            if (!response.status) {
                response.status = 'SUCCESS';
            }
            return response;
        } catch (error) {
            // Debug: Log error để kiểm tra
            console.error('❌ Error in createPayment thunk:', error);
            console.error('❌ Error response:', error.response);
            console.error('❌ Error status:', error.response?.status);
            console.error('❌ Error message:', error.message);
            
            // Xử lý lỗi 402 (Payment Required) với rejectWithValue
            // Kiểm tra error.response.status (từ axios) hoặc error.status (từ custom error)
            const statusCode = error.response?.status || error.status;
            console.log('🔍 Status code:', statusCode);
            
            if (statusCode === 402) {
                console.log('✅ Detected 402 error - returning rejectWithValue');
                return rejectWithValue('Tài khoản không đủ tiền');
            }
            // Xử lý các lỗi khác
            console.log('⚠️ Other error - returning error message');
            return rejectWithValue(error.message || 'Failed to create payment');
        }
    }
);

// Tạo payments slice
const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        // Clear error reducer
        clearError: (state) => {
            state.error = null;
        },
        // Set payments (có thể dùng để fetch payments nếu cần)
        setPayments: (state, action) => {
            state.payments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Xử lý pending state
            .addCase(createPayment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            // Xử lý fulfilled state - thêm payment mới vào mảng payments
            .addCase(createPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.payments.push(action.payload);
                state.error = null;
            })
            // Xử lý rejected state
            .addCase(createPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const { clearError, setPayments } = paymentsSlice.actions;

// Export reducer
export default paymentsSlice.reducer;

// Selectors cơ bản
export const selectPayments = (state) => state.payments.payments;
export const selectPaymentsLoading = (state) => state.payments.isLoading;
export const selectPaymentsError = (state) => state.payments.error;

// Reselect selector để lấy chỉ các payments có status: 'SUCCESS'
export const selectSuccessfulPayments = createSelector(
    [selectPayments],
    (payments) => {
        return payments.filter(payment => payment.status === 'SUCCESS');
    }
);

