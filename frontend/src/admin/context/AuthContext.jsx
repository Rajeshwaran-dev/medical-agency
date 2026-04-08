import { createContext, useContext, useMemo, useState } from "react";
import { adminApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("adminUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await adminApi.post("/auth/login", { email, password });
    const nextToken = res.data.data.token;
    const nextUser = res.data.data.user;
    localStorage.setItem("adminToken", nextToken);
    localStorage.setItem("adminUser", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
