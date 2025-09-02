
import { AnalyticsGrid } from '@/features/dashboard/components/analytics-grid';
import { IOChart } from '@/features/dashboard/components/io-chart';
import { ExpensePieChart } from '@/features/dashboard/components/expense-pie-chart';
import { DashboardTransactionTable } from '@/features/dashboard/components/dashboard-transaction-table';

export default function DashboardPage() {
  return (
    <div className="space-y-4">

      <AnalyticsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IOChart />
        <ExpensePieChart />
      </div>
      <div>
        <DashboardTransactionTable />
      </div>
    </div>
  );
}
