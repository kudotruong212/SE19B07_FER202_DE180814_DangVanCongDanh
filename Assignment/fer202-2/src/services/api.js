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

// Các hàm API cho expenses
export const getExpenses = async () => {
    try {
        const response = await API.get('/expenses');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch expenses');
    }
};

export const addExpense = async (expense) => {
    try {
        const response = await API.post('/expenses', expense);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message || 'Failed to add expense');
    }
};

export const updateExpense = async (id, expense) => {
    try {
        const response = await API.put(`/expenses/${id}`, expense);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update expense');
    }
};

export const deleteExpense = async (id) => {
    try {
        const response = await API.delete(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete expense');
    }
};

export default API;