import { z } from "zod";
import { UserData } from "shared-types/userData";
import { Reader, StreamableSingle, Updater } from "~/repos/crud";

export const UserDataWithoutID = UserData.omit({ id: true });
export type UserDataWithoutID = z.infer<typeof UserDataWithoutID>;

// export type AppointmentsRepo = Creator<AppointmentWithoutID, Appointment> &
//   Reader<Appointment, Appointment["id"]> &
//   ReaderAll<Appointment> &
//   Updater<Appointment, Pick<Appointment, "id">> &
//   Deleter<Appointment["id"]> &
//   Streamable<Appointment>;

export type UserDataRepo = Reader<UserData, UserData["id"]> &
  Updater<UserData> &
  StreamableSingle<UserData>;
