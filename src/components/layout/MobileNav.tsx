import { Menu } from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from '../shared/Logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline text-lg font-medium transition-colors hover:text-primary data-[active=true]:text-primary"
              data-active={pathname === link.href}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-4">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
