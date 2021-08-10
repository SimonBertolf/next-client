import type { TableColumn } from '@/types';
import type { TableResolver } from '../TableResolver';

export class TableSorterResolver implements TableResolver {
  private nextResolver: TableResolver | null = null;

  private currentSorter: boolean | { direction: string | boolean; key: string };

  private sortHandler: (dir: string | boolean, key: string) => void;

  constructor(
    currentSorter: boolean | { direction: string | boolean; key: string },
    sortHandler: (dir: string | boolean, key: string) => void,
  ) {
    this.currentSorter = currentSorter;
    this.sortHandler = sortHandler;
  }

  resolve(ctx: TableColumn[]): TableColumn[] {
    const columns = [...ctx];
    const itsColumns: TableColumn[] = columns.map((col) => {
      const { sorter, ...restOfCol } = col;
      if (sorter) {
        const itsCol: TableColumn = {
          ...restOfCol,
          customHeaderCell: () => {
            let sortProps: { sorter: boolean; onSort: (dir: string | boolean) => void; direction: string | boolean } = {
              sorter: true,
              onSort: (dir: string | boolean) => this.sortHandler(dir, col.key as string),
              direction: false,
            };
            if (this.currentSorter) {
              const { key, direction } = this.currentSorter as { direction: string | boolean; key: string };
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
      return this.nextResolver.resolve([...itsColumns]);
    }
    return itsColumns;
  }

  setNext(resolver: TableResolver): void {
    this.nextResolver = resolver;
  }
}
