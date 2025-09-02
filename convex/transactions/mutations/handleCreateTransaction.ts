import { MutationCtx } from '@/convex/_generated/server';
import { Infer, v } from 'convex/values';

export const createTransactionArgs = v.object({
  type: v.union(v.literal('income'), v.literal('expense')),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  transactionDate: v.string(),
  fileUrl: v.string(),
  createdBy: v.string(),
});

export const createTransactionHandler = async (ctx: MutationCtx, args: Infer<typeof createTransactionArgs>) => {
  const { type, amount, category, description, transactionDate, fileUrl, createdBy } = args;

  try {
    console.log('Creating transaction:', { type, amount, category, description, fileUrl, createdBy });

    // Create new transaction
    const transactionId = await ctx.db.insert('transactions', {
      type,
      amount,
      category,
      description,
      transactionDate,
      fileUrl,
      createdBy,
      editedBy: createdBy,
      updatedAt: new Date().toISOString(),
    });

    console.log('Transaction created successfully:', transactionId);

    return transactionId;
  } catch (error) {
    console.error('Error creating transaction:', error);

    throw new Error(`Failed to create transaction: ${error}`);
  }
};
