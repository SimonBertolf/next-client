interface IFetchableById<R> {
  getById(id: string): Promise<R>;
}

export default IFetchableById;
