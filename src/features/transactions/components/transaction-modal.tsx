"use client"

import { useQuery, useMutation } from "convex/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { TransactionFormValues } from "@/features/transactions/validations/transaction"
import { useProgress } from "@bprogress/next"
import { toast } from "sonner"

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    transaction: Doc<"transactions"> | null
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
    const { start, stop } = useProgress()
    const user = useQuery(api.users.api.getCurrentAuthenticatedUser)

    const createTransaction = useMutation(api.transactions.api.handleCreateTransaction)
    const updateTransaction = useMutation(api.transactions.api.handleUpdateTransaction)

    const handleCreateTransaction = async (values: TransactionFormValues) => {
        try {
            start()
            if (!user) return

            const transactionData = {
                ...values,
                fileUrl: "",
                createdBy: user._id
            }

            const transactionId = await createTransaction(transactionData)

            if (transactionId) {
                onClose()
                toast.success("Transaction added successfully")
            }
        } catch (error) {
            console.error("Error adding transaction:", error)

            toast.error("Failed to add transaction")
        } finally {
            stop()
        }
    }

    const handleEditTransaction = async (values: TransactionFormValues) => {
        try {
            start()
            if (!user) return

            if (transaction) {
                const transactionData = {
                    type: values.type,
                    amount: values.amount,
                    category: values.category,
                    description: values.description,
                    transactionDate: values.transactionDate,
                    fileUrl: transaction.fileUrl || "",
                    editedBy: user?._id ?? "",
                    updatedAt: new Date().toISOString()
                }

                const updatedTransactionId = await updateTransaction({ ...transactionData, transactionId: transaction._id })

                if (updatedTransactionId) {
                    onClose()
                    toast.success("Transaction updated successfully")
                }
            }
        } catch (error) {
            console.error("Error updating transaction:", error)

            toast.error("Failed to update transaction")
        } finally {
            stop()
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
                    onSubmit={transaction ? handleEditTransaction : handleCreateTransaction}
                    transaction={transaction}
                />
            </DialogContent>
        </Dialog>
    )
}