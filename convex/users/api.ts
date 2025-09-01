import { internalMutation, query } from '../_generated/server';
import { v } from 'convex/values';
import {
  handleUserCreatedArgs,
  handleUserCreatedHandler,
  handleUserDeletedArgs,
  handleUserDeletedHandler,
  handleUserUpdatedArgs,
  handleUserUpdatedHandler,
} from './index';
import { getCurrentAuthenticatedUserHandler } from './queries/getCurrentAuthenticatedUser';

// Getter methods
export const getCurrentAuthenticatedUser = query({
  handler: getCurrentAuthenticatedUserHandler,
});

// Mutations
export const handleUserCreated = internalMutation({
  args: handleUserCreatedArgs,
  handler: handleUserCreatedHandler,
});

export const handleUserUpdated = internalMutation({
  args: handleUserUpdatedArgs,
  handler: handleUserUpdatedHandler,
});

export const handleUserDeleted = internalMutation({
  args: handleUserDeletedArgs,
  handler: handleUserDeletedHandler,
});
