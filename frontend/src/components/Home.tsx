import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Simulate loading for 1.5 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-dark-red">
                <div className="flex flex-col items-center">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-brand-light-bg rounded-full animate-pulse-delay-100"></div>
                        <div className="w-4 h-4 bg-brand-light-bg rounded-full animate-pulse-delay-200"></div>
                        <div className="w-4 h-4 bg-brand-light-bg rounded-full animate-pulse-delay-300"></div>
                    </div>
                    <p className="mt-4 text-xl font-semibold text-brand-light-bg">Loading Email System...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark-red px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-brand-light-bg">Master Your Inbox, Effortlessly.</h1>
            <p className="text-xl text-brand-light-bg mb-8 max-w-2xl">
                Experience the next generation of email management. Send, receive, and automatically detect spam to save you time and focus on what truly matters.
            </p>
            <div className="flex space-x-6">
                <Button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-brand-medium-blue text-brand-light-bg rounded-lg text-lg font-semibold shadow hover:bg-brand-dark-bg transition transform hover:scale-105"
                >
                    Login
                </Button>
                <Button
                    onClick={() => navigate('/register')}
                    variant="outline"
                    className="px-6 py-3 bg-brand-light-bg text-brand-dark-red rounded-lg text-lg font-semibold shadow hover:bg-brand-medium-blue transition transform hover:scale-105 border-none"
                >
                    Register
                </Button>
            </div>
            {isAuthenticated && (
                <Button onClick={handleLogout} variant="outline" className="mt-4">
                    Logout
                </Button>
            )}
        </div>
    );
} 