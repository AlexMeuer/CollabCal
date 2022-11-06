import { z } from "zod";

export const Appointment = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().max(2048).nullable().default(""),
  startDate: z.date(),
  endDate: z.date().nullish(),
  deletedAt: z.date().nullish(),
  allDay: z.boolean().default(false),
});
export type Appointment = z.infer<typeof Appointment>;
