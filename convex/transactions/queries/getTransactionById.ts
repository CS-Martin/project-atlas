import { Id } from '@/convex/_generated/dataModel';
import { QueryCtx } from '@/convex/_generated/server';
import { v } from 'convex/values';

export const getTransactionByIdHandlerArgs = {
  transactionId: v.id('transactions'),
};

export const getTransactionByIdHandler = async (ctx: QueryCtx, args: { transactionId: Id<'transactions'> }) => {
  const { transactionId } = args;

  try {
    console.log('Fetching transaction:', transactionId);

    // Find existing transaction
    const existingTransaction = await ctx.db
      .query('transactions')
      .withIndex('by_id', (q) => q.eq('_id', transactionId))
      .first();

    if (!existingTransaction) {
      console.log('Transaction not found, skipping fetch');
      return;
    }

    console.log('Transaction fetched successfully:', transactionId);
    return existingTransaction;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw new Error(`Failed to fetch transaction: ${error}`);
  }
};
