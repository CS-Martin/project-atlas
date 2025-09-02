// convex/queries/dashboard.ts
import { QueryCtx } from '../../_generated/server';
import { Infer, v } from 'convex/values';

export const getDashboardDataArgs = v.object({
  dateRange: v.object({
    from: v.optional(v.string()),
    to: v.optional(v.string()),
  }),
});

export const getDashboardDataHandler = async (ctx: QueryCtx, args: Infer<typeof getDashboardDataArgs>) => {
  const { dateRange } = args;

  const now = new Date();
  const from = dateRange.from || new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const to = dateRange.to || now.toISOString();

  // ✅ use "transactionDate" instead of "date"
  const transactions = await ctx.db
    .query('transactions')
    .filter((q) => q.and(q.gte(q.field('transactionDate'), from), q.lte(q.field('transactionDate'), to)))
    .collect();

  // Income & expense totals
  const income = transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const netBalance = income - expense;

  // Expenses grouped by category
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce(
      (acc, t) => {
        const category = t.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>
    );

  const topExpenseCategory = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';

  // Chart data (grouped by date)
  const chartData = transactions.reduce(
    (acc, t) => {
      const date = t.transactionDate.split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        acc[date].income += t.amount;
      } else {
        acc[date].expense += t.amount;
      }
      return acc;
    },
    {} as Record<string, { date: string; income: number; expense: number }>
  );

  return {
    income,
    expense,
    netBalance,
    expenseByCategory,
    chartData: Object.values(chartData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  };
};
