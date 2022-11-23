import { z } from "zod";

export const Appointment = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().nullable().default(""),
  startDate: z.date(),
  endDate: z.date().nullish(),
  deletedAt: z.date().nullish(),
  allDay: z.boolean().default(false),
  external: z.boolean().default(false),
  externalUrl: z.string().optional(),
  createdBy: z.string().optional(), // User ID
});
export type Appointment = z.infer<typeof Appointment>;
