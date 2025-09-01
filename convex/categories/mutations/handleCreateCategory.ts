import { MutationCtx } from '@/convex/_generated/server';
import { v } from 'convex/values';

export const createCategoryHandlerArgs = {
  name: v.string(),
  createdBy: v.string(),
};

export const createCategoryHandler = async (
  ctx: MutationCtx,
  args: {
    name: string;
    createdBy: string;
  }
) => {
  const { name, createdBy } = args;

  try {
    const categoryId = await ctx.db.insert('categories', {
      name,
      createdBy,
    });

    return categoryId;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error(`Failed to create category: ${error}`);
  }
};