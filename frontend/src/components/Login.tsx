import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const { setToken } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Store the API key in the auth context
            setToken({ api_key: apiKey });
            toast({
                title: 'Success',
                description: 'Successfully logged in!',
            });
            navigate('/');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to log in. Please check your API key.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold">Login</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                            API Key
                        </label>
                        <Input
                            id="apiKey"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your API key"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 