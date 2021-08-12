import type { TableColumn } from '@/types';
import type { TableResolver, TableResolverContext } from '../TableResolver';

export class HeaderStyleResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableResolverContext): TableColumn[] {
    const columns = [...ctx.cols];
    const transformChildren = (
      childColumns: TableColumn[],
      parentIndex: number,
      parentLength: number,
    ): TableColumn[] => {
      const itsChildColumns = [...childColumns];
      return itsChildColumns.map((itsChildCol: TableColumn) => {
        const itsChildColumn = {
          ...itsChildCol,
          customHeaderCell: () => {
            const { background: bg, type, customHeaderCell } = itsChildCol;
            const edgeStyle = {
              isFirst: !parentIndex,
              isLast: parentLength - 1 === parentIndex,
            };
            if (customHeaderCell) {
              const itsCustomHeaderCell = customHeaderCell();
              return {
                ...itsCustomHeaderCell,
                props: {
                  ...itsCustomHeaderCell.props,
                  bg,
                  type,
                  ...edgeStyle,
                },
              };
            }
            return {
              props: {
                bg,
                type,
                ...edgeStyle,
              },
            };
          },
        };
        if (itsChildColumn.children?.length)
          return {
            ...itsChildColumn,
            children: [...transformChildren(itsChildColumn.children, parentIndex, parentLength)],
          };
        return itsChildColumn;
      });
    };
    const itsColumns = columns.map((col: TableColumn, index) => {
      const itsHeaderCell = {
        customHeaderCell: () => {
          const { background: bg, type, customHeaderCell } = col;
          const itsProps = { props: { bg, type, isFirst: !index, isLast: index === columns.length - 1 } };
          if (customHeaderCell) {
            const itsCustomHeaderCell = customHeaderCell();
            return {
              ...itsCustomHeaderCell,
              props: {
                ...itsCustomHeaderCell.props,
                ...itsProps.props,
              },
            };
          }
          return itsProps;
        },
      };
      const itsCol = {
        ...col,
        ...itsHeaderCell,
      };
      if (itsCol.children?.length)
        return { ...itsCol, children: [...transformChildren(itsCol.children, index, columns.length)] };
      return itsCol;
    });
    if (this.nextResolver) {
      const resolverCtx = {
        ...ctx,
        cols: [...itsColumns],
      };
      return this.nextResolver.resolve(resolverCtx);
    }
    return itsColumns;
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
