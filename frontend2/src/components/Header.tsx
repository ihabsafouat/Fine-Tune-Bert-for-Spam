import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Velocity</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">Features</a>
            <a href="#testimonials" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">Testimonials</a>
            <a href="#pricing" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">Pricing</a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </nav>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-700 shadow-xl">
            <nav className="flex flex-col space-y-4 p-4">
              <a href="#features" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">Features</a>
              <a href="#testimonials" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">Testimonials</a>
              <a href="#pricing" className="text-slate-300 hover:text-blue-400 transition-colors duration-200">Pricing</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 w-full shadow-lg">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;