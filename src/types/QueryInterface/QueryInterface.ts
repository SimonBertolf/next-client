export type SortType = -1 | 1;

export interface QueryInterface {
  _start?: number;
  _end?: number;
  search?: {
    [key: string]: string;
  };
  filter?: {
    [key: string]: string;
  };
  sort?: {
    [key: string]: SortType;
  };
}
