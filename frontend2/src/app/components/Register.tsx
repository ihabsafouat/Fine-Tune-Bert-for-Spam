import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.email, formData.password, formData.confirmPassword);
      toast({
        title: 'Success',
        description: 'Account created successfully',
      });
      navigate('/app');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light-bg dark:bg-brand-dark-bg p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-brand-dark-bg dark:text-brand-light-bg">
            Create Account
          </CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            Sign up to start using our email service
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-brand-light-bg dark:bg-brand-dark-bg"
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-brand-light-bg dark:bg-brand-dark-bg"
              />
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-brand-light-bg dark:bg-brand-dark-bg"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-brand-red hover:text-brand-dark-red"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 