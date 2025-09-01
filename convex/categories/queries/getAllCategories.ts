import { QueryCtx } from '@/convex/_generated/server';

export const getAllCategoriesHandler = async (ctx: QueryCtx) => {
  try {
    const categories = await ctx.db.query('categories').order('desc').collect();

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error(`Failed to fetch categories: ${error}`);
  }
};