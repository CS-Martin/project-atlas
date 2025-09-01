import { Id } from '@/convex/_generated/dataModel';
import { MutationCtx } from '@/convex/_generated/server';
import { v } from 'convex/values';

export const deleteTransactionHandlerArgs = {
  transactionId: v.id('transactions'),
};

export const deleteTransactionHandlerHandler = async (
  ctx: MutationCtx,
  args: { transactionId: Id<'transactions'> }
) => {
  const { transactionId } = args;

  try {
    console.log('Deleting transaction:', transactionId);

    // Find existing transaction
    const existingTransaction = await ctx.db
      .query('transactions')
      .withIndex('by_id', (q) => q.eq('_id', transactionId))
      .first();

    if (!existingTransaction) {
      console.log('Transaction not found, skipping deletion');
      return;
    }

    await ctx.db.delete(existingTransaction._id);

    console.log('Transaction deleted successfully:', transactionId);
    return transactionId;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error(`Failed to delete transaction: ${error}`);
  }
};
