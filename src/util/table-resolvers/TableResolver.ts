import type { TableColumn } from '@/types';

export interface TableResolverContext {
  cols: TableColumn[];
  sorter?: {
    key: string;
    direction: string | boolean;
    handler: (dir: string | boolean, key: string) => void;
  };
}

export interface TableResolver {
  resolve(ctx: TableResolverContext): TableColumn[];
  setNext(resolver: TableResolver): void;
}
