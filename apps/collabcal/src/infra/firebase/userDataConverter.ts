import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "@firebase/firestore";
import { UserData } from "shared-types/userData";

export class UserDataConverter implements FirestoreDataConverter<UserData> {
  toFirestore(obj: UserData) {
    // Discard the ID from the document body.
    const { id, ...rest } = obj as Pick<UserData, "id"> & any;
    return {
      ...rest,
    };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): UserData {
    const data = snapshot.data(options);
    return UserData.parse({
      id: snapshot.id,
      ...data,
    });
  }
}
