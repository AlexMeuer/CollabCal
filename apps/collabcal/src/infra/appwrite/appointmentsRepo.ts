import { Client, Databases, ID, Models } from "appwrite";
import {
  AppointmentsRepo as AppointmentsRepoInterface,
  AppointmentWithoutID,
} from "~/repos/appointmentsRepo";
import { Appointment } from "shared-types/appointment";
import { mapID } from "./dbUtil";
import { Observable } from "rxjs";

const DATABASE_ID = "main";
const COLLECTION_ID = "appointments";

export class AppointmentsRepo implements AppointmentsRepoInterface {
  constructor(
    private readonly client: Client,
    private readonly db: Databases
  ) { }

  async create(appointment: AppointmentWithoutID): Promise<Appointment> {
    const result = await this.db.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
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

  async update(
    appointment: Pick<Appointment, "id"> & Partial<Appointment>
  ): Promise<Appointment> {
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

  stream(): Observable<Appointment> {
    return new Observable((subscriber) => {
      const unsubscribe = this.client.subscribe<Models.Document>(
        `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
        (event) => {
          subscriber.next(Appointment.parse(mapID(event.payload)));
        }
      );
      return unsubscribe;
    });
  }
}
