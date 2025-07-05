import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../hooks/use-toast';
import { api } from '../services/api';
import { Spinner } from './ui/loading';
import { PasswordStrengthMeter } from './ui/PasswordStrengthMeter';

export function Register() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.signup({ email, password });
            // Save API key to localStorage
            if (response.api_key) {
                localStorage.setItem('apiKey', response.api_key);
            }
            toast({
                title: 'Success',
                description: 'Registration successful! Please log in.',
            });
            navigate('/app');
        } catch (error) {
            toast({
                title: 'Registration failed',
                description: error.response?.data?.detail || 'An error occurred during registration',
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold">Register</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <PasswordStrengthMeter password={password} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <Spinner size="sm" />
                                <span>Registering...</span>
                            </div>
                        ) : (
                            'Register'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 