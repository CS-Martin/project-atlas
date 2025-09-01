import { internalMutation, mutation, query } from '../_generated/server';
import {
  createTransactionHandler,
  createTransactionHandlerArgs,
  deleteTransactionHandlerArgs,
  deleteTransactionHandlerHandler,
  getAllTransactionsHandler,
  getTransactionByIdHandler,
  getTransactionByIdHandlerArgs,
  updateTransactionHandler,
  updateTransactionHandlerArgs,
} from './index';

// Getter methods
export const getAllTransactions = query({
  handler: getAllTransactionsHandler,
});

export const getTransactionById = query({
  args: getTransactionByIdHandlerArgs,
  handler: getTransactionByIdHandler,
});

// Mutations
export const handleCreateTransaction = mutation({
  args: createTransactionHandlerArgs,
  handler: createTransactionHandler,
});

export const handleUpdateTransaction = mutation({
  args: updateTransactionHandlerArgs,
  handler: updateTransactionHandler,
});

export const handleDeleteTransaction = mutation({
  args: deleteTransactionHandlerArgs,
  handler: deleteTransactionHandlerHandler,
});
