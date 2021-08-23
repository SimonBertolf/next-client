import type { TableColumn } from '@/types';
import type { TableResolver, TableResolverContext } from '../TableResolver';

export class EditableCellResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableResolverContext): TableColumn[] {
    const columns = [...ctx.cols];
    const { editableRowIndex, focusedCell, focusHandler, blurHandler } = ctx;
    const itsColumns = this.transformChildren(
      columns,
      editableRowIndex as number,
      focusedCell,
      focusHandler as (dataIndex: string, rowIndex: number) => void,
      blurHandler as () => void,
    );
    if (this.nextResolver) {
      const resolverCtx = {
        ...ctx,
        cols: [...itsColumns],
      };
      return this.nextResolver.resolve(resolverCtx);
    }
    return itsColumns;
  }

  private transformChildren(
    cols: TableColumn[],
    editableRowIndex: number,
    focusedCell: undefined | { dataIndex: string; rowIndex: number },
    focusHandler: (dataIndex: string, rowIndex: number) => void,
    blurHandler: () => void | undefined,
  ): TableColumn[] {
    return cols.map((col) => {
      const { editable, ...restOfCol } = col;
      if (editable) {
        const itsCol = {
          ...restOfCol,
          customCell: (record: unknown, rowIndex: number) => {
            const isEditable = typeof editable === 'function' ? editable(record, rowIndex) : editable;
            const cellIsFocused = focusedCell?.dataIndex === restOfCol.dataIndex && focusedCell?.rowIndex === rowIndex;
            if (restOfCol.customCell) {
              const cell = restOfCol.customCell(record, rowIndex);
              return {
                ...cell,
                props: {
                  editable: isEditable,
                  ...cell.props,
                  hasFocus: isEditable && cellIsFocused,
                },
                on: {
                  focus: () => focusHandler(restOfCol.dataIndex as string, rowIndex),
                  blur: () => blurHandler(),
                  ...cell.on,
                },
              };
            }
            return {
              props: { editable: isEditable, hasFocus: isEditable && cellIsFocused },
              on: { focus: () => focusHandler(restOfCol.dataIndex as string, rowIndex), blur: () => blurHandler() },
            };
          },
        };
        if (restOfCol.customRender) {
          const renderer = restOfCol.customRender;
          return {
            ...itsCol,
            customRender: (text: string, record: unknown, index: number, c: TableColumn) => {
              const isEditable = typeof editable === 'function' ? editable(record, index) : editable;
              const cellIsFocused = focusedCell?.dataIndex === restOfCol.dataIndex && focusedCell?.rowIndex === index;
              const isCellEditable = isEditable && index === editableRowIndex;
              return renderer(text, record, index, c, isCellEditable || cellIsFocused);
            },
          };
        }
        return itsCol;
      }
      if (restOfCol.children?.length) {
        return {
          ...restOfCol,
          children: [
            ...this.transformChildren(restOfCol.children, editableRowIndex, focusedCell, focusHandler, blurHandler),
          ],
        };
      }
      return restOfCol;
    });
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
