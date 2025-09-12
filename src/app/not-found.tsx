
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const notFoundImage = PlaceHolderImages.find(p => p.id === 'not-found');

export default function NotFound() {
    const { t, language } = useTranslation();
    const arrowIcon = language === 'ar' ? <ArrowRight /> : <ArrowLeft />;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="container relative mx-auto flex flex-col items-center justify-center gap-8 px-4 md:px-6">
        <div className="max-w-md space-y-4">
          <h1 className="font-headline text-8xl font-bold tracking-tighter text-primary">404</h1>
          <p className="text-3xl font-medium tracking-tight">{t('not_found_title')}</p>
          <p className="text-muted-foreground">
            {t('not_found_p')}
          </p>
          <Button asChild>
            <Link href="/">
              {arrowIcon} {t('go_back_home')}
            </Link>
          </Button>
        </div>
        {notFoundImage && (
            <div className="relative h-64 w-full max-w-md">
                <Image
                src={notFoundImage.imageUrl}
                alt={notFoundImage.description}
                fill
                className="object-contain"
                data-ai-hint={notFoundImage.imageHint}
                />
            </div>
        )}
      </div>
    </div>
  );
}

