//ItemContext.jsx quản lý items bằng Context API và useReducer
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay "item" bằng tên object ở dạng lowercase (ví dụ: product, order, ...)
// Thay "items" bằng tên object ở dạng plural (ví dụ: products, orders, ...)

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const ItemContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
// CẤU HÌNH: Thay đổi các fields trong filters và state theo object của bạn
const initialItemState = {
    items: [],
    filteredItems: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        category: '',      // Thay đổi field này theo nhu cầu (ví dụ: semester, type, status, ...)
        name: '',          // Thay đổi field này theo nhu cầu (ví dụ: courseName, productName, ...)
    },
    sortBy: 'date_desc', // Mặc định sort theo date descending
    totalAmount: 0,      // Có thể thay đổi thành totalPrice, totalQuantity, ... tùy object
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến items
const itemReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const items = action.payload;
            // Lọc items theo userId của user hiện tại (nếu cần)
            const userItems = items.filter(item => 
                item.userId === action.userId
            );
            return {
                ...state,
                items: userItems,
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
            let filtered = [...state.items];
            
            // Filter by search (category or name)
            // CẤU HÌNH: Thay đổi các field này theo object của bạn
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(item =>
                    item.category?.toLowerCase().includes(searchLower) ||
                    item.name?.toLowerCase().includes(searchLower)
                );
            }
            
            // Filter by category
            // CẤU HÌNH: Thay đổi field này theo object của bạn (ví dụ: semester, type, status, ...)
            if (state.filters.category) {
                filtered = filtered.filter(item =>
                    item.category === state.filters.category
                );
            }
            
            // Filter by name
            // CẤU HÌNH: Thay đổi field này theo object của bạn (ví dụ: courseName, productName, ...)
            if (state.filters.name) {
                filtered = filtered.filter(item =>
                    item.name === state.filters.name
                );
            }
            
            // Sort
            // CẤU HÌNH: Thay đổi các field sort theo object của bạn
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'name_asc':
                        return a.name?.localeCompare(b.name) || 0;
                    case 'name_desc':
                        return b.name?.localeCompare(a.name) || 0;
                    case 'date_asc':
                        return new Date(a.date) - new Date(b.date);
                    case 'date_desc':
                        return new Date(b.date) - new Date(a.date);
                    case 'price_asc':
                        return (a.price || 0) - (b.price || 0);
                    case 'price_desc':
                        return (b.price || 0) - (a.price || 0);
                    case 'year_asc':
                        return (a.year || 0) - (b.year || 0);
                    case 'year_desc':
                        return (b.year || 0) - (a.year || 0);
                    default:
                        return 0;
                }
            });
            
            // Tính total amount
            // CẤU HÌNH: Thay đổi field này theo object của bạn (ví dụ: price, amount, quantity, ...)
            const totalAmount = filtered.reduce((sum, item) => sum + (item.price || 0), 0);
            
            return {
                ...state,
                filteredItems: filtered,
                totalAmount,
            };
        
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        
        default:
            return state;
    }
};

// 4. Tạo ItemProvider để cung cấp Context cho các component con
export const ItemProvider = ({ children }) => {
    const [state, dispatch] = useReducer(itemReducer, initialItemState);
    const { user } = useAuth();

    // Fetch items khi component mount hoặc user thay đổi
    useEffect(() => {
        if (user && user.id) {
            fetchItems();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    // Áp dụng filters và sort khi có thay đổi
    useEffect(() => {
        if (state.items.length > 0) {
            dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
        }
    }, [state.items, state.filters, state.sortBy]);

    const fetchItems = async () => {
        if (!user || !user.id) return;
        
        dispatch({ type: 'FETCH_START' });
        try {
            const items = await api.getItems();
            dispatch({ type: 'FETCH_SUCCESS', payload: items, userId: user.id });
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

    const addItem = async (item) => {
        try {
            const newItem = await api.addItem({
                ...item,
                userId: user.id,
            });
            dispatch({ type: 'ADD_ITEM', payload: newItem });
            return { success: true, item: newItem };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateItem = async (id, item) => {
        try {
            const updatedItem = await api.updateItem(id, item);
            dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
            return { success: true, item: updatedItem };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteItem = async (id) => {
        try {
            await api.deleteItem(id);
            dispatch({ type: 'DELETE_ITEM', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Lấy danh sách unique categories và names
    // CẤU HÌNH: Thay đổi các field này theo object của bạn
    const getUniqueCategories = () => {
        const categories = [...new Set(state.items.map(i => i.category).filter(Boolean))];
        return categories.sort();
    };

    const getUniqueNames = () => {
        const names = [...new Set(state.items.map(i => i.name).filter(Boolean))];
        return names.sort();
    };

    const contextValue = {
        // State
        items: state.filteredItems,
        allItems: state.items,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        totalAmount: state.totalAmount,
        
        // Actions
        fetchItems,
        setFilter,
        setSort,
        addItem,
        updateItem,
        deleteItem,
        getUniqueCategories,
        getUniqueNames,
    };

    return (
        <ItemContext.Provider value={contextValue}>
            {children}
        </ItemContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng ItemContext dễ dàng hơn
export const useItem = () => useContext(ItemContext);

