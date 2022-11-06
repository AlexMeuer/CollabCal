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
    const { id, ...rest } = obj as Pick<Appointment, "id"> & any;
    return {
      ...rest,
    };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): Appointment {
    const data = snapshot.data(options);
    return Appointment.parse({
      id: snapshot.id,
      ...data,
      startDate: data.startDate.toDate(),
      endDate: data.endDate ? data.endDate.toDate() : null,
      deletedAt: data.deletedAt ? data.deletedAt.toDate() : null,
    });
  }
}
