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

// Các hàm API cho books
export const getBooks = async () => {
    try {
        const response = await API.get('/books');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books');
    }
};

export const addBook = async (book) => {
    try {
        const response = await API.post('/books', book);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add book');
    }
};

export const updateBook = async (id, book) => {
    try {
        const response = await API.put(`/books/${id}`, book);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update book');
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await API.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete book');
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
