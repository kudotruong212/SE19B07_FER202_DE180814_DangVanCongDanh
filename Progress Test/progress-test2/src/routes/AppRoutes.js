//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import UserListPage from '../pages/UserListPage';
import TestPaymentErrorPage from '../pages/TestPaymentErrorPage';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    // Lấy trực tiếp isAuthenticated từ useAuth()
    const { isAuthenticated, user } = useAuth(); 
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Kiểm tra role admin và status active cho dashboard payment
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
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home ) */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            {/* Component Trang chủ/Dashboard */}
                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Route thêm thanh toán */}
                <Route 
                    path="/payments/add" 
                    element={
                        <PrivateRoute>
                            <AddPaymentPage />
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
                
                {/* 6. Route Test Payment Error (chỉ để test) */}
                <Route 
                    path="/test-payment-error" 
                    element={
                        <PrivateRoute>
                            <TestPaymentErrorPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 7. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
