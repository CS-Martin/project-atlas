import { Id } from '@/convex/_generated/dataModel';
import { QueryCtx } from '@/convex/_generated/server';
import { v } from 'convex/values';

export const getCategoryByIdHandlerArgs = {
  id: v.id('categories'),
};

export const getCategoryByIdHandler = async (
  ctx: QueryCtx,
  args: {
    id: Id<'categories'>;
  }
) => {
  const { id } = args;

  try {
    const category = await ctx.db.get(id);
    return category;
  } catch (error) {
    console.error('Error getting category:', error);
    throw new Error(`Failed to get category: ${error}`);
  }
};
