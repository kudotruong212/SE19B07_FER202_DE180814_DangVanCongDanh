//ExpenseContext.jsx quản lý thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const ExpenseContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialExpenseState = {
    expenses: [],
    filteredExpenses: [],
    isLoading: false,
    error: null,
    filters: {
        name: '',
        amount: '',
        category: '',
        date: '',
    },
     // Mặc định sort theo date descending
    totalAmount: 0,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến expenses
const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const expenses = action.payload;
            // Lọc expenses theo userId của user hiện tại
            const userExpenses = expenses.filter(expense => 
                expense.userId === action.userId
            );
            return {
                ...state,
                expenses: userExpenses,
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
            // Áp dụng filters
            let filtered = [...state.expenses];
            
            // Filter by category
            if (state.filters.category) {
                filtered = filtered.filter(expense =>
                    expense.category === state.filters.category
                );
            }
            
            // Tính total amount từ all expenses (not filtered)
            const totalAmount = state.expenses.reduce((sum, expense) => {
                const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
                return sum + (amount || 0);
            }, 0);
            
            return {
                ...state,
                filteredExpenses: filtered.length > 0 && state.filters.category ? filtered : state.expenses,
                totalAmount,
            };
        
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        
        case 'UPDATE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map(expense =>
                    expense.id === action.payload.id ? action.payload : expense
                ),
            };
        
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload),
            };
        
        default:
            return state;
    }
};

// 4. Tạo ExpenseProvider để cung cấp Context cho các component con
export const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, initialExpenseState);
    const { user } = useAuth();

    // Fetch expenses khi component mount hoặc user thay đổi
    useEffect(() => {
        if (user && user.id) {
            fetchExpenses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    // Áp dụng filters và sort khi có thay đổi
    useEffect(() => {
        if (state.expenses.length > 0) {
            dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
        }
    }, [state.expenses, state.filters, state.sortBy]);

    const fetchExpenses = async () => {
        if (!user || !user.id) return;
        
        dispatch({ type: 'FETCH_START' });
        try {
            const expenses = await api.getExpenses();
            dispatch({ type: 'FETCH_SUCCESS', payload: expenses, userId: user.id });
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

    const addExpense = async (expense) => {
        try {
            if (!user || !user.id) {
                return { success: false, error: 'User not authenticated' };
            }
            const newExpense = await api.addExpense({
                ...expense,
                userId: user.id,
            });
            dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
            return { success: true, expense: newExpense };
        } catch (error) {
            console.error('Add expense error:', error);
            return { success: false, error: error.message || 'Failed to add expense' };
        }
    };

    const updateExpense = async (id, expense) => {
        try {
            const updatedExpense = await api.updateExpense(id, expense);
            dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });
            return { success: true, expense: updatedExpense };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteExpense = async (id) => {
        try {
            await api.deleteExpense(id);
            dispatch({ type: 'DELETE_EXPENSE', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Lấy danh sách unique categories
    const getUniqueCategories = () => {
        const categories = [...new Set(state.expenses.map(expense => expense.category))];
        return categories.filter(cat => cat).sort();
    };

    const contextValue = {
        // State
        expenses: state.filteredExpenses,
        allExpenses: state.expenses,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        totalAmount: state.totalAmount,
        
        // Actions
        fetchExpenses,
        setFilter,
        setSort,
        addExpense,
        updateExpense,
        deleteExpense,
        getUniqueCategories,
    };

    return (
        <ExpenseContext.Provider value={contextValue}>
            {children}
        </ExpenseContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng ExpenseContext dễ dàng hơn
export const useExpense = () => useContext(ExpenseContext);
