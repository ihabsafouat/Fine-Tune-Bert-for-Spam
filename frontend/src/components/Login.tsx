import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Chrome, Square, Mail, Lock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export function Login() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { setToken } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = await api.login({ email, password });
            setToken(token);
            toast({
                title: 'Success',
                description: 'Login successful!',
            });
            navigate('/app');
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Login failed',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-gray-900/70 p-8 rounded-lg shadow-xl border border-gray-700 text-white">
                <CardContent className="flex flex-col items-center space-y-6">
                    <h2 className="text-3xl font-extrabold text-center leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 mb-4">
                        Save 4 hours per person every single week
                    </h2>

                    {!showLoginForm ? (
                        <>
                            <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <Chrome className="h-5 w-5" />
                                <span>Sign up with Google</span>
                            </Button>

                            <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <Square className="h-5 w-5" />
                                <span>Sign up with Microsoft</span>
                            </Button>

                            <div className="relative w-full flex items-center justify-center my-4">
                                <span className="absolute bg-gray-900/70 px-3 text-gray-400 text-sm">or</span>
                                <div className="w-full border-t border-gray-700"></div>
                            </div>

                            <Button
                                onClick={() => setShowLoginForm(true)}
                                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 flex items-center justify-center space-x-2"
                            >
                                <Mail className="h-5 w-5" />
                                <span>Login with email</span>
                            </Button>

                            <Button
                                onClick={() => navigate('/register')}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                            >
                                <span>Sign up with email</span>
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowLoginForm(false)}
                                className="w-full text-gray-400 hover:text-white"
                            >
                                Back to options
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}