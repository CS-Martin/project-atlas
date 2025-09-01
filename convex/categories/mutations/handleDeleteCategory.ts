import { Id } from '@/convex/_generated/dataModel';
import { MutationCtx } from '@/convex/_generated/server';
import { v } from 'convex/values';

export const deleteCategoryhandlerArgs = {
  id: v.string(),
};

export const deleteCategoryHandler = async (
  ctx: MutationCtx,
  args: {
    id: Id<'categories'>;
  }
) => {
  const { id } = args;

  // Check if category exists
  const category = await ctx.db.get(id);

  if (!category) {
    throw new Error('Category not found');
  }

  try {
    await ctx.db.delete(id);
  } catch (error) {
    console.error('Error deleting category:', error);

    throw new Error(`Failed to delete category: ${error}`);
  }
};
