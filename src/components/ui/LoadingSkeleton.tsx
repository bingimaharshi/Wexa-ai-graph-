import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = "h-4 w-full", 
  count = 1 
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`skeleton rounded-xl ${className}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </>
  );
};

export const HotelCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <LoadingSkeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <LoadingSkeleton className="h-6 w-20" />
          <LoadingSkeleton className="h-6 w-16" />
        </div>
        <div className="flex justify-between items-center">
          <LoadingSkeleton className="h-8 w-24" />
          <LoadingSkeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
};

export const SearchResultsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <HotelCardSkeleton key={index} />
      ))}
    </div>
  );
};