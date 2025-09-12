
import Link from 'next/link';
import { LandPlot } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';


export function Logo() {
  const { t } = useTranslation();
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Dakhla Land Elite Home">
      <LandPlot className="h-8 w-8 text-primary" />
      <span className="font-headline text-xl font-bold tracking-tight text-primary">
        {t('logo')}
      </span>
    </Link>
  );
}
