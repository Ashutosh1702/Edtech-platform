import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // refresh pe localStorage se user laao
  useEffect(() => {
    const saved = localStorage.getItem("edtech_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

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

export const useAuth = () => useContext(AuthContext);
