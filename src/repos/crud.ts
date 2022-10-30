import { Observable } from "rxjs";

export interface Creator<T, Return = T> {
  create: (obj: T) => PromiseLike<Return>;
}
export interface Reader<T, ID = string> {
  read: (id: ID) => PromiseLike<T>;
}
export interface ReaderAll<T> {
  readAll: () => PromiseLike<T[]>;
}
export interface Updater<T, IDMerge = { id: string }, Return = T> {
  update: (obj: IDMerge & Partial<T>) => PromiseLike<Return>;
}
export interface Deleter<ID = string, Return = void> {
  delete: (id: ID) => PromiseLike<Return>;
}

export interface Streamable<T> {
  stream: () => Observable<T>;
}
