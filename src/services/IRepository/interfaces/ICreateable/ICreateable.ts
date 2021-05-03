interface ICreateable<T, R> {
  create(entity: T): Promise<R>;
}

export default ICreateable;
