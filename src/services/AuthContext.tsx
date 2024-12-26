import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getToken, TOKEN_KEYS } from "./tokenStorage";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  handleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = async () => {
    const accessToken = await getToken(TOKEN_KEYS.ACCESS);
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};