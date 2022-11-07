import { Middleware } from "@reduxjs/toolkit";

/**
 * Logs all actions and states after they are dispatched.
 */
export const consoleLogger: Middleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
