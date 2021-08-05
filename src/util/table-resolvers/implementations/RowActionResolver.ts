import type { TableColumn } from '@/types';
import type { TableResolver } from '../TableResolver';

export class RowActionResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableColumn[]): TableColumn[] {
    const columns = [...ctx];
    let rowActionColumn: TableColumn = { key: 'action' };
    const col = columns[columns.length - 1];
    if (col.children?.length) {
      rowActionColumn = {
        ...rowActionColumn,
        children: [{ ...this.applyRowActionChildHeaders(col.children) }],
      };
    } else {
      rowActionColumn = {
        ...rowActionColumn,
        width: 16,
        scopedSlots: { customRender: 'action' },
      };
    }
    const itsColumns = [...columns, { ...rowActionColumn }];
    if (this.nextResolver) return this.nextResolver.resolve([...itsColumns]);
    return itsColumns;
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }

  private applyRowActionChildHeaders(childCols: TableColumn[]): TableColumn {
    const col = childCols[0];
    const { type, background } = col;
    let itsCol: TableColumn = {
      type,
      background,
    };
    if (col.children?.length) {
      const childCol = this.applyRowActionChildHeaders(col.children);
      itsCol = {
        ...itsCol,
        children: [{ ...childCol }],
      };
    } else {
      itsCol = {
        ...itsCol,
        width: 16,
        scopedSlots: { customRender: 'action' },
      };
    }
    return itsCol;
  }
}
