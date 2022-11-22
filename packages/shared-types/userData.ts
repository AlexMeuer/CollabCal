import { z } from "zod";

export const UserData = z.object({
  id: z.string().min(1),
  name: z.string(),
  photoURL: z.string().url(),
});

export type UserData = z.infer<typeof UserData>;
