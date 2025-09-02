'use client'

import { useState, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const itemsPerPage = 10

export function useTransactions() {
    const transactionsData = useQuery(api.transactions.api.getAllTransactions)
    const transactions = useMemo(() => transactionsData || [], [transactionsData])

    const [filters, setFilters] = useState({
        searchTerm: '',
        typeFilter: 'all',
        categoryFilter: 'all',
    })
    const [currentPage, setCurrentPage] = useState(1)

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

    return {
        transactions,
        paginatedTransactions,
        allCategories,
        filteredTransactions,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
    }
}
