import { Observable } from "rxjs";

export interface Creator<T, Return = T> {
  create: (obj: T) => Promise<Return>;
}
export interface Reader<T, ID = string> {
  read: (id: ID) => Promise<T | undefined>;
}
export interface ReaderAll<T> {
  readAll: () => Promise<T[]>;
}
export interface Updater<T, IDMerge = { id: string }, Return = T> {
  update: (obj: IDMerge & Partial<T>) => Promise<Return>;
}
export interface Deleter<ID = string, Return = void> {
  delete: (id: ID) => Promise<Return>;
}

export interface Streamable<T> {
  stream: () => Observable<T>;
}

export interface StreamableSingle<T, ID = string> {
  streamOne: (id: ID) => Observable<T | undefined>;
}
