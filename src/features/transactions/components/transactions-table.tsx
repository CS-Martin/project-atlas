"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/finance-utils"
import { Doc } from "@/convex/_generated/dataModel"
import { Edit, Trash2 } from "lucide-react"

interface TransactionsTableProps {
    transactions: Doc<"transactions">[]
    selectedTransactions: Set<string>
    onSelectAll: (checked: boolean) => void
    onSelectTransaction: (transactionId: string, checked: boolean) => void
    onEditTransaction: (transaction: Doc<"transactions">) => void
    onDeleteTransaction: (transactionId: string) => void
    isAllSelected: boolean
    isIndeterminate: boolean
}

export function TransactionsTable({
    transactions,
    selectedTransactions,
    onSelectAll,
    onSelectTransaction,
    onEditTransaction,
    onDeleteTransaction,
    isAllSelected,
    isIndeterminate,
}: TransactionsTableProps) {
    return (
        <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={onSelectAll}
                                    ref={(el) => {
                                        if (el) {
                                            (el as HTMLInputElement).indeterminate = isIndeterminate;
                                        }
                                    }}
                                    aria-label="Select all transactions"
                                />
                            </TableHead>
                            <TableHead className="min-w-[100px]">Date</TableHead>
                            <TableHead className="min-w-[80px]">Type</TableHead>
                            <TableHead className="min-w-[120px]">Category</TableHead>
                            <TableHead className="min-w-[200px]">Description</TableHead>
                            <TableHead className="text-right min-w-[100px]">Amount</TableHead>
                            <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction._id} className="hover:bg-muted/50">
                                <TableCell>
                                    <Checkbox
                                        checked={selectedTransactions.has(transaction._id)}
                                        onCheckedChange={(checked) => onSelectTransaction(transaction._id, checked as boolean)}
                                        aria-label={`Select transaction ${transaction.description}`}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={transaction.type === "income" ? "default" : "secondary"}
                                        className={
                                            transaction.type === "income"
                                                ? "bg-chart-3 text-white hover:bg-chart-3/90"
                                                : "bg-chart-5 text-white hover:bg-chart-5/90"
                                        }
                                    >
                                        {transaction.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                                <TableCell
                                    className={`text-right font-semibold ${transaction.type === "income" ? "text-chart-3" : "text-chart-5"}`}>
                                    {transaction.type === "income" ? "+" : "-"}
                                    {formatCurrency(transaction.amount)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEditTransaction(transaction)}
                                            className="hover:bg-accent/10"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDeleteTransaction(transaction._id)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}