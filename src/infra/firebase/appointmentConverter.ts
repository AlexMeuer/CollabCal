import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "@firebase/firestore";
import { Appointment } from "~/types/appointment";

export class AppointmentConverter
  implements FirestoreDataConverter<Appointment>
{
  toFirestore(obj: Appointment) {
    // Discard the ID from the document body.
    const { id, ...rest } = obj;
    return {
      ...rest,
      startDate: new Date(rest.startDate),
      endDate: rest.endDate ? new Date(rest.endDate) : undefined,
      deletedAt: rest.deletedAt ? new Date(rest.deletedAt) : undefined,
    };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): Appointment {
    return Appointment.parse({ id: snapshot.id, ...snapshot.data(options) });
  }
}
