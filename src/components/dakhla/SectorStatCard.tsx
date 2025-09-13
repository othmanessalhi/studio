
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface SectorStatCardProps {
  label: string;
  start: number;
  end: number;
  Icon: LucideIcon;
  color: string;
  bgColor: string;
  barColor: string;
  index: number;
}

const AnimatedCounter = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const animationDuration = 2000; // 2 seconds

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
        const currentCount = Math.floor(progress * to);
        setCount(currentCount);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, to]);

  return <div ref={ref} className="font-headline text-4xl font-bold">{count}M</div>;
};

export function SectorStatCard({ label, start, end, Icon, color, bgColor, barColor, index }: SectorStatCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { t } = useTranslation();

  const growthPercentage = ((end - start) / start) * 100;

  return (
    <div 
        ref={ref} 
        className={cn(
            "rounded-xl border bg-card p-6 shadow-lg transition-all duration-700 hover:-translate-y-2",
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
        style={{transitionDelay: `${index * 150}ms`}}
    >
      <div className="flex flex-col items-center text-center">
        <div className={cn("mb-4 rounded-full p-4", bgColor)}>
          <Icon className={cn("h-8 w-8", color)} />
        </div>
        <h3 className="font-headline text-xl font-semibold">{label}</h3>
        <p className="my-4 text-muted-foreground">
          ${t('chart_legend_projected')} (USD)
        </p>
        <AnimatedCounter to={end} />
        <div className="mt-4 w-full">
            <div className='flex justify-between text-sm text-muted-foreground mb-1'>
                <span>${start}M</span>
                <span>${end}M</span>
            </div>
            <div className={cn("h-2 w-full rounded-full", bgColor)}>
                <div 
                    className={cn("h-2 rounded-full", barColor)}
                    style={{width: inView ? '100%' : '0%', transition: 'width 1.5s ease-out'}}
                />
            </div>
            <p className='mt-2 text-sm font-semibold text-green-600'>+{growthPercentage.toFixed(0)}% {t('growth')}</p>
        </div>
      </div>
    </div>
  );
}
