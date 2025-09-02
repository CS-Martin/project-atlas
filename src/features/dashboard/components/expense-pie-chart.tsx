'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useDashboardFilter } from '@/hooks/use-dashboard-filter';
import { Pie, PieChart } from 'recharts';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

export function ExpensePieChart() {
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

    const { expenseByCategory } = dashboardData;

    // Generate purple shades for each category
    const purpleShades = [
        '#6B46C1',
        '#805AD5',
        '#9F7AEA',
        '#B794F4',
        '#D6BCFA',
        '#E9D8FD',
    ];

    const chartData = Object.entries(expenseByCategory).map(([category, amount], i) => ({
        category,
        amount,
        fill: purpleShades[i % purpleShades.length], // loop if more categories than shades
    }));

    const chartConfig = Object.fromEntries(
        Object.keys(expenseByCategory).map((category, i) => [
            category,
            {
                label: category,
                color: purpleShades[i % purpleShades.length],
            },
        ])
    ) satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
                <CardDescription>
                    A breakdown of your expenses by category for the selected period.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-72 w-full">
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="amount" hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="category"
                            label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(1)}%`
                            }
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="category" />}
                            className="-translate-y-2 flex-wrap gap-2"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
