import { z } from "zod";
import { Appointment } from "~/types/appointment";
import { Creator, Deleter, Reader, ReaderAll, Updater } from "./crud";

export const AppointmentWithoutID = Appointment.omit({ id: true });
export type AppointmentWithoutID = z.infer<typeof AppointmentWithoutID>;

export type AppointmentsRepo = Creator<AppointmentWithoutID, Appointment> &
  Reader<Appointment, Appointment["id"]> &
  ReaderAll<Appointment> &
  Updater<Appointment> &
  Deleter<Appointment["id"]>;
