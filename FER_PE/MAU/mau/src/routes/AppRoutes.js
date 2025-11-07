//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay "item" bằng tên object ở dạng lowercase (ví dụ: product, order, ...)
// Thay "items" bằng tên object ở dạng plural (ví dụ: products, orders, ...)

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import ItemTablePage from '../pages/ItemTablePage';
import ItemGridPage from '../pages/ItemGridPage';
import AddItemPage from '../pages/AddItemPage';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    // Lấy trực tiếp isAuthenticated từ useAuth()
    const { isAuthenticated } = useAuth(); 
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Route Table View - Mẫu hiển thị dạng BẢNG */}
                {/* CẤU HÌNH: Thay đổi path '/items/table' theo object của bạn */}
                <Route 
                    path="/items/table" 
                    element={
                        <PrivateRoute>
                            <ItemTablePage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Route Grid View - Mẫu hiển thị dạng LƯỚI */}
                {/* CẤU HÌNH: Thay đổi path '/items/grid' theo object của bạn */}
                <Route 
                    path="/items/grid" 
                    element={
                        <PrivateRoute>
                            <ItemGridPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 5. Route thêm item */}
                {/* CẤU HÌNH: Thay đổi path '/items/add' theo object của bạn (ví dụ: '/products/add', '/orders/add', ...) */}
                <Route 
                    path="/items/add" 
                    element={
                        <PrivateRoute>
                            <AddItemPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 6. Trang mặc định: Chuyển hướng đến /items/table */}
                <Route path="/" element={<Navigate to="/items/table" replace />} />
                <Route path="/home" element={<Navigate to="/items/table" replace />} />
                
                {/* 7. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /items/table */}
                <Route path="*" element={<Navigate to="/items/table" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

