//api.js chứa các hàm gọi API tới JSON Server
// TEMPLATE: Thay đổi 'item' thành tên đối tượng của bạn (ví dụ: 'product', 'order', 'student', ...)
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== API cho Users (giữ nguyên) ====================
export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// ==================== API cho Items (TEMPLATE: Thay 'item' thành đối tượng của bạn) ====================
// 📝 HƯỚNG DẪN: Thay thế tất cả 'item' và 'items' trong các hàm dưới thành tên đối tượng của bạn
// Ví dụ: Nếu làm về Product: 'item' -> 'product', 'items' -> 'products'

// GET: Lấy tất cả items
export const getItems = async () => {
    try {
        const response = await API.get('/items');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch items');
    }
};

// POST: Thêm item mới
export const addItem = async (item) => {
    try {
        const response = await API.post('/items', item);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add item');
    }
};

// PUT: Cập nhật item
export const updateItem = async (id, item) => {
    try {
        const response = await API.put(`/items/${id}`, item);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update item');
    }
};

// DELETE: Xóa item
export const deleteItem = async (id) => {
    try {
        const response = await API.delete(`/items/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete item');
    }
};

export default API;

