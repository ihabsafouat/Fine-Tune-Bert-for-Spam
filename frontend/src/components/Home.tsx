import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Home() {
    const navigate = useNavigate();

    const images = [
        '/images/image-1.jpg', // Replace with your actual image file name
        '/images/image-2.jpg', // Replace with your actual image file name
        '/images/image-3.jpg', // Replace with your actual image file name
      ];
 
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000); // Change image every 7 seconds
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="min-h-screen text-white font-sans">
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
                <h2 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 mb-16">
                    Save 4 hours per person every single week
                </h2>

                {/* Image Carousel Section */}
                <div className="w-full max-w-4xl mb-20 relative" style={{ height: '400px' }}>
                    <Card className="w-full h-full bg-gray-950/50 border border-gray-800 shadow-[0_25px_50px_-12px_rgba(168,85,247,0.3)] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:border-2 hover:border-purple-500 hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.7)] hover:ring-2 hover:ring-purple-500 cursor-pointer hover:shadow-[inset_0_0_10px_rgba(168,85,247,0.5)]">
                        <CardContent className="p-0 w-full h-full">
                            <img
                                key={currentImageIndex}
                                src={images[currentImageIndex]}
                                alt="Superhuman App Screenshot"
                                className="w-full h-full object-cover rounded-xl animate-fade-in transition-all duration-500 hover:brightness-110"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* 15 Million Hours Section */}
                <section className="py-20 text-center">
                    <h3 className="text-6xl md:text-8xl font-extrabold text-gray-800 tracking-tighter relative">
                        15M
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl text-white font-semibold whitespace-nowrap">
                            Superhuman saves teams over <br />
                            <span className="text-yellow-400">15 million hours</span> every single year.
                        </span>
                    </h3>
                </section>

                {/* Email Problem Section */}
                <section className="py-20 text-center max-w-2xl mx-auto">
                    <h3 className="text-4xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                        Email is the biggest problem <br />
                        <span className="text-purple-400">hiding in plain sight</span>
                    </h3>
                    <p className="text-gray-300 mb-4">
                        We all spend hours on email. But we often reply late, and sometimes don't even reply.
                    </p>
                    <p className="text-gray-300 mb-8">
                        We then end up losing deals, blocking our teams, and missing our goals.
                    </p>
                    <p className="text-gray-300 italic">
                        It's not anybody's fault. Email itself has not changed in decades.
                        With Superhuman, this all changes.
                    </p>
                </section>

                {/* Scrolling Tags Section */}
                <section className="py-20 w-full overflow-hidden">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {/* Duplicate content for seamless looping */}
                        <div className="flex space-x-4 pr-4">
                            {[ 'Recruiting', 'Security', 'Strategy', 'Product', 'People', 'Design', 'Sales', 'Finance', 'Customer Success', 'Engineering', 'Business Development', 'Analytics', 'Operations', 'Marketing', 'Leadership', 'Events' ].map((tag) => (
                                <span key={tag} className="inline-block px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex space-x-4 pr-4">
                            {[ 'Recruiting', 'Security', 'Strategy', 'Product', 'People', 'Design', 'Sales', 'Finance', 'Customer Success', 'Engineering', 'Business Development', 'Analytics', 'Operations', 'Marketing', 'Leadership', 'Events' ].map((tag) => (
                                <span key={tag} className="inline-block px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
} 