//PaymentContext.jsx quản lý thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const PaymentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialPaymentState = {
    payments: [],
    filteredPayments: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        semester: '',
        course: '',
    },
    sortBy: 'date_desc', // Mặc định sort theo date descending
    totalAmount: 0,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến payments
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const payments = action.payload;
            // Lọc payments theo userId của user hiện tại
            const userPayments = payments.filter(payment => 
                payment.userId === action.userId
            );
            return {
                ...state,
                payments: userPayments,
                isLoading: false,
                error: null,
            };
        
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        
        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.field]: action.value,
                },
            };
        
        case 'SET_SORT':
            return {
                ...state,
                sortBy: action.payload,
            };
        
        case 'APPLY_FILTERS_AND_SORT':
            // Áp dụng filters và sort
            let filtered = [...state.payments];
            
            // Filter by search (semester or course name)
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(payment =>
                    payment.semester.toLowerCase().includes(searchLower) ||
                    payment.courseName.toLowerCase().includes(searchLower)
                );
            }
            
            // Filter by semester
            if (state.filters.semester) {
                filtered = filtered.filter(payment =>
                    payment.semester === state.filters.semester
                );
            }
            
            // Filter by course
            if (state.filters.course) {
                filtered = filtered.filter(payment =>
                    payment.courseName === state.filters.course
                );
            }
            
            // Sort
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'course_asc':
                        return a.courseName.localeCompare(b.courseName);
                    case 'course_desc':
                        return b.courseName.localeCompare(a.courseName);
                    case 'date_asc':
                        return new Date(a.date) - new Date(b.date);
                    case 'date_desc':
                        return new Date(b.date) - new Date(a.date);
                    case 'amount_asc':
                        return a.amount - b.amount;
                    case 'amount_desc':
                        return b.amount - a.amount;
                    default:
                        return 0;
                }
            });
            
            // Tính total amount
            const totalAmount = filtered.reduce((sum, payment) => sum + payment.amount, 0);
            
            return {
                ...state,
                filteredPayments: filtered,
                totalAmount,
            };
        
        case 'ADD_PAYMENT':
            return {
                ...state,
                payments: [...state.payments, action.payload],
            };
        
        case 'UPDATE_PAYMENT':
            return {
                ...state,
                payments: state.payments.map(payment =>
                    payment.id === action.payload.id ? action.payload : payment
                ),
            };
        
        case 'DELETE_PAYMENT':
            return {
                ...state,
                payments: state.payments.filter(payment => payment.id !== action.payload),
            };
        
        default:
            return state;
    }
};

// 4. Tạo PaymentProvider để cung cấp Context cho các component con
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
    const { user } = useAuth();

    // Fetch payments khi component mount hoặc user thay đổi
    useEffect(() => {
        if (user && user.id) {
            fetchPayments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    // Áp dụng filters và sort khi có thay đổi
    useEffect(() => {
        if (state.payments.length > 0) {
            dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
        }
    }, [state.payments, state.filters, state.sortBy]);

    const fetchPayments = async () => {
        if (!user || !user.id) return;
        
        dispatch({ type: 'FETCH_START' });
        try {
            const payments = await api.getPayments();
            dispatch({ type: 'FETCH_SUCCESS', payload: payments, userId: user.id });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
    };

    const setFilter = (field, value) => {
        dispatch({ type: 'SET_FILTER', field, value });
    };

    const setSort = (sortBy) => {
        dispatch({ type: 'SET_SORT', payload: sortBy });
    };

    const addPayment = async (payment) => {
        try {
            const newPayment = await api.addPayment({
                ...payment,
                userId: user.id,
            });
            dispatch({ type: 'ADD_PAYMENT', payload: newPayment });
            return { success: true, payment: newPayment };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updatePayment = async (id, payment) => {
        try {
            const updatedPayment = await api.updatePayment(id, payment);
            dispatch({ type: 'UPDATE_PAYMENT', payload: updatedPayment });
            return { success: true, payment: updatedPayment };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deletePayment = async (id) => {
        try {
            await api.deletePayment(id);
            dispatch({ type: 'DELETE_PAYMENT', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Lấy danh sách unique semesters và courses
    const getUniqueSemesters = () => {
        const semesters = [...new Set(state.payments.map(p => p.semester))];
        return semesters.sort();
    };

    const getUniqueCourses = () => {
        const courses = [...new Set(state.payments.map(p => p.courseName))];
        return courses.sort();
    };

    const contextValue = {
        // State
        payments: state.filteredPayments,
        allPayments: state.payments,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        totalAmount: state.totalAmount,
        
        // Actions
        fetchPayments,
        setFilter,
        setSort,
        addPayment,
        updatePayment,
        deletePayment,
        getUniqueSemesters,
        getUniqueCourses,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng PaymentContext dễ dàng hơn
export const usePayment = () => useContext(PaymentContext);
