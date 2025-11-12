//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import MotorbikeList from '../pages/MotorbikeList';
import MotorbikeDetail from '../pages/MotorbikeDetail';
import Cart from '../pages/Cart';
import NotFound from '../components/NotFound';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /motorbikes nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<Navigate to="/motorbikes" replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang danh sách xe máy */}
                <Route 
                    path="/motorbikes" 
                    element={
                        <PrivateRoute>
                            <MotorbikeList />
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Route xem chi tiết xe máy */}
                <Route 
                    path="/view/:id" 
                    element={
                        <PrivateRoute>
                            <MotorbikeDetail />
                        </PrivateRoute>
                    } 
                />
                
                {/* 5. Route giỏ hàng */}
                <Route 
                    path="/cart" 
                    element={
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    } 
                />
                
                {/* 6. Xử lý tất cả các đường dẫn không xác định: 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

