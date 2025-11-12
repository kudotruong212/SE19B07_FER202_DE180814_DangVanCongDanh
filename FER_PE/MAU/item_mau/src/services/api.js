//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// ============================================
// 🔄 HƯỚNG DẪN CHUYỂN ĐỔI - API Functions
// ============================================
// BƯỚC 1: Đổi tên hàm từ "getItems", "addItem", "updateItem", "deleteItem"
//         thành tên phù hợp với đối tượng mới (ví dụ: "getProducts", "addProduct", ...)
// BƯỚC 2: Đổi endpoint từ "/items" thành endpoint mới (ví dụ: "/products", "/books", "/courses")
// BƯỚC 3: Đổi tên tham số từ "item" thành tên phù hợp (ví dụ: "product", "book", "course")
// BƯỚC 4: Đổi thông báo lỗi cho phù hợp
// ============================================

// ⚠️ CẦN ĐỔI: "getItems" -> "get[ObjectName]" (ví dụ: "getProducts", "getBooks")
// ⚠️ CẦN ĐỔI: "/items" -> "/[objectName]" (ví dụ: "/products", "/books")
export const getItems = async () => {
    try {
        const response = await API.get('/items');
        return response.data;
    } catch (error) {
        // ⚠️ CẦN ĐỔI: "items" trong thông báo lỗi
        throw new Error('Failed to fetch items');
    }
};

// ⚠️ CẦN ĐỔI: "addItem" -> "add[ObjectName]"
// ⚠️ CẦN ĐỔI: tham số "item" -> tên phù hợp (ví dụ: "product", "book")
// ⚠️ CẦN ĐỔI: "/items" -> "/[objectName]"
export const addItem = async (item) => {
    try {
        const response = await API.post('/items', item);
        return response.data;
    } catch (error) {
        // ⚠️ CẦN ĐỔI: "item" trong thông báo lỗi
        throw new Error('Failed to add item');
    }
};

// ⚠️ CẦN ĐỔI: "updateItem" -> "update[ObjectName]"
// ⚠️ CẦN ĐỔI: tham số "item" -> tên phù hợp
// ⚠️ CẦN ĐỔI: "/items" -> "/[objectName]"
export const updateItem = async (id, item) => {
    try {
        const response = await API.put(`/items/${id}`, item);
        return response.data;
    } catch (error) {
        // ⚠️ CẦN ĐỔI: "item" trong thông báo lỗi
        throw new Error('Failed to update item');
    }
};

// ⚠️ CẦN ĐỔI: "deleteItem" -> "delete[ObjectName]"
// ⚠️ CẦN ĐỔI: "/items" -> "/[objectName]"
export const deleteItem = async (id) => {
    try {
        const response = await API.delete(`/items/${id}`);
        return response.data;
    } catch (error) {
        // ⚠️ CẦN ĐỔI: "item" trong thông báo lỗi
        throw new Error('Failed to delete item');
    }
};

// Các hàm API cho users
export const updateUser = async (id, user) => {
    try {
        const response = await API.put(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

export default API;
