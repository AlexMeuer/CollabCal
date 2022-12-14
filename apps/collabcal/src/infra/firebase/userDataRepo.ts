import { UserDataRepo as UserDataRepoInterface } from "~/repos/userDataRepo";
import { UserData } from "shared-types/userData";
import {
  Firestore,
  collection,
  CollectionReference,
  FirestoreDataConverter,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { UserDataConverter } from "./userDataConverter";

export class UserDataRepo implements UserDataRepoInterface {
  constructor(
    db: Firestore,
    converter: FirestoreDataConverter<UserData> = new UserDataConverter()
  ) {
    this.collection = collection(db, "users").withConverter(converter);
  }
  private readonly collection: CollectionReference<UserData>;

  async read(id: UserData["id"]): Promise<UserData> {
    const snapshot = await getDoc(doc(this.collection, id));
    if (!snapshot.exists()) {
      throw new Error("User not found");
    }
    return snapshot.data();
  }

  async update(
    obj: Pick<UserData, "id"> & Partial<UserData>
  ): Promise<UserData> {
    await setDoc(doc(this.collection, obj.id), obj, { merge: true });
    return await this.read(obj.id);
  }
}
