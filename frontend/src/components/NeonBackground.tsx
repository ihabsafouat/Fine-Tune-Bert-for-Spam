import React from 'react';

const NeonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden">
      {/* Soft Neon Light Effect */}
      <div
        className="absolute rounded-full mix-blend-screen opacity-70 filter blur-3xl animate-pulse-slow"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.7) 0%, rgba(147, 51, 234, 0) 70%)',
          top: '-150px',
          left: '-150px',
          animationDelay: '0s',
        }}
      ></div>
      <div
        className="absolute rounded-full mix-blend-screen opacity-70 filter blur-3xl animate-pulse-slow"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(236, 72, 153, 0) 70%)',
          bottom: '-200px',
          right: '-200px',
          animationDelay: '4s',
        }}
      ></div>
      <div
        className="absolute rounded-full mix-blend-screen opacity-70 filter blur-3xl animate-pulse-slow"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(72, 236, 230, 0.7) 0%, rgba(72, 236, 230, 0) 70%)',
          top: '20%',
          right: '10%',
          animationDelay: '2s',
        }}
      ></div>
    </div>
  );
};

export default NeonBackground; 