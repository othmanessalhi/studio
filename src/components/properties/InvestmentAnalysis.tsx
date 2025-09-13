'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { type Property } from '@/lib/constants';
import { investmentAnalysis } from '@/ai/flows/investment-analysis-flow';
import { useTranslation } from '@/hooks/use-translation';

interface InvestmentAnalysisProps {
  property: Property;
}

export function InvestmentAnalysis({ property }: InvestmentAnalysisProps) {
  const { t } = useTranslation();
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const { stream } = await investmentAnalysis({
        title: property.title,
        price: property.price,
        size: property.size,
        location: property.location,
        description: property.description,
        features: property.features,
      });

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setAnalysis((prev) => prev + chunk);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setAnalysis('');
    setError('');
  };

  if (analysis) {
    return (
        <Card className="bg-gradient-to-br from-card to-background/30 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Sparkles className="h-6 w-6" />
                    {t('ai_investment_analysis')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
                <Button onClick={handleReset} variant="outline" className="mt-4">
                    {t('ask_another_question')}
                </Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="text-center">
      <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {t('ai_investment_analysis')}
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
        Click the button below to get an AI-powered analysis of this property's investment potential.
      </p>
      <Button size="lg" className="mt-8" onClick={handleAnalysis} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Generating Analysis...
          </>
        ) : (
           <>
             <Sparkles className="mr-2 h-5 w-5" />
             Analyze Investment Potential
           </>
        )}
      </Button>
      {error && <p className="mt-4 text-destructive">{error}</p>}
    </div>
  );
}
