import { z } from "zod";
import { Appointment } from "shared-types/appointment";
import {
  Creator,
  Deleter,
  Reader,
  ReaderAll,
  Streamable,
  Updater,
} from "~/repos/crud";

export const AppointmentWithoutID = Appointment.omit({ id: true });
export type AppointmentWithoutID = z.infer<typeof AppointmentWithoutID>;

export type AppointmentsRepo = Creator<AppointmentWithoutID, Appointment> &
  Reader<Appointment, Appointment["id"]> &
  ReaderAll<Appointment> &
  Updater<Appointment, Pick<Appointment, "id">> &
  Deleter<Appointment["id"]> &
  Streamable<Appointment>;
