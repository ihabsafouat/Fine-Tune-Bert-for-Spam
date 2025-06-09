import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Send } from 'lucide-react';

export function EmailComposer() {
    const { token, isAuthenticated } = useAuth();
    const { toast } = useToast();
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated || !token?.api_key) {
            toast({
                title: 'Authentication Error',
                description: 'You must be logged in to send emails.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        try {
            await api.sendEmail(
                {
                    recipient_email: recipient,
                    subject,
                    content,
                },
                token.api_key
            );
            toast({
                title: 'Success',
                description: 'Email sent successfully!',
            });
            setRecipient('');
            setSubject('');
            setContent('');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to send email. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold">Compose Email</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="recipient" className="block text-sm font-medium mb-1">
                            To
                        </label>
                        <Input
                            id="recipient"
                            type="email"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="recipient@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                            Subject
                        </label>
                        <Input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium mb-1">
                            Message
                        </label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your message here..."
                            className="min-h-[200px]"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Email'}
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 