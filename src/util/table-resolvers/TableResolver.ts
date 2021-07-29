import { TableColumn } from '@/types';

export interface TableResolver {
  resolve(ctx: TableColumn[]): TableColumn[];
  setNext(resolver: TableResolver): void;
}
