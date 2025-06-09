import React from 'react';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Velocity</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              The fastest, most beautiful email client ever built. 
              Transform your email experience with AI-powered features and lightning-fast performance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Features</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Security</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 Velocity. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;