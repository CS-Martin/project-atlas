import { MutationCtx } from '@/convex/_generated/server';
import { v } from 'convex/values';

export const createTransactionHandlerArgs = {
  type: v.union(v.literal('income'), v.literal('expense')),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  fileUrl: v.string(),
  createdBy: v.string(),
};

export const createTransactionHandler = async (
  ctx: MutationCtx,
  args: {
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description: string;
    fileUrl: string;
    createdBy: string;
  }
) => {
  const { type, amount, category, description, fileUrl, createdBy } = args;

  try {
    console.log('Creating transaction:', { type, amount, category, description, fileUrl, createdBy });

    // Create new transaction
    const transactionId = await ctx.db.insert('transactions', {
      type,
      amount,
      category,
      description,
      fileUrl,
      createdBy,
    });

    console.log('Transaction created successfully:', transactionId);

    return transactionId;
  } catch (error) {
    console.error('Error creating transaction:', error);

    throw new Error(`Failed to create transaction: ${error}`);
  }
};
