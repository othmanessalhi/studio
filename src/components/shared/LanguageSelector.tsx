
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';


interface LanguageSelectorProps {
  onSelectLanguage: (language: 'en' | 'ar') => void;
}

// Simplified Logo to avoid useTranslation hook dependency cycle
const SimpleLogo = () => (
    <div className="flex items-center gap-2" aria-label="Immobilier Afella Jaouad Home">
      <div className="relative h-12 w-12">
        <Image
          src="https://drive.google.com/uc?export=view&id=12v6jDXMMFVcz94SvxFgj_5-E8EuzqfgP"
          alt="Immobilier Afella Jaouad Logo"
          fill
          className="object-contain"
        />
      </div>
      <span className="font-headline text-xl font-bold tracking-tight text-primary">
        Immobilier Afella Jaouad
      </span>
    </div>
);


export function LanguageSelector({ onSelectLanguage }: LanguageSelectorProps) {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
             <SimpleLogo />
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Please select your preferred language. / يرجى اختيار لغتكم المفضلة
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => onSelectLanguage('en')} size="lg">
            English
          </Button>
          <Button onClick={() => onSelectLanguage('ar')} size="lg">
            العربية (Arabic)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
