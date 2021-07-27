export interface ICreateable<T, R> {
  create(entity: Omit<T, '_id'>): Promise<R>;
}
