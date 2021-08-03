import type { TableColumn } from '@/types';
import type { TableResolver } from '../TableResolver';

export class RowSelectionResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableColumn[]): TableColumn[] {
    const columns = [...ctx];
    const rowSelectionColumn = {
      key: 'selection',
      children: [
        {
          type: 'sub',
          background: 'transparent',
          children: [
            {
              type: 'summary',
              background: 'transparent',
              width: 16,
              scopedSlots: { customRender: 'selection' },
            },
          ],
        },
      ],
    };
    const itsColumns = [{ ...rowSelectionColumn }, ...columns];
    if (this.nextResolver) return this.nextResolver.resolve([...itsColumns]);
    return itsColumns;
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
