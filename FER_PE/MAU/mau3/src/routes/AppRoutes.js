//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
// GENERIC TEMPLATE: Thay "Item" và "/items" bằng tên entity và route của bạn
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import ItemList from '../pages/ItemList';
import ItemDetail from '../pages/ItemDetail';
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
                {/* 1. Trang mặc định: Chuyển hướng đến /items nếu đã đăng nhập, ngược lại là /login */}
                {/* LƯU Ý: Thay "/items" bằng route list của bạn */}
                <Route path="/" element={<Navigate to="/items" replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang danh sách items */}
                {/* LƯU Ý: Thay "/items" và ItemList bằng route và component của bạn */}
                <Route 
                    path="/items" 
                    element={
                        <PrivateRoute>
                            <ItemList />
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Route xem chi tiết item */}
                {/* LƯU Ý: Thay "/view/:id" và ItemDetail bằng route và component của bạn */}
                <Route 
                    path="/view/:id" 
                    element={
                        <PrivateRoute>
                            <ItemDetail />
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