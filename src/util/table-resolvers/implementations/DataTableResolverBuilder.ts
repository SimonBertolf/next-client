import { TableResolver, TableResolverBuilder } from '../TableResolver';
import { HeaderStyleResolver } from './HeaderStyleResolver';
import { RowActionResolver } from './RowActionResolver';
import { RowSelectionResolver } from './RowSelectionResolver';

export class DataTableResolverBuilder implements TableResolverBuilder {
  private resolver: TableResolver = new HeaderStyleResolver();

  setRowAction(hasRowAction: boolean): TableResolverBuilder {
    if (hasRowAction) {
      const resolver = new RowActionResolver();
      resolver.setNext(this.resolver);
      this.resolver = resolver;
    }
    return this;
  }

  setRowSelection(hasRowSelection: boolean): TableResolverBuilder {
    if (hasRowSelection) {
      const resolver = new RowSelectionResolver();
      resolver.setNext(this.resolver);
      this.resolver = resolver;
    }
    return this;
  }

  build(): TableResolver {
    return this.resolver;
  }
}
