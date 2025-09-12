
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartConfig } from '../ui/chart';
import { useTranslation } from '@/hooks/use-translation';

export function InvestmentCharts() {
  const { t } = useTranslation();

  const chartData = [
    { sector: t('chart_sector_tourism'), current: 120, projected: 450, fill: 'var(--color-tourism)' },
    { sector: t('chart_sector_logistics'), current: 80, projected: 600, fill: 'var(--color-logistics)' },
    { sector: t('chart_sector_energy'), current: 150, projected: 700, fill: 'var(--color-energy)' },
    { sector: t('chart_sector_aquaculture'), current: 200, projected: 550, fill: 'var(--color-aquaculture)' },
  ];

  const chartConfig = {
    current: {
      label: t('chart_legend_current'),
      color: 'hsl(var(--secondary-foreground))',
    },
    projected: {
      label: t('chart_legend_projected'),
      color: 'hsl(var(--primary))',
    },
  } satisfies ChartConfig;


  return (
    <Card className='border-none shadow-none'>
      <CardHeader>
        <CardTitle className="text-center font-headline text-2xl">
          {t('chart_title')}
        </CardTitle>
        <CardDescription className="text-center">
          {t('chart_desc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[400px] w-full max-w-4xl">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sector"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis 
                tickFormatter={(value) => `$${value}M`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="current" fill={chartConfig.current.color} radius={4} />
            <Bar dataKey="projected" fill={chartConfig.projected.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
