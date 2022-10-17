import { z } from "zod";

export const Appointment = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().max(2048).default(""),
  startDate: z.string().refine((s) => !isNaN(Date.parse(s))),
  endDate: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)))
    .optional(),
  allDay: z.boolean().default(false),
});
export type Appointment = z.infer<typeof Appointment>;
