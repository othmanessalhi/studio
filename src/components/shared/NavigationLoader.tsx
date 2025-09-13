
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { LoadingContext } from '@/context/LoadingContext';
import { LoadingScreen } from './LoadingScreen';

export function NavigationLoader() {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useContext(LoadingContext)!;

  useEffect(() => {
    // On route change, we assume loading is finished.
    // The start is handled in the Link component or other navigation triggers.
    // For simplicity with Next.js 13+ App Router, we'll listen to pathname changes.
    // A more robust solution might involve listening to router events if available client-side.
    setIsLoading(false);
  }, [pathname, setIsLoading]);

  // A simple way to trigger loading on link clicks (for demonstration)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      // Ignore clicks on blob links (file downloads), links that open in a new tab, or links with data-no-loader
      if (anchor && (anchor.href.startsWith('blob:') || anchor.target === '_blank' || anchor.hasAttribute('data-no-loader'))) {
        return;
      }

      if (anchor && anchor.href) {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(anchor.href);
        if (currentUrl.origin === targetUrl.origin && currentUrl.pathname !== targetUrl.pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [setIsLoading]);

  return <LoadingScreen isLoading={isLoading} />;
}
