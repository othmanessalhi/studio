
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Sparkles, BrainCircuit, Download, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { type Property } from '@/lib/constants';
import { investmentAnalysis, InvestmentAnalysisOutput } from '@/ai/flows/investment-analysis-flow';
import { useTranslation } from '@/hooks/use-translation';
import { Separator } from '../ui/separator';

interface InvestmentAnalysisProps {
  property: Property;
}

export function InvestmentAnalysis({ property }: InvestmentAnalysisProps) {
  const { t, language } = useTranslation();
  const [analysisResult, setAnalysisResult] = useState<InvestmentAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);

    try {
      const result = await investmentAnalysis({
        title: property.title,
        price: property.price,
        size: property.size,
        location: property.location,
        description: property.description,
        features: property.features,
        language: language,
      });

      if (result?.analysis) {
        setAnalysisResult(result);
      } else {
        throw new Error('Analysis not found in the result.');
      }
      
    } catch (err) {
      console.error(err);
      setError(t('toast_error_p') || 'An error occurred while generating the analysis.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!analysisResult) return;

    const content = `
Investment Analysis for: ${property.title}
==================================================

Appreciation Projection:
--------------------------
${analysisResult.appreciationProjection}

Detailed Analysis:
--------------------
${analysisResult.analysis.replace(/\*\*/g, '')}
    `;

    const blob = new Blob([content.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `investment-analysis-${property.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const analysisTitle = t('ai_investment_analysis');
  const analyzeButtonText = t('analyze_investment_potential');
  const generatingText = t('generating_analysis');

  if (isLoading) {
    return (
        <div className="text-center rounded-xl border border-dashed border-primary/30 p-8 lg:p-12 bg-card/50">
            <div className='max-w-xl mx-auto'>
                <div className="mx-auto w-fit rounded-full bg-primary/10 p-4 animate-pulse">
                    <BrainCircuit className="h-10 w-10 text-primary" />
                </div>
                <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                    {generatingText}
                </h2>
                <p className="mx-auto mt-4 text-lg text-muted-foreground">
                    {t('ai_investment_p')}
                </p>
                <div className="mt-8 flex justify-center">
                    <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        </div>
    );
  }

  if (analysisResult) {
    return (
        <Card className="bg-gradient-to-br from-card to-background/30 border-primary/20 animate-in fade-in-0 duration-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl text-primary">
                    <BrainCircuit className="h-8 w-8" />
                    {analysisTitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                            <TrendingUp className="h-6 w-6 text-green-500" />
                        </div>
                        <h3 className="font-headline text-xl font-semibold">{t('appreciation_projection')}</h3>
                    </div>
                    <p className="text-lg font-semibold text-foreground/90 ml-12">{analysisResult.appreciationProjection}</p>
                </div>

                <Separator />

                <div dir="auto" className="prose prose-stone dark:prose-invert max-w-none prose-headings:text-foreground prose-h3:font-headline prose-h3:text-foreground prose-strong:text-primary prose-headings:mb-2 prose-p:my-1 prose-ul:my-2">
                    <ReactMarkdown>{analysisResult.analysis}</ReactMarkdown>
                </div>

                <Button onClick={handleDownload} variant="outline" className="mt-6 gap-2">
                    <Download className="h-4 w-4" />
                    {t('download_analysis')}
                </Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="text-center rounded-xl border border-dashed border-primary/30 p-8 lg:p-12 bg-card/50">
      <div className='max-w-xl mx-auto'>
        <div className="mx-auto w-fit rounded-full bg-primary/10 p-4 transition-transform hover:scale-110">
            <BrainCircuit className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {analysisTitle}
        </h2>
        <p className="mx-auto mt-4 text-lg text-muted-foreground">
            {t('ai_investment_p')}
        </p>
        <Button size="lg" className="mt-8 gap-2" onClick={handleAnalysis} disabled={isLoading}>
            <Sparkles className="h-5 w-5" />
            {analyzeButtonText}
        </Button>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
