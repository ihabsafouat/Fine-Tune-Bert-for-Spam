import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import type { Email } from '../types';

interface EmailViewProps {
  email: Email;
  onClose: () => void;
}

export function EmailView({ email, onClose }: EmailViewProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkAsSpam = async () => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to mark the email as spam
      toast({
        title: 'Success',
        description: 'Email marked as spam successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark email as spam. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{email.subject}</CardTitle>
            <CardDescription>
              From: {email.sender_email} | To: {email.recipient_email}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            {new Date(email.created_at).toLocaleString()}
          </div>
          <div className="prose max-w-none">
            {email.content}
          </div>
          {!email.is_spam && (
            <Button
              variant="destructive"
              onClick={handleMarkAsSpam}
              disabled={isLoading}
            >
              {isLoading ? 'Marking as spam...' : 'Mark as Spam'}
            </Button>
          )}
          {email.is_spam && (
            <div className="text-sm text-red-600">
              Spam confidence: {Math.round(email.spam_confidence * 100)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 