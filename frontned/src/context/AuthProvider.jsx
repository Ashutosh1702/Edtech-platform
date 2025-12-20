import { useState } from "react";
import AuthContext from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("edtech_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("edtech_user", JSON.stringify(userData));
    localStorage.setItem("edtech_token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("edtech_user");
    localStorage.removeItem("edtech_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
