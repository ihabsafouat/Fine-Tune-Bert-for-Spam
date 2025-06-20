import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../hooks/use-toast';
import { EmailView } from './EmailView';
import type { Email } from '../types';

export function EmailList() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      if (!token?.api_key) return;

      try {
        // Fetch both received and sent emails
        const [receivedEmails, sentEmails] = await Promise.all([
          api.getReceivedEmails(token.api_key),
          api.getSentEmails(token.api_key),
        ]);
        setEmails([...receivedEmails, ...sentEmails].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ));
      } catch (error) {
        setError('Failed to fetch emails. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to fetch emails. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, [token, toast]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </CardContent>
      </Card>
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
            key={email.id}
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