
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LandPlot } from 'lucide-react';

interface LanguageSelectorProps {
  onSelectLanguage: (language: 'en' | 'ar') => void;
}

export function LanguageSelector({ onSelectLanguage }: LanguageSelectorProps) {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
             <LandPlot className="h-8 w-8 text-primary" />
             <span className="font-headline text-xl font-bold tracking-tight text-primary">
                Dakhla Land Elite
             </span>
          </DialogTitle>
          <DialogDescription>
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
