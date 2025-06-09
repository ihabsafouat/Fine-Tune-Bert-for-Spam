import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "Velocity completely transformed how I handle email. I'm processing twice as many emails in half the time. It's not just faster—it's actually enjoyable to use.",
    author: "Sarah Chen",
    role: "VP of Marketing",
    company: "TechFlow",
    rating: 5
  },
  {
    content: "The AI features are incredible. It learns how I write and suggests responses that sound exactly like me. I've saved hours every week since switching.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "StartupLab",
    rating: 5
  },
  {
    content: "Finally, an email client that respects my privacy while delivering cutting-edge features. The speed is unmatched—everything happens instantly.",
    author: "Dr. Emily Watson",
    role: "Research Director",
    company: "BioTech Solutions",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Loved by thousands of professionals
          </h2>
          <p className="text-xl text-slate-300">
            See what our users are saying about their experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-700 hover:shadow-lg hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-slate-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;