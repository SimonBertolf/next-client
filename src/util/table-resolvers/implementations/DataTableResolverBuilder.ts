import { TableResolver, TableResolverBuilder } from '../TableResolver';
import { HeaderStyleResolver } from './HeaderStyleResolver';
import { RowActionResolver } from './RowActionResolver';
import { RowSelectionResolver } from './RowSelectionResolver';
import { TableSorterResolver } from './TableSorterResolver';
import { EditableCellResolver } from './EditableCellResolver';

export class DataTableResolverBuilder implements TableResolverBuilder {
  private resolver: TableResolver = new HeaderStyleResolver();

  addRowAction(): TableResolverBuilder {
    const resolver = new RowActionResolver();
    resolver.setNext(this.resolver);
    this.resolver = resolver;
    return this;
  }

  addRowSelection(): TableResolverBuilder {
    const resolver = new RowSelectionResolver();
    resolver.setNext(this.resolver);
    this.resolver = resolver;
    return this;
  }

  addTableSorter(): TableResolverBuilder {
    const resolver = new TableSorterResolver();
    resolver.setNext(this.resolver);
    this.resolver = resolver;
    return this;
  }

  addEditableCells(): TableResolverBuilder {
    const resolver = new EditableCellResolver();
    resolver.setNext(this.resolver);
    this.resolver = resolver;
    return this;
  }

  build(): TableResolver {
    return this.resolver;
  }
}
