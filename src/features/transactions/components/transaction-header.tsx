"use client"

import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface TransactionHeaderProps {
    selectedTransactions: Set<string>
    onAddTransaction: () => void
    onBulkDelete: () => void
    filteredTransactionCount: number
    totalTransactionCount: number
}

export function TransactionHeader({
    selectedTransactions,
    onAddTransaction,
    onBulkDelete,
    filteredTransactionCount,
    totalTransactionCount,
}: TransactionHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <CardTitle className="text-lg font-semibold">All Transactions</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Showing {filteredTransactionCount} of {totalTransactionCount} transactions
                    {selectedTransactions.size > 0 && (
                        <span className="ml-2 text-accent font-medium">• {selectedTransactions.size} selected</span>
                    )}
                </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                {selectedTransactions.size > 0 && (
                    <Button variant="destructive" onClick={onBulkDelete} className="flex-1 sm:flex-none">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected ({selectedTransactions.size})
                    </Button>
                )}
                <Button onClick={onAddTransaction} className="bg-purple-600 hover:bg-purple-700 flex-1 sm:flex-none">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                </Button>
            </div>
        </div>
    )
}