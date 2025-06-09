import React from 'react';
import { Zap, Brain, Shield, Smartphone, Clock, Target } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed. Open emails instantly, search in milliseconds, and navigate with keyboard shortcuts.',
    color: 'text-yellow-400'
  },
  {
    icon: Brain,
    title: 'AI-Powered',
    description: 'Smart compose, automatic categorization, and intelligent responses that learn from your style.',
    color: 'text-purple-400'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'End-to-end encryption, zero tracking, and complete control over your data. Your privacy matters.',
    color: 'text-green-400'
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform',
    description: 'Seamless experience across desktop, mobile, and web. Your email, everywhere you need it.',
    color: 'text-blue-400'
  },
  {
    icon: Clock,
    title: 'Time Saving',
    description: 'Cut your email time in half with smart features, bulk actions, and automated workflows.',
    color: 'text-orange-400'
  },
  {
    icon: Target,
    title: 'Focus Mode',
    description: 'Eliminate distractions with focused inbox views, VIP filtering, and scheduled send.',
    color: 'text-red-400'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need to master your inbox
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Powerful features designed to make email feel effortless and enjoyable again.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-slate-600 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-slate-800 shadow-sm mb-6 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;