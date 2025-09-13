
'use server';
/**
 * @fileOverview An AI flow for analyzing the investment potential of a property.
 *
 * - investmentAnalysis - A function that handles the investment-analysis process.
 */

import { ai } from '@/ai/genkit';
import {
    InvestmentAnalysisInput,
    InvestmentAnalysisInputSchema,
    InvestmentAnalysisOutput,
    InvestmentAnalysisOutputSchema,
} from './investment-analysis-types';


const prompt = ai.definePrompt({
    name: 'investmentAnalysisPrompt',
    input: { schema: InvestmentAnalysisInputSchema },
    output: { schema: InvestmentAnalysisOutputSchema },
    prompt: `
        You are a seasoned real estate investment analyst specializing in the Dakhla region of Morocco.
        Your task is to provide a concise, expert analysis of the investment potential of the following property.
        The Moroccan government is heavily investing in Dakhla's infrastructure, including the Dakhla Atlantic Port, renewable energy projects, and tourism.
        Historically, land in this region has seen appreciation of up to 500% over the last 3 years due to these developments.

        Your entire response MUST be in the language specified by the language code: {{{language}}}.

        Use the following property details to form your analysis.

        Property Details:
        - Title: {{{title}}}
        - Price: \${{{price}}}
        - Size: {{{size}}} sqm
        - Location: {{{location}}}
        - Description: {{{description}}}
        - Key Features:
        {{#each features}}
        - {{{this}}}
        {{/each}}

        Provide the following in your structured response:

        1.  **analysis**: A brief, easy-to-read analysis using Markdown. Use bold titles for each section (translate titles if language is not 'en').
            - **💡 Potential**: Highlight 2 key strengths in bullet points.
            - **⚠️ Risks**: Identify 1 key risk in a bullet point.
            - **📈 Final Recommendation**: State whether it is a "Strong Buy," "Promising Investment," or "Requires Due Diligence," with a one-sentence justification.

        2.  **appreciationProjection**: A short, estimated projection of the property's appreciation value over the next 3-5 years. Be optimistic and reflect the high historical growth to motivate potential buyers.
    `,
});

const investmentAnalysisFlow = ai.defineFlow(
  {
    name: 'investmentAnalysisFlow',
    inputSchema: InvestmentAnalysisInputSchema,
    outputSchema: InvestmentAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);


export async function investmentAnalysis(input: InvestmentAnalysisInput): Promise<InvestmentAnalysisOutput> {
    return await investmentAnalysisFlow(input);
}
