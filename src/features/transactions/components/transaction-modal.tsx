"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"
import { Doc } from "@/convex/_generated/dataModel"

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (values: any) => void
    transaction: Doc<"transactions"> | null
}

export function TransactionModal({ isOpen, onClose, onSubmit, transaction }: TransactionModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
                </DialogHeader>
                <TransactionForm onSubmit={onSubmit} transaction={transaction} />
            </DialogContent>
        </Dialog>
    )
}