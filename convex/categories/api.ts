import { mutation, query } from '../_generated/server';
import {
  createCategoryHandler,
  createCategoryHandlerArgs,
  deleteCategoryHandler,
  deleteCategoryhandlerArgs,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryByIdHandlerArgs,
} from './index';

// Getter methods
export const getAllCategories = query({
  handler: getAllCategoriesHandler,
});

export const getCategoryById = query({
  args: getCategoryByIdHandlerArgs,
  handler: getCategoryByIdHandler,
});

// Mutations
export const handleCreateCategory = mutation({
  args: createCategoryHandlerArgs,
  handler: createCategoryHandler,
});

export const handleDeleteCategory = mutation({
  args: deleteCategoryhandlerArgs,
  handler: deleteCategoryHandler,
});
