import { UserData } from "shared-types/userData";
import { UserDataRepo as UserDataRepoInterface } from "~/repos/userDataRepo";

export class UserDataRepo implements UserDataRepoInterface {
  constructor(
    public readonly users: Map<string, UserData> = new Map<string, UserData>()
  ) {}

  read(id: UserData["id"]): Promise<UserData | undefined> {
    return Promise.resolve(this.users.get(id) ?? undefined);
  }

  update(user: Pick<UserData, "id"> & Partial<UserData>): Promise<UserData> {
    this.users.set(user.id, user as UserData);
    return Promise.resolve(user as UserData);
  }
}
