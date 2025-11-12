//MotorbikeContext.jsx quản lý motorbikes bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const MotorbikeContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialMotorbikeState = {
    motorbikes: [],
    isLoading: false,
    error: null,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến motorbikes
const motorbikeReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            return {
                ...state,
                motorbikes: action.payload,
                isLoading: false,
                error: null,
            };
        
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        
        case 'UPDATE_MOTORBIKE':
            return {
                ...state,
                motorbikes: state.motorbikes.map(m =>
                    m.id === action.payload.id ? action.payload : m
                ),
            };
        
        default:
            return state;
    }
};

// 4. Tạo MotorbikeProvider để cung cấp Context cho các component con
export const MotorbikeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(motorbikeReducer, initialMotorbikeState);

    // Fetch motorbikes khi component mount
    useEffect(() => {
        fetchMotorbikes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMotorbikes = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const motorbikes = await api.getMotorbikes();
            dispatch({ type: 'FETCH_SUCCESS', payload: motorbikes });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
    };

    const updateMotorbikeStock = async (id, stock) => {
        try {
            const motorbike = state.motorbikes.find(m => m.id === id);
            if (motorbike) {
                const updated = await api.updateMotorbike(id, { ...motorbike, stock });
                dispatch({ type: 'UPDATE_MOTORBIKE', payload: updated });
                return { success: true, motorbike: updated };
            }
            return { success: false, error: 'Motorbike not found' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const contextValue = {
        // State
        motorbikes: state.motorbikes,
        isLoading: state.isLoading,
        error: state.error,
        
        // Actions
        fetchMotorbikes,
        updateMotorbikeStock,
    };

    return (
        <MotorbikeContext.Provider value={contextValue}>
            {children}
        </MotorbikeContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng MotorbikeContext dễ dàng hơn
export const useMotorbikes = () => {
    const context = useContext(MotorbikeContext);
    if (!context) {
        throw new Error('useMotorbikes must be used within MotorbikeProvider');
    }
    return context;
};
