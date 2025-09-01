import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const transactions = defineTable({
  type: v.union(v.literal('income'), v.literal('expense')),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  transactionDate: v.string(),
  fileUrl: v.string(),
  createdBy: v.string(),
})
  .index('by_createdBy', ['createdBy'])
  .index('by_type', ['type']);
