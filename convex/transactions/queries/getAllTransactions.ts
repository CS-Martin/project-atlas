import { QueryCtx } from '@/convex/_generated/server';

export const getAllTransactionsHandler = async (ctx: QueryCtx) => {
  try {
    console.log('Fetching all transactions for user:');

    // Find existing transactions
    const existingTransactions = await ctx.db.query('transactions').order('desc').collect();

    if (!existingTransactions) {
      console.log('No transactions found for user:');
      return [];
    }

    console.log('Transactions fetched successfully:', existingTransactions.length);
    return existingTransactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error(`Failed to fetch transactions: ${error}`);
  }
};
