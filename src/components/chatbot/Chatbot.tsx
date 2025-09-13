
'use client';

import { useTranslation } from '@/hooks/use-translation';
import { Bot, X, MessageSquare, ChevronRight, ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CHATBOT_QA_EN, CHATBOT_QA_AR } from '@/lib/constants';

interface ChatHistoryItem {
  type: 'question' | 'answer';
  content: string;
}

export function Chatbot() {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const QA_DATA = language === 'ar' ? CHATBOT_QA_AR : CHATBOT_QA_EN;

  // Add initial welcome message when chat opens
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory([
        {
          type: 'answer',
          content: language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟ اختر أحد الأسئلة أدناه.' : 'Hello! How can I help you today? Please select a question below.',
        },
      ]);
    }
  }, [isOpen, history.length, language]);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);
  
  const handleQuestionClick = (question: string, answer: string) => {
    const newHistory: ChatHistoryItem[] = [
      ...history,
      { type: 'question', content: question },
      { type: 'answer', content: answer },
    ];
    setHistory(newHistory);
  };
  
  const resetChat = () => {
     setHistory([
        {
          type: 'answer',
          content: language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟ اختر أحد الأسئلة أدناه.' : 'Hello! How can I help you today? Please select a question below.',
        },
      ]);
  }

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
            {history.map((item, index) => (
              <div key={index} className={cn('flex items-start gap-3', item.type === 'question' ? 'justify-end' : 'justify-start')}>
                {item.type === 'answer' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className={cn('max-w-[80%] rounded-xl px-4 py-2', item.type === 'question' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                   <p className="text-sm">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Questions Footer */}
          <footer className="p-4 border-t space-y-2 bg-card">
              <p className="text-sm font-medium text-center text-muted-foreground mb-2">
                {language === 'ar' ? 'اختر سؤالاً:' : 'Select a question:'}
              </p>
              <div className="space-y-2">
                 {QA_DATA.map(({question, answer}) => (
                    <Button 
                        key={question} 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => handleQuestionClick(question, answer)}
                    >
                        {question}
                        {language === 'ar' ? <ArrowLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                 ))}
              </div>
              <Button variant="link" onClick={resetChat} className="w-full text-muted-foreground">
                {language === 'ar' ? 'البدء من جديد' : 'Start Over'}
              </Button>
          </footer>
        </div>
      )}
    </>
  );
}
