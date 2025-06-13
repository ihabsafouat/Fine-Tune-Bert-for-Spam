import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';

export function Home() {
    const navigate = useNavigate();
    const [splineApp, setSplineApp] = useState<Application | null>(null);
    const [splineError, setSplineError] = useState<string | null>(null);

    const handleSplineLoad = (app: Application) => {
        setSplineApp(app);
        setSplineError(null);
    };

    const handleSplineError = (error: Error) => {
        console.error('Spline error:', error);
        setSplineError('Failed to load 3D background');
    };

    return (
        <div className="min-h-screen text-white font-sans relative">
            {/* Spline Background */}
            <div className="fixed inset-0 -z-10">
                {splineError ? (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-black" />
                ) : (
                    <Spline 
                        scene="/spline/scene.spline"
                        className="w-full h-full"
                        onLoad={handleSplineLoad}
                        onError={handleSplineError}
                    />
                )}
            </div>

            {/* Content Container with Glass Effect */}
            <div className="relative z-10">
                {/* Header */}
                <header className="flex items-center justify-between p-6 md:px-12 bg-black/30">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold tracking-wider">SUPERHUMAN</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={() => navigate('/login')}
                            className="bg-transparent border border-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 hover:bg-purple-500/10"
                        >
                            Connexion
                        </Button>
                        <Button
                            onClick={() => navigate('/register')}
                            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                        >
                            Inscription
                        </Button>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex flex-col items-center justify-center text-center px-4 py-20">
                    <h2 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 mb-16">
                        Gagnez 4 heures par personne chaque semaine
                    </h2>

                    {/* 15 Million Hours Section */}
                    <section className="py-20 text-center">
                        <h3 className="text-6xl md:text-8xl font-extrabold text-gray-800 tracking-tighter relative">
                            15M
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl text-white font-semibold whitespace-nowrap">
                                Superhuman fait gagner aux équipes plus de <br />
                                <span className="text-yellow-400">15 millions d'heures</span> chaque année.
                            </span>
                        </h3>
                    </section>

                    {/* Email Problem Section */}
                    <section className="py-20 text-center max-w-2xl mx-auto">
                        <h3 className="text-4xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                            L'email est le plus grand problème <br />
                            <span className="text-purple-400">qui se cache à la vue de tous</span>
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Nous passons tous des heures sur nos emails. Mais nous répondons souvent en retard, et parfois nous ne répondons même pas.
                        </p>
                        <p className="text-gray-300 mb-8">
                            Nous finissons par perdre des opportunités, bloquer nos équipes et manquer nos objectifs.
                        </p>
                        <p className="text-gray-300 italic">
                            Ce n'est la faute de personne. L'email lui-même n'a pas changé depuis des décennies.
                            Avec Superhuman, tout cela change.
                        </p>
                    </section>

                    {/* Scrolling Tags Section */}
                    <section className="w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-purple-900/20" />
                        <div className="relative flex overflow-hidden">
                            <div className="flex animate-marquee whitespace-nowrap">
                                {[
                                    'Recrutement',
                                    'Sécurité',
                                    'Stratégie',
                                    'Produit',
                                    'Personnel',
                                    'Design',
                                    'Ventes',
                                    'Finance',
                                    'Service Client',
                                    'Ingénierie',
                                    'Développement Commercial',
                                    'Analyse',
                                    'Opérations',
                                    'Marketing',
                                    'Direction',
                                    'Événements'
                                ].map((text) => (
                                    <span 
                                        key={text} 
                                        className="inline-block px-8 py-4 mx-4 rounded-full border-2 border-purple-500/30 bg-gray-900/50 text-gray-200 text-lg font-medium 
                                        transition-all duration-300 
                                        hover:bg-purple-500/20 hover:border-purple-500 hover:text-white hover:scale-110 
                                        hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
                                        shadow-[0_0_8px_rgba(168,85,247,0.3)]
                                        hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
                                        hover:border-purple-400"
                                    >
                                        {text}
                                    </span>
                                ))}
                            </div>
                            <div className="flex animate-marquee whitespace-nowrap">
                                {[
                                    'Recrutement',
                                    'Sécurité',
                                    'Stratégie',
                                    'Produit',
                                    'Personnel',
                                    'Design',
                                    'Ventes',
                                    'Finance',
                                    'Service Client',
                                    'Ingénierie',
                                    'Développement Commercial',
                                    'Analyse',
                                    'Opérations',
                                    'Marketing',
                                    'Direction',
                                    'Événements'
                                ].map((text) => (
                                    <span 
                                        key={text} 
                                        className="inline-block px-8 py-4 mx-4 rounded-full border-2 border-purple-500/30 bg-gray-900/50 text-gray-200 text-lg font-medium 
                                        transition-all duration-300 
                                        hover:bg-purple-500/20 hover:border-purple-500 hover:text-white hover:scale-110 
                                        hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
                                        shadow-[0_0_8px_rgba(168,85,247,0.3)]
                                        hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
                                        hover:border-purple-400"
                                    >
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
} 