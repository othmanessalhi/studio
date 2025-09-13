
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Sparkles, BrainCircuit, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { type Property } from '@/lib/constants';
import { investmentAnalysis } from '@/ai/flows/investment-analysis-flow';
import { useTranslation } from '@/hooks/use-translation';

interface InvestmentAnalysisProps {
  property: Property;
}

export function InvestmentAnalysis({ property }: InvestmentAnalysisProps) {
  const { t, language } = useTranslation();
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const stream = await investmentAnalysis({
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
      setError(t('toast_error_p'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setAnalysis('');
    setError('');
  };

  const analysisTitle = t('ai_investment_analysis');
  const analyzeButtonText = t('analyze_investment_potential');
  const generatingText = t('generating_analysis');

  if (analysis) {
    return (
        <Card className="bg-gradient-to-br from-card to-background/30 border-primary/20 animate-in fade-in-0 duration-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <BrainCircuit className="h-6 w-6" />
                    {analysisTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div dir="auto" className="prose prose-stone dark:prose-invert max-w-none prose-h3:font-headline prose-h3:text-foreground prose-strong:text-primary">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
                <Button onClick={handleReset} variant="outline" className="mt-4 gap-2">
                    <RotateCcw />
                    {t('ask_another_question')}
                </Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="text-center rounded-xl border border-dashed border-primary/30 p-8 lg:p-12 bg-card/50">
      <div className='max-w-xl mx-auto'>
        <div className="mx-auto w-fit rounded-full bg-primary/10 p-4">
            <BrainCircuit className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {analysisTitle}
        </h2>
        <p className="mx-auto mt-4 text-lg text-muted-foreground">
            {t('ai_investment_p')}
        </p>
        <Button size="lg" className="mt-8" onClick={handleAnalysis} disabled={isLoading}>
            {isLoading ? (
            <>
                <Loader className="animate-spin" />
                {generatingText}
            </>
            ) : (
            <>
                <Sparkles />
                {analyzeButtonText}
            </>
            )}
        </Button>
        {error && <p className="mt-4 text-destructive">{error}</p>}
      </div>
    </div>
  );
}
