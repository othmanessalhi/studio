'use client';

import { useActionState, useFormStatus } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { runInvestmentAnalysis } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader, Sparkles, AlertCircle, TrendingUp, Shield, BarChart2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface InvestmentAnalysisToolProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Analysis
        </>
      )}
    </Button>
  );
}

export function InvestmentAnalysisTool({ open, onOpenChange }: InvestmentAnalysisToolProps) {
  const [state, formAction] = useActionState(runInvestmentAnalysis, {data: undefined, error: undefined});
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please check the form for errors.',
      });
    }
  }, [state, toast]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      formRef.current?.reset();
      state.data = undefined;
      state.error = undefined;
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">AI Investment Potential Analysis</DialogTitle>
          <DialogDescription>
            Leverage AI to get predictive insights into your Dakhla land investment. Fill in the details below to generate a report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <form ref={formRef} action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="landSize">Land Size (in square meters)</Label>
                    <Input id="landSize" name="landSize" type="number" placeholder="e.g., 5000" required />
                </div>
                <div>
                    <Label htmlFor="landLocation">Land Location</Label>
                    <Input id="landLocation" name="landLocation" placeholder="e.g., Coastal, near lagoon" required />
                </div>
                <div>
                    <Label htmlFor="investmentAmount">Investment Amount (USD)</Label>
                    <Input id="investmentAmount" name="investmentAmount" type="number" placeholder="e.g., 250000" required />
                </div>
                <div>
                    <Label htmlFor="economicTrends">Current Economic Trends</Label>
                    <Textarea id="economicTrends" name="economicTrends" placeholder="e.g., Increased tourism, new port development..." required />
                </div>
                <DialogFooter>
                    <SubmitButton />
                </DialogFooter>
            </form>
            <div className='rounded-lg border bg-background p-4'>
                <ScrollArea className='h-[450px]'>
                <div className='p-2 space-y-6'>
                    {state.data ? (
                        <>
                           <h3 className="font-headline text-xl font-semibold">Analysis Results</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold"><TrendingUp className='text-primary'/> Predicted ROI</h4>
                                    <p className="text-sm text-muted-foreground">{state.data.roiPrediction}</p>
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold"><Shield className='text-primary'/> Risk Assessment</h4>
                                    <p className="text-sm text-muted-foreground">{state.data.riskAssessment}</p>
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold"><BarChart2 className='text-primary'/> Market Analysis</h4>
                                    <p className="text-sm text-muted-foreground">{state.data.marketAnalysis}</p>
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold"><Sparkles className='text-primary'/> Recommendation</h4>
                                    <p className="text-sm font-bold">{state.data.recommendation}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <Sparkles className="h-16 w-16 mb-4"/>
                            <h3 className="font-semibold">Your AI-powered report will appear here.</h3>
                            <p className="text-sm">Please fill out the form to generate your analysis.</p>
                        </div>
                    )}
                    {state.error && !state.data && (
                        <div className="flex flex-col items-center justify-center h-full text-center text-destructive">
                            <AlertCircle className="h-16 w-16 mb-4"/>
                            <h3 className="font-semibold">Analysis Failed</h3>
                            <p className="text-sm">Please check your inputs and try again.</p>
                        </div>
                    )}
                </div>
                </ScrollArea>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
