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

// Các hàm API cho courses
export const getCourses = async () => {
    try {
        const response = await API.get('/courses');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch courses');
    }
};

export const addCourse = async (course) => {
    try {
        const response = await API.post('/courses', course);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add course');
    }
};

export const updateCourse = async (id, course) => {
    try {
        const response = await API.put(`/courses/${id}`, course);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update course');
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await API.delete(`/courses/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete course');
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
