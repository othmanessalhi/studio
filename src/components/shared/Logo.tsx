
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';

export function Logo() {
  const { t } = useTranslation();
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Immobilier Afella Jaouad Home">
      <Image
        src="https://drive.google.com/uc?export=view&id=1HQR995i5-GpydMkoaMZXvQytr8Y2ZIe3"
        alt="Immobilier Afella Jaouad Logo"
        width={40}
        height={40}
        className="h-10 w-10"
      />
      <span className="font-headline text-xl font-bold tracking-tight text-primary">
        {t('logo')}
      </span>
    </Link>
  );
}
