'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useDashboardFilter } from '@/hooks/use-dashboard-filter';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/finance-utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Doc } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardTransactionTable() {
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

  const { transactions } = dashboardData;

  // Format date range
  const formattedFrom = dateRange.from
    ? new Date(dateRange.from).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
  const formattedTo = dateRange.to
    ? new Date(dateRange.to).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  const totalTransactions = transactions?.length ?? 0;

  return (
    <Card className="rounded-md border overflow-hidden">
      <CardHeader>
        <CardTitle className='text-lg'>Transaction Table</CardTitle>
        <CardDescription>
          Showing all transactions from <strong>{formattedFrom}</strong> to <strong>{formattedTo}</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent>

        <div className="rounded-md border overflow-hidden min-h-fit flex flex-col">
          <div className="overflow-x-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction: Doc<'transactions'>) => (
                  <TableRow className='h-12' key={transaction._id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.transactionDate).toLocaleString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === "income" ? "default" : "secondary"
                        }
                        className={
                          transaction.type === "income"
                            ? "bg-green-500 text-white hover:bg-green-500/90"
                            : "bg-red-500 text-white hover:bg-red-500/90"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>

                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>

                    <TableCell
                      className={`text-right font-semibold ${transaction.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className='text-neutral-500 mt-5'>Total transactions: <strong className='text-neutral-500'>{totalTransactions}</strong></div>
      </CardContent>
    </Card >
  );
}
