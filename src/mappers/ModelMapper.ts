export interface ModelMapper<From, To> {
  (model: From): To;
}
