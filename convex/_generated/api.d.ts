/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as categories_api from "../categories/api.js";
import type * as categories_index from "../categories/index.js";
import type * as categories_mutations_handleCreateCategory from "../categories/mutations/handleCreateCategory.js";
import type * as categories_mutations_handleDeleteCategory from "../categories/mutations/handleDeleteCategory.js";
import type * as categories_queries_getAllCategories from "../categories/queries/getAllCategories.js";
import type * as categories_queries_getCategoryById from "../categories/queries/getCategoryById.js";
import type * as http from "../http.js";
import type * as transactions_api from "../transactions/api.js";
import type * as transactions_index from "../transactions/index.js";
import type * as transactions_mutations_handleCreateTransaction from "../transactions/mutations/handleCreateTransaction.js";
import type * as transactions_mutations_handleDeleteTransaction from "../transactions/mutations/handleDeleteTransaction.js";
import type * as transactions_mutations_handleUpdateTransaction from "../transactions/mutations/handleUpdateTransaction.js";
import type * as transactions_queries_getAllTransactions from "../transactions/queries/getAllTransactions.js";
import type * as transactions_queries_getDashboardData from "../transactions/queries/getDashboardData.js";
import type * as transactions_queries_getTransactionById from "../transactions/queries/getTransactionById.js";
import type * as users_api from "../users/api.js";
import type * as users_index from "../users/index.js";
import type * as users_mutations_handleUserCreated from "../users/mutations/handleUserCreated.js";
import type * as users_mutations_handleUserDeleted from "../users/mutations/handleUserDeleted.js";
import type * as users_mutations_handleUserUpdated from "../users/mutations/handleUserUpdated.js";
import type * as users_queries_getCurrentAuthenticatedUser from "../users/queries/getCurrentAuthenticatedUser.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "categories/api": typeof categories_api;
  "categories/index": typeof categories_index;
  "categories/mutations/handleCreateCategory": typeof categories_mutations_handleCreateCategory;
  "categories/mutations/handleDeleteCategory": typeof categories_mutations_handleDeleteCategory;
  "categories/queries/getAllCategories": typeof categories_queries_getAllCategories;
  "categories/queries/getCategoryById": typeof categories_queries_getCategoryById;
  http: typeof http;
  "transactions/api": typeof transactions_api;
  "transactions/index": typeof transactions_index;
  "transactions/mutations/handleCreateTransaction": typeof transactions_mutations_handleCreateTransaction;
  "transactions/mutations/handleDeleteTransaction": typeof transactions_mutations_handleDeleteTransaction;
  "transactions/mutations/handleUpdateTransaction": typeof transactions_mutations_handleUpdateTransaction;
  "transactions/queries/getAllTransactions": typeof transactions_queries_getAllTransactions;
  "transactions/queries/getDashboardData": typeof transactions_queries_getDashboardData;
  "transactions/queries/getTransactionById": typeof transactions_queries_getTransactionById;
  "users/api": typeof users_api;
  "users/index": typeof users_index;
  "users/mutations/handleUserCreated": typeof users_mutations_handleUserCreated;
  "users/mutations/handleUserDeleted": typeof users_mutations_handleUserDeleted;
  "users/mutations/handleUserUpdated": typeof users_mutations_handleUserUpdated;
  "users/queries/getCurrentAuthenticatedUser": typeof users_queries_getCurrentAuthenticatedUser;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
