import { QueryCtx } from '@/convex/_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { Infer, v } from 'convex/values';

export const getAllTransactionsArgs = v.object({
  paginationOpts: paginationOptsValidator,
});

export const getAllTransactionsHandler = async (ctx: QueryCtx, args: Infer<typeof getAllTransactionsArgs>) => {
  const { paginationOpts } = args;

  try {
    console.log('Fetching all transactions for user:');

    // Find existing transactions
    const existingTransactions = await ctx.db.query('transactions').order('desc').paginate(paginationOpts);

    if (!existingTransactions) {
      console.log('No transactions found for user:');
      return [];
    }

    console.log('Transactions fetched successfully:');
    return existingTransactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error(`Failed to fetch transactions: ${error}`);
  }
};
