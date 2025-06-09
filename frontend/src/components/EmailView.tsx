import React from 'react';
import type { Email } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface EmailViewProps {
    email: Email;
}

export function EmailView({ email }: EmailViewProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-brand-dark-red">{email.subject}</CardTitle>
                <CardDescription className="text-brand-medium-blue text-sm">
                    From: {email.sender_email} | To: {email.recipient_email}
                </CardDescription>
                <CardDescription className="text-brand-medium-blue text-xs">
                    {new Date(email.created_at).toLocaleString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto text-brand-dark-red">
                <p className="whitespace-pre-wrap">{email.content}</p>
                {email.is_spam && (
                    <div className="mt-4 text-brand-red text-sm font-semibold">
                        Spam detected (confidence: {Math.round(email.spam_confidence * 100)}%)
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 