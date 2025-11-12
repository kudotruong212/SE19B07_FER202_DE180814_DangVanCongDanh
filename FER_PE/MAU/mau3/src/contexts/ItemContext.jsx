//ItemContext.jsx quản lý items bằng Context API và useReducer
// GENERIC TEMPLATE: Thay "Item" bằng tên entity của bạn (ví dụ: Product, Book, Car, etc.)
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const ItemContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialItemState = {
    items: [],
    isLoading: false,
    error: null,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến items
const itemReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                error: null,
            };
        
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        
        default:
            return state;
    }
};

// 4. Tạo ItemProvider để cung cấp Context cho các component con
export const ItemProvider = ({ children }) => {
    const [state, dispatch] = useReducer(itemReducer, initialItemState);

    // Fetch items khi component mount
    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchItems = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const items = await api.getItems();
            dispatch({ type: 'FETCH_SUCCESS', payload: items });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
    };

    const updateItemStock = async (id, stock) => {
        try {
            const item = state.items.find(i => i.id === id);
            if (item) {
                const updated = await api.updateItem(id, { ...item, stock });
                dispatch({ type: 'UPDATE_ITEM', payload: updated });
                return { success: true, item: updated };
            }
            return { success: false, error: 'Item not found' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateItem = async (id, itemData) => {
        try {
            const updated = await api.updateItem(id, itemData);
            dispatch({ type: 'UPDATE_ITEM', payload: updated });
            return { success: true, item: updated };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const contextValue = {
        // State
        items: state.items,
        loading: state.isLoading,
        error: state.error,
        
        // Actions
        fetchItems,
        updateItemStock,
        updateItem,
    };

    return (
        <ItemContext.Provider value={contextValue}>
            {children}
        </ItemContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng ItemContext dễ dàng hơn
export const useItems = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error('useItems must be used within ItemProvider');
    }
    return context;
};