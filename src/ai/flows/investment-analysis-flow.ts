
'use server';
/**
 * @fileOverview An AI flow for analyzing the investment potential of a property.
 *
 * - investmentAnalysis - A function that handles the investment-analysis process.
 * - InvestmentAnalysisInput - The input type for the investmentAnalysis function.
 * - InvestmentAnalysisOutput - The return type for the investmentAnalysis function.
 */

import { ai } from '@/ai/genkit';
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


export async function investmentAnalysis(input: InvestmentAnalysisInput): Promise<ReadableStream<string>> {
    const flowStream = await investmentAnalysisFlow(input);

    return flowStream.pipeThrough(
        new TransformStream<InvestmentAnalysisOutput, string>({
            transform(chunk, controller) {
                if (chunk.analysis) {
                  controller.enqueue(chunk.analysis);
                }
            },
        })
    );
}

const prompt = ai.definePrompt({
    name: 'investmentAnalysisPrompt',
    input: { schema: InvestmentAnalysisInputSchema },
    output: { schema: InvestmentAnalysisOutputSchema },
    prompt: `
        You are a seasoned real estate investment analyst specializing in the Dakhla region of Morocco.
        Your task is to provide a concise, expert analysis of the investment potential of the following property.
        The Moroccan government is heavily investing in Dakhla's infrastructure, including the Dakhla Atlantic Port, renewable energy projects (wind and solar), and tourism. The region is a world-renowned kitesurfing destination.

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

        Your analysis should be structured with the following sections:

        ### 💡 Potential
        (Highlight 2-3 key strengths and opportunities. Be specific about how the property's features align with Dakhla's growth sectors like tourism, logistics, or energy.)

        ### ⚠️ Risks
        (Identify 1-2 potential risks or considerations for the investor. This could relate to market fluctuations, project timelines, or property-specific challenges.)

        ### 📈 Final Recommendation
        (Provide a concluding recommendation. State whether it is a "Strong Buy," "Promising Investment," or "Requires Due Diligence," and give a one-sentence justification.)
    `,
});

const investmentAnalysisFlow = ai.defineFlow(
  {
    name: 'investmentAnalysisFlow',
    inputSchema: InvestmentAnalysisInputSchema,
    outputSchema: InvestmentAnalysisOutputSchema,
    stream: true,
  },
  async (input) => {
    const { stream } = await prompt(input, { stream: true });
    return stream;
  }
);
