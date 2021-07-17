export interface IDeletable<R> {
  delete(_id: string): Promise<R>;
}
