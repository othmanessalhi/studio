import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';

const notFoundImage = PlaceHolderImages.find(p => p.id === 'not-found');

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="container relative mx-auto flex flex-col items-center justify-center gap-8 px-4 md:px-6">
        <div className="max-w-md space-y-4">
          <h1 className="font-headline text-8xl font-bold tracking-tighter text-primary">404</h1>
          <p className="text-3xl font-medium tracking-tight">Lost in the Desert?</p>
          <p className="text-muted-foreground">
            The page you are looking for seems to have drifted away like a sand dune. Let's get you back on track.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Home
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
