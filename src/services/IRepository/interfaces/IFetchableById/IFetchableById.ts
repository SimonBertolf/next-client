interface IFetchableById<R> {
  getById(id: number): Promise<R>;
}

export default IFetchableById;
