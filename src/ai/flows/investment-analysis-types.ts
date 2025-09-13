/**
 * @fileOverview Type definitions for the investment analysis AI flow.
 * 
 * - InvestmentAnalysisInput - The input type for the investmentAnalysis function.
 * - InvestmentAnalysisOutput - The return type for the investmentAnalysis function.
 * - InvestmentAnalysisInputSchema - The Zod schema for the input.
 * - InvestmentAnalysisOutputSchema - The Zod schema for the output.
 */

import { z } from 'genkit';

export const InvestmentAnalysisInputSchema = z.object({
  title: z.string().describe('The title of the property.'),
  price: z.number().describe('The price of the property in USD.'),
  size: z.number().describe('The size of the property in square meters.'),
  location: z.string().describe('The location type of the property (e.g., Coastal, Inland, Urban).'),
  description: z.string().describe('A brief description of the property.'),
  features: z.array(z.string()).describe('A list of key features of the property.'),
});
export type InvestmentAnalysisInput = z.infer<typeof InvestmentAnalysisInputSchema>;

export const InvestmentAnalysisOutputSchema = z.object({
  analysis: z.string().describe('A concise investment analysis of the property, formatted as Markdown. Include sections for Potential, Risks, and a Final Recommendation.'),
});
export type InvestmentAnalysisOutput = z.infer<typeof InvestmentAnalysisOutputSchema>;
