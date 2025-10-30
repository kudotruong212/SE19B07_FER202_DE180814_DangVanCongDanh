import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (username, password) => {
    // Có thể dùng baseURL nếu không proxy
    const res = await fetch(`http://localhost:3001/accounts?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    const data = await res.json();
    if (data && data.length > 0) {
      setUser(data[0]);
      return data[0];
    }
    throw new Error('Sai tên đăng nhập hoặc mật khẩu!');
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
