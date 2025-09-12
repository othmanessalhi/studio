import Link from 'next/link';
import { LandPlot } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Dakhla Land Elite Home">
      <LandPlot className="h-8 w-8 text-primary" />
      <span className="font-headline text-xl font-bold tracking-tight text-primary">
        Dakhla Land Elite
      </span>
    </Link>
  );
}
