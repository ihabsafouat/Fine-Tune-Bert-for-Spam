import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F1C] to-[#1A1A2E] text-white font-sans">
            {/* Header */}
            <header className="flex items-center justify-between p-6 md:px-12">
                <div className="flex items-center space-x-8">
                    <h1 className="text-2xl font-bold tracking-wider">SUPERHUMAN</h1>
                    <nav className="hidden md:flex space-x-8 text-lg">
                        <a href="#" className="hover:text-gray-300 transition-colors duration-200">Product</a>
                        <a href="#" className="hover:text-gray-300 transition-colors duration-200">Resources</a>
                        <a href="#" className="hover:text-gray-300 transition-colors duration-200">Pricing</a>
                        <a href="#" className="hover:text-gray-300 transition-colors duration-200 flex items-center">Love <span className="ml-1 text-purple-400">💜</span></a>
                    </nav>
                </div>
                <Button
                    onClick={() => navigate('/login')}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                >
                    Get Started
                </Button>
            </header>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center text-center px-4 py-20">
                <div className="mb-8 p-3 rounded-full flex items-center space-x-2 text-sm text-gray-200 border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                    <span role="img" aria-label="sparkle">✨</span>
                    <span>Download our latest report on productivity and AI</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                    Save 4 hours per person every single week
                </h2>

                <p className="mt-6 text-xl text-gray-300 max-w-3xl leading-relaxed">
                    Superhuman is the most productive email app ever made.
                    Collaborate faster and get more done with AI-native email.
                </p>

                <Button
                    onClick={() => navigate('/login')}
                    className="mt-10 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105"
                >
                    Get Started
                </Button>
            </main>
        </div>
    );
} 