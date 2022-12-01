import { UserData } from "shared-types/userData";
import { Reader, Updater } from "~/repos/crud";

export type UserDataRepo = Reader<UserData, UserData["id"]> & Updater<UserData>;
