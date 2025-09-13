
'use server';
/**
 * @fileOverview A chatbot flow for answering questions about the real estate business.
 */

import { ai } from '@/ai/genkit';
import { MOCK_PROPERTIES_EN } from '@/lib/constants';
import type { ChatbotInput, ChatbotOutput, ChatMessage } from './chatbot-types';
import { ChatbotInputSchema } from './chatbot-types';


// Serialize property data to include in the prompt
const propertyDetails = MOCK_PROPERTIES_EN.map(p => 
  `- ${p.title}: Located in ${p.location}, size of ${p.size} sqm, priced at $${p.price}. Description: ${p.description}`
).join('\n');

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  // Prepend the custom instructions to the user's message history
  const historyWithSystemPrompt = [
    {
      role: 'user', // System-level instructions are often passed in the 'user' role
      content: `You are a helpful and friendly AI assistant for "Immobilier Afella Jaouad," a premier real estate agency specializing in land sales in Dakhla, Morocco. Your goal is to answer user questions about the business, available properties, and the Dakhla region.

- Your Name: You can refer to yourself as the Dakhla Land Assistant.
- Be Conversational: Maintain a friendly, professional, and helpful tone.
- Use Available Information: Base your answers on the information provided below. Do not invent property details, prices, or locations.
- Guide Users: If you cannot answer a question, politely guide the user to the contact page to speak with Jaouad Afella directly for more detailed inquiries.
- Keep it Concise: Provide clear and concise answers.

Here is the information about the business and available properties:
Business Name: Immobilier Afella Jaouad
Owner: Jaouad Afella, a trusted expert with over 6 years of experience in Moroccan real estate.
Specialty: Premium land plots in Dakhla, Morocco, a region with high growth potential in tourism, logistics, and renewable energy.
Available Properties:
${propertyDetails}

Now, please respond to the user's message.`,
    },
    ...input.history,
    { role: 'user', content: input.message },
  ] as ChatMessage[];
  
  const { text } = await ai.generate({
    history: historyWithSystemPrompt,
  });

  return text;
}
