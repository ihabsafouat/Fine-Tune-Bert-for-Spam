import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { Email } from '../types';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmailListProps {
    type: 'sent' | 'received' | 'spam' | 'inbox';
    onSelectEmail: (email: Email) => void;
}

export function EmailList({ type, onSelectEmail }: EmailListProps) {
    const [emails, setEmails] = useState<Email[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { apiKey } = useAuth();

    useEffect(() => {
        const fetchEmails = async () => {
            if (!apiKey) {
                setError('Not authenticated');
                setLoading(false);
                return;
            }

            try {
                let data: Email[] = [];
                if (type === 'sent') {
                    data = await api.getSentEmails(apiKey);
                } else if (type === 'received' || type === 'inbox') {
                    data = await api.getReceivedEmails(apiKey);
                } else if (type === 'spam') {
                    data = await api.getSpamEmails(apiKey);
                }
                setEmails(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch emails');
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [type, apiKey]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-48">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-brand-dark-red rounded-full animate-pulse-delay-100"></div>
                    <div className="w-4 h-4 bg-brand-dark-red rounded-full animate-pulse-delay-200"></div>
                    <div className="w-4 h-4 bg-brand-dark-red rounded-full animate-pulse-delay-300"></div>
                </div>
                <p className="mt-4 text-xl font-semibold text-brand-dark-red">Loading Emails...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-brand-dark-red mb-4">
                {type === 'sent' ? 'Sent Emails' : type === 'spam' ? 'Spam Emails' : 'Received Emails'}
            </h2>
            {emails.length === 0 ? (
                <Alert>
                    <AlertDescription className="text-brand-medium-blue">No emails found</AlertDescription>
                </Alert>
            ) : (
                emails.map((email) => (
                    <Card
                        key={email.id}
                        onClick={() => onSelectEmail(email)}
                        className={`transition-all duration-200 cursor-pointer 
                            ${email.is_spam
                                ? 'border-brand-red bg-brand-light-bg hover:bg-brand-red/10'
                                : 'border-brand-medium-blue bg-brand-light-bg hover:bg-brand-light-bg/50'
                            }
                        `}
                    >
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-medium text-brand-dark-red">
                                        {type === 'sent' ? email.recipient_email : email.sender_email}
                                    </p>
                                    <p className="text-lg font-semibold mt-1 text-brand-dark-red">{email.subject}</p>
                                </div>
                                <div className="text-sm text-brand-medium-blue">
                                    {new Date(email.created_at).toLocaleString()}
                                </div>
                            </div>
                            <p className="mt-2 text-brand-dark-red truncate">
                                {email.content}
                            </p>
                            {email.is_spam && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-red text-brand-light-bg mt-2">
                                    Spam ({Math.round(email.spam_confidence * 100)}%)
                                </span>
                            )}
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
} 