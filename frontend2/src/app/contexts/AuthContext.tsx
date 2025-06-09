import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { login as apiLogin, register as apiRegister } from '../services/api';

interface AuthContextType {
  user: User | null;
  apiKey: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedUser && storedApiKey) {
      setUser(JSON.parse(storedUser));
      setApiKey(storedApiKey);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiLogin({ email, password });
    setUser(response.user);
    setApiKey(response.user.apiKey);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('apiKey', response.user.apiKey);
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    const response = await apiRegister({ email, password, confirmPassword });
    setUser(response.user);
    setApiKey(response.user.apiKey);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('apiKey', response.user.apiKey);
  };

  const logout = () => {
    setUser(null);
    setApiKey(null);
    localStorage.removeItem('user');
    localStorage.removeItem('apiKey');
  };

  return (
    <AuthContext.Provider value={{ user, apiKey, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 