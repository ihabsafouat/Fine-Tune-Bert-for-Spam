import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Chrome, Square } from 'lucide-react';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // In a real application, this would initiate an email-based signup flow
        // For now, we'll just navigate to the register page with the email pre-filled
        navigate(`/register?email=${email}`);
        setIsLoading(false);
    };

    const handleGoogleSignUp = () => {
        // Implement Google OAuth signup
        console.log('Sign up with Google');
    };

    const handleMicrosoftSignUp = () => {
        // Implement Microsoft OAuth signup
        console.log('Sign up with Microsoft');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0F1C] to-[#1A1A2E] text-white">
            <Card className="w-full max-w-md bg-[#22223B] p-8 rounded-lg shadow-xl text-center">
                <CardHeader className="mb-6">
                    <h2 className="text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                        Save 4 hours per person every single week
                    </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={handleGoogleSignUp}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <Chrome className="w-5 h-5" />
                        <span>Sign up with Google</span>
                    </Button>
                    <Button
                        onClick={handleMicrosoftSignUp}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <Square className="w-5 h-5" />
                        <span>Sign up with Microsoft</span>
                    </Button>
                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-gray-700" />
                        <span className="mx-4 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-700" />
                    </div>
                    <form onSubmit={handleEmailSignUp} className="space-y-4">
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                        >
                            {isLoading ? 'Signing up...' : 'Sign up with email'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 