import React from "react";
import { ZodSchema } from "zod";

export function useZoddingState<T extends ZodSchema>(schema: T) {
  // TODO: use state hook with safeParse.
  // return [{ data, success, error }, setState]
}
