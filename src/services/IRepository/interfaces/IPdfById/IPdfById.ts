export interface IPdfById {
  getPdfById(id: string): Promise<Blob>;
}
