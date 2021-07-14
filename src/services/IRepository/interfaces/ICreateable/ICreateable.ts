export interface ICreateable<T, R> {
  create(entity: T): Promise<R>;
}
