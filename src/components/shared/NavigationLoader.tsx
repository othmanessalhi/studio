
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useContext, useRef } from 'react';
import { LoadingContext } from '@/context/LoadingContext';
import { LoadingScreen } from './LoadingScreen';

export function NavigationLoader() {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useContext(LoadingContext)!;
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // If the pathname changes, the new page has finished loading.
    if (previousPathname.current !== pathname) {
      setIsLoading(false);
      previousPathname.current = pathname;
    }
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
        
        // If it's an internal navigation to a different page, show loader.
        if (currentUrl.origin === targetUrl.origin && currentUrl.pathname !== targetUrl.pathname) {
            // Check if the component is about to unmount, which happens just before navigation.
            // If the current path is still the same, it means we are starting navigation.
            if (previousPathname.current === pathname) {
                setIsLoading(true);
            }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname, setIsLoading]);

  return <LoadingScreen isLoading={isLoading} />;
}
