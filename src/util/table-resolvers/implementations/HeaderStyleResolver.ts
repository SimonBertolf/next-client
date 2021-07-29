import { TableColumn } from '@/types';
import { TableResolver } from '../TableResolver';

export class HeaderStyleResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableColumn[]): TableColumn[] {
    const columns = [...ctx];
    const transformChildren = (childColumns: TableColumn[], isFirst = false): TableColumn[] => {
      const itsChildColumns = [...childColumns];
      return itsChildColumns.map((itsChildCol: TableColumn) => ({
        ...itsChildCol,
        customHeaderCell: () => {
          const { background: bg, type, customHeaderCell } = itsChildCol;
          const edgeStyle = {
            isFirst,
            isLast: !isFirst,
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
      }));
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
      if (itsCol.children?.length) return { ...itsCol, children: [...transformChildren(itsCol.children, true)] };
      return itsCol;
    });
    if (this.nextResolver) {
      return this.nextResolver.resolve([...itsColumns]);
    }
    return itsColumns;
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
