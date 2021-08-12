import type { TableColumn } from '@/types';

export interface TableResolver {
  resolve(ctx: TableColumn[]): TableColumn[];
  setNext(resolver: TableResolver): void;
}

export interface TableResolverBuilder {
  setRowAction(hasRowAction: boolean): TableResolverBuilder;
  setRowSelection(hasRowSelection: boolean): TableResolverBuilder;
  build(): TableResolver;
}
