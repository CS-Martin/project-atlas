"use client"

import { useQuery, useMutation } from "convex/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"
import { api } from "@/convex/_generated/api"
import { Doc } from "@//convex/_generated/dataModel"
import { TransactionFormValues } from "@/features/validations/transaction"

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    transaction: Doc<"transactions"> | null
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
    const user = useQuery(api.users.api.getCurrentAuthenticatedUser)

    const createTransaction = useMutation(api.transactions.api.handleCreateTransaction)
    const updateTransaction = useMutation(api.transactions.api.handleUpdateTransaction)

    const handleAddTransaction = async (values: TransactionFormValues) => {
        if (!user) return

        const transactionData = {
            ...values,
            fileUrl: "",
            createdBy: user._id
        }

        await createTransaction(transactionData)
        onClose()
    }

    const handleEditTransaction = async (values: TransactionFormValues) => {
        if (transaction) {
            const transactionData = {
                ...values,
                _id: transaction._id,
                fileUrl: "",
                createdBy: transaction.createdBy
            }
            await updateTransaction({ ...transactionData, transactionId: transaction._id })
            onClose()
        }
    }

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
                <TransactionForm
                    onClose={onClose}
                    onSubmit={transaction ? handleEditTransaction : handleAddTransaction}
                    transaction={transaction}
                />
            </DialogContent>
        </Dialog>
    )
}