'use server';

/**
 * @fileOverview Provides an AI-powered tool to analyze economic trends and provide ROI predictions for land in Dakhla.
 *
 * - analyzeInvestmentPotential - A function that analyzes the investment potential of land in Dakhla.
 * - AnalyzeInvestmentPotentialInput - The input type for the analyzeInvestmentPotential function.
 * - AnalyzeInvestmentPotentialOutput - The return type for the analyzeInvestmentPotential function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeInvestmentPotentialInputSchema = z.object({
  landSize: z.number().describe('The size of the land in square meters.'),
  landLocation: z.string().describe('The specific location of the land in Dakhla.'),
  economicTrends: z.string().describe('Description of current economic trends affecting Dakhla.'),
  investmentAmount: z.number().describe('The amount of money the user is looking to invest.'),
});
export type AnalyzeInvestmentPotentialInput = z.infer<typeof AnalyzeInvestmentPotentialInputSchema>;

const AnalyzeInvestmentPotentialOutputSchema = z.object({
  roiPrediction: z.string().describe('The predicted ROI for the land investment.'),
  riskAssessment: z.string().describe('An assessment of the risks associated with the investment.'),
  marketAnalysis: z.string().describe('An analysis of the current real estate market in Dakhla.'),
  recommendation: z.string().describe('A recommendation on whether or not to invest in the land.'),
});
export type AnalyzeInvestmentPotentialOutput = z.infer<typeof AnalyzeInvestmentPotentialOutputSchema>;

export async function analyzeInvestmentPotential(input: AnalyzeInvestmentPotentialInput): Promise<AnalyzeInvestmentPotentialOutput> {
  return analyzeInvestmentPotentialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeInvestmentPotentialPrompt',
  input: {schema: AnalyzeInvestmentPotentialInputSchema},
  output: {schema: AnalyzeInvestmentPotentialOutputSchema},
  prompt: `You are an expert real estate investment advisor specializing in Dakhla, Morocco.

You will use this information to generate an investment report, and generate predicted ROI, risk assessment, and market analysis.

Land Size: {{{landSize}}} square meters
Land Location: {{{landLocation}}}
Current Economic Trends: {{{economicTrends}}}
Investment Amount: {{{investmentAmount}}}

Based on these factors, provide a detailed ROI prediction, risk assessment, market analysis, and a final investment recommendation.
`,
});

const analyzeInvestmentPotentialFlow = ai.defineFlow(
  {
    name: 'analyzeInvestmentPotentialFlow',
    inputSchema: AnalyzeInvestmentPotentialInputSchema,
    outputSchema: AnalyzeInvestmentPotentialOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
