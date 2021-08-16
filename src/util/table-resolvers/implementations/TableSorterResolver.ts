import type { TableColumn } from '@/types';
import type { TableResolver, TableResolverContext } from '../TableResolver';

export class TableSorterResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  resolve(ctx: TableResolverContext): TableColumn[] {
    const columns = [...ctx.cols];
    const itsColumns: TableColumn[] = columns.map((col) => {
      const { sorter, direction: itsDir, ...restOfCol } = col;
      const { sorter: resolverSorter } = ctx;
      if (sorter && resolverSorter) {
        const { handler, direction = undefined, key = undefined } = resolverSorter;
        const itsCol: TableColumn = {
          ...restOfCol,
          customHeaderCell: () => {
            let sortProps: { sorter: boolean; onSort: (dir: string | boolean) => void; direction: string | boolean } = {
              sorter: true,
              onSort: (dir: string | boolean) => handler(dir, col.key as string),
              direction: key === undefined && itsDir ? (itsDir as string).toLowerCase() : false,
            };
            if (direction) {
              if (key === col.key) sortProps = { ...sortProps, direction };
            }
            if (col.customHeaderCell) {
              const cellProps = col.customHeaderCell();
              const { props, ...restProps } = cellProps;
              return {
                props: {
                  ...sortProps,
                  ...props,
                },
                ...restProps,
              };
            }
            return { props: { ...sortProps } };
          },
        };
        return itsCol;
      }
      return col;
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
