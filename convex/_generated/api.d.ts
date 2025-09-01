/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as http from "../http.js";
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
  http: typeof http;
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
