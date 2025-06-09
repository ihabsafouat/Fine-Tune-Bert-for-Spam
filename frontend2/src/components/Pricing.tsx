import React from 'react';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'Free forever',
    description: 'Perfect for individuals getting started',
    features: [
      'Up to 3 email accounts',
      'Basic keyboard shortcuts',
      'Standard support',
      '5GB storage',
      'Mobile app access'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
  },
  {
    name: 'Professional',
    price: 30,
    period: 'per month',
    description: 'For professionals who live in email',
    features: [
      'Unlimited email accounts',
      'AI-powered features',
      'Advanced shortcuts',
      'Priority support',
      'Unlimited storage',
      'Team collaboration',
      'Advanced analytics'
    ],
    buttonText: 'Start Free Trial',
    buttonStyle: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per user/month',
    description: 'For teams that need advanced control',
    features: [
      'Everything in Professional',
      'SSO integration',
      'Advanced security',
      'Custom integrations',
      'Dedicated support',
      'Custom training',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl border-2 p-8 ${
                plan.popular 
                  ? 'border-blue-500 shadow-xl scale-105 bg-slate-900' 
                  : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && (
                    <span className="text-slate-400 ml-2">/{plan.period}</span>
                  )}
                  {typeof plan.price === 'string' && plan.price !== 'Custom' && (
                    <span className="text-slate-400 text-lg ml-2">{plan.period}</span>
                  )}
                </div>
                <p className="text-slate-300">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;