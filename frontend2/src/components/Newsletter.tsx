import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900/20 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50">
          <Mail className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your email experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've already made the switch to faster, smarter email.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-0 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                required
              />
              <button
                type="submit"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>
          ) : (
            <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-400/30">
              <p className="text-green-100 text-lg font-semibold">
                Thanks! We'll be in touch soon with your free trial access.
              </p>
            </div>
          )}
          
          <p className="text-blue-200 text-sm mt-6">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;