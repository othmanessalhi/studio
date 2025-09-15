
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { LoadingProvider } from '@/context/LoadingContext';
import { NavigationLoader } from '@/components/shared/NavigationLoader';
import { useEffect, Suspense } from 'react';

// This component contains the main UI and can safely use the language context.
function AppBody({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={cn('min-h-screen bg-background font-body text-foreground antialiased font-medium')}>
      <Suspense fallback={null}>
        <NavigationLoader />
      </Suspense>
      <div className="relative flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </div>
      <Toaster />
    </div>
  );
}

// The RootLayout now only contains the providers and the basic HTML structure.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth [overflow-y:scroll]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Literata:opsz,wght@7..72,400;500;600&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LoadingProvider>
          <LanguageProvider>
            <AppBody>{children}</AppBody>
          </LanguageProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
