import { z } from 'zod';

// Define the structure for a single chat message
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatbotInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.string().describe("The chatbot's response.");
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
