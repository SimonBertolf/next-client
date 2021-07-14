// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponseBody<Data = any> {
  status: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Data;
  message: string;
  next?: string;
  count?: number;
}
