import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8">
            <span className="text-sm font-medium text-slate-300">✨ The fastest email experience ever built</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Email at the
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> speed of thought</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Velocity is the fastest, most beautiful email client ever built. 
            Get through your inbox twice as fast with AI-powered assistance and lightning-fast shortcuts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="group bg-slate-800 text-slate-300 px-8 py-4 rounded-xl text-lg font-semibold border border-slate-700 hover:border-slate-600 hover:bg-slate-700 transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md">
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
          
          <div className="mt-16 text-sm text-slate-400">
            <p>Trusted by 100,000+ professionals at</p>
            <div className="flex justify-center items-center space-x-8 mt-4 opacity-60">
              <div className="bg-slate-700 h-8 w-24 rounded"></div>
              <div className="bg-slate-700 h-8 w-24 rounded"></div>
              <div className="bg-slate-700 h-8 w-24 rounded"></div>
              <div className="bg-slate-700 h-8 w-24 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;