
'use server';
/**
 * @fileOverview The chatbot flow for the real estate application.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MOCK_PROPERTIES_EN, MOCK_PROPERTIES_AR } from '@/lib/constants';

// Define the schema for a single chat message
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the input schema for the chatbot flow
export const ChatbotInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string(),
  language: z.enum(['en', 'ar']).default('en'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const propertiesJSON = (lang: 'en' | 'ar') =>
  JSON.stringify(
    lang === 'ar' ? MOCK_PROPERTIES_AR : MOCK_PROPERTIES_EN,
    null,
    2
  );

const systemPrompt = (lang: 'en' | 'ar') => `You are a helpful real estate assistant for "Immobilier Afella Jaouad". Your goal is to help users find land properties in Dakhla, Morocco. You are friendly and professional.

Your responses should be in the same language as the user's message. The current language is: ${lang}.

Here is the list of available properties in JSON format:
${propertiesJSON(lang)}

IMPORTANT RULES:
1.  Only answer questions related to the provided properties, real estate in Dakhla, or Jaouad Afella.
2.  If asked about anything else, politely decline and steer the conversation back to real estate. For example: "As a real estate assistant for Immobilier Afella Jaouad, I can only provide information about properties in Dakhla. How can I help you with your land search today?"
3.  Do not make up property details. Only use the information from the JSON list.
4.  Be concise and helpful. Format your answers clearly. You can use markdown for lists and bolding.
5.  If a user seems interested in a property, suggest they contact the agency through the contact page.
`;

/**
 * The main chatbot flow.
 * @param input The user's message and conversation history.
 * @returns The AI's response.
 */
export async function chatbot(input: ChatbotInput): Promise<string> {
  // Trim the user's message to prevent empty submissions
  const trimmedMessage = input.message.trim();
  if (!trimmedMessage) {
    return input.language === 'ar'
      ? 'مرحباً! كيف يمكنني مساعدتك في العثور على أرض أحلامك في الداخلة اليوم؟'
      : 'Hello! How can I help you find your perfect plot of land in Dakhla today?';
  }

  // Construct the conversation history for the AI model
  const history: ChatMessage[] = [
    // Start with the system instructions as the first "user" message
    {
      role: 'user',
      content: systemPrompt(input.language),
    },
    // The model's first response to set the context
    {
      role: 'model',
      content:
        input.language === 'ar'
          ? 'بالتأكيد، أنا هنا للمساعدة في أي أسئلة حول العقارات في الداخلة.'
          : 'Of course, I am here to help with any questions about real estate in Dakhla.',
    },
    // Then, add the existing conversation history
    ...input.history,
    // Finally, add the user's new message
    {
      role: 'user',
      content: trimmedMessage,
    },
  ];

  // Call the AI model
  try {
    const { text } = await ai.generate({
      history,
    });
    return text;
  } catch (error) {
    console.error('Genkit error:', error);
    // Return a user-friendly error message
    return input.language === 'ar'
      ? 'عذراً، أواجه بعض الصعوبات الفنية في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً.'
      : 'My apologies, I am experiencing some technical difficulties at the moment. Please try again later.';
  }
}
