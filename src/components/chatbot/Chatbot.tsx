
'use client';

import { chatbot } from '@/ai/flows/chatbot';
import type { ChatMessage } from '@/ai/flows/chatbot-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Bot, Loader, Send, User, X } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // On initial load, set a welcome message from the model.
    if (history.length === 0) {
      setHistory([
        {
          role: 'model',
          content: "Hello! I'm the Dakhla Land Assistant. How can I help you find the perfect property today?",
        },
      ]);
    }
  }, []); // Runs only once on mount

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || isPending) return;

    const newMessage: ChatMessage = { role: 'user', content: message };
    const newHistory = [...history, newMessage];
    setHistory(newHistory);
    setMessage('');

    startTransition(async () => {
      // Pass the conversation history, excluding the initial welcome message from the client.
      const response = await chatbot({ history: newHistory.slice(1), message });
      const modelMessage: ChatMessage = { role: 'model', content: response };
      setHistory(prev => [...prev, modelMessage]);
    });
  };

  useEffect(() => {
    // Scroll to the bottom when history changes
    if (scrollAreaRef.current) {
        // A slight delay to allow the new message to render
        setTimeout(() => {
             const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
             if(viewport) {
                viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
             }
        }, 100);
    }
  }, [history]);

  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50 transition-all duration-300", isOpen ? "opacity-0 scale-90" : "opacity-100 scale-100")}>
        <Button size="icon" className="rounded-full w-14 h-14 shadow-lg" onClick={() => setIsOpen(true)}>
          <Bot className="h-7 w-7" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      </div>

      <Card className={cn(
        "fixed bottom-4 right-4 z-50 w-[calc(100vw-32px)] max-w-lg transition-all duration-300 transform-origin-bottom-right",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      )}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Bot />
              Dakhla Land Assistant
            </CardTitle>
            <CardDescription>Ask me anything about properties or Dakhla!</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close Chatbot</span>
          </Button>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-80 pr-4" ref={scrollAreaRef}>
                <div className="flex flex-col gap-4">
                    {history.map((msg, index) => (
                    <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {msg.role === 'model' && <Bot className="h-5 w-5 text-primary flex-shrink-0" />}
                        <div className={cn("rounded-lg px-3 py-2 text-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                            <p>{msg.content}</p>
                        </div>
                         {msg.role === 'user' && <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
                    </div>
                    ))}
                    {isPending && (
                        <div className="flex items-center gap-3">
                            <Bot className="h-5 w-5 text-primary flex-shrink-0" />
                            <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                                <Loader className="h-4 w-4 animate-spin" />
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isPending}
            />
            <Button type="submit" size="icon" disabled={isPending || !message.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
