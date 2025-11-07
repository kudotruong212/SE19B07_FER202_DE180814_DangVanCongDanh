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

// Các hàm API cho accounts (users)
export const getAccounts = async () => {
    try {
        const response = await API.get('/accounts');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch accounts');
    }
};

// Các hàm API cho motorbikes
export const getMotorbikes = async () => {
    try {
        const response = await API.get('/motorbikes');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch motorbikes');
    }
};

export const getMotorbikeById = async (id) => {
    try {
        const response = await API.get(`/motorbikes/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch motorbike');
    }
};

export const updateMotorbike = async (id, motorbike) => {
    try {
        const response = await API.put(`/motorbikes/${id}`, motorbike);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update motorbike');
    }
};

export default API;

