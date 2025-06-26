import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SplineBackground from './SplineBackground';

// Types
interface MousePosition {
  x: number;
  y: number;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AnimatedCounterProps {
  target: number | string;
  suffix?: string;
  prefix?: string;
}

// Custom hook for mouse tracking
const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

// Magnetic button component
const MagneticButton: React.FC<MagneticButtonProps> = ({ children, onClick, className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    buttonRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(${isHovered ? 1.05 : 1})`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  };

  return (
    <Button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`${className} transition-all duration-300 ease-out relative overflow-hidden group`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Button>
  );
};

// Animated counter
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && elementRef.current) {
          let start = 0;
          const end = typeof target === 'string' ? parseFloat(target) : target;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elementRef}>
      {prefix}{typeof target === 'string' && target.includes('.') ? count.toFixed(1) : count}{suffix}
    </span>
  );
};

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const mousePosition = useMousePosition();
  const navigate = useNavigate();

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Cursor follower
  const CursorFollower = () => (
    <div
      className="fixed w-6 h-6 bg-purple-500/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
        transform: 'scale(1)',
      }}
    />
  );

  return (
    <div className="min-h-screen text-white font-sans relative overflow-hidden bg-black">
      {/* Spline 3D Background */}
      <SplineBackground />
      <CursorFollower />
      
      {/* Gradient overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-black/30 to-pink-900/10 -z-5" />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="flex items-center justify-between p-6 md:px-12 backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-50">
          <div 
            className="flex items-center group cursor-pointer"
            data-animate
            id="logo"
          >
            <h1 className={`text-2xl font-bold tracking-wider transition-all duration-1000 ${
              isVisible.logo ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-10 opacity-0'
            } group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400`}>
              SUPERHUMAN
            </h1>
            <div className="ml-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          </div>
          
          <div className="flex items-center space-x-4">
            <MagneticButton
              onClick={() => navigate('/login')}
              className="bg-transparent border border-purple-500/50 text-white font-bold py-2 px-6 rounded-lg backdrop-blur-sm hover:bg-purple-500/10 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            >
              Connexion
            </MagneticButton>
            <MagneticButton
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
            >
              Inscription
            </MagneticButton>
          </div>
        </header>

        {/* Enhanced Hero Section */}
        <main className="flex flex-col items-center justify-center text-center py-20 px-4">
          <div 
            className={`transition-all duration-1500 ease-out ${
              isVisible.hero ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
            }`}
            data-animate
            id="hero"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-purple-300 to-pink-300 mb-16 hover:scale-105 transition-transform duration-500">
              Protégez votre boîte mail contre le spam
            </h2>
          </div>

          {/* Enhanced Features Section */}
          <section 
            className="py-20 text-center max-w-6xl mx-auto"
            data-animate
            id="features"
          >
            <h3 className={`text-4xl font-extrabold leading-tight mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-purple-300 transition-all duration-1000 ${
              isVisible.features ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'
            }`}>
              Libérez votre boîte de réception du spam pour de bon
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Détection Avancée par IA",
                  description: "Notre moteur d'intelligence artificielle analyse en profondeur chaque email, identifiant les menaces complexes avec une précision inégalée.",
                  gradient: "from-blue-400 to-purple-600",
                  delay: "delay-100"
                },
                {
                  title: "Protection Instantanée",
                  description: "Bénéficiez d'une analyse et d'un filtrage en temps réel, bloquant le spam et les menaces avant qu'ils n'atteignent votre boîte de réception.",
                  gradient: "from-purple-400 to-pink-600",
                  delay: "delay-200"
                },
                {
                  title: "Défense Multi-Couches",
                  description: "Notre système offre une sécurité robuste contre le phishing, les malwares et autres cyberattaques, protégeant vos données sensibles.",
                  gradient: "from-pink-400 to-red-600",
                  delay: "delay-300"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-500/20 transition-all duration-700 ${feature.delay} ${
                    isVisible.features ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
                  } hover:border-purple-400/50 hover:bg-zinc-800/60 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] group cursor-pointer`}
                >
                  <div className="relative overflow-hidden rounded-lg mb-6 h-2 bg-gradient-to-r from-zinc-700 to-zinc-600">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`} />
                  </div>
                  <h4 className={`text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Stats Section */}
          <section 
            className="py-20 text-center relative"
            data-animate
            id="stats1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent" />
            <div className={`relative transition-all duration-1000 ${
              isVisible.stats1 ? 'transform scale-100 opacity-100' : 'transform scale-90 opacity-0'
            }`}>
              <h3 className="text-6xl md:text-8xl font-extrabold text-gray-800/50 tracking-tighter relative hover:text-gray-700/60 transition-colors duration-500">
                <AnimatedCounter target="99.9" suffix="%" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl text-white font-semibold whitespace-nowrap bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Taux de détection précis <br />
                  <span className="text-yellow-400 animate-pulse">des emails malveillants</span>
                </span>
              </h3>
            </div>
          </section>

