
import { DateFilter } from '@/features/dashboard/components/date-filter';
import { AnalyticsGrid } from '@/features/dashboard/components/analytics-grid';
import { IOChart } from '@/features/dashboard/components/io-chart';
import { ExpensePieChart } from '@/features/dashboard/components/expense-pie-chart';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DateFilter />
      </div>
      <AnalyticsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IOChart />
        <ExpensePieChart />
      </div>
    </div>
  );
}
