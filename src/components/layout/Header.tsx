
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '../shared/Logo';
import { MobileNav } from './MobileNav';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, navLinks, language, setLanguage } = useTranslation();

  const isPropertiesPage = pathname.startsWith('/properties');
  const heroPages = ['/', '/dakhla', '/about', '/contact'];
  const isHeroPage = heroPages.includes(pathname);
  
  const useTransparentHeader = isHeroPage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // A slight delay to allow the new page to render before scrolling to top
    // This can help with certain async rendering scenarios
    const timer = setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        useTransparentHeader ? 'bg-transparent' : 'bg-background/80 shadow-md backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-headline text-sm font-medium transition-colors hover:text-primary',
                useTransparentHeader
                  ? pathname === link.href ? 'text-primary' : 'text-white [text-shadow:0_0_8px_rgba(255,255,255,0.7)]'
                  : pathname === link.href ? 'text-primary' : 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className={cn('h-5 w-5', useTransparentHeader ? 'text-white' : 'text-foreground')} />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} disabled={language === 'en'}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')} disabled={language === 'ar'}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="mx-2 h-6 w-px bg-border" />
          <Button asChild>
            <Link href="/contact">{t('contactUs')}</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
