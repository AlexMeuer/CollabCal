import { Models } from "appwrite";

export const mapID = (obj: Models.Document) => ({ ...obj, id: obj.$id });
