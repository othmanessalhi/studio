
'use client';

import { chatbot } from '@/ai/flows/chatbot';
import type { ChatMessage } from '@/ai/schemas/chatbot';
import { useTranslation } from '@/hooks/use-translation';
import { Bot, Send, X, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export function Chatbot() {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message when chat opens and history is empty
  useEffect(() => {
    if (isOpen && history.length === 0 && !isPending) {
        startTransition(async () => {
            const response = await chatbot({ history: [], language });
            const welcomeMessage: ChatMessage = { role: 'model', content: response };
            setHistory([welcomeMessage]);
        });
    }
  }, [isOpen]);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isPending) return;

    const userMessage: ChatMessage = { role: 'user', content: trimmedMessage };
    const newHistory = [...history, userMessage];
    
    setHistory(newHistory);
    setMessage('');

    startTransition(async () => {
      // The server expects the full history, including the new message.
      const response = await chatbot({
        history: newHistory,
        language,
      });

      const modelMessage: ChatMessage = { role: 'model', content: response };
      setHistory((prev) => [...prev, modelMessage]);
    });
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Chat Bubble Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[70vh] max-h-[600px] flex flex-col rounded-xl bg-card shadow-2xl border animate-in fade-in-0 zoom-in-95 duration-300">
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="font-headline text-lg font-semibold">{t('logo')}</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </header>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {history.map((chat, index) => (
              <div key={index} className={cn('flex items-start gap-3', chat.role === 'user' ? 'justify-end' : 'justify-start')}>
                {chat.role === 'model' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className={cn('max-w-[80%] rounded-xl px-4 py-2', chat.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    <ReactMarkdown className="prose prose-sm dark:prose-invert break-words"
                        components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        }}
                    >
                        {chat.content}
                    </ReactMarkdown>
                </div>
              </div>
            ))}
             {(isPending && history.length === 0) && (
                <div className="flex items-start gap-3 justify-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-muted rounded-xl px-4 py-3 flex items-center">
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    </div>
                </div>
            )}
            {isPending && history.length > 0 && history[history.length -1].role === 'user' && (
                <div className="flex items-start gap-3 justify-start">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-muted rounded-xl px-4 py-3 flex items-center">
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    </div>
                </div>
            )}
          </div>

          {/* Message Input Form */}
          <footer className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleTextareaKeyDown}
                placeholder={language === 'ar' ? "اكتب رسالتك هنا..." : "Type your message here..."}
                className="min-h-0 resize-none"
                rows={1}
                disabled={isPending}
                aria-label="Chat message input"
              />
              <Button type="submit" size="icon" disabled={isPending || !message.trim()} aria-label="Send message">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
}
