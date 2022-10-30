import { z } from "zod";

const RefinedDate = z
  .string()
  .refine((s) => !isNaN(Date.parse(s)))
  .or(z.date());

export const Appointment = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().max(2048).nullable().default(""),
  startDate: RefinedDate,
  endDate: RefinedDate.nullish(),
  deletedAt: RefinedDate.nullish(),
  allDay: z.boolean().default(false),
});
export type Appointment = z.infer<typeof Appointment>;
