"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"
import { Doc } from "@/convex/_generated/dataModel"
import { TransactionFormValues } from "@/features/validations/transaction"

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (values: TransactionFormValues) => void
    transaction: Doc<"transactions"> | null
}

export function TransactionModal({ isOpen, onClose, onSubmit, transaction }: TransactionModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
                    <DialogDescription>
                        {transaction
                            ? "Make changes to your transaction details."
                            : "Create a new transaction record."}
                    </DialogDescription>
                </DialogHeader>
                <TransactionForm onClose={onClose} onSubmit={onSubmit} transaction={transaction} />
            </DialogContent>
        </Dialog>
    )
}