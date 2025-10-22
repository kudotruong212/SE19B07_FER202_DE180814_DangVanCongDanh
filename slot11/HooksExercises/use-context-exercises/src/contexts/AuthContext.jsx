import React, { createContext, useContext, useMemo, useReducer } from "react";

// Mock data (thay cho API)
const mockAccounts = [
  { id: 1, username: "admin", email: "admin@example.com", password: "123456", role: "admin", status: "active" },
  { id: 2, username: "user1", email: "user1@example.com", password: "123456", role: "user",  status: "active" },
  { id: 3, username: "user2", email: "user2@example.com", password: "123456", role: "user",  status: "locked" },
];

const AuthContext = createContext(null);

const initialAuth = { user: null, isAuthenticated: false, error: null };

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS": return { user: action.user, isAuthenticated: true,  error: null };
    case "LOGIN_FAILURE": return { user: null,        isAuthenticated: false, error: action.error };
    case "LOGOUT":        return { ...initialAuth };
    default:              return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuth);

  const login = (username, password) => {
    // Clear any previous errors
    dispatch({ type: "LOGIN_FAILURE", error: null });
    
    const found = mockAccounts.find(u => u.username === username && u.password === password);
    
    if (!found) {
      return dispatch({ type: "LOGIN_FAILURE", error: "Sai username hoặc password." });
    }
    
    if (found.role !== "admin") {
      return dispatch({ type: "LOGIN_FAILURE", error: "Chỉ admin được phép đăng nhập." });
    }
    
    if (found.status !== "active") {
      return dispatch({ type: "LOGIN_FAILURE", error: "Tài khoản không hoạt động." });
    }

    // Success - extract user data without password
    const { id, username: uname, role, email } = found;
    dispatch({ type: "LOGIN_SUCCESS", user: { id, username: uname, role, email } });
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  const value = useMemo(() => ({ ...state, login, logout }), [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
