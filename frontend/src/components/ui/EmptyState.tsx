import React from 'react';
import { Mail, Search, Shield, Send, Inbox, Filter, Bell, Star, Activity, Users, Settings, FileText } from 'lucide-react';
import { Button } from './button';

export type EmptyStateVariant = 
  | 'no-emails' 
  | 'no-search-results' 
  | 'no-spam' 
  | 'no-sent' 
  | 'no-received'
  | 'filtered-empty'
  | 'no-notifications'
  | 'no-activity'
  | 'no-favorites'
  | 'no-users'
  | 'no-settings'
  | 'no-documents';

interface EmptyStateProps {
  variant: EmptyStateVariant;
  onAction?: () => void;
  actionLabel?: string;
  customMessage?: string;
  customTitle?: string;
}

const emptyStateConfig = {
  'no-emails': {
    icon: Mail,
    title: 'No emails yet',
    message: 'Your inbox is empty. Start by sending your first email!',
    actionLabel: 'Send Email',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  'no-search-results': {
    icon: Search,
    title: 'No matching emails',
    message: 'Try adjusting your search terms or filters to find what you\'re looking for.',
    actionLabel: 'Clear Search',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  'no-spam': {
    icon: Shield,
    title: 'No spam detected',
    message: 'Great news! Your inbox is clean with no spam emails.',
    actionLabel: 'View All Emails',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  'no-sent': {
    icon: Send,
    title: 'No sent emails',
    message: 'You haven\'t sent any emails yet. Start communicating!',
    actionLabel: 'Compose Email',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  'no-received': {
    icon: Inbox,
    title: 'No received emails',
    message: 'No emails have been received yet. Check back later!',
    actionLabel: 'Refresh',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  'filtered-empty': {
    icon: Filter,
    title: 'No emails match filters',
    message: 'Try adjusting your filters or search terms to see more emails.',
    actionLabel: 'Clear Filters',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  'no-notifications': {
    icon: Bell,
    title: 'No notifications',
    message: 'You\'re all caught up! No new notifications at the moment.',
    actionLabel: 'Check Later',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  'no-activity': {
    icon: Activity,
    title: 'No recent activity',
    message: 'No recent activity to display. Start using the app to see your activity here.',
    actionLabel: 'Get Started',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  'no-favorites': {
    icon: Star,
    title: 'No favorites yet',
    message: 'You haven\'t marked any emails as favorites yet. Star important emails to see them here.',
    actionLabel: 'Browse Emails',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  'no-users': {
    icon: Users,
    title: 'No users found',
    message: 'No users match your search criteria. Try adjusting your search terms.',
    actionLabel: 'Clear Search',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  'no-settings': {
    icon: Settings,
    title: 'No settings available',
    message: 'Settings are not available at the moment. Please try again later.',
    actionLabel: 'Refresh',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  'no-documents': {
    icon: FileText,
    title: 'No documents found',
    message: 'No documents match your search or filters. Try adjusting your criteria.',
    actionLabel: 'Clear Filters',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant,
  onAction,
  actionLabel,
  customMessage,
  customTitle,
}) => {
  const config = emptyStateConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-lg ${config.bgColor} dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}>
      <div className={`w-16 h-16 ${config.color} mb-4 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm`}>
        <IconComponent className="w-8 h-8" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {customTitle || config.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-6">
        {customMessage || config.message}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <IconComponent className="w-4 h-4" />
          <span>{actionLabel || config.actionLabel}</span>
        </Button>
      )}
    </div>
  );
}; 