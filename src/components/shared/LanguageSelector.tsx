
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Logo } from './Logo';

interface LanguageSelectorProps {
  onSelectLanguage: (language: 'en' | 'ar') => void;
}

export function LanguageSelector({ onSelectLanguage }: LanguageSelectorProps) {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
             <Logo />
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
