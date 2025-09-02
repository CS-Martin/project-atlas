import { QueryCtx } from '@/convex/_generated/server';
import { Infer, v } from 'convex/values';

export const getTransactionByIdArgs = v.object({
  transactionId: v.id('transactions'),
});

export const getTransactionByIdHandler = async (ctx: QueryCtx, args: Infer<typeof getTransactionByIdArgs>) => {
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
