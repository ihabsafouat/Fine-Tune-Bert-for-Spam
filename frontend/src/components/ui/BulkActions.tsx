import React from 'react';
import { Trash2, Shield, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { Button } from './button';

interface BulkActionsProps {
  selectedEmails: string[];
  totalEmails: number;
  onSelectAll: (selected: boolean) => void;
  onDelete: () => void;
  onMarkAsSpam: () => void;
  onMarkAsLegitimate: () => void;
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedEmails,
  totalEmails,
  onSelectAll,
  onDelete,
  onMarkAsSpam,
  onMarkAsLegitimate,
  onClearSelection,
}) => {
  const isAllSelected = selectedEmails.length === totalEmails && totalEmails > 0;
  const isIndeterminate = selectedEmails.length > 0 && selectedEmails.length < totalEmails;

  if (selectedEmails.length === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Select All Checkbox */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelectAll(!isAllSelected)}
              className="flex items-center justify-center w-4 h-4 border border-gray-300 dark:border-gray-600 rounded"
            >
              {isAllSelected ? (
                <CheckSquare className="w-4 h-4 text-blue-600" />
              ) : isIndeterminate ? (
                <div className="w-2 h-2 bg-blue-600 rounded-sm" />
              ) : (
                <Square className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedEmails.length} of {totalEmails} selected
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bulk Action Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAsLegitimate}
            className="flex items-center space-x-1"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Mark Legitimate</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAsSpam}
            className="flex items-center space-x-1"
          >
            <Shield className="w-4 h-4" />
            <span>Mark Spam</span>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}; 