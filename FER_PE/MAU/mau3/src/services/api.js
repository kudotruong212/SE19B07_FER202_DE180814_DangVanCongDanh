//api.js chứa các hàm gọi API tới JSON Server
// GENERIC TEMPLATE: Thay "Item" bằng tên entity của bạn (ví dụ: Product, Book, Car, etc.)
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Các hàm API cho accounts (users)
export const getAccounts = async () => {
    try {
        const response = await API.get('/accounts');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch accounts');
    }
};

// Các hàm API cho items
// LƯU Ý: Thay "items" bằng endpoint tương ứng trong db.json của bạn
// Ví dụ: nếu entity là "products" thì đổi thành "/products"
export const getItems = async () => {
    try {
        const response = await API.get('/items');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch items');
    }
};

export const getItemById = async (id) => {
    try {
        const response = await API.get(`/items/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch item');
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

export default API;