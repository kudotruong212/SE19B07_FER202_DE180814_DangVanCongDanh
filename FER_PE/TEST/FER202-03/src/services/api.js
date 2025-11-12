//api.js chứa các hàm gọi API tới JSON Server
// TEMPLATE: Thay đổi 'student' thành tên đối tượng của bạn (ví dụ: 'product', 'order', 'student', ...)
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

// ==================== API cho Students (TEMPLATE: Thay 'student' thành đối tượng của bạn) ====================
// 📝 HƯỚNG DẪN: Thay thế tất cả 'student' và 'students' trong các hàm dưới thành tên đối tượng của bạn
// Ví dụ: Nếu làm về Product: 'student' -> 'product', 'students' -> 'products'

// GET: Lấy tất cả students
export const getStudents = async () => {
    try {
        const response = await API.get('/students');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch students');
    }
};

// POST: Thêm student mới
export const addStudent = async (student) => {
    try {
        const response = await API.post('/students', student);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add student');
    }
};

// PUT: Cập nhật student
export const updateStudent = async (id, student) => {
    try {
        const response = await API.put(`/students/${id}`, student);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update student');
    }
};

// DELETE: Xóa student
export const deleteStudent = async (id) => {
    try {
        const response = await API.delete(`/students/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete student');
    }
};

export default API;

