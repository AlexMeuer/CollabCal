import { Databases, ID } from "appwrite";
import {
  AppointmentsRepo as AppointmentsRepoInterface,
  AppointmentWithoutID,
} from "../../repos/appointmentsRepo";
import { Appointment } from "~/types/appointment";
import { mapID } from "./dbUtil";

export class AppointmentsRepo implements AppointmentsRepoInterface {
  constructor(private readonly db: Databases) {}

  async create(appointment: AppointmentWithoutID): Promise<Appointment> {
    const result = await this.db.createDocument(
      "main",
      "appointments",
      ID.unique(),
      appointment
    );
    return Appointment.parse(mapID(result));
  }

  async read(id: Appointment["id"]): Promise<Appointment> {
    const result = await this.db.getDocument("main", "appointments", id);
    return Appointment.parse(result);
  }

  async readAll(): Promise<Appointment[]> {
    const result = await this.db.listDocuments("main", "appointments");
    return result.documents.map((doc) => Appointment.parse(mapID(doc)));
  }

  async update(appointment: Appointment): Promise<Appointment> {
    const { id, ...data } = appointment;
    if (!id) {
      throw new Error("Appointment must have an id");
    }
    const result = await this.db.updateDocument(
      "main",
      "appointments",
      id,
      data
    );
    return Appointment.parse(mapID(result));
  }

  async delete(id: Appointment["id"]): Promise<void> {
    await this.db.deleteDocument("main", "appointments", id);
  }
}
