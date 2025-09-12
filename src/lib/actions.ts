'use server';

import {
  analyzeInvestmentPotential,
  AnalyzeInvestmentPotentialInput,
  AnalyzeInvestmentPotentialOutput,
} from '@/ai/flows/investment-potential-analysis';
import { z } from 'zod';

const formSchema = z.object({
  landSize: z.coerce.number().positive('Land size must be a positive number.'),
  landLocation: z.string().min(3, 'Location is required.'),
  economicTrends: z.string().min(10, 'Economic trends description is required.'),
  investmentAmount: z.coerce.number().positive('Investment amount must be a positive number.'),
});

type AnalysisState = {
  data?: AnalyzeInvestmentPotentialOutput;
  error?: string;
};

export async function runInvestmentAnalysis(
  prevState: AnalysisState,
  formData: FormData
): Promise<AnalysisState> {
  const validatedFields = formSchema.safeParse({
    landSize: formData.get('landSize'),
    landLocation: formData.get('landLocation'),
    economicTrends: formData.get('economicTrends'),
    investmentAmount: formData.get('investmentAmount'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const input: AnalyzeInvestmentPotentialInput = validatedFields.data;

  try {
    const output = await analyzeInvestmentPotential(input);
    return { data: output };
  } catch (e: any) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
