export interface Creator<T, Return = T> {
  create: (obj: T) => PromiseLike<Return>;
}
export interface Reader<T, ID = string> {
  read: (id: ID) => PromiseLike<T>;
}
export interface ReaderAll<T> {
  readAll: () => PromiseLike<T[]>;
}
export interface Updater<T, Return = T> {
  update: (obj: T) => PromiseLike<Return>;
}
export interface Deleter<ID = string, Return = void> {
  delete: (id: ID) => PromiseLike<Return>;
}
