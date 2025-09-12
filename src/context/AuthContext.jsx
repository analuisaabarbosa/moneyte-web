import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import {
  login as loginService,
  register as registerService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await api.get("/users/me");
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao carregar usuário:", error);
          localStorage.removeItem("userToken");
          setToken(null);
        }
      }
      setLoading(false);
    };
    loadUserFromToken();
  }, [token]);
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginService(email, password);

      const { token: newToken, ...userData } = data;
      localStorage.setItem("userToken", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      localStorage.removeItem("userToken");
      delete api.defaults.headers.common["Authorization"];
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const register = async (name, email, password) => {
    try {
      const data = await registerService(name, email, password);
      const { token: newToken, ...userData } = data;
      localStorage.setItem("userToken", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      localStorage.removeItem("userToken");
      delete api.defaults.headers.common["Authorization"];
      throw error;
    }
  };
  const logout = () => {
    localStorage.removeItem("userToken");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };
  const value = {
    isAuthenticated: !!token,
    user,
    token,
    loading,
    register,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
