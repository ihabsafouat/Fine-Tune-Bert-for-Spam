import React from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from './button';

export type FilterType = 'spam' | 'date' | 'sender';

export interface FilterOption {
  type: FilterType;
  value: string;
  label: string;
}

interface FilterChipsProps {
  activeFilters: FilterOption[];
  onRemoveFilter: (filter: FilterOption) => void;
  onClearAll: () => void;
  onAddFilter: (filter: FilterOption) => void;
}

const spamOptions = [
  { value: 'all', label: 'All emails' },
  { value: 'spam', label: 'Spam only' },
  { value: 'legitimate', label: 'Legitimate only' },
];

const dateOptions = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
];

export const FilterChips: React.FC<FilterChipsProps> = ({
  activeFilters,
  onRemoveFilter,
  onClearAll,
  onAddFilter,
}) => {
  const [showDropdowns, setShowDropdowns] = React.useState(false);

  const handleSpamFilter = (value: string) => {
    if (value === 'all') {
      onRemoveFilter({ type: 'spam', value: 'spam', label: 'Spam only' });
      onRemoveFilter({ type: 'spam', value: 'legitimate', label: 'Legitimate only' });
    } else {
      onAddFilter({ type: 'spam', value, label: spamOptions.find(opt => opt.value === value)?.label || value });
    }
  };

  const handleDateFilter = (value: string) => {
    if (value === 'all') {
      onRemoveFilter({ type: 'date', value: 'today', label: 'Today' });
      onRemoveFilter({ type: 'date', value: 'week', label: 'This week' });
      onRemoveFilter({ type: 'date', value: 'month', label: 'This month' });
    } else {
      onAddFilter({ type: 'date', value, label: dateOptions.find(opt => opt.value === value)?.label || value });
    }
  };

  return (
    <div className="space-y-3">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDropdowns(!showDropdowns)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Dropdowns */}
      {showDropdowns && (
        <div className="flex flex-wrap gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {/* Spam Status Filter */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Spam Status
            </label>
            <select
              onChange={(e) => handleSpamFilter(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {spamOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Date Range
            </label>
            <select
              onChange={(e) => handleDateFilter(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <div
              key={`${filter.type}-${filter.value}-${index}`}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 