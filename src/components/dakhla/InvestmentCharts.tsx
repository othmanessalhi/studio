
'use client';

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartConfig } from '../ui/chart';
import { useTranslation } from '@/hooks/use-translation';

export function InvestmentCharts() {
  const { t } = useTranslation();

  const sectors = [
    { key: 'tourism', start: 120, end: 450, fill: 'var(--chart-1)' },
    { key: 'logistics', start: 80, end: 600, fill: 'var(--chart-2)' },
    { key: 'energy', start: 150, end: 700, fill: 'var(--chart-3)' },
    { key: 'aquaculture', start: 200, end: 550, fill: 'var(--chart-4)' },
  ];

  const chartConfig = {
    investment: {
      label: t('chart_legend_projected'),
    },
    tourism: {
      label: t('chart_sector_tourism'),
      color: 'hsl(var(--chart-1))',
    },
    logistics: {
      label: t('chart_sector_logistics'),
      color: 'hsl(var(--chart-2))',
    },
    energy: {
      label: t('chart_sector_energy'),
      color: 'hsl(var(--chart-3))',
    },
    aquaculture: {
      label: t('chart_sector_aquaculture'),
      color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig;

  return (
    <Card className='border-none shadow-none'>
      <CardHeader className="items-center pb-0">
        <CardTitle>{t('chart_title')}</CardTitle>
        <CardDescription>{t('chart_desc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[600px]"
        >
          <RadialBarChart
            data={sectors}
            startAngle={-90}
            endAngle={270}
            innerRadius="15%"
            outerRadius="80%"
            barSize={24}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[120, 100, 80, 60, 40]}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          $4.5B+
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total Projected
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
                dataKey="end"
                background
                cornerRadius={10}
                className="[&>path]:fill-[var(--fill)]"
             />
             <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                nameKey="end" 
                formatter={(value, name, props) => [
                    `$${props.payload.start}M ➔ $${props.payload.end}M`,
                    chartConfig[props.payload.key as keyof typeof chartConfig]?.label || name
                ]}
                />}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
