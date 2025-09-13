
'use client';

import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <Loader className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
