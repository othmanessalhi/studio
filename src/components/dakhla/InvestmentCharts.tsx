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

const chartData = [
  { sector: 'Tourism', current: 120, projected: 450, fill: 'var(--color-tourism)' },
  { sector: 'Logistics', current: 80, projected: 600, fill: 'var(--color-logistics)' },
  { sector: 'Energy', current: 150, projected: 700, fill: 'var(--color-energy)' },
  { sector: 'Aquaculture', current: 200, projected: 550, fill: 'var(--color-aquaculture)' },
];

const chartConfig = {
  current: {
    label: 'Current Investment (Millions USD)',
    color: 'hsl(var(--secondary-foreground))',
  },
  projected: {
    label: 'Projected Investment (Millions USD)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function InvestmentCharts() {
  return (
    <Card className='border-none shadow-none'>
      <CardHeader>
        <CardTitle className="text-center font-headline text-2xl">
          Investment Growth by Sector (2024-2030)
        </CardTitle>
        <CardDescription className="text-center">
          Projected public and private investment illustrating Dakhla's diverse economic expansion.
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
