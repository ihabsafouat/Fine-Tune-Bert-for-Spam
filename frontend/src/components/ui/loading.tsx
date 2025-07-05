import React from 'react';
import { cn } from '../../lib/utils';

// Spinner component
export const Spinner: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  className, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('animate-spin', sizeClasses[size], className)}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// Skeleton components
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse bg-gray-200 dark:bg-gray-700 rounded', className)} />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className 
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={cn(
          'h-4',
          i === lines - 1 ? 'w-3/4' : 'w-full'
        )} 
      />
    ))}
  </div>
);

export const SkeletonEmailCard: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
    <div className="flex items-center space-x-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
    <SkeletonText lines={2} />
    <div className="flex space-x-2">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
);

export const SkeletonButton: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton className={cn('h-10 w-24', className)} />
);

export const SkeletonInput: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton className={cn('h-10 w-full', className)} />
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6', className)}>
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/2" />
      <SkeletonText lines={3} />
      <div className="flex space-x-2">
        <SkeletonButton />
        <SkeletonButton />
      </div>
    </div>
  </div>
);

// Loading overlay
export const LoadingOverlay: React.FC<{ 
  isLoading: boolean; 
  children: React.ReactNode;
  className?: string;
}> = ({ isLoading, children, className }) => {
  if (!isLoading) return <>{children}</>;
  
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <Spinner size="lg" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  );
}; 