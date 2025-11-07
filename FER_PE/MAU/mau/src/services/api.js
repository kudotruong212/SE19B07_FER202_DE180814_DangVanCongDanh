//api.js chứa các hàm gọi API tới JSON Server
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay "item" bằng tên object ở dạng lowercase (ví dụ: product, order, ...)
// Thay "items" bằng tên object ở dạng plural (ví dụ: products, orders, ...)

import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// CẤU HÌNH: Thay đổi endpoint '/items' theo object của bạn (ví dụ: '/products', '/orders', ...)
export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// Các hàm API cho items
// CẤU HÌNH: Thay đổi endpoint '/items' theo object của bạn
export const getItems = async () => {
    try {
        const response = await API.get('/items');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch items');
    }
};

export const addItem = async (item) => {
    try {
        const response = await API.post('/items', item);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add item');
    }
};

export const updateItem = async (id, item) => {
    try {
        const response = await API.put(`/items/${id}`, item);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update item');
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await API.delete(`/items/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete item');
    }
};

export default API;


