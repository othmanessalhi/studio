
'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Logo } from '../shared/Logo';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';

export function MobileNav() {
  const pathname = usePathname();
  const { t, navLinks, setLanguage, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="text-foreground" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline text-lg font-medium transition-colors hover:text-primary data-[active=true]:text-primary"
              data-active={pathname === link.href}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-4">
            <Link href="/contact" onClick={handleLinkClick}>{t('contactUs')}</Link>
          </Button>
          <div className="mt-4 flex justify-center gap-4">
            <Button variant={language === 'en' ? 'default' : 'outline'} onClick={() => handleLanguageChange('en')}>English</Button>
            <Button variant={language === 'ar' ? 'default' : 'outline'} onClick={() => handleLanguageChange('ar')}>العربية</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
