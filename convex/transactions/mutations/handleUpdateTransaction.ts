import { MutationCtx } from '@/convex/_generated/server';
import { Infer, v } from 'convex/values';

export const updateTransactionArgs = v.object({
  transactionId: v.id('transactions'),
  type: v.union(v.literal('income'), v.literal('expense')),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  transactionDate: v.string(),
  fileUrl: v.string(),
  editedBy: v.string(),
  updatedAt: v.string(),
});

export const updateTransactionHandler = async (ctx: MutationCtx, args: Infer<typeof updateTransactionArgs>) => {
  const { transactionId, type, amount, category, description, transactionDate, fileUrl, editedBy, updatedAt } = args;

  try {
    console.log('Updating transaction:', transactionId);

    // Find existing transaction
    const existingTransaction = await ctx.db
      .query('transactions')
      .withIndex('by_id', (q) => q.eq('_id', transactionId))
      .first();

    if (!existingTransaction) {
      console.log('Transaction not found, skipping update');
      return;
    }

    await ctx.db.patch(existingTransaction._id, {
      type,
      amount,
      category,
      description,
      transactionDate,
      fileUrl,
      editedBy,
      createdBy: existingTransaction.createdBy,
      updatedAt,
    });

    console.log('Transaction updated successfully:', transactionId);

    return transactionId;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error(`Failed to update transaction: ${error}`);
  }
};
