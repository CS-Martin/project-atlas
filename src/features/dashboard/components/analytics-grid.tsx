'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useDashboardFilter } from '@/hooks/use-dashboard-filter';
import { AnalyticsCard } from './analytics-card';
import { DollarSign, TrendingUp, TrendingDown, CircleDollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function AnalyticsGrid() {
  const { dateRange } = useDashboardFilter();
  const dashboardData = useQuery(api.transactions.api.getDashboardData, {
    dateRange: {
      from: dateRange.from?.toISOString(),
      to: dateRange.to?.toISOString(),
    },
  });

  if (!dashboardData) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  const { income, expense, netBalance, topExpenseCategory } = dashboardData;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="Total Income"
        value={income}
        icon={DollarSign}
      />
      <AnalyticsCard
        title="Total Expenses"
        value={expense}
        icon={TrendingDown}
      />
      <AnalyticsCard
        title="Net Balance"
        value={netBalance}
        icon={TrendingUp}
      />
      <AnalyticsCard
        title="Top Expense Category"
        value={topExpenseCategory}
        icon={CircleDollarSign}
        isCurrency={false}
      />
    </div>
  );
}
