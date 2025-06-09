import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Send, X, Paperclip, Smile, Image } from 'lucide-react';

interface EmailComposerProps {
  onClose: () => void;
}

export function EmailComposer({ onClose }: EmailComposerProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to send emails.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.sendEmail({
        recipient_email: recipient,
        subject,
        content,
      });
      toast({
        title: 'Success',
        description: 'Email sent successfully!',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send email',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-700">
        <h2 className="text-xl font-semibold">New Message</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="border-b border-gray-700 pb-2">
              <Input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="To"
                className="border-0 bg-transparent focus:ring-0 px-0 py-2 text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="border-b border-gray-700 pb-2">
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="border-0 bg-transparent focus:ring-0 px-0 py-2 text-white placeholder-gray-400"
                required
              />
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-[200px] bg-transparent border-0 focus:ring-0 resize-none text-white placeholder-gray-400"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-700 flex justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" type="button">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" type="button">
            <Smile className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Discard
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}