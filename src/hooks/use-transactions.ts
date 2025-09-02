'use client';

import { useState, useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { PaginationResult } from 'convex/server';

// Type definitions for TypeScript type safety
type Transaction = Doc<'transactions'>;
type TransactionsResult = PaginationResult<Transaction> | null;

// Number of transactions to display per page
const itemsPerPage = 10;

/**
 * Custom hook to manage transaction data and filtering logic
 * @returns Object containing transactions data and related utility functions
 */
export function useTransactions() {
  // Fetch transactions data using Convex query with pagination
  const transactionsData = useQuery(api.transactions.api.getAllTransactions, {
    paginationOpts: {
      numItems: itemsPerPage,
      cursor: null, // Start with first page
    },
  }) as TransactionsResult;

  // Extract transactions from pagination result or default to empty array
  const transactions = useMemo(() => transactionsData?.page || [], [transactionsData]);

  // State for managing filters
  const [filters, setFilters] = useState({
    searchTerm: '', // Search term for filtering by description or category
    typeFilter: 'all', // 'income', 'expense', or 'all'
    categoryFilter: 'all', // Specific category or 'all'
  });

  // Current page state for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories from transactions for filter dropdowns
  const allCategories = useMemo(() => {
    const categories = new Set(transactions.map((t: Transaction) => t.category));
    return Array.from(categories);
  }, [transactions]);

  // Apply filters to transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction: Transaction) => {
      const { searchTerm, typeFilter, categoryFilter } = filters;
      // Check if transaction matches search term (case-insensitive)
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      // Check if transaction matches selected type
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      // Check if transaction matches selected category
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, filters]);

  // Apply pagination to filtered transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Return data and methods to be used by components
  return {
    transactions, // All transactions (unfiltered, unpaginated)
    paginatedTransactions, // Transactions after filtering and pagination
    allCategories, // Unique categories for filter dropdowns
    filteredTransactions, // Transactions after filtering (unpaginated)
    setFilters, // Function to update filters
    currentPage, // Current page number
    setCurrentPage, // Function to change current page
    totalPages, // Total number of pages
  };
}
