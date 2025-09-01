import { internalMutation, query } from '../_generated/server';
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
export const handleCreateTransaction = internalMutation({
  args: createTransactionHandlerArgs,
  handler: createTransactionHandler,
});

export const handleUpdateTransaction = internalMutation({
  args: updateTransactionHandlerArgs,
  handler: updateTransactionHandler,
});

export const handleDeleteTransaction = internalMutation({
  args: deleteTransactionHandlerArgs,
  handler: deleteTransactionHandlerHandler,
});
