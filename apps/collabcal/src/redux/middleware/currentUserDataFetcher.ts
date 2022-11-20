import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { fetchUserData } from "../slices/userData";

/**
 * Fetches the data for the current user when they sign in.
 */
export const currentuserDataFetcher: Middleware =
  (store) => (next) => (action) => {
    // If the action is a successful sign-in action...
    if (
      action.payload?.id &&
      /^account\/login\/\w+\/fulfilled$/.test(action.type)
    ) {
      // ...fetch the current user's data.
      // FIX: Remove the `as any as AnyAction` cast by adding a type annotation to the store above.
      setTimeout(
        () =>
          store.dispatch(fetchUserData(action.payload.id) as any as AnyAction),
        1000
      );
    }
    return next(action);
  };
