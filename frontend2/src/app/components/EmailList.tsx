import { useEffect, useState } from 'react';
import { Email } from '../types';
import { getReceivedEmails, getSentEmails } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Inbox, Send } from 'lucide-react';

export function EmailList() {
  const { apiKey } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  useEffect(() => {
    const fetchEmails = async () => {
      if (!apiKey) return;
      setIsLoading(true);
      try {
        const fetchedEmails = activeTab === 'received'
          ? await getReceivedEmails(apiKey)
          : await getSentEmails(apiKey);
        setEmails(fetchedEmails);
      } catch (error) {
        console.error('Failed to fetch emails:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, [apiKey, activeTab]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse-delay-100" />
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse-delay-200" />
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse-delay-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex space-x-4 mb-4">
        <Button
          variant={activeTab === 'received' ? 'default' : 'outline'}
          onClick={() => setActiveTab('received')}
          className="flex items-center space-x-2"
        >
          <Inbox className="w-4 h-4" />
          <span>Received</span>
        </Button>
        <Button
          variant={activeTab === 'sent' ? 'default' : 'outline'}
          onClick={() => setActiveTab('sent')}
          className="flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Sent</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {emails.map((email) => (
          <Card key={email.id} className="hover:bg-brand-light-bg dark:hover:bg-brand-dark-bg transition-colors">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-brand-dark-bg dark:text-brand-light-bg">
                    {activeTab === 'received' ? email.sender_email : email.recipient_email}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{email.subject}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(email.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
                {email.content}
              </p>
            </CardContent>
          </Card>
        ))}
        {emails.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No {activeTab} emails found
          </div>
        )}
      </div>
    </div>
  );
} 