//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddBookPage from '../pages/AddBookPage';
import UserListPage from '../pages/UserListPage';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth(); 
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Kiểm tra role admin và status active cho dashboard
    if (user && (user.role !== 'admin' || user.status !== 'active')) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Route thêm sách */}
                <Route 
                    path="/books/add" 
                    element={
                        <PrivateRoute>
                            <AddBookPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 5. Route User Management */}
                <Route 
                    path="/users" 
                    element={
                        <PrivateRoute>
                            <UserListPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 6. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
