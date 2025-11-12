//ItemContext.jsx quản lý items bằng Context API và useReducer
// ============================================
// 🔄 HƯỚNG DẪN CHUYỂN ĐỔI - ItemContext.jsx
// ============================================
// BƯỚC 1: Đổi tên file từ "ItemContext.jsx" -> "[Object]Context.jsx" (ví dụ: "ProductContext.jsx")
// BƯỚC 2: Đổi tên Context từ "ItemContext" -> "[Object]Context"
// BƯỚC 3: Đổi tên state từ "items" -> tên phù hợp (ví dụ: "products", "books")
// BƯỚC 4: Cập nhật filters theo các fields mới của đối tượng
// BƯỚC 5: Cập nhật sortBy theo các fields mới
// BƯỚC 6: Cập nhật logic filter và sort trong reducer
// BƯỚC 7: Đổi tên các hàm từ "getItems", "addItem", ... -> tên phù hợp
// BƯỚC 8: Cập nhật các hàm getUnique*() theo fields mới
// ============================================

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
// ⚠️ CẦN ĐỔI: "ItemContext" -> "[Object]Context" (ví dụ: "ProductContext", "BookContext")
const ItemContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
// ⚠️ CẦN ĐỔI: "initialItemState" -> "initial[Object]State"
const initialItemState = {
    // ⚠️ CẦN ĐỔI: "items" -> tên phù hợp (ví dụ: "products", "books", "courses")
    items: [],
    // ⚠️ CẦN ĐỔI: "filteredItems" -> "filtered[Objects]" (ví dụ: "filteredProducts")
    filteredItems: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        // ⚠️ CẦN ĐỔI: Các filter fields theo đối tượng mới
        // Ví dụ: nếu là "books" -> "author", "category", "publisher"
        // Ví dụ: nếu là "products" -> "category", "brand", "priceRange"
        brand: '',        // ⚠️ ĐỔI theo field phù hợp
        location: '',     // ⚠️ ĐỔI theo field phù hợp
        condition: '',    // ⚠️ ĐỔI theo field phù hợp (có thể xóa)
        status: '',       // ⚠️ ĐỔI theo field phù hợp
    },
    // ⚠️ CẦN ĐỔI: "sortBy" theo field mặc định của đối tượng mới
    // Ví dụ: "title_asc", "name_asc", "createdDate_desc"
    sortBy: 'name_asc', // Mặc định sort theo name ascending
    // ⚠️ CẦN ĐỔI: "totalItems" -> "total[Objects]" (ví dụ: "totalProducts")
    totalItems: 0,
    // ⚠️ CẦN ĐỔI: "totalValue" -> tên phù hợp (ví dụ: "totalPrice", "totalAmount", có thể xóa)
    totalValue: 0,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến items
