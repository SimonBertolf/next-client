import type { TableColumn } from '@/types';
import type { TableResolver } from '../TableResolver';

export class RowSelectionResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableColumn[]): TableColumn[] {
    const columns = [...ctx];

    if (this.nextResolver) return this.nextResolver.resolve([...columns]);
    return columns;
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
