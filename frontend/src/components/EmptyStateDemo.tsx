import React, { useState } from 'react';
import { EmptyState, EmptyStateVariant } from './ui/EmptyState';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const emptyStateVariants: { variant: EmptyStateVariant; label: string }[] = [
  { variant: 'no-emails', label: 'No Emails' },
  { variant: 'no-search-results', label: 'No Search Results' },
  { variant: 'no-spam', label: 'No Spam' },
  { variant: 'no-sent', label: 'No Sent Emails' },
  { variant: 'no-received', label: 'No Received Emails' },
  { variant: 'filtered-empty', label: 'Filtered Empty' },
  { variant: 'no-notifications', label: 'No Notifications' },
  { variant: 'no-activity', label: 'No Activity' },
  { variant: 'no-favorites', label: 'No Favorites' },
  { variant: 'no-users', label: 'No Users' },
  { variant: 'no-settings', label: 'No Settings' },
  { variant: 'no-documents', label: 'No Documents' },
];

export function EmptyStateDemo() {
  const [selectedVariant, setSelectedVariant] = useState<EmptyStateVariant>('no-emails');

  const handleDemoAction = () => {
    alert('Demo action clicked! This would perform the actual action in a real app.');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Empty State Components
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Interactive demo of all empty state variants
        </p>
      </div>

      {/* Variant Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Empty State Variant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {emptyStateVariants.map(({ variant, label }) => (
              <Button
                key={variant}
                variant={selectedVariant === variant ? 'default' : 'outline'}
                onClick={() => setSelectedVariant(variant)}
                className="text-sm"
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State Display */}
      <Card>
        <CardHeader>
          <CardTitle>Empty State Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            variant={selectedVariant}
            onAction={handleDemoAction}
            customMessage={
              selectedVariant === 'filtered-empty'
                ? 'No emails match your search "example" and current filters.'
                : undefined
            }
          />
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Basic Usage:</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`<EmptyState variant="no-emails" />`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">With Action:</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`<EmptyState 
  variant="no-search-results" 
  onAction={handleClearSearch}
  actionLabel="Clear Search"
/>`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">With Custom Message:</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`<EmptyState 
  variant="filtered-empty"
  customMessage="No emails match your specific criteria."
  onAction={handleClearFilters}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 