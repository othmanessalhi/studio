
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
        The Moroccan government is heavily investing in Dakhla's infrastructure, including the Dakhla Atlantic Port, renewable energy projects (wind and solar), and tourism. The region is a world-renowned kitesurfing destination.

        Your entire response MUST be in the language specified by the language code: {{{language}}}.

        Use the following property details to form your analysis. Format your response in Markdown.

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

        Your analysis should be structured with the following sections (translate these section titles if the language is not 'en'):

        ### 💡 Potential
        (Highlight 2-3 key strengths. Be specific and use bullet points.)

        ### ⚠️ Risks
        (Identify 1-2 key risks for the investor. Be specific and use bullet points.)

        ### 📈 Final Recommendation
        (Provide a concluding recommendation. State whether it is a "Strong Buy," "Promising Investment," or "Requires Due Diligence," and give a one to two-sentence justification. Translate these recommendations as needed.)
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
