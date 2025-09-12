
import Link from 'next/link';
import { Logo } from '../shared/Logo';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';


export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          &copy; {year} {t('footerRights')}
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
