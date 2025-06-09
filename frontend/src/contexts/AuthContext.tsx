import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Token } from '../types';

interface AuthContextType {
    token: Token | null;
    setToken: (token: Token | null) => void;
    isAuthenticated: boolean;
    apiKey: string | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<Token | null>(() => {
        try {
            const savedToken = localStorage.getItem('token');
            return savedToken ? JSON.parse(savedToken) : null;
        } catch (error) {
            console.error('Error parsing token from localStorage:', error);
            return null;
        }
    });

    const apiKey = token?.api_key || null;

    useEffect(() => {
        if (token) {
            try {
                localStorage.setItem('token', JSON.stringify(token));
            } catch (error) {
                console.error('Error saving token to localStorage:', error);
            }
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const logout = () => setToken(null);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                isAuthenticated: !!token,
                apiKey,
                logout,
            }}
        >
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