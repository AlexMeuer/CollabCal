import {
  AppointmentsRepo as AppointmentsRepoInterface,
  AppointmentWithoutID,
} from "~/repos/appointmentsRepo";
import { Appointment } from "~/types/appointment";
import { Observable } from "rxjs";
import {
  Firestore,
  collection,
  CollectionReference,
  FirestoreDataConverter,
  addDoc,
  getDoc,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { AppointmentConverter } from "./appointmentConverter";

export class AppointmentsRepo implements AppointmentsRepoInterface {
  constructor(
    db: Firestore,
    converter: FirestoreDataConverter<Appointment> = new AppointmentConverter()
  ) {
    this.collection = collection(db, "appointments").withConverter(converter);
  }

  private readonly collection: CollectionReference<Appointment>;

  async create(obj: AppointmentWithoutID): Promise<Appointment> {
    const ref = await addDoc(this.collection, obj);
    return {
      ...obj,
      id: ref.id,
    };
  }

  async read(id: Appointment["id"]): Promise<Appointment> {
    const snapshot = await getDoc(doc(this.collection, id));
    if (!snapshot.exists()) {
      throw new Error("Appointment not found");
    }
    return snapshot.data();
  }

  async readAll(): Promise<Appointment[]> {
    const snapshots = await getDocs(this.collection);
    return snapshots.docs.map((doc) => doc.data());
  }

  async update(
    obj: Pick<Appointment, "id"> & Partial<Appointment>
  ): Promise<Appointment> {
    await setDoc(doc(this.collection, obj.id), obj, { merge: true });
    return this.read(obj.id);
  }

  delete(id: Appointment["id"]): Promise<void> {
    return deleteDoc(doc(this.collection, id));
  }

  stream(): Observable<Appointment> {
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(
        this.collection,
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            subscriber.next(change.doc.data());
          });
        },
        (error) => subscriber.error(error),
        () => subscriber.complete()
      );
      return unsubscribe;
    });
  }
}
