import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export function Login() {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = await api.login({ email, password });
            setToken(token);
            navigate('/app');
            toast({
                title: "Success!",
                description: "Logged in successfully.",
            });
        } catch (err) {
            const errorMessage = 'Invalid email or password';
            setError(errorMessage);
            toast({
                title: "Login Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark-red py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md bg-brand-dark-bg shadow-xl">
                <CardHeader>
                    <h2 className="text-center text-3xl font-extrabold text-brand-light-bg">
                        Unlock Your Inbox's Full Potential
                    </h2>
                    <p className="text-center text-brand-light-bg text-sm mt-2">
                        Sign in to streamline your email experience and manage your communications effortlessly.
                    </p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-brand-light-bg text-brand-dark-red border-brand-medium-blue focus:border-brand-medium-blue focus:ring-brand-medium-blue"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-brand-light-bg text-brand-dark-red border-brand-medium-blue focus:border-brand-medium-blue focus:ring-brand-medium-blue"
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-medium-blue text-brand-light-bg hover:bg-brand-dark-bg focus:ring-2 focus:ring-offset-2 focus:ring-brand-medium-blue transition transform hover:scale-105"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 