          {/* Enhanced How It Works Section */}
          <section 
            className="py-20 text-center max-w-4xl mx-auto"
            data-animate
            id="howit"
          >
            <div className={`transition-all duration-1000 ${
              isVisible.howit ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'
            }`}>
              <h3 className="text-4xl font-extrabold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-purple-300 hover:from-purple-300 hover:to-pink-300 transition-all duration-500">
                Comment ça fonctionne
              </h3>
              
              <div className="space-y-6">
                {[
                  "Notre système utilise des algorithmes d'apprentissage automatique avancés pour analyser chaque email entrant.",
                  "Nous vérifions le contenu, les liens, les pièces jointes et les en-têtes pour identifier les menaces potentielles.",
                  "La sécurité de vos communications est notre priorité absolue."
                ].map((text, index) => (
                  <p 
                    key={index}
                    className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 cursor-default ${
                      index === 2 ? 'italic text-purple-200' : ''
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Enhanced 15 Million Hours Section */}
          <section 
            className="py-20 text-center relative"
            data-animate
            id="stats2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-900/10 to-transparent" />
            <div className={`relative transition-all duration-1000 ${
              isVisible.stats2 ? 'transform scale-100 opacity-100' : 'transform scale-90 opacity-0'
            }`}>
              <h3 className="text-6xl md:text-8xl font-extrabold text-gray-800/50 tracking-tighter relative hover:text-gray-700/60 transition-colors duration-500">
                <AnimatedCounter target="15" suffix="M" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl text-white font-semibold whitespace-nowrap bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Superhuman fait gagner aux équipes plus de <br />
                  <span className="text-yellow-400 animate-pulse">15 millions d'heures</span> chaque année.
                </span>
              </h3>
            </div>
          </section>

          {/* Enhanced Problem Section */}
          <section 
            className="py-20 text-center max-w-4xl mx-auto"
            data-animate
            id="problem"
          >
            <div className={`transition-all duration-1000 ${
              isVisible.problem ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'
            }`}>
              <h3 className="text-4xl font-extrabold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-purple-300">
                L'email est le plus grand problème <br />
                <span className="text-purple-400 hover:text-pink-400 transition-colors duration-300">qui se cache à la vue de tous</span>
              </h3>
              
              <div className="space-y-6">
                {[
                  "Nous passons tous des heures sur nos emails. Mais nous répondons souvent en retard, et parfois nous ne répondons même pas.",
                  "Nous finissons par perdre des opportunités, bloquer nos équipes et manquer nos objectifs.",
                  "Ce n'est la faute de personne. L'email lui-même n'a pas changé depuis des décennies. Avec Superhuman, tout cela change."
                ].map((text, index) => (
                  <p 
                    key={index}
                    className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 cursor-default ${
                      index === 2 ? 'italic text-purple-200' : ''
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Enhanced Scrolling Tags Section */}
          <section className="w-full relative py-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-purple-900/30" />
            <div className="relative">
              <div className="flex overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                  {[
                    'Spam', 'Phishing', 'Malware', 'Sécurité Email', 'Protection', 'Filtrage',
                    'Intelligence Artificielle', 'Cybersecurité', 'Anti-spam', 'Détection',
                    'Prévention', 'Analyse Menaces', 'Nettoyage Boîte Mail'
                  ].map((text, index) => (
                    <span 
                      key={`${text}-1`}
                      className="inline-block px-8 py-4 mx-3 rounded-full border-2 border-purple-500/30 bg-gradient-to-r from-gray-900/60 to-purple-900/40 text-gray-200 text-lg font-medium backdrop-blur-sm
                      transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-white hover:scale-110 
                      hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] shadow-[0_0_8px_rgba(168,85,247,0.3)]
                      cursor-pointer transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {text}
                    </span>
                  ))}
                </div>
                <div className="flex animate-marquee whitespace-nowrap">
                  {[
                    'Spam', 'Phishing', 'Malware', 'Sécurité Email', 'Protection', 'Filtrage',
                    'Intelligence Artificielle', 'Cybersecurité', 'Anti-spam', 'Détection',
                    'Prévention', 'Analyse Menaces', 'Nettoyage Boîte Mail'
                  ].map((text, index) => (
                    <span 
                      key={`${text}-2`}
                      className="inline-block px-8 py-4 mx-3 rounded-full border-2 border-purple-500/30 bg-gradient-to-r from-gray-900/60 to-purple-900/40 text-gray-200 text-lg font-medium backdrop-blur-sm
                      transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-white hover:scale-110 
                      hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] shadow-[0_0_8px_rgba(168,85,247,0.3)]
                      cursor-pointer transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-8 text-white">
                Prêt à transformer votre expérience email ?
              </h3>
              <MagneticButton
                onClick={() => {}}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-xl text-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] animate-pulse"
              >
                Commencer maintenant
              </MagneticButton>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          75% { transform: translateY(-10px) rotate(270deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.4); }
        }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 12s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}