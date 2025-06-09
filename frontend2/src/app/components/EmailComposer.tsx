import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sendEmail } from '../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';

export function EmailComposer() {
  const { apiKey } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) return;

    setIsLoading(true);
    try {
      await sendEmail(apiKey, formData);
      toast({
        title: 'Success',
        description: 'Email sent successfully',
      });
      setFormData({ recipient: '', subject: '', content: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send email',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-4">
          <div>
            <Input
              type="email"
              name="recipient"
              placeholder="To"
              value={formData.recipient}
              onChange={handleChange}
              required
              className="bg-brand-light-bg dark:bg-brand-dark-bg"
            />
          </div>
          <div>
            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-brand-light-bg dark:bg-brand-dark-bg"
            />
          </div>
          <div className="flex-1">
            <Textarea
              name="content"
              placeholder="Write your message..."
              value={formData.content}
              onChange={handleChange}
              required
              className="h-full resize-none bg-brand-light-bg dark:bg-brand-dark-bg"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Sending...' : 'Send'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 