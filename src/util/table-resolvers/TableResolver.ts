import type { TableColumn } from '@/types';

export interface TableResolverContext {
  cols: TableColumn[];
  sorter?: {
    key?: string;
    direction?: string | boolean;
    handler: (dir: string | boolean, key: string) => void;
  };
  editableRowIndex?: number;
}

export interface TableResolver {
  resolve(ctx: TableResolverContext): TableColumn[];
  setNext(resolver: TableResolver): void;
}

export interface TableResolverBuilder {
  addRowAction(): TableResolverBuilder;
  addRowSelection(): TableResolverBuilder;
  addTableSorter(): TableResolverBuilder;
  addEditableCells(): TableResolverBuilder;
  build(): TableResolver;
}
