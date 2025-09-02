'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useDashboardFilter } from '@/hooks/use-dashboard-filter';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

export function IOChart() {
  const { dateRange } = useDashboardFilter();
  const dashboardData = useQuery(api.transactions.api.getDashboardData, {
    dateRange: {
      from: dateRange.from?.toISOString(),
      to: dateRange.to?.toISOString(),
    },
  });

  if (!dashboardData) {
    return <Skeleton className="h-96" />;
  }

  const { chartData } = dashboardData;

  // Purple color scheme
  const chartConfig = {
    income: {
      label: 'Income',
      color: '#5B2C6F', // dark purple
    },
    expense: {
      label: 'Expense',
      color: '#D7BDE2', // light purple
    },
  };

  const formattedFrom = dateRange.from
    ? new Date(dateRange.from).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
  const formattedTo = dateRange.to
    ? new Date(dateRange.to).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs. Expenses</CardTitle>
        <CardDescription>
          Showing income and expenses from <strong>{formattedFrom}</strong> to <strong>{formattedTo}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value =>
                new Date(value).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })
              }
            />
            <YAxis />
            <Legend verticalAlign="top" height={36} />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="income" fill={chartConfig.income.color} radius={4} />
            <Bar dataKey="expense" fill={chartConfig.expense.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
