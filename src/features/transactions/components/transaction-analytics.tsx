"use client"

import { formatCurrency } from "@/lib/finance-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"

interface TransactionAnalyticsProps {
    transactions: Doc<"transactions">[]
}

export function TransactionAnalytics({ transactions }: TransactionAnalyticsProps) {
    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0)

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0)

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-chart-3">+{formatCurrency(totalIncome)}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-chart-5">-{formatCurrency(totalExpenses)}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${(totalIncome - totalExpenses) >= 0 ? 'text-chart-3' : 'text-chart-5'}`}>
                        {(totalIncome - totalExpenses) >= 0 ? "+" : "-"}{formatCurrency(Math.abs(totalIncome - totalExpenses))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{transactions.length}</div>
                </CardContent>
            </Card>
        </div>
    )
}