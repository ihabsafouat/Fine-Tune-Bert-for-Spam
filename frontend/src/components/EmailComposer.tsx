import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function EmailComposer() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!token?.api_key) {
            toast({
                title: "Authentication Error",
                description: "You are not authenticated. Please log in.",
                variant: "destructive",
            });
            setLoading(false);
            return;
        }

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
                title: "Success!",
                description: "Email sent successfully!",
            });
            setRecipient('');
            setSubject('');
            setContent('');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send email';
            toast({
                title: "Error sending email",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <h2 className="text-xl font-bold text-brand-dark-red">Compose Email</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="To"
                            className="mt-1 bg-brand-light-bg text-brand-dark-red border-brand-medium-blue focus:border-brand-medium-blue focus:ring-brand-medium-blue"
                            required
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                            className="mt-1 bg-brand-light-bg text-brand-dark-red border-brand-medium-blue focus:border-brand-medium-blue focus:ring-brand-medium-blue"
                            required
                        />
                    </div>

                    <div>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            placeholder="Message"
                            className="mt-1 bg-brand-light-bg text-brand-dark-red border-brand-medium-blue focus:border-brand-medium-blue focus:ring-brand-medium-blue"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-medium-blue text-brand-light-bg hover:bg-brand-dark-bg focus:ring-2 focus:ring-offset-2 focus:ring-brand-medium-blue transition transform hover:scale-105"
                    >
                        {loading ? 'Sending...' : 'Send Email'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 