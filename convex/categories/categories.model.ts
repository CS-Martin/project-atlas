import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const categories = defineTable({
  name: v.string(),
  createdBy: v.string(),
})
  .index('by_createdBy', ['createdBy'])
  .index('by_name', ['name']);