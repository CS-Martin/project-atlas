'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { useTransactions } from '@/hooks/use-transactions'
import { TransactionAnalytics } from './transaction-analytics'
import { TransactionHeader } from './transaction-header'
import { TransactionFilters } from './transaction-filters'
import { TransactionsTable } from './transactions-table'
import { TransactionPagination } from './transaction-pagination'
import { TransactionModal } from './transaction-modal'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function TransactionsPage() {
    const {
        transactions,
        paginatedTransactions,
        allCategories,
        filteredTransactions,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useTransactions()

    const deleteTransaction = useMutation(api.transactions.api.handleDeleteTransaction)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState<Doc<"transactions"> | null>(null)
    const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set())
    const [deleteTarget, setDeleteTarget] = useState<string | 'bulk' | null>(null)

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTransactions(new Set(paginatedTransactions.map((t) => t._id)))
        } else {
            setSelectedTransactions(new Set())
        }
    }

    const handleSelectTransaction = (transactionId: string, checked: boolean) => {
        const newSelected = new Set(selectedTransactions)
        if (checked) {
            newSelected.add(transactionId)
        } else {
            newSelected.delete(transactionId)
        }
        setSelectedTransactions(newSelected)
    }

    const onConfirmDelete = async () => {
        if (deleteTarget === 'bulk') {
            await Promise.all(
                Array.from(selectedTransactions).map((id) =>
                    deleteTransaction({ transactionId: id as Id<"transactions"> })
                )
            )
            setSelectedTransactions(new Set())
        } else if (deleteTarget) {
            await deleteTransaction({ transactionId: deleteTarget as Id<"transactions"> })
        }
        setDeleteTarget(null)
    }

    const handleDeleteRequest = (id: string) => {
        setDeleteTarget(id)
    }

    const handleBulkDeleteRequest = () => {
        setDeleteTarget('bulk')
    }

    const isAllSelected =
        paginatedTransactions.length > 0 && paginatedTransactions.every((t) => selectedTransactions.has(t._id))
    const isIndeterminate = selectedTransactions.size > 0 && !isAllSelected

    const openEditModal = (transaction: Doc<"transactions">) => {
        setEditingTransaction(transaction)
        setIsModalOpen(true)
    }

    const openAddModal = () => {
        setEditingTransaction(null)
        setIsModalOpen(true)
    }

    return (
        <>
            <TransactionAnalytics transactions={filteredTransactions} />

            <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <TransactionHeader
                        selectedTransactions={selectedTransactions}
                        onAddTransaction={openAddModal}
                        onBulkDelete={handleBulkDeleteRequest}
                        filteredTransactionCount={filteredTransactions.length}
                        totalTransactionCount={transactions.length}
                    />
                </CardHeader>
                <CardContent>
                    <TransactionFilters onFilterChange={setFilters} allCategories={allCategories} />

                    <TransactionsTable
                        transactions={paginatedTransactions}
                        selectedTransactions={selectedTransactions}
                        onSelectAll={handleSelectAll}
                        onSelectTransaction={handleSelectTransaction}
                        onEditTransaction={openEditModal}
                        onDeleteTransaction={handleDeleteRequest}
                        isAllSelected={isAllSelected}
                        isIndeterminate={isIndeterminate}
                    />

                    <TransactionPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </CardContent>
            </Card>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingTransaction(null)
                }}
                transaction={editingTransaction}
            />

            <ConfirmationModal
                isOpen={deleteTarget !== null}
                onClose={() => setDeleteTarget(null)}
                onConfirm={onConfirmDelete}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete the selected transaction(s)."
            />
        </>
    )
}
