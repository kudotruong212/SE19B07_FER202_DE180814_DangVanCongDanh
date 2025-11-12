//CartContext.jsx quản lý giỏ hàng bằng Context API và useReducer
import React, { createContext, useContext, useReducer } from 'react';

// 1. Tạo Context
const CartContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialCartState = {
    items: [],
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến cart
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                // Nếu đã có trong cart, tăng quantity
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                // Nếu chưa có, thêm mới với quantity = 1
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
            }

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
};

// 4. Tạo CartProvider để cung cấp Context cho các component con
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    // Thêm vào cart
    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    // Cập nhật quantity
    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    // Xóa khỏi cart
    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
    };

    // Clear cart
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const contextValue = {
        // State
        items: state.items,
        
        // Actions
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng CartContext dễ dàng hơn
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};