import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(sessionStorage.getItem("session_details"));

  const login = (newToken) => {
    sessionStorage.setItem("session_details", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("session_details");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
