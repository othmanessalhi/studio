
'use client';

import { useTranslation } from '@/hooks/use-translation';
import { SectorStatCard } from './SectorStatCard';
import { Waves, Anchor, Wind, Fish } from 'lucide-react';


export function InvestmentCharts() {
  const { t } = useTranslation();

  const sectors = [
    {
      key: 'tourism',
      label: t('chart_sector_tourism'),
      start: 120,
      end: 450,
      Icon: Waves,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      barColor: 'bg-blue-500'
    },
    {
      key: 'logistics',
      label: t('chart_sector_logistics'),
      start: 80,
      end: 600,
      Icon: Anchor,
      color: 'text-slate-500',
      bgColor: 'bg-slate-500/10',
      barColor: 'bg-slate-500'
    },
    {
      key: 'energy',
      label: t('chart_sector_energy'),
      start: 150,
      end: 700,
      Icon: Wind,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      barColor: 'bg-green-500'
    },
    {
      key: 'aquaculture',
      label: t('chart_sector_aquaculture'),
      start: 200,
      end: 550,
      Icon: Fish,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      barColor: 'bg-cyan-500'
    },
  ];

  return (
    <div className="text-center">
        <h2 className="mb-4 font-headline text-3xl font-bold md:text-4xl">{t('chart_title')}</h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-muted-foreground">{t('chart_desc')}</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, index) => (
                <SectorStatCard 
                    key={sector.key}
                    label={sector.label}
                    start={sector.start}
                    end={sector.end}
                    Icon={sector.Icon}
                    color={sector.color}
                    bgColor={sector.bgColor}
                    barColor={sector.barColor}
                    index={index}
                />
            ))}
        </div>
    </div>
  );
}
