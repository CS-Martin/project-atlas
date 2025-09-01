'use client'

import { useState, useMemo } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { TransactionAnalytics } from './transaction-analytics'
import { TransactionHeader } from './transaction-header'
import { TransactionFilters } from './transaction-filters'
import { TransactionsTable } from './transactions-table'
import { TransactionPagination } from './transaction-pagination'
import { TransactionModal } from './transaction-modal'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const itemsPerPage = 10

export function TransactionsPage() {
    const transactionsData = useQuery(api.transactions.api.getAllTransactions)
    const transactions = useMemo(() => transactionsData || [], [transactionsData])

    const deleteTransaction = useMutation(api.transactions.api.handleDeleteTransaction)

    const [filters, setFilters] = useState({
        searchTerm: '',
        typeFilter: 'all',
        categoryFilter: 'all',
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState<Doc<"transactions"> | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set())

    const allCategories = useMemo(() => {
        const categories = new Set(transactions.map((t) => t.category))
        return Array.from(categories)
    }, [transactions])

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const { searchTerm, typeFilter, categoryFilter } = filters
            const matchesSearch =
                transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType = typeFilter === 'all' || transaction.type === typeFilter
            const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter

            return matchesSearch && matchesType && matchesCategory
        })
    }, [transactions, filters])

    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredTransactions.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredTransactions, currentPage])

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

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

    const handleBulkDelete = async () => {
        await Promise.all(Array.from(selectedTransactions).map((id) => deleteTransaction({ transactionId: id as Id<"transactions"> })))
        setSelectedTransactions(new Set())
    }

    const isAllSelected =
        paginatedTransactions.length > 0 && paginatedTransactions.every((t) => selectedTransactions.has(t._id))
    const isIndeterminate = selectedTransactions.size > 0 && !isAllSelected

    const handleDeleteTransaction = async (id: string) => {
        await deleteTransaction({ transactionId: id as Id<"transactions"> })
    }

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
                        onBulkDelete={handleBulkDelete}
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
                        onDeleteTransaction={handleDeleteTransaction}
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
        </>
    )
}
