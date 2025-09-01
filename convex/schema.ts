import { defineSchema } from 'convex/server';
import { users } from './users/users.model';
import { transactions } from './transactions/transactions.model';
import { categories } from './categories/categories.model';

export default defineSchema({
  users,
  transactions,
  categories,
});
