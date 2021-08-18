import type { TableColumn } from '@/types';
import type { TableResolver, TableResolverContext } from '../TableResolver';

export class EditableCellResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableResolverContext): TableColumn[] {
    const columns = [...ctx.cols];
    const { editableRowIndex } = ctx;
    const itsColumns = this.transformChildren(columns, editableRowIndex as number);
    if (this.nextResolver) {
      const resolverCtx = {
        ...ctx,
        cols: [...itsColumns],
      };
      return this.nextResolver.resolve(resolverCtx);
    }
    return itsColumns;
  }

  private transformChildren(cols: TableColumn[], editableRowIndex: number): TableColumn[] {
    return cols.map((col) => {
      const { editable, ...restOfCol } = col;
      if (editable) {
        const itsCol = {
          ...restOfCol,
          customCell: (record: unknown, rowIndex: number) => {
            const isEditable = typeof editable === 'function' ? editable(record, rowIndex) : editable;
            if (restOfCol.customCell) {
              const cell = restOfCol.customCell(record, rowIndex);
              return {
                ...cell,
                props: {
                  editable: isEditable,
                  ...cell.props,
                },
              };
            }
            return { props: { editable: isEditable } };
          },
        };
        if (restOfCol.customRender) {
          const renderer = restOfCol.customRender;
          return {
            ...itsCol,
            customRender: (text: string, record: unknown, index: number, c: TableColumn) => {
              const isEditable = typeof editable === 'function' ? editable(record, index) : editable;
              const isCellEditable = isEditable && index === editableRowIndex;
              return renderer(text, record, index, c, isCellEditable);
            },
          };
        }
        return itsCol;
      }
      if (restOfCol.children?.length) {
        return { ...restOfCol, children: [...this.transformChildren(restOfCol.children, editableRowIndex)] };
      }
      return restOfCol;
    });
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