// ⚠️ CẦN ĐỔI: "itemReducer" -> "[object]Reducer" (ví dụ: "productReducer")
const itemReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            // ⚠️ CẦN ĐỔI: "items" -> tên phù hợp
            const items = action.payload;
            return {
                ...state,
                items: items,
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
            // ⚠️ CẦN CẬP NHẬT: Logic filter và sort theo đối tượng mới
            // Áp dụng filters và sort
            let filtered = [...state.items];
            
            // ⚠️ CẦN ĐỔI: Filter by search - cập nhật các fields tìm kiếm
            // Ví dụ: nếu là "books" -> search by "title", "author", "isbn"
            // Ví dụ: nếu là "products" -> search by "name", "sku", "category"
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(item =>
                    item.name.toLowerCase().includes(searchLower) ||
                    item.brand.toLowerCase().includes(searchLower) ||
                    item.model.toLowerCase().includes(searchLower) ||
                    item.serialNumber.toLowerCase().includes(searchLower)
                );
            }
            
            // ⚠️ CẦN ĐỔI: Filter by brand -> filter theo field phù hợp
            // Ví dụ: nếu là "books" -> filter by "author" hoặc "publisher"
            if (state.filters.brand) {
                filtered = filtered.filter(item =>
                    item.brand === state.filters.brand
                );
            }
            
            // ⚠️ CẦN ĐỔI: Filter by location -> filter theo field phù hợp
            // Ví dụ: nếu là "books" -> filter by "category"
            if (state.filters.location) {
                filtered = filtered.filter(item =>
                    item.location === state.filters.location
                );
            }
            
            // ⚠️ CẦN ĐỔI: Filter by condition -> có thể xóa hoặc thay bằng field khác
            if (state.filters.condition) {
                filtered = filtered.filter(item =>
                    item.condition === state.filters.condition
                );
            }
            
            // ⚠️ CẦN ĐỔI: Filter by status -> filter theo field phù hợp
            if (state.filters.status) {
                filtered = filtered.filter(item =>
                    item.status === state.filters.status
                );
            }
            
            // ⚠️ CẦN ĐỔI: Sort - cập nhật các options sort theo fields mới
            // Ví dụ: nếu là "books" -> sort by "title", "author", "publishedDate"
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'name_asc':
                        return a.name.localeCompare(b.name);
                    case 'name_desc':
                        return b.name.localeCompare(a.name);
                    case 'brand_asc':
                        return a.brand.localeCompare(b.brand);
                    case 'brand_desc':
                        return b.brand.localeCompare(a.brand);
                    case 'price_asc':
                        return a.price - b.price;
                    case 'price_desc':
                        return b.price - a.price;
                    case 'purchaseDate_asc':
                        return new Date(a.purchaseDate) - new Date(b.purchaseDate);
                    case 'purchaseDate_desc':
                        return new Date(b.purchaseDate) - new Date(a.purchaseDate);
                    default:
                        return 0;
                }
            });
            
            // ⚠️ CẦN ĐỔI: Tính tổng - cập nhật logic tính toán
            // Ví dụ: nếu không cần "totalValue" có thể xóa
            const totalItems = filtered.length;
            const totalValue = filtered.reduce((sum, item) => sum + item.price, 0);
            
            return {
                ...state,
                filteredItems: filtered,
                totalItems,
                totalValue,
            };
        
        // ⚠️ CẦN ĐỔI: "ADD_ITEM" -> "ADD_[OBJECT]" (ví dụ: "ADD_PRODUCT")
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        
        // ⚠️ CẦN ĐỔI: "UPDATE_ITEM" -> "UPDATE_[OBJECT]"
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        
        // ⚠️ CẦN ĐỔI: "DELETE_ITEM" -> "DELETE_[OBJECT]"
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
// ⚠️ CẦN ĐỔI: "ItemProvider" -> "[Object]Provider" (ví dụ: "ProductProvider")
export const ItemProvider = ({ children }) => {
    // ⚠️ CẦN ĐỔI: "itemReducer" -> "[object]Reducer"
    const [state, dispatch] = useReducer(itemReducer, initialItemState);

    // Fetch items khi component mount
    useEffect(() => {
        // ⚠️ CẦN ĐỔI: "fetchItems" -> "fetch[Objects]" (ví dụ: "fetchProducts")
        fetchItems();
    }, []);

    // Áp dụng filters và sort khi có thay đổi
    useEffect(() => {
        if (state.items.length > 0) {
            dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
        }
    }, [state.items, state.filters, state.sortBy]);

    // ⚠️ CẦN ĐỔI: "fetchItems" -> "fetch[Objects]"
    // ⚠️ CẦN ĐỔI: "api.getItems()" -> "api.get[Objects]()"
    const fetchItems = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const items = await api.getItems();
            dispatch({ type: 'FETCH_SUCCESS', payload: items });
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

    // ⚠️ CẦN ĐỔI: "addItem" -> "add[Object]" (ví dụ: "addProduct")
    // ⚠️ CẦN ĐỔI: tham số "item" -> tên phù hợp
    // ⚠️ CẦN ĐỔI: "api.addItem()" -> "api.add[Object]()"
    // ⚠️ CẦN ĐỔI: "ADD_ITEM" -> "ADD_[OBJECT]"
    const addItem = async (item) => {
        try {
            const newItem = await api.addItem(item);
            dispatch({ type: 'ADD_ITEM', payload: newItem });
            return { success: true, item: newItem };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ⚠️ CẦN ĐỔI: "updateItem" -> "update[Object]"
    // ⚠️ CẦN ĐỔI: tham số "item" -> tên phù hợp
    // ⚠️ CẦN ĐỔI: "api.updateItem()" -> "api.update[Object]()"
    // ⚠️ CẦN ĐỔI: "UPDATE_ITEM" -> "UPDATE_[OBJECT]"
    const updateItem = async (id, item) => {
        try {
            const updatedItem = await api.updateItem(id, item);
            dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
            return { success: true, item: updatedItem };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ⚠️ CẦN ĐỔI: "deleteItem" -> "delete[Object]"
    // ⚠️ CẦN ĐỔI: "api.deleteItem()" -> "api.delete[Object]()"
    // ⚠️ CẦN ĐỔI: "DELETE_ITEM" -> "DELETE_[OBJECT]"
    const deleteItem = async (id) => {
        try {
            await api.deleteItem(id);
            dispatch({ type: 'DELETE_ITEM', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ⚠️ CẦN ĐỔI: Các hàm getUnique*() theo các fields mới
    // Ví dụ: nếu là "books" -> "getUniqueAuthors()", "getUniqueCategories()", "getUniquePublishers()"
    // Ví dụ: nếu là "products" -> "getUniqueCategories()", "getUniqueBrands()", "getUniqueSuppliers()"
    const getUniqueBrands = () => {
        const brands = [...new Set(state.items.map(i => i.brand))];
        return brands.sort();
    };

    const getUniqueLocations = () => {
        const locations = [...new Set(state.items.map(i => i.location))];
        return locations.sort();
    };

    const getUniqueConditions = () => {
        const conditions = [...new Set(state.items.map(i => i.condition))];
        return conditions.sort();
    };

    const getUniqueStatuses = () => {
        const statuses = [...new Set(state.items.map(i => i.status))];
        return statuses.sort();
    };

    // ⚠️ CẦN ĐỔI: Các tên trong contextValue theo đối tượng mới
    const contextValue = {
        // State
        // ⚠️ CẦN ĐỔI: "items" -> tên phù hợp (ví dụ: "products", "books")
        items: state.filteredItems,
        // ⚠️ CẦN ĐỔI: "allItems" -> "all[Objects]"
        allItems: state.items,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        // ⚠️ CẦN ĐỔI: "totalItems" -> "total[Objects]"
        totalItems: state.totalItems,
        // ⚠️ CẦN ĐỔI: "totalValue" -> tên phù hợp (có thể xóa)
        totalValue: state.totalValue,
        
        // Actions
        // ⚠️ CẦN ĐỔI: Tất cả tên hàm theo đối tượng mới
        fetchItems,
        setFilter,
        setSort,
        addItem,
        updateItem,
        deleteItem,
        getUniqueBrands,
        getUniqueLocations,
        getUniqueConditions,
        getUniqueStatuses,
    };

    return (
        // ⚠️ CẦN ĐỔI: "ItemContext" -> "[Object]Context"
        <ItemContext.Provider value={contextValue}>
            {children}
        </ItemContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng ItemContext dễ dàng hơn
// ⚠️ CẦN ĐỔI: "useItem" -> "use[Object]" (ví dụ: "useProduct", "useBook")
// ⚠️ CẦN ĐỔI: "ItemContext" -> "[Object]Context"
export const useItem = () => useContext(ItemContext);
