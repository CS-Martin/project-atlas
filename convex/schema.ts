import { defineSchema } from 'convex/server';
import { users } from './users/users.model';
import { transactions } from './transactions/transactions.model';

export default defineSchema({
  users,
  transactions,
});
