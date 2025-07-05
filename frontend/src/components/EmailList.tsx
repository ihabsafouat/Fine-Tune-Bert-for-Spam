import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../hooks/use-toast';
import { EmailView } from './EmailView';
import type { Email } from '../types';
import { useEmails } from '../hooks/use-emails';
import { SkeletonEmailCard } from './ui/loading';

export function EmailList() {
  const { token } = useAuth();
  const { toast } = useToast();
  const { emails, isLoading, error } = useEmails();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonEmailCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (emails.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center text-gray-500">
          No emails found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {selectedEmail && (
        <EmailView
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}
      <div className="grid gap-4">
        {emails.map((email) => (
          <Card
            key={`${email.id}-${email.sender_email}-${email.recipient_email}`}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setSelectedEmail(email)}
          >
            <CardHeader>
              <h3 className="font-semibold">{email.subject}</h3>
              <p className="text-sm text-gray-500">
                From: {email.sender_email} | To: {email.recipient_email}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(email.created_at).toLocaleString()}
              </p>
              {email.is_spam && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2">
                  Spam {email.spam_confidence ? `(${Math.round(email.spam_confidence * 100)}%)` : ''}
                </span>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
} 