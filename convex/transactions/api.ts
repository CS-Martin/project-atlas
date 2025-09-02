import { mutation, query } from '../_generated/server';
import {
  createTransactionHandler,
  deleteTransactionHandlerHandler,
  getAllTransactionsHandler,
  getTransactionByIdHandler,
  updateTransactionHandler,
  getAllTransactionsArgs,
  getTransactionByIdArgs,
  createTransactionArgs,
  updateTransactionArgs,
  deleteTransactionArgs,
} from './index';

// Getter methods
export const getAllTransactions = query({
  args: getAllTransactionsArgs,
  handler: getAllTransactionsHandler,
});

export const getTransactionById = query({
  args: getTransactionByIdArgs,
  handler: getTransactionByIdHandler,
});

// Mutations
export const handleCreateTransaction = mutation({
  args: createTransactionArgs,
  handler: createTransactionHandler,
});

export const handleUpdateTransaction = mutation({
  args: updateTransactionArgs,
  handler: updateTransactionHandler,
});

export const handleDeleteTransaction = mutation({
  args: deleteTransactionArgs,
  handler: deleteTransactionHandlerHandler,
});
