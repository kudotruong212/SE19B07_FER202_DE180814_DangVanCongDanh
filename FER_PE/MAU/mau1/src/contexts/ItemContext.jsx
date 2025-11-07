//ItemContext.jsx quản lý items bằng Context API và useReducer
// TEMPLATE: Thay đổi 'item' thành tên đối tượng của bạn trong toàn bộ file này
// 📝 HƯỚNG DẪN THAY ĐỔI:
// 1. Thay 'item' -> 'product' (hoặc tên đối tượng của bạn)
// 2. Thay 'items' -> 'products' (hoặc số nhiều của đối tượng)
// 3. Thay các trường filter: 'category', 'name' -> các trường filter của đối tượng của bạn
// 4. Cập nhật logic filter và sort theo các trường của đối tượng mới
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const ItemContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
// 📝 THAY ĐỔI: Cập nhật 'filters' với các trường filter của đối tượng của bạn
const initialItemState = {
    items: [],
    filteredItems: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',      // Tìm kiếm chung
        category: '',    // 📝 THAY ĐỔI: Thay 'category' thành trường filter của bạn
        name: '',        // 📝 THAY ĐỔI: Thay 'name' thành trường filter khác của bạn
    },
    sortBy: 'name_asc', // 📝 THAY ĐỔI: Đặt sort mặc định theo trường của bạn
    totalCount: 0,      // 📝 THAY ĐỔI: Nếu không cần tổng, có thể bỏ hoặc thay thành trường khác
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến items
const itemReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const items = action.payload;
            // Lọc items theo userId của user hiện tại (nếu có)
            // 📝 THAY ĐỔI: Nếu không cần filter theo userId, bỏ dòng này
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
            
            // Filter by search (category hoặc name)
            // 📝 THAY ĐỔI: Cập nhật các trường được tìm kiếm ở đây
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(item =>
                    (item.category && item.category.toLowerCase().includes(searchLower)) ||
                    (item.name && item.name.toLowerCase().includes(searchLower))
                );
            }
            
            // Filter by category
            // 📝 THAY ĐỔI: Thay 'category' thành trường filter của bạn
            if (state.filters.category) {
                filtered = filtered.filter(item =>
                    item.category === state.filters.category
                );
            }
            
            // Filter by name
            // 📝 THAY ĐỔI: Thay 'name' thành trường filter khác của bạn
            if (state.filters.name) {
                filtered = filtered.filter(item =>
                    item.name === state.filters.name
                );
            }
            
            // Sort
            // 📝 THAY ĐỔI: Cập nhật các option sort theo trường của đối tượng của bạn
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'name_asc':
                        return (a.name || '').localeCompare(b.name || '');
                    case 'name_desc':
                        return (b.name || '').localeCompare(a.name || '');
                    case 'date_asc':
                        return new Date(a.date || 0) - new Date(b.date || 0);
                    case 'date_desc':
                        return new Date(b.date || 0) - new Date(a.date || 0);
                    case 'price_asc':
                        return (a.price || 0) - (b.price || 0);
                    case 'price_desc':
                        return (b.price || 0) - (a.price || 0);
                    default:
                        return 0;
                }
            });
            
            // Tính total count
            // 📝 THAY ĐỔI: Nếu không cần tổng, bỏ phần này hoặc thay thành tính toán khác
            const totalCount = filtered.length;
            
            return {
                ...state,
                filteredItems: filtered,
                totalCount,
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
                userId: user.id, // 📝 THAY ĐỔI: Bỏ nếu không cần userId
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
    // 📝 THAY ĐỔI: Thay các hàm này thành các hàm lấy unique values của trường filter của bạn
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
        totalCount: state.totalCount,
        
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

