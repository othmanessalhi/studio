
'use client';

import { useTranslation } from '@/hooks/use-translation';
import { Bot, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CHATBOT_QA_EN, CHATBOT_QA_AR } from '@/lib/constants';
import Link from 'next/link';

interface QnA {
  question: string;
  answer: string;
  link?: {
    text: string;
    href: string;
    buttonText: string;
  }
}

interface ChatHistoryItem {
  type: 'user' | 'model';
  content: string | React.ReactNode;
}

const WelcomeMessage = ({ onQuestionSelect }: { onQuestionSelect: (qna: QnA) => void }) => {
  const { t, language } = useTranslation();
  const QA_DATA = language === 'ar' ? CHATBOT_QA_AR : CHATBOT_QA_EN;

  return (
    <div className="space-y-3 p-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <p className="text-sm">{t('chatbot_welcome')}</p>
      <div className="space-y-2">
        {QA_DATA.map((qna) => (
          <Button
            key={qna.question}
            variant="outline"
            className="w-full justify-start text-left h-auto py-2"
            onClick={() => onQuestionSelect(qna)}
          >
            {qna.question}
          </Button>
        ))}
      </div>
    </div>
  );
};


export function Chatbot() {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint only on first visit (session-based)
    const hasVisited = sessionStorage.getItem('hasVisitedChatbot');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        if (!isOpen) { // Only show if chat is not already open
            setShowHint(true);
            sessionStorage.setItem('hasVisitedChatbot', 'true');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleQuestionSelect = (qna: QnA) => {
    const newHistory: ChatHistoryItem[] = [
      { type: 'user', content: qna.question },
      { type: 'model', content: qna.answer },
    ];

    if (qna.link) {
        setTimeout(() => {
            setHistory(prevHistory => [...prevHistory, { type: 'model', content: qna.link!.text }]);
        }, 1000);
    }
    
    setHistory(newHistory);
  };

  const resetChat = () => {
    setHistory([
      {
        type: 'model',
        content: <WelcomeMessage onQuestionSelect={handleQuestionSelect} />,
      },
    ]);
  };

  const handleToggleOpen = () => {
    setShowHint(false); // Hide hint on any interaction
    setIsOpen(prev => !prev);
  }

  // Add initial welcome message when chat opens
  useEffect(() => {
    if (isOpen) {
      resetChat();
    }
  }, [isOpen, language]);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);
  
  const isConversationStarted = history.length > 1;
  const lastUserQuestion = history.find(h => h.type === 'user')?.content as string;
  const QA_DATA = language === 'ar' ? CHATBOT_QA_AR : CHATBOT_QA_EN;
  const currentQna = QA_DATA.find(q => q.question === lastUserQuestion);

  return (
    <>
      {/* Chat Bubble Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showHint && (
            <div className="absolute bottom-1/2 right-full mr-4 w-max -translate-y-1/2 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground shadow-lg animate-in fade-in-0 zoom-in-95">
                {language === 'ar' ? 'اسألني أي شيء!' : 'Ask me anything!'}
                <div className="absolute right-[-4px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-accent" />
            </div>
        )}
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg"
          onClick={handleToggleOpen}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[70vh] max-h-[600px] flex flex-col rounded-xl bg-card shadow-2xl border animate-in fade-in-0 duration-300">
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
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
                {history.map((item, index) => (
                <div key={index} className={cn('flex items-start gap-3 w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500', item.type === 'user' ? 'justify-end' : 'justify-start')}>
                    {item.type === 'model' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    )}
                    <div className={cn('max-w-[85%] rounded-xl px-4 py-3', item.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    {typeof item.content === 'string' ? <p className="text-sm">{item.content}</p> : item.content}
                    </div>
                </div>
                ))}
            </div>
          </div>

          {/* Footer */}
          {isConversationStarted && (
             <footer className="p-4 border-t space-y-2 bg-card">
                {currentQna?.link && history.length > 2 && (
                    <Button asChild className="w-full">
                        <Link href={currentQna.link.href} onClick={() => setIsOpen(false)}>{currentQna.link.buttonText}</Link>
                    </Button>
                )}
                <Button variant="outline" onClick={resetChat} className="w-full">
                    {t('ask_another_question')}
                </Button>
            </footer>
          )}
        </div>
      )}
    </>
  );
}
