import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Tạo Provider Component
export const AuthProvider = ({ children }) => {
  // State để lưu user hiện tại
  // Khởi tạo từ localStorage nếu có
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  });

  // Mỗi khi user thay đổi, lưu vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Hàm login: kiểm tra username và password
  const login = async (username, password) => {
    // Gọi API để kiểm tra tài khoản
    const res = await fetch(
      `http://localhost:3001/accounts?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    );
    const data = await res.json();
    
    // Nếu tìm thấy account (data.length > 0)
    if (data && data.length > 0) {
      setUser(data[0]); // Lưu user vào state
      return data[0];
    }
    // Nếu không tìm thấy, throw error
    throw new Error('Invalid username or password!');
  };

  // Hàm logout
  const logout = () => {
    setUser(null);
  };

  // Value để chia sẻ cho các components con
  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook để dùng Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};