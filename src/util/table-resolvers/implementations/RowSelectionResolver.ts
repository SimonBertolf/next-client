import type { TableColumn } from '@/types';
import type { TableResolver, TableResolverContext } from '../TableResolver';

export class RowSelectionResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableResolverContext): TableColumn[] {
    const columns = [...ctx.cols];
    let rowSelectionColumn: TableColumn = { key: 'selection' };
    const col = columns[0];
    if (col.children?.length) {
      rowSelectionColumn = {
        ...rowSelectionColumn,
        children: [{ ...this.applyRowSelectionChildHeaders(col.children) }],
      };
    } else {
      rowSelectionColumn = {
        ...rowSelectionColumn,
        width: 16,
        scopedSlots: { customRender: 'selection' },
      };
    }
    const itsColumns = [{ ...rowSelectionColumn }, ...columns];
    const resolverCtx = {
      ...ctx,
      cols: [...itsColumns],
    };
    if (this.nextResolver) return this.nextResolver.resolve(resolverCtx);
    return itsColumns;
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }

  private applyRowSelectionChildHeaders(childCols: TableColumn[]): TableColumn {
    const col = childCols[0];
    const { type, background } = col;
    let itsCol: TableColumn = {
      type,
      background,
    };
    if (col.children?.length) {
      const childCol = this.applyRowSelectionChildHeaders(col.children);
      itsCol = {
        ...itsCol,
        children: [{ ...childCol }],
      };
    } else {
      itsCol = {
        ...itsCol,
        width: 16,
        scopedSlots: { customRender: 'selection' },
      };
    }
    return itsCol;
  }
}
