
import { z } from 'zod';

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
