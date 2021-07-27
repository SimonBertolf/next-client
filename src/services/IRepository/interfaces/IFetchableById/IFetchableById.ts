export interface IFetchableById<R> {
  getById(id: string): Promise<R>;
}
