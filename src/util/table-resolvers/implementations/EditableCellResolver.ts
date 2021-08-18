import type { TableColumn } from '@/types';
import type { TableResolver, TableResolverContext } from '../TableResolver';

export class EditableCellResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableResolverContext): TableColumn[] {
    const columns = [...ctx.cols];
    const itsColumns = this.transformChildren(columns);
    if (this.nextResolver) {
      const resolverCtx = {
        ...ctx,
        cols: [...itsColumns],
      };
      return this.nextResolver.resolve(resolverCtx);
    }
    return itsColumns;
  }

  private transformChildren(cols: TableColumn[]): TableColumn[] {
    return cols.map((col) => {
      const { editable, ...restOfCol } = col;
      if (editable) {
        const itsCol = {
          ...restOfCol,
          customCell: (record: unknown, rowIndex: number) => {
            if (restOfCol.customCell) {
              const cell = restOfCol.customCell(record, rowIndex);
              return {
                ...cell,
                props: {
                  editable,
                  ...cell.props,
                },
              };
            }
            return { props: { editable } };
          },
        };
        return itsCol;
      }
      if (restOfCol.children?.length) {
        return { ...restOfCol, children: [...this.transformChildren(restOfCol.children)] };
      }
      return restOfCol;
    });
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
