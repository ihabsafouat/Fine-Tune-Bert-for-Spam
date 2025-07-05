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
import { Input } from './ui/input';
import { Search, CheckSquare, Square } from 'lucide-react';
import { FilterChips, FilterOption } from './ui/FilterChips';
import { BulkActions } from './ui/BulkActions';
import { EmptyState } from './ui/EmptyState';
import { EmailComposer } from './EmailComposer';

export function EmailList() {
  const { token } = useAuth();
  const { toast } = useToast();
  const { emails, isLoading, error } = useEmails();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showComposer, setShowComposer] = useState(false);

  // Apply search and filters
  const filteredEmails = emails.filter((email) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = (
        email.sender_email.toLowerCase().includes(query) ||
        email.recipient_email.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.content.toLowerCase().includes(query)
      );
      if (!matchesSearch) return false;
    }

    // Spam status filter
    const spamFilter = activeFilters.find(f => f.type === 'spam');
    if (spamFilter) {
      if (spamFilter.value === 'spam' && !email.is_spam) return false;
      if (spamFilter.value === 'legitimate' && email.is_spam) return false;
    }

    // Date filter
    const dateFilter = activeFilters.find(f => f.type === 'date');
    if (dateFilter) {
      const emailDate = new Date(email.created_at);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      if (dateFilter.value === 'today' && emailDate < today) return false;
      if (dateFilter.value === 'week' && emailDate < weekAgo) return false;
      if (dateFilter.value === 'month' && emailDate < monthAgo) return false;
    }

    return true;
  });

  const handleAddFilter = (filter: FilterOption) => {
    setActiveFilters(prev => [...prev.filter(f => f.type !== filter.type), filter]);
  };

  const handleRemoveFilter = (filter: FilterOption) => {
    setActiveFilters(prev => prev.filter(f => !(f.type === filter.type && f.value === filter.value)));
  };

  const handleClearAll = () => {
    setActiveFilters([]);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilters([]);
  };

  // Bulk actions handlers
  const handleEmailSelect = (emailId: string, selected: boolean) => {
    if (selected) {
      setSelectedEmails(prev => [...prev, emailId]);
    } else {
      setSelectedEmails(prev => prev.filter(id => id !== emailId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedEmails(filteredEmails.map(email => email.id.toString()));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedEmails([]);
  };

  const handleBulkDelete = async () => {
    try {
      // Here you would call your API to delete the selected emails
      // For now, we'll just show a toast
      toast({
        title: 'Emails deleted',
        description: `Successfully deleted ${selectedEmails.length} emails`,
        variant: 'success',
      });
      setSelectedEmails([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete emails',
        variant: 'error',
      });
    }
  };

  const handleBulkMarkAsSpam = async () => {
    try {
      // Here you would call your API to mark emails as spam
      toast({
        title: 'Emails marked as spam',
        description: `Marked ${selectedEmails.length} emails as spam`,
        variant: 'success',
      });
      setSelectedEmails([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark emails as spam',
        variant: 'error',
      });
    }
  };

  const handleBulkMarkAsLegitimate = async () => {
    try {
      // Here you would call your API to mark emails as legitimate
      toast({
        title: 'Emails marked as legitimate',
        description: `Marked ${selectedEmails.length} emails as legitimate`,
        variant: 'success',
      });
      setSelectedEmails([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark emails as legitimate',
        variant: 'error',
      });
    }
  };

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

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search emails by sender, subject, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Chips */}
      <FilterChips
        activeFilters={activeFilters}
        onAddFilter={handleAddFilter}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedEmails={selectedEmails}
        totalEmails={filteredEmails.length}
        onSelectAll={handleSelectAll}
        onDelete={handleBulkDelete}
        onMarkAsSpam={handleBulkMarkAsSpam}
        onMarkAsLegitimate={handleBulkMarkAsLegitimate}
        onClearSelection={handleClearSelection}
      />

      {selectedEmail && (
        <EmailView
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}

      {/* Results count */}
      {(searchQuery || activeFilters.length > 0) && (
        <div className="text-sm text-gray-500">
          {filteredEmails.length} of {emails.length} emails found
        </div>
      )}

      {filteredEmails.length === 0 ? (
        <EmptyState
          variant={
            searchQuery || activeFilters.length > 0
              ? 'filtered-empty'
              : emails.length === 0
              ? 'no-emails'
              : 'no-search-results'
          }
          onAction={
            emails.length === 0
              ? () => setShowComposer(true)
              : handleClearFilters
          }
          customMessage={
            searchQuery || activeFilters.length > 0
              ? `No emails match your search "${searchQuery}" and current filters.`
              : undefined
          }
        />
      ) : (
        <div className="grid gap-4">
          {filteredEmails.map((email) => {
            const isSelected = selectedEmails.includes(email.id.toString());
            return (
              <Card
                key={`${email.id}-${email.sender_email}-${email.recipient_email}`}
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={(e) => {
                  // Don't open email view if clicking on checkbox
                  if ((e.target as HTMLElement).closest('.checkbox-container')) {
                    return;
                  }
                  setSelectedEmail(email);
                }}
              >
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    {/* Checkbox */}
                    <div className="checkbox-container flex-shrink-0 mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmailSelect(email.id.toString(), !isSelected);
                        }}
                        className="flex items-center justify-center w-4 h-4 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Email Content */}
                    <div className="flex-1">
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
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}
      {showComposer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-lg w-full">
            <EmailComposer onClose={() => setShowComposer(false)} />
          </div>
        </div>
      )}
    </div>
  );
} 