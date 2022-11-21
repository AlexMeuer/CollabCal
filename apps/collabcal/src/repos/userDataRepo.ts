import { z } from "zod";
import { UserData } from "shared-types/userData";
import { Reader, StreamableSingle, Updater } from "~/repos/crud";

export type UserDataRepo = Reader<UserData, UserData["id"]> & Updater<UserData>;
